import {Piece, Position} from '../../common/types';
import Board from '../entities/board';

class MovementValidator {
    constructor() {}

    public isValidMove(board: Board, start: Position, destination: Position): boolean {
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
                return true;
            case 'bishop':
                return true;
            case 'king':
                return true;
            case 'queen':
                return true;
        }
    }

    private pawnMovement(): boolean {
        // TODO Pawn movement
        return true;
    }

    private knightMovement(board: Board, startPiece: Piece, destination: Position): boolean {
        // Knight can move one diagonally then one back to destination
        let start = this.convertPosition(startPiece.position);
        let dest = this.convertPosition(destination);

        let rowDiff = Math.abs(dest.row - start.row);
        let colDiff = Math.abs(dest.col - start.col);

        if( (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
            return true;
        }

        return false;
    }

    private convertPosition(pos: Position) {
        return {col: Board.cols.indexOf(pos.col), row: Board.rows.indexOf(pos.row)}
    }
}

let movementValidator = new MovementValidator();
export default movementValidator;