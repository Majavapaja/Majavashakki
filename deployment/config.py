class Azure:
  resource_group = "MajavaShakki"
  location = "northeurope"
  cosmosdb_name = f"{resource_group}mongo".lower()
  plan_name = f"{resource_group}Plan"
  site_name = f"{resource_group}Site"

class Mongo:
  database_name = "Majavashakki"
  collection_throughput = 500
  collections = ["gamemodels", "sessions", "users"]
