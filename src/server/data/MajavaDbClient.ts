import { MongoClient, Collection } from "mongodb";
import {IDisposableAsync} from "../components/disposable";
import * as util from "util";

let connectionString = "mongodb://localhost:27017"
if (process.env.MajavashakkiMongoConnectionString) {
  connectionString = process.env.MajavashakkiMongoConnectionString
    .replace(process.env.MajavaMongoPassword, encodeURIComponent(process.env.MajavaMongoPassword))
}

console.log("Connectiong to Mongo:", connectionString)
const clientPromise = MongoClient.connect(connectionString)
  .then(client => {
    console.log("Connected to Mongo url", connectionString)
    return client
  })

export class MajavaDbClient implements IDisposableAsync {
  public static readonly UserCollection: string = "ApplicationUsers";
  private client: MongoClient;
  private readonly dbName = "Majavashakki";

  public async init() {
    this.client = await clientPromise
  }

  public getCollection<T>(collection: string): Collection<T> {
    const db = this.client.db(this.dbName);
    return db.collection(collection) as Collection<T>;
  }

  public dispose() {
  }
}
