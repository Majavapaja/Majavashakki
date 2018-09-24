import json
import logging

import gpg

FORMAT = '%(asctime)s %(levelname)s %(name)s %(message)s'
logging.basicConfig(level=logging.INFO, format=FORMAT)
log = logging.getLogger("deploy")

RESOURCE_GROUP_NAME = "MajavaShakki"
LOCATION = "northeurope"

from copy import deepcopy
from azure.common.credentials import ServicePrincipalCredentials
from azure.mgmt.cosmosdb import CosmosDB
from azure.mgmt.cosmosdb.models import DatabaseAccountKind, DatabaseAccountCreateUpdateParameters, Location, DatabaseAccountOfferType
from azure.mgmt.web import WebSiteManagementClient
from azure.mgmt.web.models import AppServicePlan, SkuDescription, SkuName, Site, SiteConfig, ScmType, NameValuePair

SKU_D1_SHARED = SkuDescription(name="D1", capacity=1, tier=SkuName.shared.value)

async def main():
  log.info("Loading secrets")
  secrets = load_secrets()
  web_client, cosmosdb_client = setup_azure(secrets)

  db, keys, connection_strings = setup_cosmosdb(cosmosdb_client, f"{RESOURCE_GROUP_NAME}mongo".lower())
  assert len(connection_strings) == 1, f"Expected 1 connection string for mongodb, got {len(connection_strings)}"
  assert keys.primary_master_key

  app_env = deepcopy(secrets["appEnvironment"])
  app_env["MajavashakkiMongoConnectionString"] = connection_strings[0].connection_string
  app_env["MajavaMongoPassword"] = keys.primary_master_key

  log.info("Creating App Service Plan")
  plan = web_client.app_service_plans.create_or_update(
    RESOURCE_GROUP_NAME,
    f"{RESOURCE_GROUP_NAME}Plan",
    app_service_plan=AppServicePlan(
      LOCATION,
      f"{RESOURCE_GROUP_NAME}Plan",
      sku=SKU_D1_SHARED
    )
  ).result()

  log.info("Creating Web App")
  site_name = f"{RESOURCE_GROUP_NAME}Site"
  env_pairs = [NameValuePair(k, v) for k, v in app_env.items()]
  site = web_client.web_apps.create_or_update(
    RESOURCE_GROUP_NAME,
    site_name,
    Site(
      location=LOCATION,
      site_config=SiteConfig(
        app_settings=env_pairs,
        scm_type=ScmType.local_git,
      )
    )
  ).result()

  log.info("Pushing code to App Service")
  pub_cred = web_client.web_apps.list_publishing_credentials(RESOURCE_GROUP_NAME, site_name).result()
  git_url = mk_git_url(site_name, pub_cred)
  p = await asyncio.create_subprocess_exec("git", "push", "--force", git_url, "HEAD:master")
  await p.wait()

  log.info("Done")

def setup_cosmosdb(cosmosdb_client, database_account_name):
  log.info("Creating CosmosDB")
  mongo = cosmosdb_client.database_accounts.create_or_update(
    RESOURCE_GROUP_NAME,
    database_account_name,
    DatabaseAccountCreateUpdateParameters(
      location=LOCATION,
      locations=[Location(location_name=LOCATION)],
      kind=DatabaseAccountKind.mongo_db
    ),
    database_account_offer_type=DatabaseAccountOfferType.standard
  ).result()

  log.info("Fetching CosmosDB connection details")
  keys = cosmosdb_client.database_accounts.list_keys(RESOURCE_GROUP_NAME, database_account_name)
  connection_strings = cosmosdb_client.database_accounts.list_connection_strings(RESOURCE_GROUP_NAME, database_account_name).connection_strings

  return mongo, keys, connection_strings

def mk_git_url(site_name, pub_cred):
    return f"https://{pub_cred.publishing_user_name}:{pub_cred.publishing_password}@{site_name.lower()}.scm.azurewebsites.net/{site_name}.git"

def setup_azure(secrets):
  log.info("Setting up credentials")
  credentials = ServicePrincipalCredentials(
    client_id = secrets["azure"]["clientId"],
    secret = secrets["azure"]["secret"],
    tenant = secrets["azure"]["tenantId"],
  )

  log.info("Initializing Azure clients")
  subscription_id = secrets["azure"]["subscriptionId"]
  web_client = WebSiteManagementClient(credentials, subscription_id)
  cosmosdb_client = CosmosDB(credentials, subscription_id)
  return web_client, cosmosdb_client

def load_secrets():
  content = gpg.decrypt_file("deployment/secrets.json.gpg")
  return json.loads(content, encoding="utf-8")

if __name__ == "__main__":
  import asyncio
  loop = asyncio.get_event_loop()
  loop.run_until_complete(main())
