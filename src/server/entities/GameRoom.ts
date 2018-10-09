import Board from "./Board";
import * as Majavashakki from "../../common/GamePieces"

export class Game implements Majavashakki.IGame {

    public static MapFromDb(gameState: Majavashakki.IGame): Game {
        const game = new Game(gameState.title);
        game.board.pieces = gameState.board.pieces;
        game.board.moveHistory = gameState.board.moveHistory;
        game.playerIdBlack = gameState.playerIdBlack;
        game.playerIdWhite = gameState.playerIdWhite;
        return game;
    }

    public static MapForDb(game: Game): Majavashakki.IGame {
        return { title: game.title, board: game.board, playerIdWhite: game.playerIdWhite, playerIdBlack: game.playerIdBlack };
    }

    public title: string;
    public playerIdWhite: string;
    public playerIdBlack: string;
    public board: Board;

    constructor(title: string) {
        this.title = title;
        this.board = new Board();
    }

    public isFull(): boolean {
        return !!this.playerIdWhite && !!this.playerIdBlack;
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
        return this.board.move(start, destination);
    }
}
