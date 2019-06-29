import sio from "socket.io";
import {getSession} from "./session";

export const SocketServer: SocketIO.Server = sio({transports: ["websocket"]});
export const SessionSocketMap = {};
const MainRoom: string = "Lobby";

// TODO middleware or some other solution to handle connection setup for authed users vs non-auth user
export function initSockets() {
  SocketServer.on("connection", async (socket: SocketIO.Socket) => {
    const session = getSession(socket.handshake)
    SessionSocketMap[session.id] = socket

    // Join user to Socket.io rooms for their own games
    // TODO: Fail if not logged in?
    const userId = session.passport.user
    socket.join(`user:${userId}`)
    socket.join(MainRoom)
  });
}

export function notifyGame(gameId: string, message: string, data: any) {
  console.log(`Sending message to game: ${gameId} ${message} ${JSON.stringify(data, null, 2)}`)
  SocketServer.to(`game:${gameId}`).emit(message, data)
}

export function notifyLobby(message: string, data: any) {
  console.log("Sending message to lobby")
  SocketServer.to(MainRoom).emit(message, data);
}
