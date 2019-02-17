import json
import logging
import os

import gpg

FORMAT = '%(asctime)s %(levelname)s %(name)s %(message)s'
logging.basicConfig(level=logging.INFO, format=FORMAT)
log = logging.getLogger("deploy")

from copy import deepcopy
from azure.common.credentials import ServicePrincipalCredentials
from azure.mgmt.cosmosdb import CosmosDB
from azure.mgmt.cosmosdb.models import DatabaseAccountKind, DatabaseAccountCreateUpdateParameters, Location, DatabaseAccountOfferType
from azure.mgmt.web import WebSiteManagementClient
from azure.mgmt.web.models import AppServicePlan, SkuDescription, SkuName, Site, SiteConfig, ScmType, NameValuePair

from cosmosdb import configure_database_with_shared_throughput, configure_collections, delete_db

from config import Mongo, Azure

SKU_D1_SHARED = SkuDescription(name="D1", capacity=1, tier=SkuName.shared.value)
SKU_B1_BASIC = SkuDescription(name="B1", capacity=1, tier=SkuName.basic.value)

async def main():
  log.info("Loading secrets")
  secrets = load_secrets()
  web_client, cosmosdb_client = setup_azure(secrets)

  db, keys, connection_string = setup_cosmosdb(cosmosdb_client, Azure.cosmosdb_name)

  delete_db(Mongo.new_database_name, keys.primary_master_key, db.document_endpoint)
  delete_db(Mongo.database_name, keys.primary_master_key, db.document_endpoint)

  configure_database_with_shared_throughput(
    Mongo.database_name,
    keys.primary_master_key,
    db.document_endpoint
  )
  configure_collections(
    Mongo.database_name,
    Mongo.collections,
    keys.primary_master_key,
    db.document_endpoint
  )

  app_env = deepcopy(secrets["appEnvironment"])
  app_env["MajavashakkiMongoConnectionString"] = connection_string
  app_env["MajavaMongoPassword"] = keys.primary_master_key

  log.info("Creating App Service Plan")
  plan = web_client.app_service_plans.create_or_update(
    Azure.resource_group,
    Azure.plan_name,
    app_service_plan=AppServicePlan(
      Azure.location,
      Azure.plan_name,
      sku=SKU_B1_BASIC
    )
  ).result()

  log.info("Creating Web App")
  env_pairs = [NameValuePair(k, v) for k, v in app_env.items()]
  site = web_client.web_apps.create_or_update(
    Azure.resource_group,
    Azure.site_name,
    Site(
      location=Azure.location,
      site_config=SiteConfig(
        app_settings=env_pairs,
        scm_type=ScmType.local_git,
        web_sockets_enabled=True,
        always_on=True,
      )
    )
  ).result()

  log.info("Pushing code to App Service")
  pub_cred = web_client.web_apps.list_publishing_credentials(Azure.resource_group, Azure.site_name).result()
  git_url = mk_git_url(Azure.site_name, pub_cred)
  if "CI" in os.environ:
    await shell(
      "git", "-c", "user.name='Majavashakki Deployer'", "-c", "user.email='majavashakki-deployer@majavapaja.fi'",
      "commit", "--allow-empty", "-m", "Empty commit to force app service to redeploy"
    )
  await shell("git", "push", "--force", git_url, "HEAD:master")

  log.info("Done")

async def shell(*cmd):
  p = await asyncio.create_subprocess_exec(*cmd)
  await p.wait()
  if p.returncode != 0:
    raise RuntimeError(f"command exited with code {p.returncode}")

def setup_cosmosdb(cosmosdb_client, database_account_name):
  log.info("Creating CosmosDB")
  mongo = cosmosdb_client.database_accounts.create_or_update(
    Azure.resource_group,
    database_account_name,
    DatabaseAccountCreateUpdateParameters(
      location=Azure.location,
      locations=[Location(location_name=Azure.location)],
      kind=DatabaseAccountKind.mongo_db
    ),
    database_account_offer_type=DatabaseAccountOfferType.standard
  ).result()

  log.info("Fetching CosmosDB connection details")
  keys = cosmosdb_client.database_accounts.list_keys(Azure.resource_group, database_account_name)
  connection_strings = cosmosdb_client.database_accounts.list_connection_strings(Azure.resource_group, database_account_name).connection_strings
  connection_string = head(cs for cs in connection_strings if cs.description == "Primary MongoDB Connection String").connection_string
  return mongo, keys, connection_string

def head(xs):
  return next(iter(xs))

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
