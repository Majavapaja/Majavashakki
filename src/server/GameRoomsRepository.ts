import {Game} from "./entities/GameRoom";
import {UserState} from "./entities/UserState";

export class GameRoomsRepository {
    private static _instance: GameRoomsRepository = new GameRoomsRepository();
    private _roomStorage: {[name: string]: Game} = {}; // Using simple object to store gamerooms, we provide easy way to check for existing rooms.
    public MainRoom = "Lobby";

    private constructor(){
        if(GameRoomsRepository._instance) {
            throw new Error("The GameRoomRepository is a singleton class and cannot be created!");
        }
        GameRoomsRepository._instance = this;
    };

    public static getInstance(): GameRoomsRepository {
        return GameRoomsRepository._instance;
    }

    /**
     * Tries to create new game if room name is available and moves current user's socket accordingly.
     * @fires game-joined - tells user socket that new room has been joined
     * @fires game-created - tells lobby that new room is available
     * @fires game-exists - tells user socket if room with given title already exists
     */
    public createRoom(title: string, creator: UserState): void {
        if(this._roomStorage[title]) {
            creator.socket.emit("game-exists"); // TODO listener
        }
        else {
            let newRoom = new Game(title, creator);
            this._roomStorage[title] = newRoom;
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
        let room = this._roomStorage[title];
        if(room && room.players.length < 2) {
            room.players.push(user);
            user.joinSocket(title);
            user.socket.emit("game-joined");
            user.socket.broadcast.to(this.MainRoom).emit("game-full");
        }
        else {
            user.socket.emit("game-notAvailable"); // TODO listener
        }
    }

    public getAvailableGames(): Array<string> {
        return Object.keys(this._roomStorage);
    }

    public getGameRoom(title: string): Game {
        return this._roomStorage[title];
    }
}