import * as Majavashakki from "../../common/GamePieces"
import GameBase from "../../common/GameBase";
import PieceEntity from "./PieceEntity"

export default class Game extends GameBase {
    constructor(title: string) {
        super(title)
    }
    public static MapFromDb(gameState: Majavashakki.IGame): Game {
        const game = new Game(gameState.title);
        game.board.pieces = gameState.board.pieces.map(piece => PieceEntity.MapFromDb(piece));
        game.board.moveHistory = gameState.board.moveHistory;
        game.playerIdBlack = gameState.playerIdBlack;
        game.playerIdWhite = gameState.playerIdWhite;
        game.currentTurn = gameState.currentTurn
        return game;
    }

    public static MapForDb(game: Game): Majavashakki.IGame {
        return {
            title: game.title,
            currentTurn: game.currentTurn,
            board: {
              pieces: game.board.pieces.map(PieceEntity.MapToDb),
              moveHistory: game.board.moveHistory,
            },
            playerIdWhite: game.playerIdWhite,
            playerIdBlack: game.playerIdBlack,
        } as Majavashakki.IGame
    }
}
