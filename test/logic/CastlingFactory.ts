import { factory } from "factory-girl";
import BoardBase from "../../src/common/BoardBase";
import { PieceColor, PieceType } from "../../src/common/GamePieces"
import { createPiece } from "./BoardHelper"

/*  Board Description
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊♕♗⚊⚊⚊
    ♖⚊⚊⚊♔⚊⚊♖
*/
factory.define("board-castling", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("a1", PieceType.Rook, PieceColor.White, false, model),
            createPiece("d2", PieceType.Queen, PieceColor.White, false, model),
            createPiece("e1", PieceType.King, PieceColor.White, false, model),
            createPiece("e2", PieceType.Bishop, PieceColor.White, false, model),
            createPiece("h1", PieceType.Rook, PieceColor.White, false, model),
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
    ♜⚊⚊⚊⚊⚊⚊⚊
    ♖⚊⚊⚊♔⚊⚊♖
*/
factory.define("board-castling-threat", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("a1", PieceType.Rook, PieceColor.White, false, model),
            createPiece("a2", PieceType.Rook, PieceColor.Black, false, model),
            createPiece("e1", PieceType.King, PieceColor.White, false, model),
        ];

        return model;
    },
});

export default factory;
