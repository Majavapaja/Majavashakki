import Board from "../entities/Board";
import {copy} from "../../common/util";
import {Piece, Position} from "../../common/types";
import MovementValidator from "./MovementValidator";

export function isCheck(board: Board, color): boolean {
    // Get current players king
    const king = board.getKing(color);

    // TODO: Remove this check unless you can think a reason why it should be here.
    if (!king) {
        console.error("Error MissingNo: This should not happen. Kuningasta ei voi syödä ja se on silti syöty...");
        return false;
    }

    // Check if any piece of opposite color can eat king
    for (const piece of board.pieces) {
        if (piece.color !== color) {
            const result = MovementValidator.isValidMove(board, piece.position, king.position);
            if (result.kind === "success") return true;
        }
    }

    return false;
}

export function doesMoveCauseCheck(board: Board, startPiece: Piece, destination: Position): boolean {
    const boardCopy: Board = new Board();
    boardCopy.pieces = copy(board.pieces);

    boardCopy.removePiece(destination);
    const startPieceCopy: Piece = boardCopy.getPiece(startPiece.position);
    startPieceCopy.position = destination;
    startPieceCopy.hasMoved = true;

    // Check if board is in check after moving
    return isCheck(boardCopy, startPieceCopy.color);
}
