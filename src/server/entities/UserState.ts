/**
 * Used as top-level state holder for now
 */
export class UserState {
    public name: string;
    public currentRoom: string;
    public socket: SocketIO.Socket;

    constructor(name: string, socket: SocketIO.Socket, initRoom: string) {
        this.name = name;
        this.socket = socket;
        this.currentRoom = initRoom;
        socket.join(initRoom);
    }

    /**
     * Joins given socket and leaves currently active one.
     */
    public joinSocket(title: string) {
        this.socket.leave(this.currentRoom);
        this.currentRoom = title;
        this.socket.join(title);
    }
}
