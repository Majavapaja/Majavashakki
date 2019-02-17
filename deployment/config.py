class Azure:
  resource_group = "MajavaShakki"
  location = "northeurope"
  cosmosdb_name = f"{resource_group}mongo".lower()
  plan_name = f"{resource_group}Plan"
  site_name = f"{resource_group}Site"

class Mongo:
  database_name = "Majavashakki"
  collection_throughput = 500
  system_indexes_collection = "undefined" # https://github.com/Automattic/mongoose/issues/6989
  collections = ["gamemodels", "sessions", "users", system_indexes_collection]
