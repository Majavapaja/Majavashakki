import { factory } from "factory-girl";
import Board from "../../src/server/entities/Board";
import makeInitialState from "../../src/common/initial-state";

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
factory.define("board-castling", Board, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            {color: "white", type: "rook", position: {col: "a", row: "1"}, hasMoved: false},
            {color: "white", type: "queen", position: {col: "d", row: "2"}, hasMoved: false},
            {color: "white", type: "king", position: {col: "e", row: "1"}, hasMoved: false},
            {color: "white", type: "bishop", position: {col: "e", row: "2"}, hasMoved: false},
            {color: "white", type: "rook", position: {col: "h", row: "1"}, hasMoved: false},
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
factory.define("board-castling-threat", Board, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            {color: "white", type: "rook", position: {col: "a", row: "1"}, hasMoved: false},
            {color: "black", type: "rook", position: {col: "a", row: "2"}, hasMoved: false},
            {color: "white", type: "king", position: {col: "e", row: "1"}, hasMoved: false},
        ];

        return model;
    },
});

export default factory;
