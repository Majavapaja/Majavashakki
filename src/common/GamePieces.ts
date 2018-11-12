import Board from "./Board";

export interface IGame {
  title: string;
  currentTurn: PieceColor;
  playerIdWhite: string;
  playerIdBlack: string;
  board: Board;
}

export interface IBoard {
  pieces: IPiece[];
  moveHistory: IPosition[][];
}

export interface IPosition {
  col: string;
  row: string;
}

export interface IPiece {
  type: PieceType;
  color: PieceColor
  position: IPosition;
  hasMoved: boolean;
}

export interface IMoveResponse {
  status: MoveStatus;
  result: MoveResult;
  start: IPosition;
  destination: IPosition;
  error: string;
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

export enum MoveStatus {
  Error = "error",
  Success = "success"
}

export enum MoveResult {
  Move = "move",
  Capture = "capture",
  Check = "check",
  Checkmate = "checkmate",
  Enpassant = "enpassant",
  Castling = "castling"
}
