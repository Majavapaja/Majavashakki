import Board from "../../src/server/entities/Board";
import {Position} from "../../src/common/types";

export function moveSequence(board: Board, moves: string[][]) {
    const results = [];

    for (const move of moves) {
        const result = board.move(stringToPosition(move[0]), stringToPosition(move[1]));
        if (result.kind === "success") results.push(result.moveType);
        else results.push(result.kind);
    }

    return results;
}

function stringToPosition(str): Position {
    if (!str || str.length !== 2) return null;

    const colIndex = Board.cols.indexOf(str.charAt(0));
    const rowIndex = Board.rows.indexOf(str.charAt(1));

    if ( colIndex === -1 || rowIndex === -1 ) return null;

    return {
        col: Board.cols[colIndex],
        row: Board.rows[rowIndex],
    };
}
