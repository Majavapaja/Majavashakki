export interface Piece {
  type: "king" | "queen" | "rook" | "bishop" | "knight" | "pawn"
  color: "black" | "white"
  position: {
    col: string
    row: string
  }
}

