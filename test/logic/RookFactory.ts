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
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊♜⚊⚊⚊
    ⚊⚊♜⚊⚊⚊⚊⚊
*/
factory.define("board-rook-movement", Board, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("e2", PieceType.Rook, PieceColor.White, true, model),
            createPiece("c1", PieceType.Rook, PieceColor.White, true, model),
        ];

        return model;
    },
});

/*  Board Description
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊♖⚊⚊⚊
    ⚊⚊⚊⚊♖⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊♜⚊⚊⚊
    ⚊⚊⚊⚊♜⚊⚊⚊
*/
factory.define("board-rook-capture", Board, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("e2", PieceType.Rook, PieceColor.White, true, model),
            createPiece("e1", PieceType.Rook, PieceColor.White, true, model),
            createPiece("e6", PieceType.Rook, PieceColor.Black, true, model),
            createPiece("e5", PieceType.Rook, PieceColor.Black, true, model),
        ];

        return model;
    },
});

export default factory;
