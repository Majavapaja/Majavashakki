import * as appservice from "@azure/arm-appservice"
import * as msRestJs from "@azure/ms-rest-js"
import * as msRestAzureJs from "@azure/ms-rest-azure-js"
import * as msRestNodeAuth from "@azure/ms-rest-nodeauth"
import { SecretClient } from "@azure/keyvault-secrets"
import { EnvironmentCredential } from "@azure/identity"
import * as cosmosdb from "@azure/arm-cosmosdb"
import { ContainerRegistryManagementClient } from "@azure/arm-containerregistry"

const subscriptionId: string = env("AZURE_SUBSCRIPTION_ID")
const clientId: string = env("AZURE_CLIENT_ID")
const secret: string = env("AZURE_CLIENT_SECRET")
const tenant: string = env("AZURE_TENANT_ID")

export interface Context {
  websites: appservice.WebSiteManagementClient,
  webapps: appservice.WebApps,
  secrets: SecretClient,
  cosmosdb: cosmosdb.CosmosDBManagementClient,
  containerregistry: ContainerRegistryManagementClient,
}

export async function login(): Promise<Context> {
  const creds = await msRestNodeAuth.loginWithServicePrincipalSecret(clientId, secret, tenant)
  const websites = new appservice.WebSiteManagementClient(creds as any, subscriptionId)
  return {
    websites,
    webapps: new appservice.WebApps(websites),
    secrets: new SecretClient(`https://majavashakki-vault.vault.azure.net`, new EnvironmentCredential()),
    cosmosdb: new cosmosdb.CosmosDBManagementClient(creds as any, subscriptionId),
    containerregistry: new ContainerRegistryManagementClient(creds as any, subscriptionId),
  }
}

export function env(key: string): string {
  const value = process.env[key]
  if (!value) throw Error(`Environment variable ${key} required`)
  return value
}
