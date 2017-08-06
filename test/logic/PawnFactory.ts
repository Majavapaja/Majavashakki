import { factory } from "factory-girl";
import Board from "../../src/server/entities/Board";
import makeInitialState from "../../src/common/initial-state";

factory.define("board", Board, {});

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
factory.define("board-capture", Board, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            {color: "white", type: "pawn", position: {col: "c", row: "5"}, hasMoved: true},
            {color: "black", type: "pawn", position: {col: "d", row: "5"}, hasMoved: true},
            {color: "black", type: "pawn", position: {col: "e", row: "5"}, hasMoved: true},
            {color: "white", type: "pawn", position: {col: "d", row: "4"}, hasMoved: true},
            {color: "white", type: "pawn", position: {col: "e", row: "4"}, hasMoved: true},
            {color: "black", type: "pawn", position: {col: "f", row: "4"}, hasMoved: true},
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
factory.define("board-double-move", Board, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            {color: "black", type: "pawn", position: {col: "a", row: "7"}, hasMoved: false},
            {color: "black", type: "pawn", position: {col: "b", row: "7"}, hasMoved: false},
            {color: "black", type: "pawn", position: {col: "c", row: "7"}, hasMoved: false},
            {color: "black", type: "pawn", position: {col: "a", row: "6"}, hasMoved: true},
            {color: "white", type: "pawn", position: {col: "d", row: "5"}, hasMoved: false},
            {color: "white", type: "pawn", position: {col: "a", row: "2"}, hasMoved: false},
            {color: "white", type: "pawn", position: {col: "b", row: "2"}, hasMoved: false},
            {color: "white", type: "pawn", position: {col: "c", row: "2"}, hasMoved: false},
            {color: "white", type: "pawn", position: {col: "a", row: "3"}, hasMoved: true},
            {color: "black", type: "pawn", position: {col: "d", row: "4"}, hasMoved: false},
        ];

        return model;
    },
});

export default factory;
