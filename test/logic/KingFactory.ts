import { factory } from "factory-girl";
import Board from "../../src/server/entities/Board";
import makeInitialState from "../../src/common/initial-state";

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
factory.define("board-king-movement", Board, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            {color: "white", type: "king", position: {col: "c", row: "2"}, hasMoved: true},
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
factory.define("board-king-capture", Board, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            {color: "white", type: "king", position: {col: "c", row: "2"}, hasMoved: true},
            {color: "white", type: "pawn", position: {col: "c", row: "1"}, hasMoved: true},
            {color: "black", type: "pawn", position: {col: "b", row: "2"}, hasMoved: true},
            {color: "black", type: "pawn", position: {col: "b", row: "3"}, hasMoved: true},
        ];

        return model;
    },
});

export default factory;
