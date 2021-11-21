import * as Majavashakki from "../../common/GamePieces"
import BoardBase from "../BoardBase"

export default abstract class Piece implements Majavashakki.IPiece {
  public type: Majavashakki.PieceType
  public color: Majavashakki.PieceColor
  public position: Majavashakki.IPosition
  public hasMoved: boolean

  constructor(color: Majavashakki.PieceColor, position: Majavashakki.IPosition, type: Majavashakki.PieceType) {
    this.color = color
    this.position = position
    this.type = type
    this.hasMoved = false
  }

  public abstract isValidMove(board: BoardBase, _destination: Majavashakki.IPosition): boolean
  public abstract clone(): Piece

  public isBlack() {
    return this.color === Majavashakki.PieceColor.Black
  }

  public isWhite() {
    return this.color === Majavashakki.PieceColor.White
  }

  public currentPositionInNumbers = () => Piece.positionToNumbers(this.position)

  public static positionToNumbers = (position: Majavashakki.IPosition) => ({
    col: BoardBase.cols.indexOf(position.col),
    row: BoardBase.rows.indexOf(position.row),
  })

  public static numbersToPosition = (numbers: any): Majavashakki.IPosition => ({
    col: BoardBase.cols.charAt(numbers.col),
    row: BoardBase.rows.charAt(numbers.row),
  })
}
