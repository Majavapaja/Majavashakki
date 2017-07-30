import {UserState} from "../entities/UserState";

export class UserStatesRepository {
    public static getInstance(): UserStatesRepository {
        return UserStatesRepository.instance;
    }
    private static instance: UserStatesRepository = new UserStatesRepository();
    private userStorage: {[id: string]: UserState} = {};

    private constructor() {
        if (UserStatesRepository.instance) {
            throw new Error("The UserStatesRepository is a singleton class and cannot be created!");
        }
        UserStatesRepository.instance = this;
    }

    public createUser(name: string, socket: SocketIO.Socket, initRoom: string) {
        // No need to check if exists already. Socket id's are unique and we don't care about duplicate usernames so far
        const newUser = new UserState(name, socket, initRoom);
        this.userStorage[socket.id] = newUser;
        // Tell client to ditch login page and render hello msg
        newUser.socket.emit("login", newUser.name);
    }

    public getState(id: string): UserState {
        return this.userStorage[id];
    }
}
