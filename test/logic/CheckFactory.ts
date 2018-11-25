import { factory } from "factory-girl";
import Board from "../../src/common/Board";
import { PieceColor, PieceType } from "../../src/common/GamePieces"
import { createPiece } from "./BoardHelper"

/*  Board Description
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊♜⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊♔⚊⚊⚊⚊⚊
*/
factory.define("board-check", Board, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("b3", PieceType.Rook, PieceColor.Black, false, model),
            createPiece("c1", PieceType.King, PieceColor.White, false, model),
        ];

        return model;
    },
});

/*  Board Description
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊♞⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ♖⚊♜♔⚊⚊⚊⚊
*/
factory.define("board-king-in-check", Board, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("c1", PieceType.Rook, PieceColor.Black, true, model),
            createPiece("d3", PieceType.Knight, PieceColor.Black, true, model),
            createPiece("d1", PieceType.King, PieceColor.White, true, model),
            createPiece("a1", PieceType.Rook, PieceColor.White, true, model),
        ];

        return model;
    },
});

/*  Board Description
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ♜⚊♖♔⚊⚊⚊⚊
*/
factory.define("board-check-from-own-move", Board, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("d1", PieceType.King, PieceColor.White, true, model),
            createPiece("c1", PieceType.Rook, PieceColor.White, true, model),
            createPiece("a1", PieceType.Rook, PieceColor.Black, true, model),
        ];

        return model;
    },
});

/*  Board Description
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ♟♚⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊♙⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
*/
factory.define("board-check-enpassant", Board, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("b5", PieceType.Pawn, PieceColor.White, true, model),
            createPiece("a7", PieceType.Pawn, PieceColor.Black, false, model),
            createPiece("b7", PieceType.King, PieceColor.Black, true, model),
        ];

        return model;
    },
});

export default factory;
