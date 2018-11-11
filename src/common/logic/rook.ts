import Board from "../../server/entities/Board";
import * as Majavashakki from "../GamePieces"

export const isValidRookMovement = (board: Board, startPiece: Majavashakki.IPiece, destination: Majavashakki.IPosition): boolean => {
    const start = this.positionToNumbers(startPiece.position);
    const dest = this.positionToNumbers(destination);

    if (dest.col !== start.col && dest.row !== start.row) return false;

    while (start.col !== dest.col || start.row !== dest.row) {
        if (dest.col > start.col) dest.col --;
        else if (dest.col < start.col) dest.col ++;
        else if (dest.row > start.row) dest.row --;
        else if (dest.row < start.row) dest.row ++;

        if (start.col === dest.col && start.row === dest.row) break;

        if (board.getPiece(this.numbersToPosition(dest))) return false;
    }

    return true;
}