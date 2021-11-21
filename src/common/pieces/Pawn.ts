import * as Majavashakki from "../GamePieces"
import Piece from "./Piece"
import BoardBase from "../BoardBase"

export default class Pawn extends Piece {
  constructor(color: Majavashakki.PieceColor, position: Majavashakki.IPosition) {
    super(color, position, Majavashakki.PieceType.Pawn)
  }

  public isValidMove(board: BoardBase, destination: Majavashakki.IPosition): boolean {
    const start = this.currentPositionInNumbers()
    const dest = Piece.positionToNumbers(destination)

    const rowDiff = dest.row - start.row
    const colDiff = dest.col - start.col

    const destinationPiece = board.getPiece(destination)

    const movementDirection = this.color === Majavashakki.PieceColor.White ? 1 : -1

    // Check if pawn is capturing
    if (destinationPiece && rowDiff === movementDirection && (colDiff === 1 || colDiff === -1)) return true
    else if (!destinationPiece && colDiff === 0) {
      // Check if pawn is moving
      if (!this.hasMoved && rowDiff === movementDirection * 2) {
        // Ensure that double move is not blocked by piece
        dest.row -= movementDirection
        if (!board.getPiece(Piece.numbersToPosition(dest))) return true
      }

      if (rowDiff === movementDirection) return true
    }

    return false
  }

  public isEnPassant(board: BoardBase, destination: Majavashakki.IPosition): boolean {
    const start = this.currentPositionInNumbers()
    const dest = Piece.positionToNumbers(destination)

    const rowDiff = dest.row - start.row
    const colDiff = dest.col - start.col

    const movementDirection = this.color === "white" ? 1 : -1

    // Check if diagonal movement
    if (rowDiff === movementDirection && (colDiff === 1 || colDiff === -1)) {
      // Check if there is a piece below destination and that piece is enemy pawn
      dest.row -= movementDirection
      const targetPiece = board.getPiece(Piece.numbersToPosition(dest))

      if (targetPiece && targetPiece.type === "pawn" && targetPiece.color !== this.color) {
        // Check if last move was double move and that its destination was targetPiece
        const lastMove: Majavashakki.IMove = board.moveHistory[board.moveHistory.length - 1]
        const lastStart = Piece.positionToNumbers(lastMove.start)
        const lastDest = Piece.positionToNumbers(lastMove.destination)

        const lastMoveDiff: number = Math.abs(lastDest.row - lastStart.row)
        if (lastMoveDiff === 2 && board.comparePos(lastMove.destination, targetPiece.position)) return true
      }
    }
  }

  public clone(): Pawn {
    const pawn = new Pawn(this.color, this.position)
    pawn.hasMoved = this.hasMoved
    return pawn
  }
}
