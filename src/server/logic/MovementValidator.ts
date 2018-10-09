import Board from "../entities/Board";
import {doesMoveCauseCheck, isCheck} from "./Checkmate";
import * as Majavashakki from "../../common/GamePieces"

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
            if (this.enPassant(board, startPiece, destination)) {
                return {status: Majavashakki.MoveStatus.Success, result: Majavashakki.MoveResult.Enpassant, board: null} as Majavashakki.IMoveResponse;
            }

            if (this.castling(board, startPiece, destination)) {
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

    private pawnMovement(board: Board, startPiece: Majavashakki.IPiece, destination: Majavashakki.IPosition): boolean {
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

    private rookMovement(board: Board, startPiece: Majavashakki.IPiece, destination: Majavashakki.IPosition): boolean {
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

    private bishopMovement(board: Board, startPiece: Majavashakki.IPiece, destination: Majavashakki.IPosition): boolean {
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

    private queenMovement(board: Board, startPiece: Majavashakki.IPiece, destination: Majavashakki.IPosition): boolean {
        return this.rookMovement(board, startPiece, destination) || this.bishopMovement(board, startPiece, destination);
    }

    private kingMovement(board: Board, startPiece: Majavashakki.IPiece, destination: Majavashakki.IPosition) {
        const start = this.positionToNumbers(startPiece.position);
        const dest = this.positionToNumbers(destination);

        const rowDiff = Math.abs(dest.row - start.row);
        const colDiff = Math.abs(dest.col - start.col);

        if (colDiff > 1 || rowDiff > 1) return false;

        return true;
    }

    private enPassant(board: Board, startPiece: Majavashakki.IPiece, destination: Majavashakki.IPosition): boolean {
        if (startPiece.type === "pawn") {
            const start = this.positionToNumbers(startPiece.position);
            const dest = this.positionToNumbers(destination);

            const rowDiff = dest.row - start.row;
            const colDiff = dest.col - start.col;

            const movementDirection = startPiece.color === "white" ? 1 : -1;

            // Check if diagonal movement
            if (rowDiff === movementDirection && (colDiff === 1 || colDiff === -1)) {
                // Check if there is a piece below destination and that piece is enemy pawn
                dest.row -= movementDirection;
                const targetPiece: Majavashakki.IPiece = board.getPiece(this.numbersToPosition(dest));

                if (targetPiece && targetPiece.type === "pawn" && targetPiece.color !== startPiece.color) {
                    // Check if last move was double move and that its destination was targetPiece
                    const lastMove: Majavashakki.IPosition[] = board.moveHistory[board.moveHistory.length - 1];
                    const lastStart = this.positionToNumbers(lastMove[0]);
                    const lastDest = this.positionToNumbers(lastMove[1]);

                    const lastMoveDiff: number = Math.abs(lastDest.row - lastStart.row);
                    if (lastMoveDiff === 2 && board.comparePos(lastMove[1], targetPiece.position)) return true;
                }
            }
        }

        return false;
    }

    private castling(board: Board, startPiece: Majavashakki.IPiece, destination: Majavashakki.IPosition): boolean {
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
}

const movementValidator = new MovementValidator();
export default movementValidator;
