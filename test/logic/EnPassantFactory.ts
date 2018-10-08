import { factory } from "factory-girl";
import Board from "../../src/server/entities/Board";
import makeInitialState from "../../src/common/initial-state";

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
factory.define("board-enpassant", Board, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            {color: "white", type: "pawn", position: {col: "c", row: "2"}, hasMoved: false},
            {color: "black", type: "pawn", position: {col: "d", row: "4"}, hasMoved: true},
            {color: "black", type: "pawn", position: {col: "a", row: "7"}, hasMoved: false},
        ];

        return model;
    },
});

export default factory;
