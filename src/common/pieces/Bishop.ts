import * as Majavashakki from "../GamePieces"
import Piece from "./Piece"
import BoardBase from "../BoardBase"

export default class Bishop extends Piece {
    constructor(color: Majavashakki.PieceColor, position: Majavashakki.IPosition, board: BoardBase) {
        super(color, position, board, Majavashakki.PieceType.Bishop)
    }

    public isValidMove(destination: Majavashakki.IPosition): boolean {
        const start = this.positionToNumbers(this.position);
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

            if (this.board.getPiece(this.numbersToPosition(dest))) return false;
        }

        return true;
    }

    public clone(board: BoardBase): Bishop {
        const bishop = new Bishop(this.color, this.position, board)
        bishop.hasMoved = this.hasMoved
        return bishop
    }
}