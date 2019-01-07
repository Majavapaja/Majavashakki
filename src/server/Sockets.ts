import {GameRoomsRepository} from "./logic/GameRoomsRepository";
import sio from "socket.io";
import {getSession} from "./session";
import {GameModel} from "./data/GameModel";
import Game from "./entities/Game";
import * as Majavashakki from "../common/GamePieces"
import {User} from "./data/User"

const roomRepo = GameRoomsRepository.getInstance()
export const SocketServer: SocketIO.Server = sio({transports: ["websocket"]});
export const SessionSocketMap = {};

// TODO better init / export chain
export function initSockets() {
  SocketServer.on("connection", async (socket: SocketIO.Socket) => {
    const session = getSession(socket.handshake)
    SessionSocketMap[session.id] = socket

    // Join user to Socket.io rooms for their own games
    // TODO: Fail if not logged in?
    const userId = session.passport.user
    const titles = await User.getMyGames(userId)
    const games = await GameModel.getGamesWithTitles(titles)
    games.forEach(game => socket.join(`game:${game.id}`))
    socket.join(`user:${userId}`)
    socket.join(roomRepo.MainRoom)
  });
}

export function notifyGame(gameId: string, message: string, data: any) {
  console.log(`Sending message to game: ${gameId}`)
  SocketServer.to(`game:${gameId}`).emit(message, data)
}
