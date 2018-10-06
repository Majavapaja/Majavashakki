declare module Majavashakki {
  export interface IBoard {
    pieces: IPiece[];
    moveHistory: IPosition[][];
  }

  export interface IPosition {
    col: string;
    row: string;
  }

  export interface IPiece {
    type: PieceType
    color: PieceColor
    position: IPosition;
    hasMoved: boolean;
  }

  export enum PieceType {
    Pawn = "pawn",
    Knight = "knight",
    Bishop = "bishop",
    Rook = "rook",
    Queen = "queen",
    King = "king"
  }

  export enum PieceColor {
    Black = "black",
    White = "white"
  }
}