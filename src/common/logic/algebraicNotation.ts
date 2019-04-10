import * as Majavashakki from '../GamePieces'
import BoardBase from "../BoardBase";

const getPieceType = (type: Majavashakki.PieceType): string => {
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

const getDisambiguation = (board: BoardBase, start: Majavashakki.IPosition, destination: Majavashakki.IPosition): string => {
  const startPiece = board.getPiece(start)
  const possibleConflicts = board.pieces
    .filter(piece => piece !== startPiece && piece.type === startPiece.type && piece.color === startPiece.color)

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

export const getAlgebraicNotation = (board: BoardBase, move: Majavashakki.IMoveResponse): Majavashakki.AlgebraicNotation => {
  const startPiece = board.getPiece(move.start)

  let an: Majavashakki.AlgebraicNotation = getPieceType(startPiece.type)
  an += getDisambiguation(board, move.start, move.destination)
  if (move.result === Majavashakki.MoveType.Capture || move.result === Majavashakki.MoveType.Enpassant) {
    an += 'x'

    // If piece was a pawn and it was a capture, we need to add start file of the pawn at the start of the notation
    if (startPiece.type === Majavashakki.PieceType.Pawn) {
      an = move.start.col + an
    }
  } else if (move.result === Majavashakki.MoveType.Promotion && this.getPiece(move.destination)) {
    // If move result is promotion and there is a piece at destination it means that the promotion was a capture
    an += 'x'
  }

  an += move.destination.col + move.destination.row

  // Add special moves at the end of the notation
  if (move.result === Majavashakki.MoveType.Promotion) an += getPieceType(move.promotionType)
  else if (move.result === Majavashakki.MoveType.Enpassant) an += 'e.p.'

  if (move.result === Majavashakki.MoveType.Castling) {
    // If castling destination is g, it is kingside castling
    if (move.destination.col === 'g') an = '0-0'
    // If castling destination is c, it is queenside castling
    else if (move.destination.col === 'c') an = '0-0-0'
  }

  if (move.isCheckmate) an += '#'
  else if (move.isCheck) an += '+'

  return an
}