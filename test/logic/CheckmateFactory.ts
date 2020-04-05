import { factory } from "factory-girl"
import BoardBase from "../../src/common/BoardBase"
import { PieceColor, PieceType } from "../../src/common/GamePieces"
import { createPiece } from "./setup/BoardHelper"

/*  Board Description
    ⚊⚊⚊♛⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊♙⚊
    ⚊⚊⚊⚊⚊♙⚊⚊
    ♙♙♙♙♙⚊⚊♙
    ⚊⚊⚊♕♔♗⚊⚊
*/
factory.define("board-foolsmate", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("a2", PieceType.Pawn, PieceColor.White, false, model),
            createPiece("b2", PieceType.Pawn, PieceColor.White, false, model),
            createPiece("c2", PieceType.Pawn, PieceColor.White, false, model),
            createPiece("d2", PieceType.Pawn, PieceColor.White, false, model),
            createPiece("e2", PieceType.Pawn, PieceColor.White, false, model),
            createPiece("f3", PieceType.Pawn, PieceColor.White, true, model),
            createPiece("g4", PieceType.Pawn, PieceColor.White, true, model),
            createPiece("h2", PieceType.Pawn, PieceColor.White, false, model),
            createPiece("d1", PieceType.Queen, PieceColor.White, false, model),
            createPiece("e1", PieceType.King, PieceColor.White, false, model),
            createPiece("f1", PieceType.Bishop, PieceColor.White, false, model),

            createPiece("d8", PieceType.Queen, PieceColor.Black, true, model),
        ]

        return model
    },
})

/*  Board Description
    ⚊♕⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊♟♚⚊
    ⚊⚊♟⚊⚊⚊♟⚊
    ⚊♟⚊⚊♘⚊⚊♟
    ⚊♝⚊⚊⚊⚊⚊♙
    ⚊♝♞⚊⚊⚊⚊⚊
    ♜⚊⚊⚊⚊⚊♙⚊
    ⚊⚊♔⚊⚊⚊⚊⚊
*/
factory.define("board-gameofcentury", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("b8", PieceType.Queen, PieceColor.White, true, model),
            createPiece("e5", PieceType.Knight, PieceColor.White, true, model),
            createPiece("h4", PieceType.Pawn, PieceColor.White, true, model),
            createPiece("g2", PieceType.Pawn, PieceColor.White, true, model),
            createPiece("c1", PieceType.King, PieceColor.White, true, model),

            createPiece("f7", PieceType.Pawn, PieceColor.Black, true, model),
            createPiece("g7", PieceType.King, PieceColor.Black, true, model),
            createPiece("c6", PieceType.Pawn, PieceColor.Black, true, model),
            createPiece("g6", PieceType.Pawn, PieceColor.Black, true, model),
            createPiece("b5", PieceType.Pawn, PieceColor.Black, true, model),
            createPiece("h5", PieceType.Pawn, PieceColor.Black, true, model),
            createPiece("b4", PieceType.Bishop, PieceColor.Black, true, model),
            createPiece("b3", PieceType.Bishop, PieceColor.Black, true, model),
            createPiece("c3", PieceType.Knight, PieceColor.Black, true, model),
            createPiece("a2", PieceType.Rook, PieceColor.Black, true, model),
        ]

        return model
    },
})

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
