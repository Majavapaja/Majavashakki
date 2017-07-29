import INITIAL_STATE from '../../common/initial-state'
import {Piece, Position} from '../../common/types';
import MovementValidator from '../logic/movementValidator';

export default class Board {
    public pieces: Piece[];
    public moveHistory: Position[][];

    public static size: number = 8;

    constructor() {
        this.pieces = Array.from(INITIAL_STATE)
        this.moveHistory = [];
    }

    move(start: Position, destination: Position): boolean {
        if (!start || !destination) {
            console.warn(`Invalid movement data. from: ${start}, dest: ${destination}`);
            return false;
        }

        if(MovementValidator.isValidMove(this, start, destination)) {
            // Move piece
            this.removePiece(destination);
            this.getPiece(start).position = destination;

            this.moveHistory.push([start, destination]);
            return true;
        } else {
            return false;
        }
    }

    removePiece(pos: Position): void {
        let index: number = this.pieces.indexOf(this.getPiece(pos));
        if(index !== -1) this.pieces.splice(index, 1);
    }

    getPiece(pos: Position): Piece {
        return this.pieces.find(piece => this.comparePos(piece.position, pos))
    }

    comparePos(a: Position, b: Position): boolean {
        return a.row === b.row && a.col === b.col
    }
}