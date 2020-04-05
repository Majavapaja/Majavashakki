import BoardBase from "../../../src/common/BoardBase";
import { PieceColor, PieceType } from "../../../src/common/GamePieces"
import { createPiece, stringToPosition } from "./BoardHelper"

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

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ♚ ⚊ ⚊ ⚊ 8
    7 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ♟ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ⚊ ⚊ ♔ ⚊ ⚊ ⚊ 2
    1 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupDrawKingVsKing() {
    const pieces = [
        createPiece("e2", PieceType.King, PieceColor.White, true, null),
        createPiece("e3", PieceType.Pawn, PieceColor.Black, true, null),
        createPiece("e7", PieceType.King, PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ♚ ♝ ⚊ ⚊ 8
    7 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ♟ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ♗ ⚊ ♔ ⚊ ⚊ ⚊ 2
    1 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupDrawSameColorBishop() {
    const pieces = [
        createPiece("c2", PieceType.Bishop, PieceColor.White, true, null),
        createPiece("e2", PieceType.King,   PieceColor.White, true, null),
        createPiece("e3", PieceType.Pawn,   PieceColor.Black, true, null),
        createPiece("e7", PieceType.King,   PieceColor.Black, true, null),
        createPiece("f7", PieceType.Bishop, PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ⚊ ♝ ⚊ ♚ ⚊ ⚊ ⚊ 8
    7 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ♟ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ♗ ⚊ ♔ ⚊ ⚊ ⚊ 2
    1 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupDrawDifferentColorBishop() {
    const pieces = [
      createPiece("c2", PieceType.Bishop, PieceColor.White, true, null),
      createPiece("e2", PieceType.King,   PieceColor.White, true, null),
      createPiece("c7", PieceType.Bishop, PieceColor.Black, true, null),
      createPiece("e3", PieceType.Pawn,   PieceColor.Black, true, null),
      createPiece("e7", PieceType.King,   PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ♚ ⚊ ⚊ ⚊ 8
    7 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ♟ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ♗ ⚊ ♔ ⚊ ⚊ ⚊ 2
    1 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupDrawOneWhiteBishop() {
    const pieces = [
        createPiece("c2", PieceType.Bishop, PieceColor.White, true, null),
        createPiece("e2", PieceType.King,   PieceColor.White, true, null),
        createPiece("e3", PieceType.Pawn,   PieceColor.Black, true, null),
        createPiece("e8", PieceType.King,   PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ♚ ⚊ ⚊ ⚊ 8
    7 ⚊ ⚊ ♝ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ♟ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ⚊ ⚊ ♔ ⚊ ⚊ ⚊ 2
    1 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupDrawOneBlackBishop() {
    const pieces = [
        createPiece("e2", PieceType.King,   PieceColor.White, true, null),
        createPiece("c7", PieceType.Bishop, PieceColor.Black, true, null),
        createPiece("e3", PieceType.Pawn,   PieceColor.Black, true, null),
        createPiece("e8", PieceType.King,   PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ♚ ⚊ ⚊ ⚊ 8
    7 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ♟ ⚊ ⚊ ⚊ 3
    2 ⚊ ♘ ⚊ ⚊ ♔ ⚊ ⚊ ⚊ 2
    1 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupDrawOneWhiteKnight() {
    const pieces = [
        createPiece("e2", PieceType.King,   PieceColor.White, true, null),
        createPiece("b2", PieceType.Knight, PieceColor.White, true, null),
        createPiece("e3", PieceType.Pawn,   PieceColor.Black, true, null),
        createPiece("e8", PieceType.King,   PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ♚ ⚊ ⚊ ⚊ 8
    7 ⚊ ♞ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ♟ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ⚊ ⚊ ♔ ⚊ ⚊ ⚊ 2
    1 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupDrawOneBlackKnight() {
    const pieces = [
        createPiece("e2", PieceType.King,   PieceColor.White, true, null),
        createPiece("b7", PieceType.Knight, PieceColor.Black, true, null),
        createPiece("e3", PieceType.Pawn,   PieceColor.Black, true, null),
        createPiece("e8", PieceType.King,   PieceColor.Black, true, null),
    ]
    return new BoardBase(pieces)
  }

  /*  a b c d e f g h
    8 ♖ ♜ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 8
    7 ⚊ ♟ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ♙ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ♚ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ♔ ⚊ 2
    1 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupDraw48Moves() {
    const pieces = [
      createPiece("a8", PieceType.Rook, PieceColor.White, true, null),
      createPiece("b5", PieceType.Pawn, PieceColor.White, true, null),
      createPiece("g2", PieceType.King, PieceColor.White, true, null),
      createPiece("a7", PieceType.Pawn, PieceColor.Black, false, null),
      createPiece("b8", PieceType.Rook, PieceColor.Black, true, null),
      createPiece("c3", PieceType.King, PieceColor.Black, true, null),
    ]
    const moveHistory = [
      { start: stringToPosition("h8"), destination: stringToPosition("g8"), algebraicNotation: "Rg8" },
      { start: stringToPosition("c1"), destination: stringToPosition("c2"), algebraicNotation: "Rc2" },
      { start: stringToPosition("g8"), destination: stringToPosition("f8"), algebraicNotation: "Rf8" },
      { start: stringToPosition("c2"), destination: stringToPosition("d2"), algebraicNotation: "Rd2" },
      { start: stringToPosition("f8"), destination: stringToPosition("e8"), algebraicNotation: "Re8" },
      { start: stringToPosition("d2"), destination: stringToPosition("d1"), algebraicNotation: "Rd1" },
      { start: stringToPosition("e8"), destination: stringToPosition("d8"), algebraicNotation: "Rd8" },
      { start: stringToPosition("d1"), destination: stringToPosition("e1"), algebraicNotation: "Re1" },
      { start: stringToPosition("d8"), destination: stringToPosition("c8"), algebraicNotation: "Rc8" },
      { start: stringToPosition("e1"), destination: stringToPosition("e2"), algebraicNotation: "Re2" },
      { start: stringToPosition("c8"), destination: stringToPosition("b8"), algebraicNotation: "Rb8" },
      { start: stringToPosition("b7"), destination: stringToPosition("c7"), algebraicNotation: "Kc7" },
      { start: stringToPosition("b8"), destination: stringToPosition("a8"), algebraicNotation: "Ra8" },
      { start: stringToPosition("e2"), destination: stringToPosition("f2"), algebraicNotation: "Rf2" },
      { start: stringToPosition("h3"), destination: stringToPosition("h4"), algebraicNotation: "Kh4" },
      { start: stringToPosition("f2"), destination: stringToPosition("f1"), algebraicNotation: "Rf1" },
      { start: stringToPosition("h4"), destination: stringToPosition("h5"), algebraicNotation: "Kh5" },
      { start: stringToPosition("f1"), destination: stringToPosition("g1"), algebraicNotation: "Rg1" },
      { start: stringToPosition("h5"), destination: stringToPosition("h6"), algebraicNotation: "Kh6" },
      { start: stringToPosition("g1"), destination: stringToPosition("g2"), algebraicNotation: "Rg2" },
      { start: stringToPosition("h6"), destination: stringToPosition("h7"), algebraicNotation: "Kh7" },
      { start: stringToPosition("g2"), destination: stringToPosition("h2"), algebraicNotation: "Rh2" },
      { start: stringToPosition("h7"), destination: stringToPosition("g8"), algebraicNotation: "Kg8" },
      { start: stringToPosition("h2"), destination: stringToPosition("h8"), algebraicNotation: "Rh8" },
      { start: stringToPosition("g8"), destination: stringToPosition("g7"), algebraicNotation: "Kg7" },
      { start: stringToPosition("h8"), destination: stringToPosition("b8"), algebraicNotation: "Rb8" },
      { start: stringToPosition("g7"), destination: stringToPosition("h7"), algebraicNotation: "Kh7" },
      { start: stringToPosition("c7"), destination: stringToPosition("d7"), algebraicNotation: "Kd7" },
      { start: stringToPosition("h7"), destination: stringToPosition("h6"), algebraicNotation: "Kh6" },
      { start: stringToPosition("d7"), destination: stringToPosition("d6"), algebraicNotation: "Kd6" },
      { start: stringToPosition("h6"), destination: stringToPosition("g6"), algebraicNotation: "Kg6" },
      { start: stringToPosition("d6"), destination: stringToPosition("d5"), algebraicNotation: "Kd5" },
      { start: stringToPosition("g6"), destination: stringToPosition("g5"), algebraicNotation: "Kg5" },
      { start: stringToPosition("d5"), destination: stringToPosition("c5"), algebraicNotation: "Kc5" },
      { start: stringToPosition("g5"), destination: stringToPosition("h5"), algebraicNotation: "Kh5" },
      { start: stringToPosition("c5"), destination: stringToPosition("c4"), algebraicNotation: "Kc4" },
      { start: stringToPosition("h5"), destination: stringToPosition("h4"), algebraicNotation: "Kh4" },
      { start: stringToPosition("c4"), destination: stringToPosition("d4"), algebraicNotation: "Kd4" },
      { start: stringToPosition("h4"), destination: stringToPosition("g4"), algebraicNotation: "Kg4" },
      { start: stringToPosition("d4"), destination: stringToPosition("d3"), algebraicNotation: "Kd3" },
      { start: stringToPosition("g4"), destination: stringToPosition("g3"), algebraicNotation: "Kg3" },
      { start: stringToPosition("d3"), destination: stringToPosition("c3"), algebraicNotation: "Kc3" },
      { start: stringToPosition("g3"), destination: stringToPosition("h3"), algebraicNotation: "Kh3" },
      { start: stringToPosition("c3"), destination: stringToPosition("c2"), algebraicNotation: "Kc2" },
      { start: stringToPosition("h3"), destination: stringToPosition("h2"), algebraicNotation: "Kh2" },
      { start: stringToPosition("c2"), destination: stringToPosition("d2"), algebraicNotation: "Kd2" },
      { start: stringToPosition("h2"), destination: stringToPosition("g2"), algebraicNotation: "Kg2" },
      { start: stringToPosition("d2"), destination: stringToPosition("c3"), algebraicNotation: "Kc3" },
    ]
    return new BoardBase(pieces, moveHistory)
  }
}