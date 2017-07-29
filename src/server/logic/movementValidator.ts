import {Piece, Position} from '../../common/types';
import Board from '../entities/board';

class MovementValidator {
    constructor() {}

    public isValidMove(board: Board, start: Position, destination: Position): boolean {
        // Check that start and destination are not the same
        if(board.comparePos(start, destination)) return false;

        // Check that start and destination are within board
        if(!board.isWithinBoard(start) || !board.isWithinBoard(destination)) {
            return false;
        }

        // Check that there is a piece at start position
        let startPiece: Piece = board.getPiece(start);
        if(!startPiece) return false;

        // Check that destination is valid (different color or empty)
        let destinationPiece: Piece = board.getPiece(destination);
        if(destinationPiece && destinationPiece.color === startPiece.color) {
            // TODO: Check castling
            return false;
        }

        // Check that piece movement is valid
        if(!this.checkMovement(board, startPiece, destination)) {
            // TODO: Check En Passant
            return false;
        }

        // Piece movement was valid
        return true;
    }

    private checkMovement(board: Board, startPiece: Piece, destination: Position) {
        switch(startPiece.type) {
            case 'pawn':
                return true;
            case 'knight':
                return this.knightMovement(board, startPiece, destination);
            case 'rook':
                return this.rookMovement(board, startPiece, destination);
            case 'bishop':
                return this.bishopMovement(board, startPiece, destination);
            case 'queen':
                return this.queenMovement(board, startPiece, destination);
            case 'king':
                return this.kingMovement(board, startPiece, destination);
        }
    }

    private pawnMovement(): boolean {
        // TODO Pawn movement
        return true;
    }

    private knightMovement(board: Board, startPiece: Piece, destination: Position): boolean {
        let start = this.positionToNumbers(startPiece.position);
        let dest = this.positionToNumbers(destination);

        let rowDiff = Math.abs(dest.row - start.row);
        let colDiff = Math.abs(dest.col - start.col);

        if( (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
            return true;
        }

        return false;
    }

    private rookMovement(board: Board, startPiece: Piece, destination: Position): boolean {
        let start = this.positionToNumbers(startPiece.position);
        let dest = this.positionToNumbers(destination);

        if(dest.col !== start.col && dest.row !== start.row) return false;

        while(start.col !== dest.col || start.row !== dest.row) {
            if(dest.col > start.col) dest.col --;
            else if(dest.col < start.col) dest.col ++;
            else if(dest.row > start.row) dest.row --;
            else if(dest.row < start.row) dest.row ++;

            if(start.col === dest.col && start.row === dest.row) break;

            if(board.getPiece(this.numbersToPosition(dest))) return false;
        }

        return true;
    }

    private bishopMovement(board: Board, startPiece: Piece, destination: Position): boolean {
        let start = this.positionToNumbers(startPiece.position);
        let dest = this.positionToNumbers(destination);

        let rowDiff = Math.abs(dest.row - start.row);
        let colDiff = Math.abs(dest.col - start.col);

        if(rowDiff !== colDiff) return false;

        while(rowDiff > 0 && colDiff > 0) {
            if(dest.col > start.col) dest.col --;
            else if(dest.col < start.col) dest.col ++;
            if(dest.row > start.row) dest.row --;
            else if(dest.row < start.row) dest.row ++;

            rowDiff--;
            colDiff--;

            if(rowDiff === 0 && colDiff === 0) break;

            if(board.getPiece(this.numbersToPosition(dest))) return false;
        }

        return true;
    }

    private queenMovement(board: Board, startPiece: Piece, destination: Position): boolean {
        return this.rookMovement(board, startPiece, destination) || this.bishopMovement(board,startPiece, destination);
    }

    private kingMovement(board: Board, startPiece: Piece, destination: Position) {
        let start = this.positionToNumbers(startPiece.position);
        let dest = this.positionToNumbers(destination);

        let rowDiff = Math.abs(dest.row - start.row);
        let colDiff = Math.abs(dest.col - start.col);

        if(colDiff > 1 || rowDiff > 1) return false;
        
        return true;
    }

    private positionToNumbers(pos: Position) {
        return {col: Board.cols.indexOf(pos.col), row: Board.rows.indexOf(pos.row)}
    }

    private numbersToPosition(pos): Position {
        return {col: Board.cols.charAt(pos.col), row: Board.rows.charAt(pos.row)}
    }
}

let movementValidator = new MovementValidator();
export default movementValidator;