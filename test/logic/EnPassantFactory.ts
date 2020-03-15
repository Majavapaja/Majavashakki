import BoardBase from "../../src/common/BoardBase";
import { PieceColor, PieceType } from "../../src/common/GamePieces"
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
}