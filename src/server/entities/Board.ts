import makeInitialState from "../../common/initial-state";
import MovementValidator from "../../common/logic/MovementValidator";
import {isCheck, isCheckMate} from "../../common/logic/Checkmate";
import * as Majavashakki from "../../common/GamePieces"

export default class Board implements Majavashakki.IBoard {
    public static cols: string = "abcdefgh";
    public static rows: string = "12345678";
    public pieces: Majavashakki.IPiece[];
    public moveHistory: Majavashakki.IPosition[][];

    constructor() {
        this.pieces = makeInitialState();
        this.moveHistory = [];
    }

    public move(start: Majavashakki.IPosition, destination: Majavashakki.IPosition): Majavashakki.IMoveResponse {
        if (!start || !destination) return {status: Majavashakki.MoveStatus.Error, error: "Error 11: Invalid movement data"} as Majavashakki.IMoveResponse;

        const move = MovementValidator.isValidMove(this, start, destination);
        if (move.status !== Majavashakki.MoveStatus.Success) {
            return move;
        }

        const startPiece = this.getPiece(start);

        if (move.result === Majavashakki.MoveResult.Enpassant) {
            this.removePiece(this.moveHistory[this.moveHistory.length - 1][1]);
        } else if (move.result === Majavashakki.MoveResult.Castling) {
            startPiece.hasMoved = true;

            const rookPosition: Majavashakki.IPosition = {
                col: destination.col === "c" ? "a" : "h", // If king moved to c, get rook from left corner.
                row: startPiece.color === "white" ? "1" : "8",
            };

            const rook = this.getPiece(rookPosition);
            rook.position.col = destination.col === "c" ? "d" : "f"; // If king moved to c, move rook to d
            rook.hasMoved = true;
        } else {
            this.removePiece(destination);
            startPiece.hasMoved = true;
        }

        // Move piece
        startPiece.position = destination;
        this.moveHistory.push([start, destination]);
        move.board = this.pieces;

        const nextPlayerColor = startPiece.color === "white" ? "black" : "white";
        if (!isCheck(this, nextPlayerColor)) {
            return move;
        }

        if (isCheckMate(this, nextPlayerColor)) {
            return {
                status: Majavashakki.MoveStatus.Success,
                result: Majavashakki.MoveResult.Checkmate,
                board: this.pieces,
            } as Majavashakki.IMoveResponse;
        }

        return {
            status: Majavashakki.MoveStatus.Success,
            result: Majavashakki.MoveResult.Check,
            board: this.pieces,
        } as Majavashakki.IMoveResponse;
    }

    public removePiece(pos: Majavashakki.IPosition): void {
        const index: number = this.pieces.indexOf(this.getPiece(pos));
        if (index !== -1) this.pieces.splice(index, 1);
    }

    public getPiece(pos: Majavashakki.IPosition): Majavashakki.IPiece {
        return this.pieces.find((piece) => this.comparePos(piece.position, pos));
    }

    public getKing(color): Majavashakki.IPiece {
        return this.pieces.find((piece) => piece.color === color && piece.type === "king");
    }

    public comparePos(a: Majavashakki.IPosition, b: Majavashakki.IPosition): boolean {
        return a.row === b.row && a.col === b.col;
    }

    public isWithinBoard(pos: Majavashakki.IPosition) {
        return Board.cols.indexOf(pos.col) !== -1 && Board.rows.indexOf(pos.row) !== -1;
    }

    public getCoordinateByIndex(type: "col"|"row", index): string {
        if (index < 0 || index >= Board.rows.length) return null;

        return type === "col" ? Board.cols[index] : Board.rows[index];
    }
}
