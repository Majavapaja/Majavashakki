import Board from "../../server/entities/Board";
import {doesMoveCauseCheck, isCheck} from "./Checkmate";
import * as Majavashakki from "../../common/GamePieces"
import { isValidPawnMovement, isEnPassant } from "./pawn"
import { isValidKingMovement, isCastling } from "./king"
import { isValidBishopMovement } from "./bishop"
import { isValidRookMovement } from "./rook"

class MovementValidator {
    public isValidMove(board: Board, start: Majavashakki.IPosition, destination: Majavashakki.IPosition): Majavashakki.IMoveResponse {
        const errorResponse: Majavashakki.IMoveResponse = {status: Majavashakki.MoveStatus.Error, error: "Error 10: Invalid move!"} as Majavashakki.IMoveResponse;

        // Check that start and destination are not the same
        if (board.comparePos(start, destination)) return errorResponse;

        // Check that start and destination are within board
        if (!board.isWithinBoard(start) || !board.isWithinBoard(destination)) {
            return errorResponse;
        }

        // Check that there is a piece at start position
        const startPiece: Majavashakki.IPiece = board.getPiece(start);
        if (!startPiece) return errorResponse;

        // Check that destination is valid (different color or empty)
        const destinationPiece: Majavashakki.IPiece = board.getPiece(destination);
        if (destinationPiece && destinationPiece.color === startPiece.color) {
            return errorResponse;
        }

        // Check that piece movement is valid
        if (!this.checkMovement(board, startPiece, destination)) {
            if (isEnPassant(board, startPiece, destination)) {
                return {status: Majavashakki.MoveStatus.Success, result: Majavashakki.MoveResult.Enpassant, board: null} as Majavashakki.IMoveResponse;
            }

            if (isCastling(board, startPiece, destination)) {
                return {status: Majavashakki.MoveStatus.Success, result: Majavashakki.MoveResult.Castling, board: null} as Majavashakki.IMoveResponse;
            }

            return errorResponse;
        }

        if (doesMoveCauseCheck(board, start, destination)) return errorResponse;

        // Piece movement was valid
        if (destinationPiece) return {status: Majavashakki.MoveStatus.Success, result: Majavashakki.MoveResult.Capture, board: null} as Majavashakki.IMoveResponse;
        else  return {status: Majavashakki.MoveStatus.Success, result: Majavashakki.MoveResult.Move, board: null} as Majavashakki.IMoveResponse;
    }

    public positionToNumbers(pos: Majavashakki.IPosition) {
        return {col: Board.cols.indexOf(pos.col), row: Board.rows.indexOf(pos.row)};
    }

    public numbersToPosition(pos): Majavashakki.IPosition {
        return {col: Board.cols.charAt(pos.col), row: Board.rows.charAt(pos.row)};
    }

    private checkMovement(board: Board, startPiece: Majavashakki.IPiece, destination: Majavashakki.IPosition): boolean {
        switch (startPiece.type) {
            case "pawn":
                return isValidPawnMovement(board, startPiece, destination);
            case "knight":
                return this.knightMovement(board, startPiece, destination);
            case "rook":
                return isValidRookMovement(board, startPiece, destination);
            case "bishop":
                return isValidBishopMovement(board, startPiece, destination);
            case "queen":
                return this.queenMovement(board, startPiece, destination);
            case "king":
                return isValidKingMovement(board, startPiece, destination);
        }
    }

    private knightMovement(board: Board, startPiece: Majavashakki.IPiece, destination: Majavashakki.IPosition): boolean {
        const start = this.positionToNumbers(startPiece.position);
        const dest = this.positionToNumbers(destination);

        const rowDiff = Math.abs(dest.row - start.row);
        const colDiff = Math.abs(dest.col - start.col);

        if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
            return true;
        }

        return false;
    }

    private queenMovement(board: Board, startPiece: Majavashakki.IPiece, destination: Majavashakki.IPosition): boolean {
        return isValidRookMovement(board, startPiece, destination) || isValidBishopMovement(board, startPiece, destination);
    }
}

const movementValidator = new MovementValidator();
export default movementValidator;
