import { User, IUserDocument } from "./models/User";
import { Game, IGameDocument, addPlayer, isFull, userInGame } from "./models/Game";
import { SessionSocketMap, notifyGame, notifyLobby, notifyUser } from "./Sockets";
import GameEntity from "./entities/Game";
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
import { removeFalsy } from "./util"

const flatten = xs => [].concat(...xs)

export default {
  getGameList: jsonAPI<ApiGameInfo[]>(async req => {
    const user = req.user as IUserDocument
    const inProgress = parseBoolean(req.query.inProgress)
    const games = await Game.getGameList(user._id, inProgress)
    return await gamesToGamesListResponse(games)
  }),

  getGame: jsonAPI<IGame>(async req => {
    const {session, params: {id}} = req
    const user = req.user as IUserDocument
    const socket = SessionSocketMap[session.id];

    const game = await Game.findGame(id)
    if (!game) throw new NotFoundError(`Game '${id}' not found`)

    if (!isPartOfTheGame(game, user.id)) {
      console.log(`Player attempted to look at a game he is not part of (userId: ${user.id}, gameId: ${game.id})`)
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

    const game = await Game.findOrCreate(body.title)
    return gameDocumentToApiResult(game, [])
  }),

  joinGame: jsonAPI<IGame>(async req => {
    const {session, params: {id}} = req
    const user = req.user as IUserDocument
    const socket = SessionSocketMap[session.id];
    const userId = String(user._id)

    const doc = await Game.findGame(id);
    if (!doc) throw new NotFoundError(`Game '${id}' not found`)

    console.log(`User '${user.email}' is joining game '${doc.title}'`)

    if (!userInGame(doc, userId)) {
      if (isFull(doc)) throw new Error(`User '${userId}' is trying to join game '${doc.id}' which is already full!`);

      addPlayer(doc, userId);
      await doc.save()
    }

    if (socket) {
      // Socket connection might not always be active e.g. from network error or during tests.
      // TODO: How does the player join the socket.io "room" of the game after reconnecting?
      socket.join(`game:${doc.id}`)
    }

    notifyLobby("lobby_updated", await gamesToGamesListResponse([doc]))

    const players = await User.findByIds(removeFalsy([doc.playerIdBlack, doc.playerIdWhite]))
    const response = gameDocumentToApiResult(doc, players)
    notifyGame(doc, "game_updated", response)
    return response
  }),

  makeMove: jsonAPI<IMoveResponse>(async req => {
    const {params: {id}} = req
    const user = req.user as IUserDocument
    const data = validate<MoveRequest>(MoveRequestType, req.body)
    const userId = String(user._id)

    const doc = await Game.findGame(id);
    const [game, move] = await applyMove(GameEntity.MapFromDb(doc), userId, data)

    if (move.status === Majavashakki.MoveStatus.Error) {
      notifyUser(userId, "move_result", move)
      return move
    }

    await Game.updateOrCreate(game)
    notifyGame(doc, "move_result", move)
    return move
  }),

  surrender: jsonAPI<IGame>(async req => {
    const {params: {gameId}} = req
    const user = req.user as IUserDocument
    const userId = String(user._id)

    const doc = await Game.findGame(gameId);
    if (!isCurrentTurn(doc, userId)) {
      throw new ValidationError(["Can't surrender on your opponents turn"])
    }

    doc.inProgress = false
    doc.surrenderer = userId
    await doc.save()

    const players = await User.findByIds(removeFalsy([doc.playerIdBlack, doc.playerIdWhite]))
    const response = gameDocumentToApiResult(doc, players)
    notifyGame(doc, "game_updated", response)
    return response
  }),
}

async function gamesToGamesListResponse(games: IGameDocument[]): Promise<ApiGameInfo[]> {
    const playerIds = removeFalsy(flatten(games.map(g => [g.playerIdBlack, g.playerIdWhite])))
    const players = await User.findByIds(playerIds)
    return games.map(formatGamesListResponse(players))
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
  const board = GameEntity.MapFromDb(doc).board
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

function parseBoolean(value: any): boolean {
  if (value === "true") {
    return true
  } else if (value === "false") {
    return false
  } else {
    throw new Error(`Failed to parse boolean from '${value}'`)
  }
}
