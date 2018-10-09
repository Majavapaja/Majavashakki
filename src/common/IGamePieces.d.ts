///<reference path="./enums.ts" />
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
    type: enums.PieceType
    color: enums.PieceColor
    position: IPosition;
    hasMoved: boolean;
  }
}