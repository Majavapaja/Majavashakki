export interface IGame {
  id: string;
  title: string;
  currentTurn: PieceColor;
  playerIdWhite?: string;
  playerIdBlack?: string;
  board: IBoard;
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
  result: MoveType;
  start: IPosition;
  destination: IPosition;
  error: string;
  isCheck: boolean;
  isCheckmate: boolean;
}

export enum PieceType {
  Pawn = "pawn",
  Knight = "knight",
  Bishop = "bishop",
  Rook = "rook",
  Queen = "queen",
  King = "king",
}

export enum PieceColor {
  Black = "black",
  White = "white",
}

export enum MoveStatus {
  Error = "error",
  Success = "success",
}

export enum MoveType {
  Move = "move",
  Capture = "capture",
  Enpassant = "enpassant",
  Castling = "castling",
}
