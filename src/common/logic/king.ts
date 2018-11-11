import Board from "../../server/entities/Board";
import * as Majavashakki from "../GamePieces"
import {doesMoveCauseCheck, isCheck} from "./Checkmate";

export const isValidKingMovement = (board: Board, startPiece: Majavashakki.IPiece, destination: Majavashakki.IPosition) => {
    const start = this.positionToNumbers(startPiece.position);
    const dest = this.positionToNumbers(destination);

    const rowDiff = Math.abs(dest.row - start.row);
    const colDiff = Math.abs(dest.col - start.col);

    if (colDiff > 1 || rowDiff > 1) return false;

    return true;
}

export const isCastling = (board: Board, startPiece: Majavashakki.IPiece, destination: Majavashakki.IPosition): boolean => {
    // Check that the piece is king and it hasn't moved
    if (startPiece.type !== "king" || startPiece.hasMoved) return false;

    // Check that destination is two columns away from king
    const start = this.positionToNumbers(startPiece.position);
    const dest = this.positionToNumbers(destination);

    const rowDiff = dest.row - start.row;
    const colDiff = dest.col - start.col;

    if (Math.abs(colDiff) !== 2 || Math.abs(rowDiff) !== 0) return false;

    // Get rook from A1, H1, A8, H8 depending on the kings destination and color
    const rookPosition: Majavashakki.IPosition = {
        col: (colDiff > 0) ? "h" : "a",
        row: startPiece.color === "white" ? "1" : "8",
    };

    const rook = board.getPiece(rookPosition);

    // Check that rook hasn't moved
    if (!rook || rook.hasMoved) return false;

    // King is not currently in check
    if (isCheck(board, startPiece.color)) return false;

    // There must be no pieces between king and rook
    // King cannot pass throught a square attacked by an enemy piece

    // Check that king can move two steps to the direction he wanted
    const direction = (colDiff > 0) ? 1 : -1;

    // Move 1
    dest.col -= direction;
    if (doesMoveCauseCheck(board, startPiece.position, this.numbersToPosition(dest))) return false;
    if (board.getPiece(this.numbersToPosition(dest))) return false;

    // Move 2
    dest.col += direction;
    if (doesMoveCauseCheck(board, startPiece.position, this.numbersToPosition(dest))) return false;
    if (board.getPiece(this.numbersToPosition(dest))) return false;

    // Check that rook can move to "Move 1" position.
    dest.col -= direction;
    if (!this.isValidMove(board, rookPosition, this.numbersToPosition(dest))) return false;

    // Valid castling
    return true;
}
