import { factory } from "factory-girl";
import BoardBase from "../../src/common/BoardBase";
import { PieceColor, PieceType } from "../../src/common/GamePieces"
import { createPiece } from "./BoardHelper"

/*  Board Description
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ♙⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊♙⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊♟⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
*/
factory.define("board-enpassant", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("c2", PieceType.Pawn, PieceColor.White, false, model),
            createPiece("d4", PieceType.Pawn, PieceColor.Black, true, model),
            createPiece("a7", PieceType.Pawn, PieceColor.Black, false, model),
        ];

        return model;
    },
});

export default factory;
