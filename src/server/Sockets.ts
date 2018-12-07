import {GameRoomsRepository} from "./logic/GameRoomsRepository";
import sio from "socket.io";
import {getSession} from "./session";
import {GameModel, IGameDocument} from "./data/GameModel";
import Game from "./entities/Game";
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

    // TODO typings for socket data
    socket.on("move", async (data) => {
      // TODO: Check the player is allowed to make moves in the game
      const doc = await GameModel.findGame(data.gameId);
      const [game, move] = applyMove(doc, userId, data)

      if (move.status === Majavashakki.MoveStatus.Error) {
        socket.emit("move_result", move)
        return
      }

      await GameModel.save(game)
      return socket.to(`game:${doc.id}`).emit("move_result", move);
    });
  });
}

// Wraps game document from database into Game class, tries to apply the given
// move and returns the new game state and the result of the move
function applyMove(doc: IGameDocument, userId: string, data: any): [Game, Majavashakki.IMoveResponse] {
  const game = Game.MapFromDb(doc)
  const moveResult = game.move(data.from, data.dest, userId)
  if (moveResult.status !== Majavashakki.MoveStatus.Error) {
    game.changeTurn()
  }
  return [game, moveResult]
}
