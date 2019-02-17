import BoardBase from "./BoardBase"
import * as Majavashakki from "./GamePieces"

export default abstract class GameBase implements Majavashakki.IGame {
  public title: string;
  public currentTurn: Majavashakki.PieceColor;
  public playerIdWhite: string;
  public playerIdBlack: string;
  public board: BoardBase;
  public isCheck: boolean;
  public isCheckmate: boolean;

  constructor(title: string) {
    this.title = title;
    this.board = new BoardBase();

    // White always starts in chess
    this.currentTurn = Majavashakki.PieceColor.White;
  }

  public isFull(): boolean {
    return !!this.playerIdWhite && !!this.playerIdBlack;
  }

  public containsUser(userId: string): boolean {
    return this.playerIdWhite === userId || this.playerIdBlack === userId;
  }

  public addPlayer(playerId: string) {
    if (!this.playerIdWhite) {
      this.playerIdWhite = playerId;
    } else if (!this.playerIdBlack) {
      this.playerIdBlack = playerId;
    } else {
      throw new Error("Paskaa täynnä, ei mahu - shit has hit fan even though it should not be possible, call Avengers")
    }
    return true;
  }

  public async move(start: Majavashakki.IPosition, destination: Majavashakki.IPosition, userId: string, promotionPiece?: Majavashakki.PieceType): Promise<Majavashakki.IMoveResponse> {
    if (!this.doesUserOwnPiece(userId, start)) {
      return {
        status: Majavashakki.MoveStatus.Error,
        error: "Error 13: This is not your piece!",
      } as Majavashakki.IMoveResponse
    }

    if (!this.isUsersTurn(userId)) {
      return {
        status: Majavashakki.MoveStatus.Error,
        error: "Error 14: Not your turn!",
      } as Majavashakki.IMoveResponse
    }

    return this.board.move(start, destination, promotionPiece)
  }

  public getUserColor(userId: string) {
    if (this.playerIdWhite === userId) return Majavashakki.PieceColor.White
    else if (this.playerIdBlack === userId) return Majavashakki.PieceColor.Black
    throw Error(`User (ID: ${{ userId }}) is not in this game!`)
  }

  public doesUserOwnPiece(userId: string, position: Majavashakki.IPosition) {
    const piece = this.board.getPiece(position)
    if (piece) {
      return this.getUserColor(userId) === piece.color
    }
    return false
  }

  public isUsersTurn(userId: string) {
    return this.currentTurn === this.getUserColor(userId)
  }

  public changeTurn() {
    if (this.currentTurn === Majavashakki.PieceColor.White) {
      this.currentTurn = Majavashakki.PieceColor.Black
    } else {
      this.currentTurn = Majavashakki.PieceColor.White
    }
  }
}
