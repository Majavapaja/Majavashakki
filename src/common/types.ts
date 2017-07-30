export interface Position {
  col: string;
  row: string;
}

export interface Piece {
  type: "king" | "queen" | "rook" | "bishop" | "knight" | "pawn";
  color: "black" | "white";
  position: Position;
}
