import { factory } from "factory-girl"
import BoardBase from "../../src/common/BoardBase"
import { PieceColor, PieceType } from "../../src/common/GamePieces"
import { createPiece } from "./BoardHelper"

/*  Board Description
    ⚊♟⚊⚊⚊⚊⚊⚊
    ♙⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ♟⚊⚊⚊⚊⚊⚊⚊
    ⚊♙⚊⚊⚊⚊⚊⚊
*/
factory.define(
  "board-promotion",
  BoardBase,
  {},
  {
    afterBuild: (model, attrs, buildOptions) => {
      model.pieces = [
        createPiece("b8", PieceType.Pawn, PieceColor.Black, true, model),
        createPiece("a7", PieceType.Pawn, PieceColor.White, true, model),
        createPiece("a2", PieceType.Pawn, PieceColor.Black, true, model),
        createPiece("b1", PieceType.Pawn, PieceColor.White, true, model),
      ]

      return model
    },
  }
)

export default factory
