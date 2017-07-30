import {Piece, Position} from "../../common/types";
import Board from "../entities/Board";
import {doesMoveCauseCheck} from "./Checkmate";
import {MoveResponse, MoveSuccess, MoveError} from "../../common/protocol";

class MovementValidator {
    public isValidMove(board: Board, start: Position, destination: Position): MoveResponse {
        const errorResponse: MoveResponse = {kind: "error", error: "Error 10: Invalid move!"};

        // Check that start and destination are not the same
        if (board.comparePos(start, destination)) return errorResponse;

        // Check that start and destination are within board
        if (!board.isWithinBoard(start) || !board.isWithinBoard(destination)) {
            return errorResponse;
        }

        // Check that there is a piece at start position
        const startPiece: Piece = board.getPiece(start);
        if (!startPiece) return errorResponse;

        // Check that destination is valid (different color or empty)
        const destinationPiece: Piece = board.getPiece(destination);
        if (destinationPiece && destinationPiece.color === startPiece.color) {
            // TODO: Check castling
            return errorResponse;
        }

        // Check that piece movement is valid
        if (!this.checkMovement(board, startPiece, destination)) {
            // TODO: Check En Passant
            return errorResponse;
        }

        if (doesMoveCauseCheck(board, startPiece, destination)) return errorResponse;

        // Piece movement was valid

        if (destinationPiece) return {kind: "success", moveType: "capture", board: null};
        else return {kind: "success", moveType: "move", board: null};
    }

    private checkMovement(board: Board, startPiece: Piece, destination: Position) {
        switch (startPiece.type) {
            case "pawn":
                return this.pawnMovement(board, startPiece, destination);
            case "knight":
                return this.knightMovement(board, startPiece, destination);
            case "rook":
                return this.rookMovement(board, startPiece, destination);
            case "bishop":
                return this.bishopMovement(board, startPiece, destination);
            case "queen":
                return this.queenMovement(board, startPiece, destination);
            case "king":
                return this.kingMovement(board, startPiece, destination);
        }
    }

    private pawnMovement(board: Board, startPiece: Piece, destination: Position): boolean {
        const start = this.positionToNumbers(startPiece.position);
        const dest = this.positionToNumbers(destination);

        const rowDiff = dest.row - start.row;
        const colDiff = dest.col - start.col;

        const destinationPiece = board.getPiece(destination);

        const movementDirection = startPiece.color === "white" ? 1 : -1;

        // Check if pawn is capturing
        if (destinationPiece && rowDiff === movementDirection && (colDiff === 1 || colDiff === -1)) return true;
        else if (!destinationPiece && colDiff === 0) {
            // Check if pawn is moving
            if (!startPiece.hasMoved && rowDiff === movementDirection * 2) {
                // Ensure that double move is not blocked by piece
                dest.row -= movementDirection;
                if (!board.getPiece(this.numbersToPosition(dest))) return true;
            }

            if (rowDiff === movementDirection) return true;
        }

        // TODO: Promotion
        return false;
    }

    private knightMovement(board: Board, startPiece: Piece, destination: Position): boolean {
        const start = this.positionToNumbers(startPiece.position);
        const dest = this.positionToNumbers(destination);

        const rowDiff = Math.abs(dest.row - start.row);
        const colDiff = Math.abs(dest.col - start.col);

        if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
            return true;
        }

        return false;
    }

    private rookMovement(board: Board, startPiece: Piece, destination: Position): boolean {
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

    private bishopMovement(board: Board, startPiece: Piece, destination: Position): boolean {
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

    private queenMovement(board: Board, startPiece: Piece, destination: Position): boolean {
        return this.rookMovement(board, startPiece, destination) || this.bishopMovement(board, startPiece, destination);
    }

    private kingMovement(board: Board, startPiece: Piece, destination: Position) {
        const start = this.positionToNumbers(startPiece.position);
        const dest = this.positionToNumbers(destination);

        const rowDiff = Math.abs(dest.row - start.row);
        const colDiff = Math.abs(dest.col - start.col);

        if (colDiff > 1 || rowDiff > 1) return false;

        return true;
    }

    private positionToNumbers(pos: Position) {
        return {col: Board.cols.indexOf(pos.col), row: Board.rows.indexOf(pos.row)};
    }

    private numbersToPosition(pos): Position {
        return {col: Board.cols.charAt(pos.col), row: Board.rows.charAt(pos.row)};
    }
}

const movementValidator = new MovementValidator();
export default movementValidator;
