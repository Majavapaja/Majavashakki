import * as Majavashakki from "../GamePieces"
import BoardBase from "../BoardBase";

const getPieceNotation = (type: Majavashakki.PieceType): string => {
  switch (type) {
    case Majavashakki.PieceType.King:
      return "K"
    case Majavashakki.PieceType.Queen:
      return "Q"
    case Majavashakki.PieceType.Rook:
      return "R"
    case Majavashakki.PieceType.Bishop:
      return "B"
    case Majavashakki.PieceType.Knight:
      return "N"
    case Majavashakki.PieceType.Pawn:
      return ""
  }
}

export const getPieceType = (algebraicNotation: string): Majavashakki.PieceType => {
  const typeChar = algebraicNotation[0];

  switch (typeChar) {
    case "K":
      return Majavashakki.PieceType.King;
    case "Q":
      return Majavashakki.PieceType.Queen;
    case "R":
      return Majavashakki.PieceType.Rook;
    case "B":
      return Majavashakki.PieceType.Bishop;
    case "N":
      return Majavashakki.PieceType.Knight;
    default:
      return Majavashakki.PieceType.Pawn;
  }
}

const getDisambiguation = (board: BoardBase, start: Majavashakki.IPosition, destination: Majavashakki.IPosition): string => {
  const startPiece = board.getPiece(start)
  const possibleConflicts = board.pieces
    .filter(piece => piece !== startPiece && piece.type === startPiece.type && piece.color === startPiece.color)

  if (possibleConflicts.length === 0) return ""

  // Check if any of the conflicting pieces can move to the destination
  const conflicts = possibleConflicts
    .filter(piece => board.isValidMove(piece.position, destination).status === Majavashakki.MoveStatus.Success)

  if (conflicts.length === 0) return ""

  let fileConflict
  conflicts.forEach(piece => {
    if (fileConflict) return
    fileConflict = piece.position.col === startPiece.position.col
  })

  if (!fileConflict) return startPiece.position.col

  let rankConflict
  conflicts.forEach(piece => {
    if (rankConflict) return
    rankConflict = piece.position.row === startPiece.position.row
  })

  if (!rankConflict) return startPiece.position.row

  return startPiece.position.col + startPiece.position.row
}

export const getAlgebraicNotation = (board: BoardBase, move: Majavashakki.IMoveResponse, promotionPiece?: Majavashakki.PieceType): Majavashakki.AlgebraicNotation => {
  const startPiece = board.getPiece(move.start)

  let notation: Majavashakki.AlgebraicNotation = getPieceNotation(startPiece.type)
  notation += getDisambiguation(board, move.start, move.destination)
  if (move.result === Majavashakki.MoveType.Capture || move.result === Majavashakki.MoveType.Enpassant) {
    notation += "x"

    // If piece was a pawn and it was a capture, we need to add start file of the pawn at the start of the notation
    if (startPiece.type === Majavashakki.PieceType.Pawn) {
      notation = move.start.col + notation
    }
  } else if (move.result === Majavashakki.MoveType.Promotion && board.getPiece(move.destination)) {
    // If move result is promotion and there is a piece at destination it means that the promotion was a capture
    notation += "x"
  }

  notation += move.destination.col + move.destination.row

  // Add special moves at the end of the notation
  if (move.result === Majavashakki.MoveType.Promotion) notation += getPieceNotation(promotionPiece)
  else if (move.result === Majavashakki.MoveType.Enpassant) notation += "e.p."

  if (move.result === Majavashakki.MoveType.Castling) {
    // If castling destination is g, it is kingside castling
    if (move.destination.col === "g") notation = "0-0"
    // If castling destination is c, it is queenside castling
    else if (move.destination.col === "c") notation = "0-0-0"
  }

  return notation
}

export const setCheck = (notation: Majavashakki.AlgebraicNotation, move: Majavashakki.IMoveResponse): Majavashakki.AlgebraicNotation => {
  if (move.isCheckmate) notation += "#"
  else if (move.isCheck) notation += "+"

  return notation
}

export enum MoveMetadata {
  Castling = 1 << 0,
  Enpassant = 1 << 1,
  Capture = 1 << 2,
  Check = 1 << 3,
  Checkmate = 1 << 4,
}

export const getMoveMetadata = (algebraicNotation: Majavashakki.AlgebraicNotation): MoveMetadata => {
  let metadata: MoveMetadata;

  if (algebraicNotation.includes("0-0")) metadata |= MoveMetadata.Castling;
  if (algebraicNotation.includes("e.p.")) metadata |= MoveMetadata.Enpassant;
  if (algebraicNotation.includes("x")) metadata |= MoveMetadata.Capture;
  if (algebraicNotation.includes("+")) metadata |= MoveMetadata.Check;
  if (algebraicNotation.includes("#")) metadata |= MoveMetadata.Checkmate;

  return metadata
}
