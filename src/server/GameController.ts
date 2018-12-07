import {GameRoomsRepository} from "./logic/GameRoomsRepository";
import { User } from "./data/User";
import { GameModel, IGameDocument } from "./data/GameModel";
import { SessionSocketMap } from "./Sockets";
import Game from "./entities/Game";
import { jsonAPI, NotFoundError, validate } from "./json"
import {
  CreateGameRequestType, CreateGameRequest,
} from "../common/types"
import { IGame } from "../common/GamePieces"
import { ApiGameInfo } from "../common/types"

const roomRepo = GameRoomsRepository.getInstance();

export default {
  getAvailableGames: jsonAPI<ApiGameInfo[]>(async req => {
    const games = await GameModel.getAvailableGames(req.user._id);
    return games.map(formatGamesListResponse)
  }),

  getMyGames: jsonAPI<ApiGameInfo[]>(async req => {
    const titles = await User.getMyGames(req.user._id); // TODO active rule for fetch
    const games = await GameModel.getGamesWithTitles(titles)
    return games.map(formatGamesListResponse)
  }),

  getGame: jsonAPI<any>(async req => {
    const {session, params: {name}} = req
    const socket = SessionSocketMap[session.id];

    const game = await GameModel.findByIdOrTitle(name)
    if (!game) throw new NotFoundError(`Game '${name}' not found`)

    if (!isPartOfTheGame(game, req.user.id)) {
      console.log(`Player attempted to look at a game he is not part of (userId: ${req.user.id}, gameId: ${game.id})`)
      throw new NotFoundError(`Game '${name}' not found`)
    }

    socket.join(game.title)
    return gameDocumentToApiResult(game)
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

function isPartOfTheGame(game: IGameDocument, userId: string): boolean {
  return [game.playerIdBlack, game.playerIdWhite].indexOf(userId) !== -1
}

function formatGamesListResponse(game: IGameDocument): ApiGameInfo {
  const {_id, title} = game
  return {id: _id, title}
}

// XXX: This is nearly identical with Game.MapForDb
function gameDocumentToApiResult(game: IGameDocument): any {
  return {
    id: game._id,
    title: game.title,
    board: game.board,
    currentTurn: game.currentTurn,
    playerIdBlack: game.playerIdBlack,
    playerIdWhite: game.playerIdWhite,
  }
}
