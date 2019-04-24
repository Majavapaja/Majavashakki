import { factory } from "factory-girl"
import BoardBase from "../../src/common/BoardBase"
import { PieceColor, PieceType } from "../../src/common/GamePieces"
import { createPiece, stringToPosition } from "./BoardHelper"

// king vs king
factory.define("board-draw-notenoughpieces-1", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("e7", PieceType.King, PieceColor.Black, true, model),
            createPiece("e2", PieceType.King, PieceColor.White, true, model),
            createPiece("e3", PieceType.Pawn, PieceColor.Black, true, model),
        ]

        return model
    },
})

// King + bishop vs King + bishop on the same color
factory.define("board-draw-notenoughpieces-2", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("e7", PieceType.King, PieceColor.Black, true, model),
            createPiece("e2", PieceType.King, PieceColor.White, true, model),
            createPiece("c2", PieceType.Bishop, PieceColor.White, true, model),
            createPiece("f7", PieceType.Bishop, PieceColor.Black, true, model),
            createPiece("e3", PieceType.Pawn, PieceColor.Black, true, model),
        ]

        return model
    },
})

// King + bishop vs King + bishop on different colors
factory.define("board-draw-notenoughpieces-3", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("e7", PieceType.King, PieceColor.Black, true, model),
            createPiece("e2", PieceType.King, PieceColor.White, true, model),
            createPiece("c2", PieceType.Bishop, PieceColor.White, true, model),
            createPiece("c7", PieceType.Bishop, PieceColor.Black, true, model),
            createPiece("e3", PieceType.Pawn, PieceColor.Black, true, model),
        ]

        return model
    },
})

// King vs King + Bishop
factory.define("board-draw-notenoughpieces-4", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("e8", PieceType.King, PieceColor.Black, true, model),
            createPiece("e2", PieceType.King, PieceColor.White, true, model),
            createPiece("c2", PieceType.Bishop, PieceColor.White, true, model),
            createPiece("e3", PieceType.Pawn, PieceColor.Black, true, model),
        ]

        return model
    },
})

// King Bishop vs King
factory.define("board-draw-notenoughpieces-5", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("e8", PieceType.King, PieceColor.Black, true, model),
            createPiece("e2", PieceType.King, PieceColor.White, true, model),
            createPiece("c7", PieceType.Bishop, PieceColor.Black, true, model),
            createPiece("e3", PieceType.Pawn, PieceColor.Black, true, model),
        ]

        return model
    },
})

// King + Knight vs King
factory.define("board-draw-notenoughpieces-6", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("e8", PieceType.King, PieceColor.Black, true, model),
            createPiece("e2", PieceType.King, PieceColor.White, true, model),
            createPiece("b2", PieceType.Knight, PieceColor.White, true, model),
            createPiece("e3", PieceType.Pawn, PieceColor.Black, true, model),
        ]

        return model
    },
})

// King vs King + Knight
factory.define("board-draw-notenoughpieces-7", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("e8", PieceType.King, PieceColor.Black, true, model),
            createPiece("e2", PieceType.King, PieceColor.White, true, model),
            createPiece("b7", PieceType.Knight, PieceColor.Black, true, model),
            createPiece("e3", PieceType.Pawn, PieceColor.Black, true, model),
        ]

        return model
    },
})

