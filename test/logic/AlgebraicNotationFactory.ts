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
    ⚊⚊⚊⚊⚊♙⚊⚊
    ♖♘♗♕♔⚊⚊
*/
factory.define("board-an-movement", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("a1", PieceType.Rook, PieceColor.White, false, model),
            createPiece("b1", PieceType.Knight, PieceColor.White, false, model),
            createPiece("c1", PieceType.Bishop, PieceColor.White, false, model),
            createPiece("d1", PieceType.Queen, PieceColor.White, false, model),
            createPiece("e1", PieceType.King, PieceColor.White, false, model),
            createPiece("f2", PieceType.Pawn, PieceColor.White, false, model),
        ]

        return model
    },
})

/*  Board Description
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊♟⚊⚊⚊⚊⚊⚊
    ♟⚊⚊⚊⚊⚊⚊⚊
    ♟⚊⚊⚊⚊⚊⚊⚊
    ♖♘⚊⚊⚊⚊⚊⚊
*/
factory.define("board-an-captures", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("a1", PieceType.Rook, PieceColor.White, false, model),
            createPiece("b1", PieceType.Knight, PieceColor.White, false, model),
            createPiece("a2", PieceType.Pawn, PieceColor.Black, true, model),
            createPiece("a3", PieceType.Pawn, PieceColor.Black, true, model),
            createPiece("b4", PieceType.Pawn, PieceColor.Black, true, model),
        ]

        return model
    },
})

/*  Board Description
    ⚊⚊⚊♜⚊⚊⚊♜
    ♝⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊♝⚊⚊⚊⚊
    ♖⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊♕⚊⚊♕
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ♖⚊⚊⚊⚊⚊⚊♕
*/
factory.define("board-an-disambiguation", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("d8", PieceType.Rook, PieceColor.Black, true, model),
            createPiece("h8", PieceType.Rook, PieceColor.Black, true, model),
            createPiece("a7", PieceType.Bishop, PieceColor.Black, true, model),
            createPiece("d6", PieceType.Bishop, PieceColor.Black, true, model),
            createPiece("a5", PieceType.Rook, PieceColor.White, true, model),
            createPiece("e4", PieceType.Queen, PieceColor.White, true, model),
            createPiece("h4", PieceType.Queen, PieceColor.White, true, model),
            createPiece("h1", PieceType.Queen, PieceColor.White, true, model),
            createPiece("a1", PieceType.Rook, PieceColor.White, true, model),
        ]

        return model
    },
})

export default factory
