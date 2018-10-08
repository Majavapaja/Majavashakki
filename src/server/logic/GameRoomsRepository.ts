import {Game} from "../entities/GameRoom";
import {GameModel, IGameDocument} from "../data/GameModel";
import * as _ from "lodash";

export class GameRoomsRepository {
    public static getInstance(): GameRoomsRepository {
        return GameRoomsRepository.instance;
    }
    private static instance: GameRoomsRepository = new GameRoomsRepository();
    public MainRoom = "Lobby";

    private constructor() {
        if (GameRoomsRepository.instance) {
            throw new Error("The GameRoomRepository is a singleton class and cannot be created!");
        }
        GameRoomsRepository.instance = this;
    }

    public async saveGame(game: Game) {
        const state: Majavashakki.IGame = Game.MapForDb(game);
        await GameModel.save(state)
    }

    public async createRoom(title: string): Promise<Majavashakki.IGame> {
        return await GameModel.findOrCreate(title);
    }

    public async joinRoom(title: string, userId: string): Promise<Game> {
        console.log("joining room : " + title)
        const doc = await GameModel.findByTitle(title);
        const game = Game.MapFromDb(doc);
        if (game.isFull()) throw new Error("Paskaa ei voi myyä, loppuunmyyty eli täysi");

        game.addPlayer(userId);
        await GameModel.save(Game.MapForDb(game));
        return game;
    }

    public async getAvailableGames(): Promise<string[]> {
        const games = await GameModel.getAvailableGames();
        return games.map((item: IGameDocument) => item.title);
    }

    public async getGameRoom(title: string): Promise<Game> {
        console.log("Get game '" + title + "'");
        const doc = await GameModel.findByTitle(title);
        return Game.MapFromDb(doc);
    }
}
