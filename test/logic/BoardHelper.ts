import Board from "../../src/server/entities/Board";
import * as Majavashakki from "../../src/common/GamePieces"

export function moveSequence(board: Board, moves: string[][]) {
    const results = [];

    for (const move of moves) {
        const action = board.move(stringToPosition(move[0]), stringToPosition(move[1]));
        if (action.status === Majavashakki.MoveStatus.Success) results.push(action.result);
        else results.push(action.status);
    }

    return results;
}

function stringToPosition(str): Majavashakki.IPosition {
    if (!str || str.length !== 2) return null;

    const colIndex = Board.cols.indexOf(str.charAt(0));
    const rowIndex = Board.rows.indexOf(str.charAt(1));

    if ( colIndex === -1 || rowIndex === -1 ) return null;

    return {
        col: Board.cols[colIndex],
        row: Board.rows[rowIndex],
    };
}
