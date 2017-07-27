import {UserState} from "../entities/UserState";

export class UserStatesRepository {
    private static _instance: UserStatesRepository = new UserStatesRepository();
    private _userStorage: {[id: string]: UserState} = {};

    private constructor() {
        if(UserStatesRepository._instance) {
            throw new Error("The UserStatesRepository is a singleton class and cannot be created!");
        }
        UserStatesRepository._instance = this;
    };

    public static getInstance() : UserStatesRepository {
        return UserStatesRepository._instance;
    }

    createUser(name: string, socket: SocketIO.Socket, initRoom: string) {
        // No need to check if exists already. Socket id's are unique and we don't care about duplicate usernames so far
        var newUser = new UserState(name, socket, initRoom);
        this._userStorage[socket.id] = newUser;
        // Tell client to ditch login page and render hello msg
        newUser.socket.emit('login', newUser.name);
    }

    getState(id:string): UserState {
        return this._userStorage[id];
    }
}