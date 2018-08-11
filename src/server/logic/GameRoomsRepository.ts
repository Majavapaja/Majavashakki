import {Game} from "../entities/GameRoom";
import {UserState} from "../entities/UserState";
import {GameMongoClient} from "../data/GameMongoClient";
import * as _ from "lodash";

export class GameRoomsRepository {
    public static getInstance(): GameRoomsRepository {
        return GameRoomsRepository.instance;
    }
    private static instance: GameRoomsRepository = new GameRoomsRepository();
    public MainRoom = "Lobby";
    private mongoClient: GameMongoClient = new GameMongoClient();

    private constructor() {
        if (GameRoomsRepository.instance) {
            throw new Error("The GameRoomRepository is a singleton class and cannot be created!");
        }
        GameRoomsRepository.instance = this;
    }

    public async saveGame(game: Game) {
        await this.mongoClient.saveGame(game);
    }

    public async createRoom(title: string): Promise<Game> {
        const games = await this.mongoClient.getGames();
        if (games[title]) {
            throw new Error("Peli on jo olemassa, tästä administraatio tekee joskus hienomman error response käsittelyn")
        } else {
            const newRoom = new Game(title);
            await this.mongoClient.saveGame(newRoom);
            return newRoom;
        }
    }

    public async joinRoom(gameName: string, userId: string): Promise<Game> {
        const games = await this.mongoClient.getGames();
        console.log("PEWIT " + JSON.stringify(games));
        console.log("gameName: " + gameName)
        console.log(Object.keys(games));
        // TODO check if main room
        const game = games[gameName];
        if (!game) {
            throw new Error("Paskan möivät - peliä ei löywy")
        } else if (game.isFull()) {
            throw new Error("Paskaa ei voi myyä, loppuunmyyty eli täysi")
        } else {
            game.addPlayer(userId);
            await this.mongoClient.saveGame(game);
        }
        return game;
    }

    public async getAvailableGames(): Promise<string[]> {
        // TODO ditch mongo client, use mongoose. Filter query straight for db.
        const games = await this.mongoClient.getGames();
        const hasSpace = (title) => !games[title].isFull();
        return Object.keys(games).filter(hasSpace);
    }

    public async getGameRoom(title: string): Promise<Game> {
        console.log("Get game '" + title + "'");
        const games = await this.mongoClient.getGames();
        return games[title];
    }
}
