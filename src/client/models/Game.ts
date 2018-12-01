import socketIO from "socket.io-client"
import { observable, action } from "mobx";
import * as Majavashakki from "../../common/GamePieces"
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

  public board: BoardModel
  private socket: SocketIOClient.Socket

  constructor(title: string) {
    super(title);
    this.isLoading = true
  }

  @action
  public loadGame = async (gameName: string) => {
    this.isLoading = true

    this.currentUser = await ApiService.read.user();
    const gameEntity = await ApiService.read.game(gameName);

    const game = GameEntity.MapFromDb(gameEntity)
    this.title = game.title
    this.currentTurn = game.currentTurn
    this.playerIdBlack = game.playerIdBlack
    this.playerIdWhite = game.playerIdWhite
    this.board = new BoardModel(game.board.pieces, game.board.moveHistory)

    this.isLoading = false
  }

  public connectSocket = () => {
    this.socket = socketIO()

    this.socket.on("move_result", this.onMoveResult)
  }

  @action
  public move = (userId: string = this.currentUser.id, start: Majavashakki.IPosition, destination: Majavashakki.IPosition): Majavashakki.IMoveResponse => {

    const result = super.move(userId, start, destination);

    if (result.status === Majavashakki.MoveStatus.Success) {
      this.socket.emit("move", {
        gameName: this.title,
        from: start,
        dest: destination,
      });
      this.error = ""
      this.changeTurn()
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
      this.board.move(move.start, move.destination)
      this.error = ""
      this.changeTurn()
    } else {
      this.error = move.error
    }
  }
}