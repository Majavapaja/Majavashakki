import {Game} from "../entities/GameRoom";
import {User} from "../data/User";
import {GameModel} from "../data/GameModel";
import * as Majavashakki from "../../common/GamePieces"

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

    public async createRoom(title: string): Promise<global.IGameRef> {
        const doc = await GameModel.findOrCreate(title);
        return doc.denormalize();
    }

    // TODO make sense into different game interfaces (one too many? move some of the Game class logic into IGameDocument?)
    // also don't pass around sockets, too late too lazy
    public async joinRoom(socket: any, title: string, userId: string): Promise<global.IGameRef> {
        console.log("joining room : " + title)
        let doc = await GameModel.findByTitle(title);
        const game = Game.MapFromDb(doc);
        if (game.containsUser(userId)) return doc.denormalize();

        if (game.isFull()) throw new Error(`User '${userId}' is trying to join game '${title}' which is already full!`);

        await User.addGame(userId, doc);
        game.addPlayer(userId);
        doc = await GameModel.save(Game.MapForDb(game));
        return doc.denormalize();
    }

    public async getAvailableGames(userId: string): Promise<global.IGameRef[]> {
        return await GameModel.getAvailableGames(userId);
    }

    public async getGameRoom(title: string): Promise<Game> {
        console.log("Get game '" + title + "'");
        const doc = await GameModel.findByTitle(title);
        return Game.MapFromDb(doc);
    }
}
