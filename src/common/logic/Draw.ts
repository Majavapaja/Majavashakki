import BoardBase from "../BoardBase"
import { PieceColor, PieceType, MoveStatus } from "../GamePieces"

export const isDraw = (board: BoardBase, playerColor: PieceColor) => {
  if (isStaleMate(board, playerColor)) return true
  if (hasThereBeenFiftyMovesWithoutCaptures(board)) return true
  if (thereIsntEnoughMaterialToDoCheckmate(board)) return true

  return false
}

const isStaleMate = (board: BoardBase, playerColor): boolean => {
  const boardCopy: BoardBase = new BoardBase()
  boardCopy.pieces = board.pieces.map(piece => piece.clone())

  // TODO: See if this could be optimized
  for (const piece of boardCopy.pieces) {
    // Only check the requested players moves
    if (piece.color !== playerColor) continue

    for (const col of BoardBase.cols) {
      for (const row of BoardBase.rows) {
        const destination = { row, col }
        const moveResult = boardCopy.move(piece.position, destination, PieceType.Queen)
        if (moveResult.status === MoveStatus.Success) {
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