declare module Majavashakki {
  export interface IMoveSuccess {
    kind: "success";
    moveType: "move" | "capture" | "check" | "checkmate" | "enpassant" | "castling";
    board: IPiece[];
  }

  export interface IMoveError  {
    kind: "error";
    error: string;
  }

  export type IMoveResponse = IMoveSuccess | IMoveError;
}