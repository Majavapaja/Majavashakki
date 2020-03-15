import BoardBase from "../../../src/common/BoardBase";
import { PieceColor, PieceType } from "../../../src/common/GamePieces"
import { createPiece } from "./BoardHelper"

/*  Board Description
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ♙⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊♙⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊♟⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
*/
export default class BoardFactory {
  public static setupEnpassant() {
    const pieces = [
      createPiece("c2", PieceType.Pawn, PieceColor.White, false, null),
      createPiece("d4", PieceType.Pawn, PieceColor.Black, true, null),
      createPiece("a7", PieceType.Pawn, PieceColor.Black, false, null),
    ]
    return new BoardBase(pieces)
  }

  /*  Board Description
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

  /*  Board Description
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