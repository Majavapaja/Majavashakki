export interface IGame {
  // error TS2320: Interface 'IGameDocument' cannot simultaneously extend types 'IGame' and 'Document'.
  // Named property 'id' of types 'IGame' and 'Document' are not identical.
  id?: any;

  title: string;
  currentTurn: PieceColor;
  playerIdWhite?: string;
  playerIdBlack?: string;
  board: IBoard;
  isCheck: boolean;
  isCheckmate: boolean;
}

export interface IBoard {
  pieces: IPiece[];
  moveHistory: IMove[];
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
  error?: string;
  isCheck: boolean;
  isCheckmate: boolean;
  isDraw: boolean;
  promotionType: PieceType;
}

// Check https://en.wikipedia.org/wiki/Algebraic_notation_(chess)
export type AlgebraicNotation = string

export interface IMove {
  start: IPosition;
  destination: IPosition;
  algebraicNotation: AlgebraicNotation;
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
  Promotion = "promotion",
}
