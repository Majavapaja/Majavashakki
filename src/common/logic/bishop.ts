import Board from "../../server/entities/Board";
import * as Majavashakki from "../GamePieces"

export const isValidBishopMovement = (board: Board, startPiece: Majavashakki.IPiece, destination: Majavashakki.IPosition): boolean => {
    const start = this.positionToNumbers(startPiece.position);
    const dest = this.positionToNumbers(destination);

    let rowDiff = Math.abs(dest.row - start.row);
    let colDiff = Math.abs(dest.col - start.col);

    if (rowDiff !== colDiff) return false;

    while (rowDiff > 0 && colDiff > 0) {
        if (dest.col > start.col) dest.col --;
        else if (dest.col < start.col) dest.col ++;
        if (dest.row > start.row) dest.row --;
        else if (dest.row < start.row) dest.row ++;

        rowDiff--;
        colDiff--;

        if (rowDiff === 0 && colDiff === 0) break;

        if (board.getPiece(this.numbersToPosition(dest))) return false;
    }

    return true;
}
