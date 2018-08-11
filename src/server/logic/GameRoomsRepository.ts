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

    /**
     * Tries to create new game if room name is available and moves current user's socket accordingly.
     * @fires game-joined - tells user socket that new room has been joined
     * @fires game-created - tells lobby that new room is available
     * @fires game-exists - tells user socket if room with given title already exists
     */
    public async createRoom(title: string): Promise<Game> {
        const games = await this.mongoClient.getGames();
        if (games[title]) {
            return null;
        } else {
            const newRoom = new Game(title);
            // games[title] = newRoom;
            await this.mongoClient.saveGame(newRoom);
            // creator.joinSocket(title);
            // creator.socket.emit("game-joined");
            // creator.socket.broadcast.to(this.MainRoom).emit("game-created", newRoom.title);
            return newRoom;
        }
    }

    /**
     * Adds the player to game and socket room if there's still empty slot. Removes user from currently active room.
     * @fires game-joined - tells user socket that new room has been joined
     * @fires game-full - tells lobby that room is full and not available anymore
     * @fires game-notAvailable - tells user socket if room does not exist or is full
     */
    public async joinRoom(title: string, user: UserState): Promise<Game> {
        const games = await this.mongoClient.getGames();
        // TODO check if main room
        const room = games[title];
        if (!room) {
            user.socket.emit("lobby-error", {error: `Room ${title} not found`});
        } else if (room.players.length >= 2) {
            user.socket.emit("lobby-error", {error: `Room ${title} is full`});
        } else {
            room.players.push(user);
            user.joinSocket(title);
            user.socket.emit("game-joined", room.gameState.board.pieces);
            user.socket.broadcast.to(this.MainRoom).emit("game-full");
        }
        return room;
    }

    public async getAvailableGames(): Promise<string[]> {
        // TODO ditch mongo client, use mongoose. Filter query straight for db.
        const games = await this.mongoClient.getGames();
        console.log("Games: " + JSON.stringify(games))
        const hasSpace = (title) => games[title].players.length < 2;
        return Object.keys(games).filter(hasSpace);
    }

    public async getGameRoom(title: string): Promise<Game> {
        console.log("Get game '" + title + "'");
        const games = await this.mongoClient.getGames();
        return games[title];
    }
}
