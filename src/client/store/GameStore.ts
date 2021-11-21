import socketIO from "socket.io-client"
import { observable, action, computed } from "mobx"
import * as Majavashakki from "../../common/GamePieces"
import applyMove from "../../common/applyMove"
import { ApiPlayerDetails, MoveRequest } from "../../common/types"
import GameEntity from "../../server/entities/Game"
import BoardStore from "./BoardStore"
import GameBase from "../../common/GameBase"
import AppStore from "./AppStore"

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
  public surrenderer?: string

  @observable
  public boardStore: BoardStore
  private socket: SocketIOClient.Socket
  private gameId: string
  private readonly rootStore: AppStore

  private apiGame: Majavashakki.IGame

  constructor(rootStore: AppStore) {
    super("")
    this.isLoading = true
    this.rootStore = rootStore
  }

  @computed.struct
  get winner(): Majavashakki.PieceColor | undefined {
    if (this.isCheckmate || this.surrenderer) {
      return this.currentTurn === Majavashakki.PieceColor.White
        ? Majavashakki.PieceColor.Black
        : Majavashakki.PieceColor.White
    } else if (this.surrenderer) {
      return this.surrenderer === this.playerIdBlack ? Majavashakki.PieceColor.Black : Majavashakki.PieceColor.White
    }
  }

  @action
  public loadGame = async (gameId: string, showLoadingIndicator: boolean = true) => {
    this.isLoading = showLoadingIndicator

    this.currentUser = await this.rootStore.api.read.user()
    const gameEntity = await this.rootStore.api.read.game(gameId)
    this.updateGameData(gameEntity)
    this.isLoading = false
  }

  @action
  public updateGameData = (gameEntity: Majavashakki.IGame) => {
    this.apiGame = gameEntity

    const game = GameEntity.MapFromDb(gameEntity)
    this.title = game.title
    this.gameId = gameEntity.id
    this.currentTurn = game.currentTurn
    this.playerIdBlack = game.playerIdBlack
    this.playerIdWhite = game.playerIdWhite
    this.boardStore = new BoardStore(this, game.board.pieces, game.board.moveHistory)
    this.isCheck = gameEntity.isCheck
    this.isCheckmate = gameEntity.isCheckmate
    this.playerWhite = gameEntity.playerWhite
    this.playerBlack = gameEntity.playerBlack
    this.inProgress = gameEntity.inProgress
    this.surrenderer = gameEntity.surrenderer
  }

  // TODO init socket connection only once in AppStore startup (needs refactoring for server side)
  public connectSocket = () => {
    if (!this.socket) {
      this.socket = socketIO()
      this.socket.on("move_result", this.onMoveResult)
      this.socket.on("game_updated", this.onGameUpdated)
    }
  }

  @action
  public async move(
    start: Majavashakki.IPosition,
    destination: Majavashakki.IPosition,
    promotionPiece?: Majavashakki.PieceType
  ): Promise<Majavashakki.IMoveResponse> {
    if (!promotionPiece && this.boardStore.isPromotion(start, destination)) {
      this.rootStore.promotionDialog.openDialog(start, destination)
      return
    }

    const moveRequest: MoveRequest = {
      from: start,
      dest: destination,
      promotionType: promotionPiece,
    }

    const [, result] = await applyMove(GameEntity.MapFromDb(this.apiGame), this.currentUser.id, moveRequest)
    if (result.status === Majavashakki.MoveStatus.Success) {
      await this.rootStore.api.write.makeMove(this.gameId, moveRequest)
    } else {
      this.error = result.error
    }

    return result
  }

  // Surrender UI

  @observable
  public surrenderDialogOpen: boolean = false

  @action.bound
  public promptSurrender(): void {
    this.surrenderDialogOpen = true
  }

  @action.bound
  public confirmSurrender(): void {
    this.rootStore.api.write.surrenderGame(this.gameId)
    this.surrenderDialogOpen = false
  }

  @action.bound
  public cancelSurrender(): void {
    this.surrenderDialogOpen = false
  }

  ///
  // Socket methods
  ///

  @action
  private onMoveResult = async (move: Majavashakki.IMoveResponse) => {
    await this.loadGame(this.gameId, false)
    this.error = move.status === Majavashakki.MoveStatus.Error ? move.error : undefined
  }

  @action.bound
  private async onGameUpdated(game: Majavashakki.IGame): Promise<void> {
    if (game.id !== this.gameId) {
      console.log("Received game_updated message for game that is not open in browser")
      return
    }

    console.log("Received game_updated message, setting game state")
    this.updateGameData(game)
  }

  @computed
  get currentUserColor(): Majavashakki.PieceColor {
    return this.playerIdBlack === this.currentUser.id ? Majavashakki.PieceColor.Black : Majavashakki.PieceColor.White
  }
}
