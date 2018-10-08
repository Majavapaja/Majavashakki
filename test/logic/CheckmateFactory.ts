import { factory } from "factory-girl";
import Board from "../../src/server/entities/Board";
import makeInitialState from "../../src/common/initial-state";

/*  Board Description
    ⚊⚊⚊♛⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊♙⚊
    ⚊⚊⚊⚊⚊♙⚊⚊
    ♙♙♙♙♙⚊⚊♙
    ⚊⚊⚊♕♔♗⚊⚊
*/
factory.define("board-foolsmate", Board, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            {color: "white", type: "pawn", position: {col: "a", row: "2"}, hasMoved: false},
            {color: "white", type: "pawn", position: {col: "b", row: "2"}, hasMoved: false},
            {color: "white", type: "pawn", position: {col: "c", row: "2"}, hasMoved: false},
            {color: "white", type: "pawn", position: {col: "d", row: "2"}, hasMoved: false},
            {color: "white", type: "pawn", position: {col: "e", row: "2"}, hasMoved: false},
            {color: "white", type: "pawn", position: {col: "f", row: "3"}, hasMoved: true},
            {color: "white", type: "pawn", position: {col: "g", row: "4"}, hasMoved: true},
            {color: "white", type: "pawn", position: {col: "h", row: "2"}, hasMoved: false},
            {color: "white", type: "queen", position: {col: "d", row: "1"}, hasMoved: false},
            {color: "white", type: "king", position: {col: "e", row: "1"}, hasMoved: false},
            {color: "white", type: "bishop", position: {col: "f", row: "1"}, hasMoved: false},

            {color: "black", type: "queen", position: {col: "d", row: "8"}, hasMoved: true},
        ];

        return model;
    },
});

/*  Board Description
    ⚊♕⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊♟♚⚊
    ⚊⚊♟⚊⚊⚊♟⚊
    ⚊♟⚊⚊♘⚊⚊♟
    ⚊♝⚊⚊⚊⚊⚊♙
    ⚊♝♞⚊⚊⚊⚊⚊
    ♜⚊⚊⚊⚊⚊♙⚊
    ⚊⚊♔⚊⚊⚊⚊⚊
*/
factory.define("board-gameofcentury", Board, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            {color: "white", type: "queen", position: {col: "b", row: "8"}, hasMoved: true},
            {color: "white", type: "knight", position: {col: "e", row: "5"}, hasMoved: true},
            {color: "white", type: "pawn", position: {col: "h", row: "4"}, hasMoved: true},
            {color: "white", type: "pawn", position: {col: "g", row: "2"}, hasMoved: true},
            {color: "white", type: "king", position: {col: "c", row: "1"}, hasMoved: true},

            {color: "black", type: "pawn", position: {col: "f", row: "7"}, hasMoved: true},
            {color: "black", type: "king", position: {col: "g", row: "7"}, hasMoved: true},
            {color: "black", type: "pawn", position: {col: "c", row: "6"}, hasMoved: true},
            {color: "black", type: "pawn", position: {col: "g", row: "6"}, hasMoved: true},
            {color: "black", type: "pawn", position: {col: "b", row: "5"}, hasMoved: true},
            {color: "black", type: "pawn", position: {col: "h", row: "5"}, hasMoved: true},
            {color: "black", type: "bishop", position: {col: "b", row: "4"}, hasMoved: true},
            {color: "black", type: "bishop", position: {col: "b", row: "3"}, hasMoved: true},
            {color: "black", type: "knight", position: {col: "c", row: "3"}, hasMoved: true},
            {color: "black", type: "rook", position: {col: "a", row: "2"}, hasMoved: true},
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
    ⚊♟♟♞⚊⚊⚊⚊
    ⚊⚊♜⚊⚊⚊⚊⚊
    ⚊⚊⚊♔⚊⚊⚊⚊
*/
factory.define("board-doublecheck", Board, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            {color: "white", type: "king", position: {col: "d", row: "1"}, hasMoved: true},
            {color: "black", type: "bishop", position: {col: "b", row: "3"}, hasMoved: true},
            {color: "black", type: "bishop", position: {col: "c", row: "3"}, hasMoved: true},
            {color: "black", type: "knight", position: {col: "d", row: "3"}, hasMoved: true},
            {color: "black", type: "rook", position: {col: "c", row: "2"}, hasMoved: true},
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
    ⚊⚊♜⚊⚊⚊⚊⚊
    ⚊⚊⚊♔⚊⚊⚊⚊
*/
factory.define("board-kingcanmove", Board, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            {color: "white", type: "king", position: {col: "d", row: "1"}, hasMoved: true},
            {color: "black", type: "rook", position: {col: "c", row: "2"}, hasMoved: true},
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
⚊⚊♟♞⚊⚊⚊⚊
⚊⚊♜⚊⚊⚊⚊⚊
⚊⚊⚊♔♕⚊⚊⚊
*/
factory.define("board-checkmate-piececancapture", Board, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            {color: "white", type: "king", position: {col: "d", row: "1"}, hasMoved: true},
            {color: "white", type: "queen", position: {col: "e", row: "1"}, hasMoved: true},
            {color: "black", type: "rook", position: {col: "c", row: "2"}, hasMoved: true},
            {color: "black", type: "knight", position: {col: "d", row: "3"}, hasMoved: true},
            {color: "black", type: "bishop", position: {col: "c", row: "3"}, hasMoved: true},
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
⚊⚊♟♞⚊⚊⚊⚊
♜⚊⚊⚊⚊♕⚊♜
⚊⚊⚊♔⚊⚊⚊⚊
*/
factory.define("board-checkmate-piececanblock", Board, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            {color: "white", type: "king", position: {col: "d", row: "1"}, hasMoved: true},
            {color: "white", type: "queen", position: {col: "f", row: "2"}, hasMoved: true},
            {color: "black", type: "rook", position: {col: "h", row: "2"}, hasMoved: true},
            {color: "black", type: "rook", position: {col: "a", row: "2"}, hasMoved: true},
            {color: "black", type: "knight", position: {col: "d", row: "3"}, hasMoved: true},
            {color: "black", type: "bishop", position: {col: "c", row: "3"}, hasMoved: true},
        ];

        return model;
    },
});

export default factory;
