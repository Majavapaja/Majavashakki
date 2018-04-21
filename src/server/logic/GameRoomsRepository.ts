import {Game} from "../entities/GameRoom";
import {UserState} from "../entities/UserState";
import { MongoClient, Collection } from "mongodb";
import * as _ from "lodash";

export class GameRoomsRepository {
    public static getInstance(): GameRoomsRepository {
        return GameRoomsRepository.instance;
    }
    private static instance: GameRoomsRepository = new GameRoomsRepository();
    public MainRoom = "Lobby";
    private roomStorage: {[name: string]: Game} = {};

    private constructor() {
        if (GameRoomsRepository.instance) {
            throw new Error("The GameRoomRepository is a singleton class and cannot be created!");
        }
        GameRoomsRepository.instance = this;
        this.getGames();
    }

    private async getGames() {

        console.log("Get games");
        
        // Connection URL
        const url = 'mongodb://localhost:27017';
        const dbName = 'majavashakki';
        console.log(url);

        // Use connect method to connect to the server
        const client = await MongoClient.connect(url);
        console.log("Connected successfully to server");
        
        const db = client.db(dbName);
        const collection: Collection<Game> = db.collection('games');
        const games = await collection.find().toArray();
        _.forEach(games, game => {
            this.roomStorage[game.title] = game;
        });
        
        client.close();

    }

    private async saveGame(game: Game) {

        console.log("Save game");
        
        // Connection URL
        const url = 'mongodb://localhost:27017';
        const dbName = 'majavashakki';
        console.log(url);

        // Use connect method to connect to the server
        const client = await MongoClient.connect(url);
        console.log("Connected successfully to server");
        
        const db = client.db(dbName);
        const collection: Collection<Game> = db.collection('games');
 
        collection.insertOne({ title: game.title, gameState: game.gameState, players: [] });

    }

    /**
     * Tries to create new game if room name is available and moves current user's socket accordingly.
     * @fires game-joined - tells user socket that new room has been joined
     * @fires game-created - tells lobby that new room is available
     * @fires game-exists - tells user socket if room with given title already exists
     */
    public createRoom(title: string, creator: UserState): void {
        if (this.roomStorage[title]) {
            creator.socket.emit("lobby-error", {error: `Room ${title} already exists`});
        } else {
            const newRoom = new Game(title, creator);
            this.roomStorage[title] = newRoom;
            this.saveGame(newRoom);
            creator.joinSocket(title);
            creator.socket.emit("game-joined");
            creator.socket.broadcast.to(this.MainRoom).emit("game-created", newRoom.title);
        }
    }

    /**
     * Adds the player to game and socket room if there's still empty slot. Removes user from currently active room.
     * @fires game-joined - tells user socket that new room has been joined
     * @fires game-full - tells lobby that room is full and not available anymore
     * @fires game-notAvailable - tells user socket if room does not exist or is full
     */
    public joinRoom(title: string, user: UserState): void {
        // TODO check if main room
        const room = this.roomStorage[title];
        if (!room) {
            user.socket.emit("lobby-error", {error: `Room ${title} not found`});
        } else if (room.players.length >= 2) {
            user.socket.emit("lobby-error", {error: `Room ${title} is full`});
        } else {
            room.players.push(user);
            user.joinSocket(title);
            user.socket.emit("game-joined");
            user.socket.broadcast.to(this.MainRoom).emit("game-full");
        }
    }

    public getAvailableGames(): string[] {
        const hasSpace = (title) => this.roomStorage[title].players.length < 2;
        return Object.keys(this.roomStorage).filter(hasSpace);
    }

    public getGameRoom(title: string): Game {
        return this.roomStorage[title];
    }
}
