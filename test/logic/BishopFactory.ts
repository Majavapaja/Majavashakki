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
    ⚊⚊♝⚊♝⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
*/
factory.define("board-bishop-movement", Board, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            {color: "white", type: "bishop", position: {col: "c", row: "2"}, hasMoved: true},
            {color: "white", type: "bishop", position: {col: "e", row: "2"}, hasMoved: true},
        ];

        return model;
    },
});

/*  Board Description
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ♗⚊⚊⚊⚊⚊⚊⚊
    ⚊♗⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊♝⚊⚊⚊
    ⚊⚊⚊♝⚊⚊⚊⚊
*/
factory.define("board-bishop-capture", Board, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            {color: "white", type: "bishop", position: {col: "e", row: "2"}, hasMoved: true},
            {color: "white", type: "bishop", position: {col: "d", row: "1"}, hasMoved: true},
            {color: "black", type: "bishop", position: {col: "a", row: "6"}, hasMoved: true},
            {color: "black", type: "bishop", position: {col: "b", row: "5"}, hasMoved: true},
        ];

        return model;
    },
});

export default factory;
