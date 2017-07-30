import makeInitialState from "../../common/initial-state";
import {Piece, Position} from "../../common/types";
import MovementValidator from "../logic/MovementValidator";

export default class Board {
    public static cols: string = "abcdefgh";
    public static rows: string = "12345678";

    public pieces: Piece[];
    public moveHistory: Position[][];

    constructor() {
        this.pieces = makeInitialState();
        this.moveHistory = [];
    }

    public move(start: Position, destination: Position): boolean {
        if (!start || !destination) return false;

        if (MovementValidator.isValidMove(this, start, destination)) {
            // Move piece
            this.removePiece(destination);
            const startPiece = this.getPiece(start);
            startPiece.position = destination;
            startPiece.hasMoved = true;

            this.moveHistory.push([start, destination]);
            return true;
        } else {
            return false;
        }
    }

    public removePiece(pos: Position): void {
        const index: number = this.pieces.indexOf(this.getPiece(pos));
        if (index !== -1) this.pieces.splice(index, 1);
    }

    public getPiece(pos: Position): Piece {
        return this.pieces.find((piece) => this.comparePos(piece.position, pos));
    }

    public comparePos(a: Position, b: Position): boolean {
        return a.row === b.row && a.col === b.col;
    }

    public isWithinBoard(pos: Position) {
        return Board.cols.indexOf(pos.col) !== -1 && Board.rows.indexOf(pos.row) !== -1;
    }
}
