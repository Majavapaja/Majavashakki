export interface Position {
  col: "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h"
  row: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8"
}

export interface Piece {
  type: "king" | "queen" | "rook" | "bishop" | "knight" | "pawn"
  color: "black" | "white"
  position: Position
}
