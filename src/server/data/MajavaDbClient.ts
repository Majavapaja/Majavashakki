import { MongoClient, Collection } from "mongodb";
import {IDisposableAsync} from "../components/disposable";
import * as util from "util";

export class MajavaDbClient implements IDisposableAsync {
  private client: MongoClient;
  private readonly dbName = "majavashakki";

  public async init() {
    const password = process.env.MajavaMongoPassword;
    const mongoConnectionStr = process.env.MajavashakkiMongoConnectionString;
    const url = !!password ? util.format(mongoConnectionStr, encodeURIComponent(password)) : "mongodb://localhost:27017";
    console.log("Connecting to: " + url);
    this.client = await MongoClient.connect(url);
    console.log("Connected successfully to server");
  }

  public getCollection<T>(collection: string): Collection<T> {
    const db = this.client.db(this.dbName);
    return db.collection(collection) as Collection<T>;
  }

  public dispose() {
    this.client.close();
  }
}
