import BoardBase from "../../../src/common/BoardBase";
import { PieceColor, PieceType } from "../../../src/common/GamePieces"
import { createPiece } from "./BoardHelper"

// Pieces Ascii: White: ♔♕♖♗♘♙ Black: ♚♛♜♝♞♟
// Board template:
/*  a b c d e f g h
  8 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 8
  7 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
  6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
  5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
  4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
  3 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
  2 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 2
  1 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
    a b c d e f g h */

export default class BoardFactory {
  public static setupBasic = () => new BoardBase()

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 8
    7 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ♙ ♟ ♟ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ♙ ♟ ♙ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 2
    1 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupPawnCapture() {
    const pieces = [
      createPiece("c5", PieceType.Pawn, PieceColor.White, true, null),
      createPiece("e4", PieceType.Pawn, PieceColor.White, true, null),
      createPiece("d4", PieceType.Pawn, PieceColor.White, true, null),
      createPiece("d5", PieceType.Pawn, PieceColor.Black, true, null),
      createPiece("e5", PieceType.Pawn, PieceColor.Black, true, null),
      createPiece("f4", PieceType.Pawn, PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 8
    7 ♟ ♟ ♟ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ♟ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ♙ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ♟ ⚊ ⚊ ⚊ ⚊ 4
    3 ♙ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ♙ ♙ ♙ ⚊ ⚊ ⚊ ⚊ ⚊ 2
    1 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupPawnDoubleMove() {
    const pieces = [
      createPiece("a2", PieceType.Pawn, PieceColor.White, false, null),
      createPiece("a3", PieceType.Pawn, PieceColor.White, true, null),
      createPiece("b2", PieceType.Pawn, PieceColor.White, false, null),
      createPiece("c2", PieceType.Pawn, PieceColor.White, false, null),
      createPiece("d5", PieceType.Pawn, PieceColor.White, true, null),
      createPiece("a6", PieceType.Pawn, PieceColor.Black, true, null),
      createPiece("a7", PieceType.Pawn, PieceColor.Black, false, null),
      createPiece("b7", PieceType.Pawn, PieceColor.Black, false, null),
      createPiece("c7", PieceType.Pawn, PieceColor.Black, false, null),
      createPiece("d4", PieceType.Pawn, PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 8
    7 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ⚊ ⚊ ♜ ⚊ ⚊ ⚊ 2
    1 ⚊ ⚊ ♜ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupRookMovement() {
    const pieces = [
      createPiece("e2", PieceType.Rook, PieceColor.White, true, null),
      createPiece("c1", PieceType.Rook, PieceColor.White, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 8
    7 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ♜ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ♜ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ⚊ ⚊ ♖ ⚊ ⚊ ⚊ 2
    1 ⚊ ⚊ ⚊ ⚊ ♖ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupRookCapture() {
    const pieces = [
      createPiece("e1", PieceType.Rook, PieceColor.White, true, null),
      createPiece("e2", PieceType.Rook, PieceColor.White, true, null),
      createPiece("e5", PieceType.Rook, PieceColor.Black, true, null),
      createPiece("e6", PieceType.Rook, PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 8
    7 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ♝ ⚊ ♝ ⚊ ⚊ ⚊ 2
    1 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupBishopMovement() {
    const pieces = [
      createPiece("c2", PieceType.Bishop, PieceColor.White, true, null),
      createPiece("e2", PieceType.Bishop, PieceColor.White, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 8
    7 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ♝ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ♝ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ⚊ ⚊ ♗ ⚊ ⚊ ⚊ 2
    1 ⚊ ⚊ ⚊ ♗ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupBishopCapture() {
    const pieces = [
      createPiece("d1", PieceType.Bishop, PieceColor.White, true, null),
      createPiece("e2", PieceType.Bishop, PieceColor.White, true, null),
      createPiece("a6", PieceType.Bishop, PieceColor.Black, true, null),
      createPiece("b5", PieceType.Bishop, PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 8
    7 ⚊ ⚊ ♚ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ♟ ♔ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ⚊ ♟ ♙ ⚊ ⚊ ⚊ ⚊ ⚊ 2
    1 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupKing() {
    const pieces = [
      createPiece("c2", PieceType.Pawn, PieceColor.White, true, null),
      createPiece("c3", PieceType.King, PieceColor.White, true, null),
      createPiece("b2", PieceType.Pawn, PieceColor.Black, true, null),
      createPiece("b3", PieceType.Pawn, PieceColor.Black, true, null),
      createPiece("c7", PieceType.King, PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 8
    7 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ♛ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ♛ ⚊ ⚊ ♛ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ⚊ ⚊ ♕ ♕ ⚊ ⚊ 2
    1 ⚊ ⚊ ⚊ ⚊ ♕ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupQueen() {
    const pieces = [
      createPiece("e1", PieceType.Queen, PieceColor.White, true, null),
      createPiece("e2", PieceType.Queen, PieceColor.White, true, null),
      createPiece("f2", PieceType.Queen, PieceColor.White, true, null),
      createPiece("a6", PieceType.Queen, PieceColor.Black, true, null),
      createPiece("b5", PieceType.Queen, PieceColor.Black, true, null),
      createPiece("e5", PieceType.Queen, PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 8
    7 ♟ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ♟ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ♙ ⚊ ⚊ ⚊ ⚊ ⚊ 2
    1 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupEnpassant() {
    const pieces = [
      createPiece("c2", PieceType.Pawn, PieceColor.White, false, null),
      createPiece("a7", PieceType.Pawn, PieceColor.Black, false, null),
      createPiece("d4", PieceType.Pawn, PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ♜ ⚊ ⚊ ⚊ 8
    7 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ♕ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ⚊ ⚊ ♗ ⚊ ⚊ ⚊ 2
    1 ♖ ⚊ ⚊ ⚊ ♔ ⚊ ⚊ ♖ 1
      a b c d e f g h */
  public static setupCastling() {
    const pieces = [
      createPiece("a1", PieceType.Rook,   PieceColor.White, false, null),
      createPiece("e1", PieceType.King,   PieceColor.White, false, null),
      createPiece("e2", PieceType.Bishop, PieceColor.White, false, null),
      createPiece("e3", PieceType.Queen,  PieceColor.White, false, null),
      createPiece("h1", PieceType.Rook,   PieceColor.White, false, null),
      createPiece("e8", PieceType.Rook,   PieceColor.Black, false, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ♟ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 8
    7 ♙ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ♟ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 2
    1 ⚊ ♙ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupPromotion() {
    const pieces = [
      createPiece("a7", PieceType.Pawn, PieceColor.White, true, null),
      createPiece("b1", PieceType.Pawn, PieceColor.White, true, null),
      createPiece("a2", PieceType.Pawn, PieceColor.Black, true, null),
      createPiece("b8", PieceType.Pawn, PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  // It's all crazy specific scenarios from this point downwards o_o

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 8
    7 ⚊ ⚊ ♚ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ♜ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 2
    1 ⚊ ♖ ♜ ♔ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupCheck() {
    const pieces = [
      createPiece("b1", PieceType.Rook, PieceColor.White, true, null),
      createPiece("d1", PieceType.King, PieceColor.White, true, null),
      createPiece("c1", PieceType.Rook, PieceColor.Black, true, null),
      createPiece("c6", PieceType.Rook, PieceColor.Black, true, null),
      createPiece("c7", PieceType.King, PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 8
    7 ♟ ♚ ⚊ ⚊ ♟ ♜ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ♙ ⚊ ♙ ⚊ ♙ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ♔ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 2
    1 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupCheckEnpassant() {
    const pieces = [
      createPiece("b5", PieceType.Pawn, PieceColor.White, true, null),
      createPiece("d5", PieceType.Pawn, PieceColor.White, true, null),
      createPiece("f5", PieceType.Pawn, PieceColor.White, true, null),
      createPiece("f4", PieceType.King, PieceColor.White, true, null),
      createPiece("a7", PieceType.Pawn, PieceColor.Black, false, null),
      createPiece("e7", PieceType.Pawn, PieceColor.Black, false, null),
      createPiece("f7", PieceType.Rook, PieceColor.Black, true, null),
      createPiece("b7", PieceType.King, PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ♚ ⚊ ⚊ ♜ ⚊ 8
    7 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 2
    1 ♖ ⚊ ⚊ ⚊ ♔ ⚊ ⚊ ♖ 1
      a b c d e f g h */
  public static setupCheckCastling() {
    const pieces = [
      createPiece("a1", PieceType.Rook, PieceColor.White, false, null),
      createPiece("e1", PieceType.King, PieceColor.White, false, null),
      createPiece("h1", PieceType.Rook, PieceColor.White, false, null),
      createPiece("d8", PieceType.King, PieceColor.Black, true, null),
      createPiece("g8", PieceType.Rook, PieceColor.Black, false, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ♚ ⚊ ⚊ ⚊ ⚊ 8
    7 ♙ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ♟ 2
    1 ♔ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupCheckPromotion() {
    const pieces = [
      createPiece("a1", PieceType.King, PieceColor.White, true, null),
      createPiece("a7", PieceType.Pawn, PieceColor.White, true, null),
      createPiece("d8", PieceType.King, PieceColor.Black, true, null),
      createPiece("h2", PieceType.Pawn, PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ♚ ♝ ⚊ ⚊ ⚊ ⚊ ⚊ ♖ 8
    7 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ♔ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 2
    1 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupCheckWithTwoKings() {
    const pieces = [
      createPiece("b6", PieceType.King,   PieceColor.White, true, null),
      createPiece("h8", PieceType.Rook,   PieceColor.White, true, null),
      createPiece("a8", PieceType.King,   PieceColor.Black, true, null),
      createPiece("b8", PieceType.Bishop, PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ♜ ⚊ ⚊ ⚊ 8
    7 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ♝ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ♝ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ⚊ ♜ ⚊ ⚊ 3
    2 ♜ ⚊ ⚊ ⚊ ⚊ ♕ ⚊ ♛ 2
    1 ⚊ ⚊ ⚊ ♔ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupCheckmate() {
    const pieces = [
      createPiece("d1", PieceType.King,   PieceColor.White, true, null),
      createPiece("f2", PieceType.Queen,  PieceColor.White, true, null),
      createPiece("a2", PieceType.Rook,   PieceColor.Black, true, null),
      createPiece("e8", PieceType.Rook,   PieceColor.Black, true, null),
      createPiece("f3", PieceType.Rook,   PieceColor.Black, true, null),
      createPiece("g4", PieceType.Bishop, PieceColor.Black, true, null),
      createPiece("g5", PieceType.Bishop, PieceColor.Black, true, null),
      createPiece("h2", PieceType.Queen,  PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

/*  a b c d e f g h
  8 ⚊ ♕ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 8
  7 ⚊ ⚊ ⚊ ⚊ ⚊ ♟ ♚ ⚊ 7
  6 ⚊ ⚊ ♟ ⚊ ⚊ ⚊ ♟ ⚊ 6
  5 ⚊ ♟ ⚊ ⚊ ♘ ⚊ ⚊ ♟ 5
  4 ⚊ ♝ ⚊ ⚊ ⚊ ⚊ ⚊ ♙ 4
  3 ⚊ ♝ ♞ ⚊ ⚊ ⚊ ⚊ ⚊ 3
  2 ♜ ⚊ ⚊ ⚊ ⚊ ⚊ ♙ ⚊ 2
  1 ⚊ ⚊ ♔ ⚊ ⚊ ⚊ ⚊ ⚊ 1
    a b c d e f g h */
  public static setupGameOfCentury() {
    const pieces = [
      createPiece("b8", PieceType.Queen,  PieceColor.White, true, null),
      createPiece("c1", PieceType.King,   PieceColor.White, true, null),
      createPiece("e5", PieceType.Knight, PieceColor.White, true, null),
      createPiece("g2", PieceType.Pawn,   PieceColor.White, true, null),
      createPiece("h4", PieceType.Pawn,   PieceColor.White, true, null),

      createPiece("a2", PieceType.Rook,   PieceColor.Black, true, null),
      createPiece("b3", PieceType.Bishop, PieceColor.Black, true, null),
      createPiece("b4", PieceType.Bishop, PieceColor.Black, true, null),
      createPiece("b5", PieceType.Pawn,   PieceColor.Black, true, null),
      createPiece("c3", PieceType.Knight, PieceColor.Black, true, null),
      createPiece("c6", PieceType.Pawn,   PieceColor.Black, true, null),
      createPiece("f7", PieceType.Pawn,   PieceColor.Black, true, null),
      createPiece("g6", PieceType.Pawn,   PieceColor.Black, true, null),
      createPiece("g7", PieceType.King,   PieceColor.Black, true, null),
      createPiece("h5", PieceType.Pawn,   PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ♖ 8
    7 ♟ ♚ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ♖ 6
    5 ⚊ ♙ ♕ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 2
    1 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupCheckmateEnpassant() {
    const pieces = [
      createPiece("b5", PieceType.Pawn,  PieceColor.White, true, null),
      createPiece("c5", PieceType.Queen, PieceColor.White, true, null),
      createPiece("h6", PieceType.Rook,  PieceColor.White, true, null),
      createPiece("h8", PieceType.Rook,  PieceColor.White, true, null),
      createPiece("a7", PieceType.Pawn,  PieceColor.Black, false, null),
      createPiece("b7", PieceType.King,  PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ♜ ⚊ ♜ ⚊ ⚊ ⚊ ⚊ ⚊ 8
    7 ♟ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ♙ ⚊ ⚊ ⚊ ⚊ ⚊ ♜ 5
    4 ⚊ ♔ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ♜ 3
    2 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 2
    1 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupCheckmateEnpassantEscape() {
    const pieces = [
      createPiece("b4", PieceType.King, PieceColor.White, true, null),
      createPiece("b5", PieceType.Pawn, PieceColor.White, true, null),
      createPiece("a7", PieceType.Pawn, PieceColor.Black, false, null),
      createPiece("a8", PieceType.Rook, PieceColor.Black, true, null),
      createPiece("c8", PieceType.Rook, PieceColor.Black, true, null),
      createPiece("h3", PieceType.Rook, PieceColor.Black, true, null),
      createPiece("h5", PieceType.Rook, PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ⚊ ♜ ♚ ♜ ⚊ ⚊ ⚊ 8
    7 ⚊ ⚊ ♟ ⚊ ♟ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 2
    1 ♖ ⚊ ⚊ ⚊ ♔ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupCheckmateCastling() {
    const pieces = [
      createPiece("a1", PieceType.Rook, PieceColor.White, false, null),
      createPiece("e1", PieceType.King, PieceColor.White, false, null),
      createPiece("c7", PieceType.Pawn, PieceColor.Black, false, null),
      createPiece("c8", PieceType.Rook, PieceColor.Black, true, null),
      createPiece("d8", PieceType.King, PieceColor.Black, true, null),
      createPiece("e7", PieceType.Pawn, PieceColor.Black, false, null),
      createPiece("e8", PieceType.Rook, PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 8
    7 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ⚊ ⚊ ⚊ ♙ ⚊ ⚊ 2
    1 ♖ ♘ ♗ ♕ ♔ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupAlgebraicNotationMovement() {
    const pieces = [
      createPiece("a1", PieceType.Rook, PieceColor.White, false, null),
      createPiece("b1", PieceType.Knight, PieceColor.White, false, null),
      createPiece("c1", PieceType.Bishop, PieceColor.White, false, null),
      createPiece("d1", PieceType.Queen, PieceColor.White, false, null),
      createPiece("e1", PieceType.King, PieceColor.White, false, null),
      createPiece("f2", PieceType.Pawn, PieceColor.White, false, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 8
    7 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ♟ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ♟ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ♟ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 2
    1 ♖ ♘ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupAlgebraicNotationCaptures() {
    const pieces = [
      createPiece("a1", PieceType.Rook,   PieceColor.White, false, null),
      createPiece("b1", PieceType.Knight, PieceColor.White, false, null),
      createPiece("a2", PieceType.Pawn,   PieceColor.Black, true, null),
      createPiece("a3", PieceType.Pawn,   PieceColor.Black, true, null),
      createPiece("b4", PieceType.Pawn,   PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ♜ ⚊ ⚊ ⚊ ♜ 8
    7 ♝ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ♝ ⚊ ⚊ ⚊ ⚊ 6
    5 ♖ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ♕ ⚊ ⚊ ♕ 4
    3 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 2
    1 ♖ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ♕ 1
      a b c d e f g h */
  public static setupAlgebraicNotationDisambiguation() {
    const pieces = [
      createPiece("a1", PieceType.Rook,   PieceColor.White, true, null),
      createPiece("a5", PieceType.Rook,   PieceColor.White, true, null),
      createPiece("e4", PieceType.Queen,  PieceColor.White, true, null),
      createPiece("h1", PieceType.Queen,  PieceColor.White, true, null),
      createPiece("h4", PieceType.Queen,  PieceColor.White, true, null),
      createPiece("a7", PieceType.Bishop, PieceColor.Black, true, null),
      createPiece("d6", PieceType.Bishop, PieceColor.Black, true, null),
      createPiece("d8", PieceType.Rook,   PieceColor.Black, true, null),
      createPiece("h8", PieceType.Rook,   PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }
}