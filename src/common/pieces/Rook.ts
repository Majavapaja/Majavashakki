import * as Majavashakki from "../GamePieces"
import Piece from "./Piece"
import Board from "../Board"

export default class Rook extends Piece {
    constructor(color: Majavashakki.PieceColor, position: Majavashakki.IPosition, board: Board) {
        super(color, position, board, Majavashakki.PieceType.Rook)
    }

    public isValidMove(destination: Majavashakki.IPosition): boolean {
        const start = this.positionToNumbers(this.position);
        const dest = this.positionToNumbers(destination);

        if (dest.col !== start.col && dest.row !== start.row) return false;

        while (start.col !== dest.col || start.row !== dest.row) {
            if (dest.col > start.col) dest.col --;
            else if (dest.col < start.col) dest.col ++;
            else if (dest.row > start.row) dest.row --;
            else if (dest.row < start.row) dest.row ++;

            if (start.col === dest.col && start.row === dest.row) break;

            if (this.board.getPiece(this.numbersToPosition(dest))) return false;
        }

        return true;
    }

    public clone(board: Board): Rook {
        const rook = new Rook(this.color, this.position, board)
        rook.hasMoved = this.hasMoved
        return rook
    }
}