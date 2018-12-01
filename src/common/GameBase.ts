import Board from "./Board"
import * as Majavashakki from "./GamePieces"

export default class GameBase implements Majavashakki.IGame {
    public title: string;
    public currentTurn: Majavashakki.PieceColor;
    public playerIdWhite: string;
    public playerIdBlack: string;
    public board: Board;

    constructor(title: string) {
        this.title = title;
        this.board = new Board();

        // White always starts in chess
        this.currentTurn = Majavashakki.PieceColor.White;
    }

    public isFull(): boolean {
        return !!this.playerIdWhite && !!this.playerIdBlack;
    }

    public containsUser(userId: string): boolean {
        return this.playerIdWhite === userId || this.playerIdBlack === userId;
    }

    public addPlayer(playerId: string) {
        if (!this.playerIdWhite) {
            this.playerIdWhite = playerId;
        } else if (!this.playerIdBlack) {
            this.playerIdBlack = playerId;
        } else {
            throw new Error("Paskaa täynnä, ei mahu - shit has hit fan even though it should not be possible, call Avengers")
        }
        return true;
    }

    public move(start: Majavashakki.IPosition, destination: Majavashakki.IPosition): Majavashakki.IMoveResponse {
        return this.board.move(start, destination)
    }

    public getUserColor(userId: any) {
        if (this.playerIdWhite === userId) return Majavashakki.PieceColor.White
        else if (this.playerIdBlack === userId) return Majavashakki.PieceColor.Black
        throw Error(`User (ID: ${{userId}}) is not in this game!`)
    }

    public doesUserOwnPiece(userId: any, position: Majavashakki.IPosition) {
        const piece = this.board.getPiece(position)
        if (piece) {
            return this.getUserColor(userId) === piece.color
        }
        return false
    }

    public isUsersTurn(userId: any) {
        return this.currentTurn === this.getUserColor(userId)
    }

    public changeTurn() {
        if (this.currentTurn === Majavashakki.PieceColor.White) {
            this.currentTurn = Majavashakki.PieceColor.Black
        } else {
            this.currentTurn = Majavashakki.PieceColor.White
        }
    }
}
