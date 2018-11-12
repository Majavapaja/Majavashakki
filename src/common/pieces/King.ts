import * as Majavashakki from "../../common/GamePieces"
import Piece from "./Piece"
import Board from "../Board"
import { isCheck, doesMoveCauseCheck } from "../logic/Checkmate"

export default class King extends Piece {
    constructor(color: Majavashakki.PieceColor, position: Majavashakki.IPosition, board: Board) {
        super(color, position, board, Majavashakki.PieceType.King)
    }

    public isValidMove(destination: Majavashakki.IPosition): boolean {
        const start = this.positionToNumbers(this.position);
        const dest = this.positionToNumbers(destination);

        const rowDiff = Math.abs(dest.row - start.row);
        const colDiff = Math.abs(dest.col - start.col);

        if (colDiff > 1 || rowDiff > 1) return false;

        return true;
    }

    public isCastling(destination: Majavashakki.IPosition): boolean {
        // Check that this king hasn't moved
        if (this.hasMoved) return false;

        // Check that destination is two columns away from king
        const start = this.positionToNumbers(this.position);
        const dest = this.positionToNumbers(destination);

        const rowDiff = dest.row - start.row;
        const colDiff = dest.col - start.col;

        if (Math.abs(colDiff) !== 2 || Math.abs(rowDiff) !== 0) return false;

        // Get rook from A1, H1, A8, H8 depending on the kings destination and color
        const rookPosition: Majavashakki.IPosition = {
            col: (colDiff > 0) ? "h" : "a",
            row: this.color === "white" ? "1" : "8",
        };

        const rook = this.board.getPiece(rookPosition);

        // Check that rook hasn't moved
        if (!rook || rook.hasMoved) return false;

        // King is not currently in check
        if (isCheck(this.board, this.color)) return false;

        // There must be no pieces between king and rook
        // King cannot pass throught a square attacked by an enemy piece

        // Check that king can move two steps to the direction he wanted
        const direction = (colDiff > 0) ? 1 : -1;

        // Move 1
        dest.col -= direction;
        if (doesMoveCauseCheck(this.board, this.position, this.numbersToPosition(dest))) return false;
        if (this.board.getPiece(this.numbersToPosition(dest))) return false;

        // Move 2
        dest.col += direction;
        if (doesMoveCauseCheck(this.board, this.position, this.numbersToPosition(dest))) return false;
        if (this.board.getPiece(this.numbersToPosition(dest))) return false;

        // Check that rook can move to "Move 1" position.
        dest.col -= direction;
        if (!rook.isValidMove(this.numbersToPosition(dest))) return false;

        // Valid castling
        return true;
    }

    public clone(board: Board): King {
        const king = new King(this.color, this.position, board)
        king.hasMoved = this.hasMoved
        return king
    }
}