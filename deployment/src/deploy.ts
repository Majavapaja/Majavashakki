// import * as acr from "@azure/arm-containerregistry"

import * as rstJs from "@azure/ms-rest-js"
import {login, Context} from "./context"

const resourceGroup = "Majavashakki"
const location = "North Europe"

async function main() {
  const ctx = await login()

  const plan = await ctx.websites.appServicePlans.createOrUpdate(resourceGroup, "majavashakki-linux", {
    location,
    kind: "linux",
    sku: { name: "B1" },
  })
  console.log(plan)

  const app = await ctx.webapps.createOrUpdate(resourceGroup, "majavashakki-kontti", {
    location,
    kind: "app,linux,container",
    serverFarmId: plan.id,
    httpsOnly: true,
    siteConfig: {
      webSocketsEnabled: true,
      alwaysOn: true,
      appSettings: [
        {name: "MajavaMongoPassword", value: process.env.SECRET_MajavaMongoPassword},
        {name: "MajavashakkiFbClientId", value: process.env.SECRET_MajavashakkiFbClientId},
        {name: "MajavashakkiFbSecret", value: process.env.SECRET_MajavashakkiFbSecret},
        {name: "MajavashakkiMongoConnectionString", value: process.env.SECRET_MajavashakkiMongoConnectionString},
        {name: "MajavashakkiSessionSecret", value: process.env.SECRET_MajavashakkiSessionSecret},
      ],
      linuxFxVersion: "DOCKER|majavapaja/majavashakki:latest",
    },
  })
  console.log(app)
}

// TODO: Currently the deploy user does not have permission to get secrets from vault :|
async function secret(ctx: Context, secretName: string): Promise<string> {
  const latest = await ctx.secrets.getSecret(secretName)
  return latest.value!
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
