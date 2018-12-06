import * as Majavashakki from "./GamePieces"
import BoardBase from "./BoardBase"
import Piece from "./pieces/Piece"
import King from "./pieces/King"
import Bishop from "./pieces/Bishop"
import Knight from "./pieces/Knight";
import Pawn from "./pieces/Pawn";
import Queen from "./pieces/Queen";
import Rook from "./pieces/Rook";

export const createInitialPieces = (board: BoardBase): Piece[] => {
  const black = Majavashakki.PieceColor.Black
  const white = Majavashakki.PieceColor.White

  const createPos = (pos: string): Majavashakki.IPosition => {
    return {col: pos.charAt(0), row: pos.charAt(1)} as Majavashakki.IPosition
  }

  return [
    new Pawn(black,   createPos("a7")),
    new Pawn(black,   createPos("b7")),
    new Pawn(black,   createPos("c7")),
    new Pawn(black,   createPos("d7")),
    new Pawn(black,   createPos("e7")),
    new Pawn(black,   createPos("f7")),
    new Pawn(black,   createPos("g7")),
    new Pawn(black,   createPos("h7")),

    new Rook(black,   createPos("a8")),
    new Knight(black, createPos("b8")),
    new Bishop(black, createPos("c8")),
    new Queen(black,  createPos("d8")),
    new King(black,   createPos("e8")),
    new Bishop(black, createPos("f8")),
    new Knight(black, createPos("g8")),
    new Rook(black,   createPos("h8")),

    new Pawn(white,   createPos("a2")),
    new Pawn(white,   createPos("b2")),
    new Pawn(white,   createPos("c2")),
    new Pawn(white,   createPos("d2")),
    new Pawn(white,   createPos("e2")),
    new Pawn(white,   createPos("f2")),
    new Pawn(white,   createPos("g2")),
    new Pawn(white,   createPos("h2")),

    new Rook(white,   createPos("a1")),
    new Knight(white, createPos("b1")),
    new Bishop(white, createPos("c1")),
    new Queen(white,  createPos("d1")),
    new King(white,   createPos("e1")),
    new Bishop(white, createPos("f1")),
    new Knight(white, createPos("g1")),
    new Rook(white,   createPos("h1")),
  ];
}
