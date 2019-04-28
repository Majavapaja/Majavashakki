import socketIO from "socket.io-client"
import { observable, action } from "mobx";
import * as Majavashakki from "../../common/GamePieces"
import {ApiPlayerDetails} from "../../common/types"
import GameEntity from "../../server/entities/Game"
import BoardStore from "./BoardStore"
import GameBase from "../../common/GameBase"
import AppContainer from "./AppContainer"

// TODO: Extend /src/common/Game
export default class GameStore extends GameBase {
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

  @observable
  public boardStore: BoardStore
  private socket: SocketIOClient.Socket
  private gameId: string
  private readonly rootStore: AppContainer

  constructor(rootStore: AppContainer) {
    super("")
    this.isLoading = true
    this.rootStore = rootStore
  }

  @action
  public loadGame = async (gameId: string, showLoadingIndicator: boolean = true) => {
    this.isLoading = showLoadingIndicator

    this.currentUser = await this.rootStore.api.read.user();
    const gameEntity = await this.rootStore.api.read.game(gameId);

    const game = GameEntity.MapFromDb(gameEntity)
    this.title = game.title
    this.gameId = gameId
    this.currentTurn = game.currentTurn
    this.playerIdBlack = game.playerIdBlack
    this.playerIdWhite = game.playerIdWhite
    this.boardStore = new BoardStore(this, game.board.pieces, game.board.moveHistory)
    this.isCheck = gameEntity.isCheck
    this.isCheckmate = gameEntity.isCheckmate
    this.playerWhite = gameEntity.playerWhite
    this.playerBlack = gameEntity.playerBlack
    this.inProgress = gameEntity.inProgress

    this.isLoading = false
  }

  public connectSocket = () => {
    this.socket = socketIO()
    this.socket.on("move_result", this.onMoveResult)
  }

  @action
  public async move(
    start: Majavashakki.IPosition,
    destination: Majavashakki.IPosition,
    promotionPiece?: Majavashakki.PieceType,
  ): Promise<Majavashakki.IMoveResponse> {
    if (!promotionPiece && this.boardStore.isPromotion(start, destination)) {
      this.rootStore.promotionDialog.openDialog(start, destination)
      return
    }

    const result = await super.move(start, destination, this.currentUser.id, promotionPiece);

    if (result.status === Majavashakki.MoveStatus.Success) {
      await this.rootStore.api.write.makeMove(this.gameId, start, destination, promotionPiece)
    } else {
      this.error = result.error
    }

    return result;
  }

  ///
  // Socket methods
  ///

  @action
  private onMoveResult = async (move: Majavashakki.IMoveResponse) => {
    await this.loadGame(this.gameId, false)
    this.error = move.status === Majavashakki.MoveStatus.Error ? move.error : undefined
  }
}
