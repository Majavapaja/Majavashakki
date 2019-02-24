import BoardBase from "common/BoardBase"
import { PieceColor, PieceType } from "common/GamePieces"

export const isDraw = (board: BoardBase, playerColor: PieceColor) => {
  if (isStaleMate(board, playerColor)) return true
  if (hasThereBeenFiftyMovesWithoutCaptures(board)) return true
  if (thereIsntEnoughMaterialToDoCheckmate(board)) return true

  return false
}

const isStaleMate = (board: BoardBase, playerColor): boolean => {
  const boardCopy: BoardBase = new BoardBase();
  boardCopy.pieces = board.pieces.map(piece => piece.clone());

  // TODO: See if this could be optimized
  for (let i = 0; i < board.pieces.length; i++) {
    const piece = board.pieces[i]

    // Only check the requested players moves
    if (piece.color !== playerColor) return false

    for (let col = 0; col < BoardBase.cols.length; col++) {
      for (let row = 0; row < BoardBase.rows.length; row++) {
        const destination = { row: BoardBase.rows[row], col: BoardBase.cols[col] }
        if (boardCopy.isValidMove(piece.position, destination)){
          console.log('Cant be stalemate')
          return false
        }
      }
    }
  }

  console.log('Was stalemate')
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

  return true
}