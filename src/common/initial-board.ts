import * as Majavashakki from "./GamePieces"
import Piece from "./pieces/Piece"
import King from "./pieces/King"
import Bishop from "./pieces/Bishop"
import Board from "./Board"
import Knight from "./pieces/Knight";
import Pawn from "./pieces/Pawn";
import Queen from "./pieces/Queen";
import Rook from "./pieces/Rook";

export const createInitialPieces = (board: Board): Piece[] => {
  const black = Majavashakki.PieceColor.Black
  const white = Majavashakki.PieceColor.White

  const createPos = (pos: string): Majavashakki.IPosition => {
    return {col: pos.charAt(0), row: pos.charAt(1)} as Majavashakki.IPosition
  }

  return [
    new Pawn(black,   createPos("a7"), board),
    new Pawn(black,   createPos("b7"), board),
    new Pawn(black,   createPos("c7"), board),
    new Pawn(black,   createPos("d7"), board),
    new Pawn(black,   createPos("e7"), board),
    new Pawn(black,   createPos("f7"), board),
    new Pawn(black,   createPos("g7"), board),
    new Pawn(black,   createPos("h7"), board),

    new Rook(black,   createPos("a8"), board),
    new Knight(black, createPos("b8"), board),
    new Bishop(black, createPos("c8"), board),
    new Queen(black,  createPos("d8"), board),
    new King(black,   createPos("e8"), board),
    new Bishop(black, createPos("f8"), board),
    new Knight(black, createPos("g8"), board),
    new Rook(black,   createPos("h8"), board),

    new Pawn(white,   createPos("a2"), board),
    new Pawn(white,   createPos("b2"), board),
    new Pawn(white,   createPos("c2"), board),
    new Pawn(white,   createPos("d2"), board),
    new Pawn(white,   createPos("e2"), board),
    new Pawn(white,   createPos("f2"), board),
    new Pawn(white,   createPos("g2"), board),
    new Pawn(white,   createPos("h2"), board),

    new Rook(white,   createPos("a1"), board),
    new Knight(white, createPos("b1"), board),
    new Bishop(white, createPos("c1"), board),
    new Queen(white,  createPos("d1"), board),
    new King(white,   createPos("e1"), board),
    new Bishop(white, createPos("f1"), board),
    new Knight(white, createPos("g1"), board),
    new Rook(white,   createPos("h1"), board),
  ];
}
