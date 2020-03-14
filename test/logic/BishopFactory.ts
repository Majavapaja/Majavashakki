import { factory } from "factory-girl"
import BoardBase from "../../src/common/BoardBase"
import { PieceColor, PieceType } from "../../src/common/GamePieces"
import { createPiece } from "./BoardHelper"

/*  Board Description
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊♝⚊♝⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
*/
factory.define(
  "board-bishop-movement",
  BoardBase,
  {},
  {
    afterBuild: (model, attrs, buildOptions) => {
      model.pieces = [
        createPiece("c2", PieceType.Bishop, PieceColor.White, true, model),
        createPiece("e2", PieceType.Bishop, PieceColor.White, true, model),
      ]

      return model
    },
  }
)

/*  Board Description
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ♗⚊⚊⚊⚊⚊⚊⚊
    ⚊♗⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊♝⚊⚊⚊
    ⚊⚊⚊♝⚊⚊⚊⚊
*/
factory.define(
  "board-bishop-capture",
  BoardBase,
  {},
  {
    afterBuild: (model, attrs, buildOptions) => {
      model.pieces = [
        createPiece("e2", PieceType.Bishop, PieceColor.White, true, model),
        createPiece("d1", PieceType.Bishop, PieceColor.White, true, model),
        createPiece("a6", PieceType.Bishop, PieceColor.Black, true, model),
        createPiece("b5", PieceType.Bishop, PieceColor.Black, true, model),
      ]

      return model
    },
  }
)

export default factory
