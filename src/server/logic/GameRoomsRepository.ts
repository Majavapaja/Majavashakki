import Game from "../entities/Game";
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
        await GameModel.save(game)
    }

    // TODO make sense into different game interfaces (one too many? move some of the Game class logic into IGameDocument?)
    // also don't pass around sockets, too late too lazy
    public async joinRoom(socket: any, title: string, userId: string): Promise<Game> {
        console.log("joining room : " + title)
        const doc = await GameModel.findByTitle(title);
        if (!doc) throw new Error("Peliä ei löywy!");
        const game = Game.MapFromDb(doc.toObject());
        console.log("1", game)
        if (game.containsUser(userId)) return game;

        if (game.isFull()) throw new Error(`User '${userId}' is trying to join game '${title}' which is already full!`);

        await User.addGame(userId, game);
        game.addPlayer(userId);
        const saved = await GameModel.save(game);
        return Game.MapFromDb(saved.toObject())
    }

    public async getGameRoom(title: string): Promise<Game> {
        console.log("Get game '" + title + "'");
        const doc = await GameModel.findByTitle(title);
        return Game.MapFromDb(doc);
    }
}
