import * as Majavashakki from "../../common/GamePieces";

export interface IGame {
    title: string;
    currentTurn: Majavashakki.PieceColor;
    playerIdWhite: string;
    playerIdBlack: string;
    pieces: Majavashakki.IPiece[];
    moveHistory: Majavashakki.IPosition[][];
}
