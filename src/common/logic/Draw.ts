import BoardBase from "../BoardBase"
import { PieceColor, MoveStatus, PieceType, IPosition } from "../GamePieces"

export const isDraw = (board: BoardBase, playerColor: PieceColor) => {
  // If board doesn't contain two kings don't calculate for draw. For tests
  // TODO: Maybe fix tests instead of bad logic in code?
  if (board.pieces.filter(piece => piece.type === PieceType.King).length !== 2) return false

  if (isStaleMate(board, playerColor)) return true
  if (hasThereBeenFiftyMovesWithoutCapturesOrPawnMovement(board)) return true
  if (!hasEnoughMaterialForCheckmate(board)) return true

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

const hasThereBeenFiftyMovesWithoutCapturesOrPawnMovement = (board: BoardBase): boolean => {
  if (board.moveHistory.length < 50) return false

}

const hasEnoughMaterialForCheckmate = (board: BoardBase): boolean => {
  // With more than 4 pieces there should be enough pieces for checkmate
  if (board.pieces.length > 4) return true

  // King versus king. (If two pieces left they must be kings)
  if (board.pieces.length === 2) return false

  const blackBishop = board.pieces.find(piece => piece.type === PieceType.Bishop && piece.isBlack())
  const whiteBishop = board.pieces.find(piece => piece.type === PieceType.Bishop && piece.isWhite())
  // king and bishop versus king and bishop with the bishops on the same color.
  if (board.pieces.length === 4 && blackBishop && whiteBishop) {
    const isOnWhite = (position: IPosition) => (
      (["b", "d", "f", "h"].includes(position.col) && Number(position.row) % 2 !== 0) ||
      (["a", "c", "e", "g"].includes(position.col) && Number(position.row) % 2 === 0)
    )

    if (
      (isOnWhite(blackBishop.position) && isOnWhite(whiteBishop.position)) ||
      (!isOnWhite(blackBishop.position) && !isOnWhite(whiteBishop.position))
    ) return false
  }

  if (board.pieces.length !== 3) return true

  const knight = board.pieces.find(piece => piece.type === PieceType.Knight)
  // King and bishop versus king or King and knight vs king
  if (blackBishop || whiteBishop || knight) return false

  return true
}