
import * as enums from "./enums";
import {copy} from "./util";

const createPiece = (color: enums.PieceColor, type: enums.PieceType, position: Majavashakki.IPosition, hasMoved: boolean): Majavashakki.IPiece =>
({ color, type, position, hasMoved });

const blackPiece = (type: enums.PieceType, pos: string) =>
  createPiece(enums.PieceColor.Black, type, {col: pos.charAt(0), row: pos.charAt(1)}, false);

const whitePiece = (type: enums.PieceType, pos: string) =>
  createPiece(enums.PieceColor.White, type, {col: pos.charAt(0), row: pos.charAt(1)}, false);

const state: Majavashakki.IPiece[] = [
  blackPiece(enums.PieceType.Pawn, "a7"),
  blackPiece(enums.PieceType.Pawn, "b7"),
  blackPiece(enums.PieceType.Pawn, "c7"),
  blackPiece(enums.PieceType.Pawn, "d7"),
  blackPiece(enums.PieceType.Pawn, "f7"),
  blackPiece(enums.PieceType.Pawn, "e7"),
  blackPiece(enums.PieceType.Pawn, "g7"),
  blackPiece(enums.PieceType.Pawn, "h7"),

  blackPiece(enums.PieceType.Rook,   "a8"),
  blackPiece(enums.PieceType.Knight, "b8"),
  blackPiece(enums.PieceType.Bishop, "c8"),
  blackPiece(enums.PieceType.Queen,  "d8"),
  blackPiece(enums.PieceType.King,   "f8"),
  blackPiece(enums.PieceType.Bishop, "e8"),
  blackPiece(enums.PieceType.Knight, "g8"),
  blackPiece(enums.PieceType.Rook,   "h8"),

  whitePiece(enums.PieceType.Pawn, "a2"),
  whitePiece(enums.PieceType.Pawn, "b2"),
  whitePiece(enums.PieceType.Pawn, "c2"),
  whitePiece(enums.PieceType.Pawn, "d2"),
  whitePiece(enums.PieceType.Pawn, "f2"),
  whitePiece(enums.PieceType.Pawn, "e2"),
  whitePiece(enums.PieceType.Pawn, "g2"),
  whitePiece(enums.PieceType.Pawn, "h2"),

  whitePiece(enums.PieceType.Rook,   "a1"),
  whitePiece(enums.PieceType.Knight, "b1"),
  whitePiece(enums.PieceType.Bishop, "c1"),
  whitePiece(enums.PieceType.Queen,  "d1"),
  whitePiece(enums.PieceType.King,   "f1"),
  whitePiece(enums.PieceType.Bishop, "e1"),
  whitePiece(enums.PieceType.Knight, "g1"),
  whitePiece(enums.PieceType.Rook,   "h1")

];
export default () => copy(state)