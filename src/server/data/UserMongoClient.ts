import { MongoClient, Collection } from "mongodb";
import {Game} from "../entities/GameRoom";
import {UserState} from "../entities/UserState";
import * as _ from "lodash";
import * as util from "util";

export class GameMongoClient {

private async getClient() {
    const password = process.env.MajavaMongoPassword;
    const mongoConnectionStr = process.env.MajavashakkiMongoConnectionString;
    const url = !!password ? util.format(mongoConnectionStr, encodeURIComponent(password)) : "mongodb://localhost:27017";
    console.log("Connecting to: " + url);

    // Use connect method to connect to the server
    const client = await MongoClient.connect(url);
    console.log("Connected successfully to server");
    return client;
  }
}
