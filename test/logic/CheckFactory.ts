import { factory } from "factory-girl"
import BoardBase from "../../src/common/BoardBase"
import { PieceColor, PieceType } from "../../src/common/GamePieces"
import { createPiece } from "./setup/BoardHelper"

/*  Board Description
    ⚊⚊⚊♚⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ♖⚊⚊⚊♔⚊⚊⚊
*/
factory.define("board-check-castling", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("a1", PieceType.Rook, PieceColor.White, false, model),
            createPiece("e1", PieceType.King, PieceColor.White, false, model),
            createPiece("d8", PieceType.King, PieceColor.Black, true, model),
        ]

        return model
    },
})

/*  Board Description
    ⚊⚊⚊♚⚊⚊⚊⚊
    ♙⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ♔⚊⚊⚊⚊⚊⚊⚊
*/
factory.define("board-check-promotion", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("a7", PieceType.Pawn, PieceColor.White, true, model),
            createPiece("a1", PieceType.King, PieceColor.White, true, model),
            createPiece("d8", PieceType.King, PieceColor.Black, true, model),
            createPiece("h2", PieceType.Pawn, PieceColor.Black, false, model),
        ]

        return model
    },
})

/*  Board Description
    ♚♝⚊⚊⚊⚊⚊♖
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊♔⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
*/
factory.define("board-check-two-kings", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("a8", PieceType.King, PieceColor.Black, true, model),
            createPiece("b8", PieceType.Bishop, PieceColor.Black, true, model),
            createPiece("b6", PieceType.King, PieceColor.White, true, model),
            createPiece("h8", PieceType.Rook, PieceColor.White, true, model),
        ]

        return model
    },
})

export default factory
