import {copy} from "./util";
import * as _ from "lodash";
import * as Majavashakki from "./GamePieces"

const createPiece = (color: Majavashakki.PieceColor, type: Majavashakki.PieceType, position: Majavashakki.IPosition, hasMoved: boolean): Majavashakki.IPiece =>
({ color, type, position, hasMoved });

const blackPiece = (type: Majavashakki.PieceType, pos: string) =>
  createPiece(Majavashakki.PieceColor.Black, type, {col: pos.charAt(0), row: pos.charAt(1)}, false);

const whitePiece = (type: Majavashakki.PieceType, pos: string) =>
  createPiece(Majavashakki.PieceColor.White, type, {col: pos.charAt(0), row: pos.charAt(1)}, false);

const state: Majavashakki.IPiece[] = [
  blackPiece(Majavashakki.PieceType.Pawn, "a7"),
  blackPiece(Majavashakki.PieceType.Pawn, "b7"),
  blackPiece(Majavashakki.PieceType.Pawn, "c7"),
  blackPiece(Majavashakki.PieceType.Pawn, "d7"),
  blackPiece(Majavashakki.PieceType.Pawn, "e7"),
  blackPiece(Majavashakki.PieceType.Pawn, "f7"),
  blackPiece(Majavashakki.PieceType.Pawn, "g7"),
  blackPiece(Majavashakki.PieceType.Pawn, "h7"),

  blackPiece(Majavashakki.PieceType.Rook,   "a8"),
  blackPiece(Majavashakki.PieceType.Knight, "b8"),
  blackPiece(Majavashakki.PieceType.Bishop, "c8"),
  blackPiece(Majavashakki.PieceType.Queen,  "d8"),
  blackPiece(Majavashakki.PieceType.King,   "e8"),
  blackPiece(Majavashakki.PieceType.Bishop, "f8"),
  blackPiece(Majavashakki.PieceType.Knight, "g8"),
  blackPiece(Majavashakki.PieceType.Rook,   "h8"),

  whitePiece(Majavashakki.PieceType.Pawn, "a2"),
  whitePiece(Majavashakki.PieceType.Pawn, "b2"),
  whitePiece(Majavashakki.PieceType.Pawn, "c2"),
  whitePiece(Majavashakki.PieceType.Pawn, "d2"),
  whitePiece(Majavashakki.PieceType.Pawn, "e2"),
  whitePiece(Majavashakki.PieceType.Pawn, "f2"),
  whitePiece(Majavashakki.PieceType.Pawn, "g2"),
  whitePiece(Majavashakki.PieceType.Pawn, "h2"),

  whitePiece(Majavashakki.PieceType.Rook,   "a1"),
  whitePiece(Majavashakki.PieceType.Knight, "b1"),
  whitePiece(Majavashakki.PieceType.Bishop, "c1"),
  whitePiece(Majavashakki.PieceType.Queen,  "d1"),
  whitePiece(Majavashakki.PieceType.King,   "e1"),
  whitePiece(Majavashakki.PieceType.Bishop, "f1"),
  whitePiece(Majavashakki.PieceType.Knight, "g1"),
  whitePiece(Majavashakki.PieceType.Rook,   "h1")

];
export default () => _.cloneDeep(state);