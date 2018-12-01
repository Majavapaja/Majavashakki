import { factory } from "factory-girl";
import BoardBase from "../../src/common/BoardBase";
import { PieceColor, PieceType } from "../../src/common/GamePieces"
import { createPiece } from "./BoardHelper"

/*  Board Description ♔♚
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊♔⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
*/
factory.define("board-king-movement", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("c2", PieceType.King, PieceColor.White, true, model),
        ];

        return model;
    },
});

/*  Board Description ♔♚ ♟♙
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊♟⚊⚊⚊⚊⚊⚊
    ⚊♟♔⚊⚊⚊⚊⚊
    ⚊⚊♙⚊⚊⚊⚊⚊
*/
factory.define("board-king-capture", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("c2", PieceType.King, PieceColor.White, true, model),
            createPiece("c1", PieceType.Pawn, PieceColor.White, true, model),
            createPiece("b2", PieceType.Pawn, PieceColor.Black, true, model),
            createPiece("b3", PieceType.Pawn, PieceColor.Black, true, model),
        ];

        return model;
    },
});

export default factory;
