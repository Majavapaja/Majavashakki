import { Server, Socket } from "socket.io"
import { IGameDocument } from "./models/Game"
import { getSession } from "./session"
import { removeFalsy } from "./util"
import { DefaultEventsMap } from "socket.io/dist/typed-events"

export const SocketServer: Server<DefaultEventsMap, DefaultEventsMap> = new Server()
export const SessionSocketMap = {}
const MainRoom: string = "Lobby"

// TODO middleware or some other solution to handle connection setup for authed users vs non-auth user
export function initSockets(): void {
  SocketServer.addListener("connection", async (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => {
    const session = getSession(socket.handshake)
    SessionSocketMap[session.id] = socket

    // Join user to Socket.io rooms for their own games
    // TODO: Fail if not logged in?
    const userId = session.passport.user
    await socket.join([MainRoom, `user:${userId}`])
  })
}

export function notifyGame(doc: IGameDocument, message: string, data: any) {
  console.log(`Sending message to game: ${doc.id} ${message}`)

  const userIds = removeFalsy([doc.playerIdBlack, doc.playerIdWhite])
  userIds.forEach(userId => SocketServer.to(`user:${userId}`).emit(message, data))
}

export function notifyUser(userId: string, message: string, data: any) {
  console.log(`Sending message to user: ${userId} ${message} ${JSON.stringify(data, null, 2)}`)
  SocketServer.to(`user:${userId}`).emit(message, data)
}

export function notifyLobby(message: string, data: any) {
  console.log("Sending message to lobby")
  SocketServer.to(MainRoom).emit(message, data)
}
