import {login, Context} from "./context"

const resourceGroup = "Majavashakki"
const location = "North Europe"
const dbName = "majavashakkimongo"
const appName = "majavashakki-kontti"

async function main() {
  const ctx = await login()

  console.log("Getting Cosmos DB connection details")
  const [password, connectionString] = await getCosmosConnectionDetails(ctx)

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
        {name: "MajavaMongoPassword", value: password},
        {name: "MajavashakkiFbClientId", value: process.env.SECRET_MajavashakkiFbClientId},
        {name: "MajavashakkiFbSecret", value: process.env.SECRET_MajavashakkiFbSecret},
        {name: "MajavashakkiMongoConnectionString", value: connectionString},
        {name: "MajavashakkiSessionSecret", value: process.env.SECRET_MajavashakkiSessionSecret},
      ],
      linuxFxVersion: "DOCKER|majavapaja/majavashakki:latest",
    },
  })
  console.log(app)

  console.log(await ctx.webapps.restart(resourceGroup, appName))
}

async function getCosmosConnectionDetails(ctx: Context): Promise<[string, string]> {
  const keys = await ctx.cosmosdb.databaseAccounts.listKeys(resourceGroup, dbName)
  const password = keys.primaryMasterKey!
  const connectionStrings = await ctx.cosmosdb.databaseAccounts.listConnectionStrings(resourceGroup, dbName)
  const primaryConnection = connectionStrings.connectionStrings!.find(c => strContains(password, c.connectionString!))!
  return [password, primaryConnection.connectionString!]
}

const strContains = (needle: string, haystack: string): boolean =>
  haystack.indexOf(needle) !== -1

// TODO: Currently the deploy user does not have permission to get secrets from vault :|
async function secret(ctx: Context, secretName: string): Promise<string> {
  const latest = await ctx.secrets.getSecret(secretName)
  return latest.value!
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
