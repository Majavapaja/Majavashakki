import { factory } from "factory-girl"
import BoardBase from "../../src/common/BoardBase"
import { PieceColor, PieceType } from "../../src/common/GamePieces"
import { createPiece } from "./setup/BoardHelper"

/*  Board Description
    ⚊⚊⚊⚊⚊⚊⚊♖
    ♟♚⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊♖
    ⚊♙♕⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
*/
factory.define("board-checkmate-enpassant", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("b5", PieceType.Pawn, PieceColor.White, true, model),
            createPiece("h6", PieceType.Rook, PieceColor.White, true, model),
            createPiece("h8", PieceType.Rook, PieceColor.White, true, model),
            createPiece("c5", PieceType.Queen, PieceColor.White, true, model),
            createPiece("a7", PieceType.Pawn, PieceColor.Black, false, model),
            createPiece("b7", PieceType.King, PieceColor.Black, true, model),
        ]

        return model
    },
})

/*  Board Description
    ♜⚊♜⚊⚊⚊⚊⚊
    ♟⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊♙⚊⚊⚊⚊⚊♜
    ⚊♔⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊♜
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
*/
factory.define("board-checkmate-enpassant-save", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("b5", PieceType.Pawn, PieceColor.White, true, model),
            createPiece("b4", PieceType.King, PieceColor.White, true, model),
            createPiece("a8", PieceType.Rook, PieceColor.Black, true, model),
            createPiece("c8", PieceType.Rook, PieceColor.Black, true, model),
            createPiece("h5", PieceType.Rook, PieceColor.Black, true, model),
            createPiece("h3", PieceType.Rook, PieceColor.Black, true, model),
            createPiece("a7", PieceType.Pawn, PieceColor.Black, false, model),
        ]

        return model
    },
})

/*  Board Description
    ⚊⚊♜♚♜⚊⚊⚊
    ⚊⚊♟⚊♟⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ♖⚊⚊⚊♔⚊⚊⚊
*/
factory.define("board-checkmate-castling", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("a1", PieceType.Rook, PieceColor.White, false, model),
            createPiece("e1", PieceType.King, PieceColor.White, false, model),
            createPiece("d8", PieceType.King, PieceColor.Black, true, model),
            createPiece("c8", PieceType.Rook, PieceColor.Black, true, model),
            createPiece("e8", PieceType.Rook, PieceColor.Black, true, model),
            createPiece("c7", PieceType.Pawn, PieceColor.Black, false, model),
            createPiece("e7", PieceType.Pawn, PieceColor.Black, false, model),
        ]

        return model
    },
})

export default factory
