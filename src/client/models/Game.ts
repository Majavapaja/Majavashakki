import socketIO from "socket.io-client"
import { observable, action } from "mobx";
import * as Majavashakki from "../../common/GamePieces"
import {ApiPlayerDetails} from "../../common/types"
import GameEntity from "../../server/entities/Game"
import BoardModel from "./Board";
import ApiService from "../common/ApiService";
import GameBase from "../../common/GameBase";

// TODO: Extend /src/common/Game
export default class Game extends GameBase {
  @observable
  public title: string
  @observable
  public currentTurn: Majavashakki.PieceColor

  @observable
  public isLoading: boolean
  @observable
  public currentUser: global.IUserContract
  @observable
  public error: string
  @observable
  public isCheck: boolean
  @observable
  public isCheckmate: boolean

  @observable
  public playerBlack?: ApiPlayerDetails
  @observable
  public playerWhite?: ApiPlayerDetails

  public board: BoardModel
  private socket: SocketIOClient.Socket
  private gameId: string
  private readonly _api: ApiService;

  constructor(title: string, api: ApiService) {
    super(title);
    this.isLoading = true
    this._api = api;
  }

  @action
  public loadGame = async (gameId: string) => {
    this.isLoading = true

    this.currentUser = await this._api.read.user();
    const gameEntity = await this._api.read.game(gameId);

    const game = GameEntity.MapFromDb(gameEntity)
    this.title = game.title
    this.gameId = gameId
    this.currentTurn = game.currentTurn
    this.playerIdBlack = game.playerIdBlack
    this.playerIdWhite = game.playerIdWhite
    this.board = new BoardModel(game.board.pieces, game.board.moveHistory)
    this.isCheck = gameEntity.isCheck
    this.isCheckmate = gameEntity.isCheckmate
    this.playerWhite = gameEntity.playerWhite
    this.playerBlack = gameEntity.playerBlack

    this.isLoading = false
  }

  public connectSocket = () => {
    this.socket = socketIO()
    this.socket.on("move_result", this.onMoveResult)
  }

  @action
  public async move(start: Majavashakki.IPosition, destination: Majavashakki.IPosition, userId: string = this.currentUser.id): Promise<Majavashakki.IMoveResponse> {
    // :thinking:
    const piece = this.board.getPiece(start)
    let promotionPieceType

    if (this.board.isPromotion(start, destination)) {
        // Do temporary move so it looks good
        piece.position = destination

        // Wait a while so the pawn movement updates to UI before alerts stop code execution
        await new Promise((resolve) => setTimeout(resolve, 200))

        await new Promise((resolve) => {
          const piises = piece.isWhite() ? "♕♘♖♗" : "♛♞♜♝"

          while (!promotionPieceType) {
            if (confirm(`Pawn promotion! Promote to Queen ${piises[0]}?`)) {
              promotionPieceType = Majavashakki.PieceType.Queen
            } else if (confirm(`Pawn promotion! Promote to Knight ${piises[1]}?`)) {
              promotionPieceType = Majavashakki.PieceType.Knight
            } else if (confirm(`Pawn promotion! Promote to Rook ${piises[2]}?`)) {
              promotionPieceType = Majavashakki.PieceType.Rook
            } else if (confirm(`Pawn promotion! Promote to Bishop ${piises[3]}?`)) {
              promotionPieceType = Majavashakki.PieceType.Bishop
            }
          }

          resolve()
        })

        alert(`You chose ${promotionPieceType}`)

        piece.position = start
    }

    const result = await super.move(start, destination, userId, promotionPieceType);

    if (result.status === Majavashakki.MoveStatus.Success) {
      await this._api.write.makeMove(this.gameId, start, destination, promotionPieceType)
    } else {
      this.error = result.error
    }

    return result;
  }

  ///
  // Socket methods
  ///

  @action
  private onMoveResult = (move: Majavashakki.IMoveResponse) => {
    if (move.status === Majavashakki.MoveStatus.Success) {
      this.board.move(move.start, move.destination, move.promotionType)
      this.error = ""
      this.changeTurn()
      this.isCheck = move.isCheck
      this.isCheckmate = move.isCheckmate
    } else {
      this.error = move.error
    }
  }
}