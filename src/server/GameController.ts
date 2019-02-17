import {GameRoomsRepository} from "./logic/GameRoomsRepository";
import { User } from "./data/User";
import { GameModel, IGameDocument } from "./data/GameModel";
import { SessionSocketMap, notifyGame } from "./Sockets";
import Game from "./entities/Game";
import { jsonAPI, NotFoundError, validate } from "./json"
import {
  CreateGameRequestType, CreateGameRequest,
  MoveRequest, MoveRequestType,
} from "../common/types"
import * as Majavashakki from "../common/GamePieces"
import { IMoveResponse } from "../common/GamePieces"
import { IGame } from "../common/GamePieces"
import BoardBase from "../common/BoardBase"
import { isCheck, isCheckMate } from "../common/logic/Checkmate"
import { ApiGameInfo } from "../common/types"

const roomRepo = GameRoomsRepository.getInstance();

export default {
  getAvailableGames: jsonAPI<ApiGameInfo[]>(async req => {
    const games = await GameModel.getAvailableGames(req.user._id);
    return games.map(formatGamesListResponse)
  }),

  getMyGames: jsonAPI<ApiGameInfo[]>(async req => {
    const gameIds = await User.getMyGames(req.user._id); // TODO active rule for fetch
    const games = await GameModel.getGames(gameIds)
    return games.map(formatGamesListResponse)
  }),

  getGame: jsonAPI<any>(async req => {
    const {session, params: {id}} = req
    const socket = SessionSocketMap[session.id];

    const game = await GameModel.findGame(id)
    if (!game) throw new NotFoundError(`Game '${id}' not found`)

    if (!isPartOfTheGame(game, req.user.id)) {
      console.log(`Player attempted to look at a game he is not part of (userId: ${req.user.id}, gameId: ${game.id})`)
      throw new NotFoundError(`Game '${id}' not found`)
    }

    if (socket) {
      socket.join(`game:${id}`)
    }
    return gameDocumentToApiResult(game)
  }),

  postGame: jsonAPI<IGame>(async req => {
    const body = validate<CreateGameRequest>(CreateGameRequestType, req.body)
    console.log(`Creating a new game '${body.title}'`);

    const game = await GameModel.findOrCreate(body.title)
    return gameDocumentToApiResult(game)
  }),

  joinGame: jsonAPI<IGame>(async req => {
    const {session, params: {id}} = req
    const socket = SessionSocketMap[session.id];
    const userId = req.user._id

    let doc = await GameModel.findGame(id);
    if (!doc) throw new NotFoundError(`Game '${id}' not found`)

    console.log(`User '${req.user.email}' is joining game '${doc.title}'`)

    doc = await roomRepo.joinRoom(doc, socket, String(userId)) // TODO: Handle full room exception

    if (socket) {
      // Socket connection might not always be active e.g. from network error or during tests.
      // TODO: How does the player join the socket.io "room" of the game after reconnecting?
      socket.join(`game:${doc.id}`)
    }
    return gameDocumentToApiResult(doc)
  }),

  makeMove: jsonAPI<IMoveResponse>(async req => {
    const {session, params: {id}} = req
    const data = validate<MoveRequest>(MoveRequestType, req.body)
    const userId = String(req.user._id)

    const doc = await GameModel.findGame(id);
    const [game, move] = await applyMove(doc, userId, data)

    if (move.status === Majavashakki.MoveStatus.Error) {
      const socket = SessionSocketMap[session.id];
      if (socket) socket.emit("move_result", move)
      return move
    }

    await GameModel.save(game)
    notifyGame(doc.id, "move_result", move)
    return move
  }),
}

// Wraps game document from database into Game class, tries to apply the given
// move and returns the new game state and the result of the move
async function applyMove(doc: IGameDocument, userId: string, data: any): Promise<[Game, Majavashakki.IMoveResponse]> {
  const game = Game.MapFromDb(doc)
  const moveResult = await game.move(data.from, data.dest, userId)
  if (moveResult.status !== Majavashakki.MoveStatus.Error) {
    game.changeTurn()
  }

  // Purkkkaaa koska ei jaksa korjata muualla
  if (moveResult.status !== "error") {
    if (typeof moveResult.isCheck === "undefined") moveResult.isCheck = false
    if (typeof moveResult.isCheckmate === "undefined") moveResult.isCheckmate = false
  }

  return [game, moveResult]
}

function isPartOfTheGame(game: IGameDocument, userId: string): boolean {
  return [game.playerIdBlack, game.playerIdWhite].indexOf(userId) !== -1
}

function formatGamesListResponse(game: IGameDocument): ApiGameInfo {
  const {_id, title} = game
  return {id: _id, title}
}

function gameDocumentToApiResult(doc: IGameDocument): IGame {
  const board = Game.MapFromDb(doc).board
  return {
    id: doc._id,
    title: doc.title,
    board: doc.board,
    currentTurn: doc.currentTurn,
    playerIdBlack: doc.playerIdBlack,
    playerIdWhite: doc.playerIdWhite,
    isCheck: isCheck(board, doc.currentTurn),
    isCheckmate: isCheckMate(board, doc.currentTurn),
  }
}
