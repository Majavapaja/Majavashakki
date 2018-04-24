import {usingAsync} from "../components/disposable";
import {MajavaDbClient} from "./MajavaDbClient";
import {Game} from "../entities/GameRoom";
import {UserState} from "../entities/UserState";
import * as _ from "lodash";
import * as util from "util";

export class GameMongoClient {

  public async getGames() {
    console.log("Get games");
    const roomStorage: {[name: string]: Game} = {};
    await usingAsync(new MajavaDbClient(), async (mongo) => {
      const collection = mongo.getCollection<Game>("games");
      const games = await collection.find().toArray();

      _.forEach(games, game => {
        console.log("Adding game '" + game.title + "'");
        const newGame = new Game(game.title);
        newGame.gameState.board.pieces = game.gameState.board.pieces;
        roomStorage[game.title] = newGame;
      });
    });

    return roomStorage;
  }

  public async saveGame(game: Game) {
    console.log("Saving game " + game.title);
    await usingAsync(new MajavaDbClient(), async (mongo) => {
      const collection = mongo.getCollection<Game>("games");
      const existing = await collection.findOne({ title: game.title });
      const savedState = { title: game.title, gameState: game.gameState, players: [] };
      if (existing) {
        console.log("Updated game state: " + existing.title);
        await collection.replaceOne({ title: game.title }, savedState);
      } else {
        console.log("Created game state");
        const result = await collection.insertOne(savedState);
        console.log("Inserted: " + result.insertedId);
      }
    });
  }
}
