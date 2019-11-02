import json
import logging
import os

import gpg

FORMAT = '%(asctime)s %(levelname)s %(name)s %(message)s'
logging.basicConfig(level=logging.INFO, format=FORMAT)
logging.getLogger("adal-python").setLevel(logging.WARNING)
log = logging.getLogger("deploy")

from azure.common.credentials import ServicePrincipalCredentials
from azure.mgmt.cosmosdb import CosmosDB
from azure.mgmt.cosmosdb.models import DatabaseAccountKind, DatabaseAccountCreateUpdateParameters, Location, DatabaseAccountOfferType

from cosmosdb import configure_collections

from config import Mongo, Azure

async def main():
  log.info("Loading secrets")
  secrets = load_secrets()
  cosmosdb_client = setup_azure(secrets)

  db, keys, connection_string = setup_cosmosdb(cosmosdb_client, Azure.cosmosdb_name)

  configure_collections(
    Mongo.database_name,
    Mongo.collections,
    keys.primary_master_key,
    db.document_endpoint
  )

  log.info("Done")

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

def setup_azure(secrets):
  log.info("Setting up credentials")
  credentials = ServicePrincipalCredentials(
    client_id = secrets["azure"]["clientId"],
    secret = secrets["azure"]["secret"],
    tenant = secrets["azure"]["tenantId"],
  )

  log.info("Initializing Azure clients")
  subscription_id = secrets["azure"]["subscriptionId"]
  cosmosdb_client = CosmosDB(credentials, subscription_id)
  return cosmosdb_client

def load_secrets():
  content = gpg.decrypt_file("deployment/secrets.json.gpg")
  return json.loads(content, encoding="utf-8")

if __name__ == "__main__":
  import asyncio
  loop = asyncio.get_event_loop()
  loop.run_until_complete(main())
