import { factory } from "factory-girl"
import BoardBase from "../../src/common/BoardBase"
import { PieceColor, PieceType } from "../../src/common/GamePieces"
import { createPiece } from "./setup/BoardHelper"

/*  Board Description
    ⚊⚊⚊⚊⚊♚⚊⚊
    ⚊⚊⚊⚊⚊♟⚊⚊
    ⚊⚊⚊⚊♗♔⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
*/
factory.define("board-stalemate-1", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("f8", PieceType.King, PieceColor.Black, true, model),
            createPiece("f7", PieceType.Pawn, PieceColor.Black, false, model),
            createPiece("e6", PieceType.Pawn, PieceColor.White, true, model),
            createPiece("f6", PieceType.King, PieceColor.White, true, model),
        ]

        return model
    },
})

/*  Board Description
    ⚊♝⚊⚊⚊⚊⚊♖
    ♚⚊⚊⚊⚊⚊⚊⚊
    ⚊♔⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
*/
factory.define("board-stalemate-2", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("a7", PieceType.King, PieceColor.Black, true, model),
            createPiece("b8", PieceType.Bishop, PieceColor.Black, true, model),
            createPiece("b6", PieceType.King, PieceColor.White, true, model),
            createPiece("h8", PieceType.Rook, PieceColor.White, true, model),
        ]

        return model
    },
})

/*  Board Description
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊♔⚊⚊⚊⚊⚊
    ⚊♖⚊⚊⚊⚊⚊⚊
    ♚⚊⚊⚊⚊⚊⚊⚊
*/
factory.define("board-stalemate-3", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("a1", PieceType.King, PieceColor.Black, true, model),
            createPiece("b2", PieceType.Rook, PieceColor.White, true, model),
            createPiece("d4", PieceType.King, PieceColor.White, true, model),
        ]

        return model
    },
})

/*  Board Description [♔♕♖♗♘♙♚♛♜♝♞♟]
    8⚊♕⚊⚊⚊⚊⚊⚊
    7⚊⚊⚊⚊⚊⚊⚊⚊
    6⚊⚊⚊⚊⚊⚊⚊⚊
    5⚊⚊⚊⚊⚊⚊♔⚊
    4⚊⚊⚊⚊⚊⚊⚊⚊
    3⚊♟⚊⚊⚊⚊⚊⚊
    2♟⚊⚊⚊⚊⚊⚊⚊
    1♚⚊⚊⚊⚊⚊⚊⚊
     abcdefgh
*/
factory.define("board-stalemate-4", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("a1", PieceType.King, PieceColor.Black, true, model),
            createPiece("a2", PieceType.Pawn, PieceColor.Black, true, model),
            createPiece("b3", PieceType.Pawn, PieceColor.Black, true, model),
            createPiece("g5", PieceType.King, PieceColor.White, true, model),
            createPiece("b8", PieceType.Queen, PieceColor.White, true, model),
        ]

        return model
    },
})

/*  Board Description [♔♕♖♗♘♙♚♛♜♝♞♟]
    8♚⚊⚊⚊⚊⚊⚊⚊
    7♙⚊⚊⚊⚊⚊⚊⚊
    6⚊⚊⚊⚊⚊⚊⚊⚊
    5♔⚊⚊⚊⚊⚊⚊⚊
    4⚊⚊⚊⚊⚊♗⚊⚊
    3⚊⚊⚊⚊⚊⚊⚊⚊
    2⚊⚊⚊⚊⚊⚊⚊⚊
    1⚊⚊⚊⚊⚊⚊⚊⚊
     abcdefgh
*/
factory.define("board-stalemate-5", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("a8", PieceType.King, PieceColor.Black, true, model),
            createPiece("f4", PieceType.Bishop, PieceColor.White, true, model),
            createPiece("a5", PieceType.King, PieceColor.White, true, model),
            createPiece("a7", PieceType.Pawn, PieceColor.White, true, model),
        ]

        return model
    },
})

/*  Board Description [♔♕♖♗♘♙♚♛♜♝♞♟]
    8⚊⚊⚊⚊⚊⚊⚊⚊
    7⚊⚊⚊⚊⚊⚊♙⚊
    6⚊⚊⚊⚊⚊⚊⚊♚
    5⚊⚊⚊⚊⚊⚊⚊⚊
    4⚊⚊⚊⚊⚊⚊♔⚊
    3⚊⚊⚊⚊⚊⚊⚊⚊
    2⚊⚊⚊⚊⚊⚊⚊⚊
    1⚊⚊⚊⚊⚊⚊⚊⚊
     abcdefgh
*/
factory.define("board-stalemate-promotion", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("h6", PieceType.King, PieceColor.Black, true, model),
            createPiece("g4", PieceType.King, PieceColor.White, true, model),
            createPiece("g7", PieceType.Pawn, PieceColor.White, true, model),
        ]

        return model
    },
})

export default factory
