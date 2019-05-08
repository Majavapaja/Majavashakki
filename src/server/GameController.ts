import {GameRoomsRepository} from "./logic/GameRoomsRepository";
import { User } from "./data/User";
import { GameModel, IGameDocument } from "./data/GameModel";
import { IUserDocument } from "./data/User"
import { SessionSocketMap, notifyGame, notifyLobby } from "./Sockets";
import Game from "./entities/Game";
import { jsonAPI, NotFoundError, validate, ValidationError } from "./json"
import {
  CreateGameRequestType, CreateGameRequest,
  MoveRequest, MoveRequestType,
  ApiPlayerDetails,
} from "../common/types"
import * as Majavashakki from "../common/GamePieces"
import { IMoveResponse } from "../common/GamePieces"
import { IGame } from "../common/GamePieces"
import { isCheck, isCheckMate } from "../common/logic/Checkmate"
import { ApiGameInfo } from "../common/types"
import applyMove from "../common/applyMove"

const roomRepo = GameRoomsRepository.getInstance();

const flatten = xs => [].concat(...xs)
const removeFalsy = xs => xs.filter(x => !!x)

export default {
  getAvailableGames: jsonAPI<ApiGameInfo[]>(async req => {
    const games = await GameModel.getAvailableGames(req.user._id);

    const playerIds = removeFalsy(flatten(games.map(g => [g.playerIdBlack, g.playerIdWhite])))
    const players = await User.findByIds(playerIds)

    return games.map(formatGamesListResponse(players))
  }),

  getMyGames: jsonAPI<ApiGameInfo[]>(async req => {
    const gameIds = await User.getMyGames(req.user._id); // TODO active rule for fetch
    const games = await GameModel.getGames(gameIds, true)

    const playerIds = removeFalsy(flatten(games.map(g => [g.playerIdBlack, g.playerIdWhite])))
    const players = await User.findByIds(playerIds)

    return games.map(formatGamesListResponse(players))
  }),

  getFinishedGames: jsonAPI<ApiGameInfo[]>(async req => {
    const gameIds = await User.getMyGames(req.user._id); // TODO active rule for fetch
    const games = await GameModel.getGames(gameIds, false)

    const playerIds = removeFalsy(flatten(games.map(g => [g.playerIdBlack, g.playerIdWhite])))
    const players = await User.findByIds(playerIds)

    return games.map(formatGamesListResponse(players))
  }),

  getGame: jsonAPI<IGame>(async req => {
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

    const players = await User.findByIds(removeFalsy([game.playerIdBlack, game.playerIdWhite]))
    return gameDocumentToApiResult(game, players)
  }),

  postGame: jsonAPI<IGame>(async req => {
    const body = validate<CreateGameRequest>(CreateGameRequestType, req.body)
    console.log(`Creating a new game '${body.title}'`);

    const game = await GameModel.findOrCreate(body.title)
    // TODO create handler
    notifyLobby("game_created", game.title);
    return gameDocumentToApiResult(game, [])
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
    const players = await User.findByIds(removeFalsy([doc.playerIdBlack, doc.playerIdWhite]))
    return gameDocumentToApiResult(doc, players)
  }),

  makeMove: jsonAPI<IMoveResponse>(async req => {
    const {session, params: {id}} = req
    const data = validate<MoveRequest>(MoveRequestType, req.body)
    const userId = String(req.user._id)

    const doc = await GameModel.findGame(id);
    const [game, move] = await applyMove(Game.MapFromDb(doc), userId, data)

    if (move.status === Majavashakki.MoveStatus.Error) {
      const socket = SessionSocketMap[session.id];
      if (socket) socket.emit("move_result", move)
      return move
    }

    await GameModel.save(game)
    notifyGame(doc.id, "move_result", move)
    return move
  }),

  surrender: jsonAPI<void>(async req => {
    const {session, params: {gameId}} = req
    const userId = String(req.user._id)

    const doc = await GameModel.findGame(gameId);
    if (!isCurrentTurn(doc, userId)) {
      throw new ValidationError(["Can't surrender on your opponents turn"])
    }

    doc.inProgress = false
    doc.surrenderer = userId
    await doc.save()

    notifyGame(doc._id, "surrender", { gameId, userId })
  }),
}

function isCurrentTurn(doc: IGameDocument, userId: string): boolean {
  const currentTurnUserId = doc.currentTurn === "black" ? doc.playerIdBlack : doc.playerIdWhite
  return currentTurnUserId === userId
}

function isPartOfTheGame(game: IGameDocument, userId: string): boolean {
  return [game.playerIdBlack, game.playerIdWhite].indexOf(userId) !== -1
}

function formatGamesListResponse(players: IUserDocument[]) {
  return function(game: IGameDocument): ApiGameInfo {
    const {_id, title} = game
    return {
      id: _id,
      title,
      playerWhite: userDocumentToPlayerDetails(players.find(p => String(p._id) === game.playerIdWhite)),
      playerBlack: userDocumentToPlayerDetails(players.find(p => String(p._id) === game.playerIdBlack)),
      inProgress: game.inProgress,
    }
  }
}

function gameDocumentToApiResult(doc: IGameDocument, players: IUserDocument[]): IGame {
  const board = Game.MapFromDb(doc).board
  return {
    id: doc._id,
    title: doc.title,
    board: doc.board,
    currentTurn: doc.currentTurn,
    playerIdBlack: doc.playerIdBlack,
    playerIdWhite: doc.playerIdWhite,
    playerBlack: userDocumentToPlayerDetails(players.find(p => String(p._id) === doc.playerIdBlack)),
    playerWhite: userDocumentToPlayerDetails(players.find(p => String(p._id) === doc.playerIdWhite)),
    isCheck: isCheck(board, doc.currentTurn),
    isCheckmate: isCheckMate(board, doc.currentTurn),
    inProgress: doc.inProgress,
    surrenderer: doc.surrenderer,
  }
}

function userDocumentToPlayerDetails(doc?: IUserDocument): ApiPlayerDetails | undefined {
  if (!doc) return undefined
  return {id: doc._id, name: doc.name}
}
