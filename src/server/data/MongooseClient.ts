import * as mongoose from "mongoose";
import {IDisposable} from "../components/disposable";
import * as util from "util";

export class MongooseClient {

  public static InitMongoConnection() {
    mongoose.connect(this._url + "/" + this._dbName);
    if (this._isDev) {
      mongoose.set("debug", true);
    }

    this.initDefaultHooks();
  }

  public static getConnection(): mongoose.Connection {
    return mongoose.connection;
  }

  private static  _url: string = MongooseClient.getMongoServerUrl();
  private static _isDev: boolean = !!process.env.MajavaMongoPassword;
  private static _dbName: string = "Majavashakki";

  private static getMongoServerUrl(): string {
    const password = process.env.MajavaMongoPassword;
    const mongoConnectionStr = process.env.MajavashakkiMongoConnectionString;
    const url = this._isDev ? util.format(mongoConnectionStr, encodeURIComponent(password)) : "mongodb://localhost:27017";
    return url;
  }

  private static initDefaultHooks() {
    // https://medium.com/@vsvaibhav2016/best-practice-of-mongoose-connection-with-mongodb-c470608483f0
    mongoose.connection.on("connected", () => {
      console.log("Mongoose default connection is open to ", this._url);
    });

    mongoose.connection.on("error", (err) => {
      console.log(`Mongoose default connection has occured ${err} error`);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose default connection is disconnected");
    });

    process.on("SIGINT", () => {
      mongoose.connection.close(() => {
        console.log("Mongoose default connection is disconnected due to application termination");
        process.exit(0);
      });
    });
  }
}
