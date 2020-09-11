import * as path from "path"
import { spawnSync } from "child_process"

import {login, Context, env} from "./context"
import {CosmosClient} from "@azure/cosmos"

const resourceGroup = "Majavashakki"
const location = "North Europe"
const dbName = "majavashakkimongo"
const appName = "majavashakki-kontti"

async function main() {
  const gitSha = env("GIT_SHA")
  const fbClientId = env("SECRET_MajavashakkiFbClientId")
  const fbSecret = env("SECRET_MajavashakkiFbSecret")
  const sessionSecret = env("SECRET_MajavashakkiSessionSecret")
  const tag = containerTag(gitSha)

  const ctx = await login()
  console.log('Creating CosmosDB')
  const dbAccount = await ctx.cosmosdb.databaseAccounts.createOrUpdate(
    resourceGroup,
    `${resourceGroup}mongo`.toLowerCase(),
    {
      location,
      locations: [{ locationName: location }],
      kind: "MongoDB",
    },
  )

  console.log("Getting Cosmos DB connection details")
  const [password, connectionString] = await getCosmosConnectionDetails(ctx)

  console.log(dbAccount)
  const cosmosClient = new CosmosClient({
    endpoint: dbAccount.documentEndpoint!,
    key: password,
  })
  const db = await cosmosClient.databases.createIfNotExists({
    id: "Majavashakki"
  })

  for (const id of ["games", "sessions", "users", "undefined"]) {
    await db.database.containers.createIfNotExists({ id }, { offerThroughput: 400 })
  }

  console.log("Ensuring container registry exists")
  const registry = await createRegistry(ctx, "majavashakki")

  console.log("Building and pushing container image")
  const fullContainerTag = `${registry.server}/majavashakki:${tag}`
  await loginRegistry(registry)
  shellSync(["docker", "build", "--tag", fullContainerTag, "."], resolve("."))
  shellSync(["docker", "push", fullContainerTag], resolve("."))
  console.log(await ctx.webapps.get(resourceGroup, appName))

  console.log("Ensuring App Service Plan exists")
  const plan = await ctx.websites.appServicePlans.createOrUpdate(resourceGroup, "majavashakki-linux", {
    location,
    kind: "linux",
    sku: { name: "B1" },
  })
  console.log(plan)

  console.log("Ensuring Container App exists")
  const app = await ctx.webapps.createOrUpdate(resourceGroup, appName, {
    location,
    kind: "app,linux,container",
    serverFarmId: plan.id,
    httpsOnly: true,
    siteConfig: {
      webSocketsEnabled: true,
      alwaysOn: true,
      appSettings: [
        {name: "DOCKER_REGISTRY_SERVER_PASSWORD", value: registry.password},
        {name: "DOCKER_REGISTRY_SERVER_URL", value: registry.server},
        {name: "DOCKER_REGISTRY_SERVER_USERNAME", value: registry.username},
        {name: "MajavaMongoPassword", value: password},
        {name: "MajavashakkiFbClientId", value: fbClientId},
        {name: "MajavashakkiFbSecret", value: fbSecret},
        {name: "MajavashakkiMongoConnectionString", value: connectionString},
        {name: "MajavashakkiSessionSecret", value: sessionSecret},
      ],
      linuxFxVersion: `DOCKER|${fullContainerTag}`,
    },
  })
  console.log(app)

  console.log(await ctx.webapps.restart(resourceGroup, appName))
}

async function createRegistry(ctx: Context, registryName: string): Promise<DockerCredentials> {
  const repository = await ctx.containerregistry.registries.create(resourceGroup, registryName, {
    location,
    sku: { name: "Basic" },
    adminUserEnabled: true,
  })

  const creds = await ctx.containerregistry.registries.listCredentials(resourceGroup, registryName)
  return {
    server: repository.loginServer!,
    username: creds.username!,
    password: creds.passwords![0].value!,
  }
}

async function loginRegistry(creds: DockerCredentials): Promise<void> {
  shellSync([ "docker", "login", "--username", creds.username, "--password", creds.password, creds.server ])
}

function shellSync(command: string[], cwd?: string): void {
  const [cmd, ...args] = command
  const p = spawnSync(cmd, args, { cwd, stdio: "inherit" })
  if (p.status !== 0) {
    throw new Error("command exited with non-zero code: " + p.status)
  }
}

async function getCosmosConnectionDetails(ctx: Context): Promise<[string, string]> {
  const keys = await ctx.cosmosdb.databaseAccounts.listKeys(resourceGroup, dbName)
  const password = keys.primaryMasterKey!
  const connectionStrings = await ctx.cosmosdb.databaseAccounts.listConnectionStrings(resourceGroup, dbName)
  const primaryConnection = connectionStrings.connectionStrings!.find(c => strContains(password, c.connectionString!))!
  return [password, primaryConnection.connectionString!]
}

function containerTag(sha: string): string {
  if (process.env.CI) {
    return "ci-" + sha
  } else if (process.env.USER) {
    return process.env.USER + "-" + sha
  } else {
    return "local-" + sha
  }
}

const strContains = (needle: string, haystack: string): boolean =>
  haystack.indexOf(needle) !== -1

function resolve(filepath: string): string {
  return path.resolve(__dirname, "../..", filepath)
}

// TODO: Currently the deploy user does not have permission to get secrets from vault :|
async function secret(ctx: Context, secretName: string): Promise<string> {
  const latest = await ctx.secrets.getSecret(secretName)
  return latest.value!
}

interface DockerCredentials {
  server: string
  username: string
  password: string
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
