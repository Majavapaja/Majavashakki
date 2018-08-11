import { MongoClient, Collection } from "mongodb";
import {IDisposableAsync} from "../components/disposable";
import * as util from "util";

const password = process.env.MajavaMongoPassword;
const mongoConnectionStr = process.env.MajavashakkiMongoConnectionString;
const url = !!password ? util.format(mongoConnectionStr, encodeURIComponent(password)) : "mongodb://localhost:27017";
const clientPromise = MongoClient.connect(url)
  .then(client => {
    console.log("Connected to Mongo url", url)
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
