import { MongoClient, Collection } from "mongodb";
import {Game} from "../entities/GameRoom";
import {UserState} from "../entities/UserState";
import * as _ from "lodash";

export class GameMongoClient {

    private async getClient() {

        // Connection URL
        const password = process.env["MajavaMongoPassword"];
        let url = "mongodb://localhost:27017";
        if (password) {
            url = "mongodb://majavashakki:" + encodeURIComponent(password) + "@majavashakki.documents.azure.com:10255/?ssl=true&replicaSet=globaldb";
        }
        console.log("Connecting to: " + url);

        // Use connect method to connect to the server
        const client = await MongoClient.connect(url);
        console.log("Connected successfully to server");
        return client;
                
    }

    private getCollection(client: MongoClient) {
        const dbName = 'majavashakki';
        const db = client.db(dbName);
        return db.collection('games') as Collection<Game>;
    }

    public async getGames() {

        console.log("Get games");
        const client = await this.getClient();
        const collection = this.getCollection(client);
        
        const games = await collection.find().toArray();
        const roomStorage: {[name: string]: Game} = {};
        _.forEach(games, game => {
            console.log("Adding game '" + game.title + "'");
            const newGame = new Game(game.title);
            newGame.gameState.board.pieces = game.gameState.board.pieces;
            roomStorage[game.title] = newGame;
        });
        
        await client.close();
        return roomStorage;

    }
    
    public async saveGame(game: Game) {

        console.log("Saving game " + game.title);
        
        const client = await this.getClient();
        const collection = this.getCollection(client);
 
        const existing = collection.find({ title: game.title });
        const savedState = { title: game.title, gameState: game.gameState, players: [] };
        if (existing) {
            console.log("Updated game state");
            collection.replaceOne({ title: game.title }, savedState);
        } else {
            console.log("Created game state");
            collection.insertOne(savedState);
        }

        await client.close();
        
    }

}