import {Piece, Position} from '../../common/types';
import Board from '../entities/board';

export default class MovementValidator {
    constructor() {}

    public static isValidMove(board: Board, start: Position, destination: Position): boolean {
        let startPiece: Piece = board.getPiece(start);
        if(!startPiece) return false;
        
        // start and destination are within Board
        // There is a piece at start position
        // Destination is valid position (empty or enemy)
        //      Else Castling 
        // Is movement valid for this piece?
        //      Else En Passant
        
        return true;
    }
}