import makeInitialState from "../../common/initial-state";
import {MoveResponse, MoveSuccess, MoveError} from "../../common/protocol";
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

    public move(start: Position, destination: Position): MoveResponse {
        if (!start || !destination) return {kind: "error", error: "Error 11: Invalid movement data"};

        const result = MovementValidator.isValidMove(this, start, destination);
        if (result.kind === "success") {
            const startPiece = this.getPiece(start);

            if (result.moveType === "enpassant") {
                this.removePiece(this.moveHistory[this.moveHistory.length - 1][1]);
                startPiece.position = destination;
            } else {
                this.removePiece(destination);
                startPiece.position = destination;
                startPiece.hasMoved = true;
            }

            // Move piece
            this.moveHistory.push([start, destination]);
            result.board = this.pieces;
            return result;
        } else {
            return result;
        }
    }

    public removePiece(pos: Position): void {
        const index: number = this.pieces.indexOf(this.getPiece(pos));
        if (index !== -1) this.pieces.splice(index, 1);
    }

    public getPiece(pos: Position): Piece {
        return this.pieces.find((piece) => this.comparePos(piece.position, pos));
    }

    public getKing(color): Piece {
        return this.pieces.find((piece) => piece.color === color && piece.type === "king");
    }

    public comparePos(a: Position, b: Position): boolean {
        return a.row === b.row && a.col === b.col;
    }

    public isWithinBoard(pos: Position) {
        return Board.cols.indexOf(pos.col) !== -1 && Board.rows.indexOf(pos.row) !== -1;
    }
}
