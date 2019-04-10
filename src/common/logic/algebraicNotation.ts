import * as Majavashakki from '../GamePieces'
import BoardBase from "../BoardBase";

export const getPieceType = (type: Majavashakki.PieceType): string => {
  switch (type) {
    case Majavashakki.PieceType.King:
      return 'K'
    case Majavashakki.PieceType.Queen:
      return 'Q'
    case Majavashakki.PieceType.Rook:
      return 'R'
    case Majavashakki.PieceType.Bishop:
      return 'B'
    case Majavashakki.PieceType.Knight:
      return 'N'
    case Majavashakki.PieceType.Pawn:
      return ''
  }
}

export const getDisambiguation = (board: BoardBase, start: Majavashakki.IPosition, destination: Majavashakki.IPosition): string => {
  const startPiece = board.getPiece(start)
  const possibleConflicts = board.pieces
    .filter(piece => piece.type === startPiece.type && piece.color === startPiece.color)

  if (possibleConflicts.length === 0) return ''

  // Check if any of the conflicting pieces can move to the destination
  const conflicts = possibleConflicts
    .filter(piece => board.isValidMove(piece.position, destination).status === Majavashakki.MoveStatus.Success)

  if (conflicts.length === 0) return ''

  // Check if the file conflicts
  let fileConflict
  conflicts.forEach(piece => {
    fileConflict = piece.position.col === startPiece.position.col
  })

  if (!fileConflict) return startPiece.position.col

  let rankConflict
  conflicts.forEach(piece => {
    rankConflict = piece.position.row === startPiece.position.row
  })

  if (!rankConflict) return startPiece.position.row


  return startPiece.position.col + startPiece.position.row
}