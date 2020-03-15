import BoardBase from "../../../src/common/BoardBase";
import { PieceColor, PieceType } from "../../../src/common/GamePieces"
import { createPiece } from "./BoardHelper"

export default class BoardFactory {
  public static setupBasic = () => new BoardBase()

  /*  Board Description pawn capture
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊♙♟♟⚊⚊⚊
    ⚊⚊⚊♙♙♟⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
  */
  public static setupPawnCapture() {
    const pieces = [
      createPiece("c5", PieceType.Pawn, PieceColor.White, true, null),
      createPiece("d5", PieceType.Pawn, PieceColor.Black, true, null),
      createPiece("e5", PieceType.Pawn, PieceColor.Black, true, null),
      createPiece("d4", PieceType.Pawn, PieceColor.White, true, null),
      createPiece("e4", PieceType.Pawn, PieceColor.White, true, null),
      createPiece("f4", PieceType.Pawn, PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  Board Description pawn double move
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ♟♟♟⚊⚊⚊⚊⚊
    ♟⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊♙⚊⚊⚊⚊
    ⚊⚊⚊♟⚊⚊⚊⚊
    ♙⚊⚊⚊⚊⚊⚊⚊
    ♙♙♙⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
  */
  public static setupPawnDoubleMove() {
    const pieces = [
      createPiece("a7", PieceType.Pawn, PieceColor.Black, false, null),
      createPiece("b7", PieceType.Pawn, PieceColor.Black, false, null),
      createPiece("c7", PieceType.Pawn, PieceColor.Black, false, null),
      createPiece("a6", PieceType.Pawn, PieceColor.Black, true, null),
      createPiece("d5", PieceType.Pawn, PieceColor.White, true, null),
      createPiece("a2", PieceType.Pawn, PieceColor.White, false, null),
      createPiece("b2", PieceType.Pawn, PieceColor.White, false, null),
      createPiece("c2", PieceType.Pawn, PieceColor.White, false, null),
      createPiece("a3", PieceType.Pawn, PieceColor.White, true, null),
      createPiece("d4", PieceType.Pawn, PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  Board Description Enpassant
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ♙⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊♙⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊♟⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
  */
  public static setupEnpassant() {
    const pieces = [
      createPiece("c2", PieceType.Pawn, PieceColor.White, false, null),
      createPiece("d4", PieceType.Pawn, PieceColor.Black, true, null),
      createPiece("a7", PieceType.Pawn, PieceColor.Black, false, null),
    ]
    return new BoardBase(pieces)
  }

  /*  Board Description Castling
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊♕♗⚊⚊⚊
    ♖⚊⚊⚊♔⚊⚊♖
  */
  public static setupCastling() {
    const pieces = [
      createPiece("a1", PieceType.Rook, PieceColor.White, false, null),
      createPiece("d2", PieceType.Queen, PieceColor.White, false, null),
      createPiece("e1", PieceType.King, PieceColor.White, false, null),
      createPiece("e2", PieceType.Bishop, PieceColor.White, false, null),
      createPiece("h1", PieceType.Rook, PieceColor.White, false, null),
    ]
    return new BoardBase(pieces)
  }

  /*  Board Description Castling under attack
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ♜⚊⚊⚊⚊⚊⚊⚊
    ♖⚊⚊⚊♔⚊⚊♖
  */
  public static setupCastlingUnderAttack() {
    const pieces = [
      createPiece("a1", PieceType.Rook, PieceColor.White, false, null),
      createPiece("a2", PieceType.Rook, PieceColor.Black, false, null),
      createPiece("e1", PieceType.King, PieceColor.White, false, null),
    ]
    return new BoardBase(pieces)
  }

}