/*  Board Description
    ♖♜⚊⚊⚊⚊⚊⚊
    ♟⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊♙⚊⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
    ⚊⚊♚⚊⚊⚊⚊⚊
    ⚊⚊⚊⚊⚊⚊♔⚊
    ⚊⚊⚊⚊⚊⚊⚊⚊
*/
factory.define("board-draw-49moves", BoardBase, {}, {
    afterBuild: (model, attrs, buildOptions) => {
        model.pieces = [
            createPiece("g2", PieceType.King, PieceColor.White, true, model),
            createPiece("b5", PieceType.Pawn, PieceColor.White, true, model),
            createPiece("a8", PieceType.Rook, PieceColor.White, true, model),
            createPiece("a7", PieceType.Pawn, PieceColor.Black, false, model),
            createPiece("b8", PieceType.Rook, PieceColor.Black, true, model),
            createPiece("c3", PieceType.King, PieceColor.Black, true, model),
        ];

        model.moveHistory = [
            { start: stringToPosition('h8'), destination: stringToPosition('g8'), algebraicNotation: 'Rg8' },
            { start: stringToPosition('c1'), destination: stringToPosition('c2'), algebraicNotation: 'Rc2' },
            { start: stringToPosition('g8'), destination: stringToPosition('f8'), algebraicNotation: 'Rf8' },
            { start: stringToPosition('c2'), destination: stringToPosition('d2'), algebraicNotation: 'Rd2' },
            { start: stringToPosition('f8'), destination: stringToPosition('e8'), algebraicNotation: 'Re8' },
            { start: stringToPosition('d2'), destination: stringToPosition('d1'), algebraicNotation: 'Rd1' },
            { start: stringToPosition('e8'), destination: stringToPosition('d8'), algebraicNotation: 'Rd8' },
            { start: stringToPosition('d1'), destination: stringToPosition('e1'), algebraicNotation: 'Re1' },
            { start: stringToPosition('d8'), destination: stringToPosition('c8'), algebraicNotation: 'Rc8' },
            { start: stringToPosition('e1'), destination: stringToPosition('e2'), algebraicNotation: 'Re2' },
            { start: stringToPosition('c8'), destination: stringToPosition('b8'), algebraicNotation: 'Rb8' },
            { start: stringToPosition('b7'), destination: stringToPosition('c7'), algebraicNotation: 'Kc7' },
            { start: stringToPosition('b8'), destination: stringToPosition('a8'), algebraicNotation: 'Ra8' },
            { start: stringToPosition('e2'), destination: stringToPosition('f2'), algebraicNotation: 'Rf2' },
            { start: stringToPosition('h3'), destination: stringToPosition('h4'), algebraicNotation: 'Kh4' },
            { start: stringToPosition('f2'), destination: stringToPosition('f1'), algebraicNotation: 'Rf1' },
            { start: stringToPosition('h4'), destination: stringToPosition('h5'), algebraicNotation: 'Kh5' },
            { start: stringToPosition('f1'), destination: stringToPosition('g1'), algebraicNotation: 'Rg1' },
            { start: stringToPosition('h5'), destination: stringToPosition('h6'), algebraicNotation: 'Kh6' },
            { start: stringToPosition('g1'), destination: stringToPosition('g2'), algebraicNotation: 'Rg2' },
            { start: stringToPosition('h6'), destination: stringToPosition('h7'), algebraicNotation: 'Kh7' },
            { start: stringToPosition('g2'), destination: stringToPosition('h2'), algebraicNotation: 'Rh2' },
            { start: stringToPosition('h7'), destination: stringToPosition('g8'), algebraicNotation: 'Kg8' },
            { start: stringToPosition('h2'), destination: stringToPosition('h8'), algebraicNotation: 'Rh8' },
            { start: stringToPosition('g8'), destination: stringToPosition('g7'), algebraicNotation: 'Kg7' },
            { start: stringToPosition('h8'), destination: stringToPosition('b8'), algebraicNotation: 'Rb8' },
            { start: stringToPosition('g7'), destination: stringToPosition('h7'), algebraicNotation: 'Kh7' },
            { start: stringToPosition('c7'), destination: stringToPosition('d7'), algebraicNotation: 'Kd7' },
            { start: stringToPosition('h7'), destination: stringToPosition('h6'), algebraicNotation: 'Kh6' },
            { start: stringToPosition('d7'), destination: stringToPosition('d6'), algebraicNotation: 'Kd6' },
            { start: stringToPosition('h6'), destination: stringToPosition('g6'), algebraicNotation: 'Kg6' },
            { start: stringToPosition('d6'), destination: stringToPosition('d5'), algebraicNotation: 'Kd5' },
            { start: stringToPosition('g6'), destination: stringToPosition('g5'), algebraicNotation: 'Kg5' },
            { start: stringToPosition('d5'), destination: stringToPosition('c5'), algebraicNotation: 'Kc5' },
            { start: stringToPosition('g5'), destination: stringToPosition('h5'), algebraicNotation: 'Kh5' },
            { start: stringToPosition('c5'), destination: stringToPosition('c4'), algebraicNotation: 'Kc4' },
            { start: stringToPosition('h5'), destination: stringToPosition('h4'), algebraicNotation: 'Kh4' },
            { start: stringToPosition('c4'), destination: stringToPosition('d4'), algebraicNotation: 'Kd4' },
            { start: stringToPosition('h4'), destination: stringToPosition('g4'), algebraicNotation: 'Kg4' },
            { start: stringToPosition('d4'), destination: stringToPosition('d3'), algebraicNotation: 'Kd3' },
            { start: stringToPosition('g4'), destination: stringToPosition('g3'), algebraicNotation: 'Kg3' },
            { start: stringToPosition('d3'), destination: stringToPosition('c3'), algebraicNotation: 'Kc3' },
            { start: stringToPosition('g3'), destination: stringToPosition('h3'), algebraicNotation: 'Kh3' },
            { start: stringToPosition('c3'), destination: stringToPosition('c2'), algebraicNotation: 'Kc2' },
            { start: stringToPosition('h3'), destination: stringToPosition('h2'), algebraicNotation: 'Kh2' },
            { start: stringToPosition('c2'), destination: stringToPosition('d2'), algebraicNotation: 'Kd2' },
            { start: stringToPosition('h2'), destination: stringToPosition('g2'), algebraicNotation: 'Kg2' },
            { start: stringToPosition('d2'), destination: stringToPosition('c3'), algebraicNotation: 'Kc3' },
        ]

        return model;
    },
});

export default factory
