import { factory } from "factory-girl";
import Board from "../../src/server/entities/Board";
import makeInitialState from "../../src/common/initial-state";

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
            {color: "black", type: "rook", position: {col: "b", row: "3"}, hasMoved: false},
            {color: "white", type: "king", position: {col: "c", row: "1"}, hasMoved: false},
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
            {color: "black", type: "rook", position: {col: "c", row: "1"}, hasMoved: true},
            {color: "black", type: "knight", position: {col: "d", row: "3"}, hasMoved: true},
            {color: "white", type: "king", position: {col: "d", row: "1"}, hasMoved: true},
            {color: "white", type: "rook", position: {col: "a", row: "1"}, hasMoved: true},
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
            {color: "white", type: "king", position: {col: "d", row: "1"}, hasMoved: true},
            {color: "white", type: "rook", position: {col: "c", row: "1"}, hasMoved: true},
            {color: "black", type: "rook", position: {col: "a", row: "1"}, hasMoved: true},
        ];

        return model;
    },
});

export default factory;
