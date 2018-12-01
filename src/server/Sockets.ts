import {GameRoomsRepository} from "./logic/GameRoomsRepository";
import sio from "socket.io";
import {getSession} from "./session";
import * as Majavashakki from "../common/GamePieces"

const roomRepo = GameRoomsRepository.getInstance();
export const SocketServer: SocketIO.Server = sio({transports: ["websocket"]});
export const SessionSocketMap = {};

// TODO better init / export chain
export function initSockets() {
  SocketServer.on("connection", (socket: SocketIO.Socket) => {
    const session = getSession(socket.handshake);
    SessionSocketMap[session.id] = socket;

    // TODO: Ensure that user is logged in before allowing socket connections
    // HACK: Passport, sessions and Socket.io do not play too well together so we have to
    // touch Passport internals  which might break if passport is updated. But whatever.
    if (!session.passport) return
    const userId = session.passport.user;

    socket.on("move", async (data) => {
      // TODO: Check the player is allowed to make moves in the game
      const game = await roomRepo.getGameRoom(data.gameName);

      const move = game.move(userId, data.from, data.dest);

      if (move.status === Majavashakki.MoveStatus.Error) return socket.emit("move_result", move);

      game.changeTurn()
      await roomRepo.saveGame(game);
      return socket.to(game.title).emit("move_result", move);
    });
  });
}