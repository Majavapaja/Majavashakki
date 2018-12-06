import {GameRoomsRepository} from "./logic/GameRoomsRepository";
import { User } from "./data/User";
import { SessionSocketMap } from "./Sockets";
import Game from "./entities/Game";
import { jsonAPI, NotFoundError, validate } from "./json"
import {
  CreateGameRequestType, CreateGameRequest,
} from "../common/types"
import { IGame } from "../common/GamePieces"

const roomRepo = GameRoomsRepository.getInstance();

export default {
  getAvailableGames: jsonAPI<string[]>(async req => {
    return await roomRepo.getAvailableGames(req.user._id);
  }),

  getMyGames: jsonAPI<string[]>(async req => {
    return await User.getMyGames(req.user._id); // TODO active rule for fetch
  }),

  getGame: jsonAPI<any>(async req => {
    const {session, params: {name}} = req
    const socket = SessionSocketMap[session.id];

    // TODO: Check the user has permissions to the game
    const game = await roomRepo.getGameRoom(name);
    if (!game) {
      throw new NotFoundError("Game not found")
    }
    socket.join(game.title)
    return Game.MapForDb(game)
  }),

  postGame: jsonAPI<IGame>(async req => {
    const body = validate<CreateGameRequest>(CreateGameRequestType, req.body)
    const socket = SessionSocketMap[req.session.id];
    const game = await roomRepo.createRoom(body.title)
    // TODO this broadcast is not supported anymore? Does other users see new games when created?? Check if this is "oopsies".
    socket.broadcast.to(this.MainRoom).emit("game-created", game.title);
    return game
  }),

  joinGame: jsonAPI<IGame>(async req => {
    const body = validate<CreateGameRequest>(CreateGameRequestType, req.body)
    const {session} = req
    const socket = SessionSocketMap[session.id];
    const userId = req.user._id
    const game = await roomRepo.joinRoom(socket, body.title, String(userId)) // TODO: Handle full room exception

    socket.leaveAll(); // TODO Move room data into some smart structure inside session when its needed (not yet)
    socket.join(body.title); // TODO we should use game ids
    return game
  }),
}
