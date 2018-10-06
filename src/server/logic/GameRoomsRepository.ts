import {Game} from "../entities/GameRoom";
import {GameModel, IGameDocument} from "../data/GameModel";
import * as _ from "lodash";

export class GameRoomsRepository {
    public static getInstance(): GameRoomsRepository {
        return GameRoomsRepository.instance;
    }
    private static instance: GameRoomsRepository = new GameRoomsRepository();
    public MainRoom = "Lobby";
    // private mongoClient: GameMongoClient = new GameMongoClient();

    private constructor() {
        if (GameRoomsRepository.instance) {
            throw new Error("The GameRoomRepository is a singleton class and cannot be created!");
        }
        GameRoomsRepository.instance = this;
    }

    public async saveGame(game: Game) {
        const state: Majavashakki.IGame =
            { title: game.title, board: game.board, playerIdWhite: game.playerIdWhite, playerIdBlack: game.playerIdBlack };
        GameModel.save(state)
    }

    public async createRoom(title: string): Promise<Majavashakki.IGame> {
        return GameModel.findOrCreate(title);
        // const games = await this.mongoClient.getGames();
        // if (games[title]) {
        //     throw new Error("Peli on jo olemassa, tästä administraatio tekee joskus hienomman error response käsittelyn")
        // } else {
        //     const newRoom = new Game(title);
        //     await this.mongoClient.saveGame(newRoom);
        //     return newRoom;
        // }
    }

    public async joinRoom(title: string, userId: string): Promise<Game> {
        const doc = await GameModel.findByTitle(title);
        const game = Game.MapFromDb(doc);
        if (game.isFull()) throw new Error("Paskaa ei voi myyä, loppuunmyyty eli täysi");

        game.addPlayer(userId);
        await GameModel.save(game);
        return game;
    }

    public async getAvailableGames(): Promise<string[]> {
        // TODO ditch mongo client, use mongoose. Filter query straight for db.
        const games = await GameModel.getAvailableGames();
        return games.map((item: IGameDocument) => { return item.title });
    }

    public async getGameRoom(title: string): Promise<Game> {
        console.log("Get game '" + title + "'");
        const doc = await GameModel.findByTitle(title);
        return Game.MapFromDb(doc);
    }
}
