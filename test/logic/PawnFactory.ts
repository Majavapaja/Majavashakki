import { factory } from "factory-girl";
import BoardBase from "../common/BoardBase";
import { PieceColor, PieceType } from "../../src/common/GamePieces"
import { createPiece } from "./BoardHelper"

factory.define("board", BoardBase, {});

/*  Board Description
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊♙♟♟⚊⚊⚊
    ⚊⚊⚊♙♙♟⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
*/
factory.define("board-pawn-capture", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("c5", PieceType.Pawn, PieceColor.White, true, model),
            createPiece("d5", PieceType.Pawn, PieceColor.Black, true, model),
            createPiece("e5", PieceType.Pawn, PieceColor.Black, true, model),
            createPiece("d4", PieceType.Pawn, PieceColor.White, true, model),
            createPiece("e4", PieceType.Pawn, PieceColor.White, true, model),
            createPiece("f4", PieceType.Pawn, PieceColor.Black, true, model),
        ];

        return model;
    },
});

/*  Board Description
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ♟♟♟⚊⚊⚊⚊⚊
    ♟⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊♙⚊⚊⚊⚊
    ⚊⚊⚊♟⚊⚊⚊⚊
    ♙⚊⚊⚊⚊⚊⚊⚊
    ♙♙♙⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
*/
factory.define("board-pawn-double-move", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("a7", PieceType.Pawn, PieceColor.Black, false, model),
            createPiece("b7", PieceType.Pawn, PieceColor.Black, false, model),
            createPiece("c7", PieceType.Pawn, PieceColor.Black, false, model),
            createPiece("a6", PieceType.Pawn, PieceColor.Black, true, model),
            createPiece("d5", PieceType.Pawn, PieceColor.White, true, model),
            createPiece("a2", PieceType.Pawn, PieceColor.White, false, model),
            createPiece("b2", PieceType.Pawn, PieceColor.White, false, model),
            createPiece("c2", PieceType.Pawn, PieceColor.White, false, model),
            createPiece("a3", PieceType.Pawn, PieceColor.White, true, model),
            createPiece("d4", PieceType.Pawn, PieceColor.Black, true, model),
        ];

        return model;
    },
});

export default factory;
