import BoardBase from "../BoardBase"
import { PieceColor, MoveStatus, PieceType } from "../GamePieces"

export const isDraw = (board: BoardBase, playerColor: PieceColor) => {
  // If board doesn't contain two kings don't calculate for draw. For tests
  // TODO: Maybe fix tests instead of bad logic in code?
  if (board.pieces.filter(piece => piece.type === PieceType.King).length !== 2) return false

  if (isStaleMate(board, playerColor)) return true
  if (hasThereBeenFiftyMovesWithoutCaptures(board)) return true
  if (thereIsntEnoughMaterialToDoCheckmate(board)) return true

  return false
}

const isStaleMate = (board: BoardBase, playerColor): boolean => {
  // TODO: See if this could be optimized
  for (const piece of board.pieces) {
    // Only check the requested players moves
    if (piece.color !== playerColor) continue

    for (const col of BoardBase.cols) {
      for (const row of BoardBase.rows) {
        const destination = { row, col }
        const result = board.isValidMove(piece.position, destination)
        if (result.status === MoveStatus.Success) {
          return false
        }
      }
    }
  }

  return true
}

const hasThereBeenFiftyMovesWithoutCaptures = (board: BoardBase): boolean => {
  return false
}

const thereIsntEnoughMaterialToDoCheckmate = (board: BoardBase): boolean => {
  // king versus king
  // king and bishop versus king
  // king and knight versus king
  // king and bishop versus king and bishop with the bishops on the same color.

  return false
}