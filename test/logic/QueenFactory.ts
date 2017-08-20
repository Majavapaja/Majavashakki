import { factory } from "factory-girl";
import Board from "../../src/server/entities/Board";
import makeInitialState from "../../src/common/initial-state";

/*  Board Description ♛♕
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊♛⚊♛⚊⚊⚊
    ⚊⚊♛⚊⚊⚊⚊⚊
*/
factory.define("board-queen-movement", Board, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            {color: "white", type: "queen", position: {col: "e", row: "2"}, hasMoved: true},
            {color: "white", type: "queen", position: {col: "c", row: "1"}, hasMoved: true},
            {color: "white", type: "queen", position: {col: "c", row: "2"}, hasMoved: true},
        ];

        return model;
    },
});

/*  Board Description ♛♕
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ♕⚊⚊⚊⚊⚊⚊⚊
    ⚊♕⚊⚊♕⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊♛⚊⚊⚊
    ⚊⚊⚊⚊♛⚊⚊⚊
*/
factory.define("board-queen-capture", Board, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            {color: "white", type: "queen", position: {col: "e", row: "2"}, hasMoved: true},
            {color: "white", type: "queen", position: {col: "e", row: "1"}, hasMoved: true},
            {color: "black", type: "queen", position: {col: "e", row: "5"}, hasMoved: true},
            {color: "black", type: "queen", position: {col: "a", row: "6"}, hasMoved: true},
            {color: "black", type: "queen", position: {col: "b", row: "5"}, hasMoved: true},
        ];

        return model;
    },
});

export default factory;
