import { factory } from "factory-girl"
import BoardBase from "../../src/common/BoardBase"
import { PieceColor, PieceType } from "../../src/common/GamePieces"
import { createPiece } from "./BoardHelper"

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

export default factory
