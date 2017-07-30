import {Piece} from "./types";

export interface MoveSuccess {
  kind: "success";
  moveType: "move" | "capture" | "check" | "checkmate" | "enpassant" | "castling";
  board: Piece[];
}

export interface MoveError  {
  kind: "error";
  error: string;
}

export type MoveResponse = MoveSuccess | MoveError;
