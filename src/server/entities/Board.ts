import makeInitialState from "../../common/initial-state";
import {MoveResponse, MoveSuccess, MoveError} from "../../common/protocol";
import {Piece, Position} from "../../common/types";
import MovementValidator from "../logic/MovementValidator";
import {isCheck, isCheckMate} from "../logic/Checkmate";

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
            } else if (result.moveType === "castling") {
                startPiece.position = destination;
                startPiece.hasMoved = true;

                const rookPosition: Position = {
                    col: destination.col === "c" ? "a" : "h", // If king moved to c, get rook from left corner.
                    row: startPiece.color === "white" ? "1" : "8",
                };

                const rook = this.getPiece(rookPosition);
                rook.position.col = destination.col === "c" ? "d" : "f"; // If king moved to c, move rook to d
                rook.hasMoved = true;
            } else {
                this.removePiece(destination);
                startPiece.position = destination;
                startPiece.hasMoved = true;
            }

            // Move piece
            this.moveHistory.push([start, destination]);
            result.board = this.pieces;

            const nextPlayerColor = startPiece.color === "white" ? "black" : "white";
            if (isCheck(this, nextPlayerColor)) {
                if (isCheckMate(this, nextPlayerColor)) {
                    return {
                        kind: "success",
                        moveType: "checkmate",
                        board: this.pieces,
                    };
                }

                return {
                    kind: "success",
                    moveType: "check",
                    board: this.pieces,
                };
            }

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

    public getCoordinateByIndex(type: "col"|"row", index): string {
        if (index < 0 || index >= Board.rows.length) return null;

        return type === "col" ? Board.cols[index] : Board.rows[index];
    }
}
