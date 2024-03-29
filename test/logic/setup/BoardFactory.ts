import BoardBase from "../../../src/common/BoardBase"
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
    // prettier-ignore
    const pieces = [
      createPiece("c5", PieceType.Pawn, PieceColor.White, true),
      createPiece("e4", PieceType.Pawn, PieceColor.White, true),
      createPiece("d4", PieceType.Pawn, PieceColor.White, true),
      createPiece("d5", PieceType.Pawn, PieceColor.Black, true),
      createPiece("e5", PieceType.Pawn, PieceColor.Black, true),
      createPiece("f4", PieceType.Pawn, PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
      createPiece("a2", PieceType.Pawn, PieceColor.White, false),
      createPiece("a3", PieceType.Pawn, PieceColor.White, true),
      createPiece("b2", PieceType.Pawn, PieceColor.White, false),
      createPiece("c2", PieceType.Pawn, PieceColor.White, false),
      createPiece("d5", PieceType.Pawn, PieceColor.White, true),
      createPiece("a6", PieceType.Pawn, PieceColor.Black, true),
      createPiece("a7", PieceType.Pawn, PieceColor.Black, false),
      createPiece("b7", PieceType.Pawn, PieceColor.Black, false),
      createPiece("c7", PieceType.Pawn, PieceColor.Black, false),
      createPiece("d4", PieceType.Pawn, PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
      createPiece("e2", PieceType.Rook, PieceColor.White, true),
      createPiece("c1", PieceType.Rook, PieceColor.White, true),
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
    // prettier-ignore
    const pieces = [
      createPiece("e1", PieceType.Rook, PieceColor.White, true),
      createPiece("e2", PieceType.Rook, PieceColor.White, true),
      createPiece("e5", PieceType.Rook, PieceColor.Black, true),
      createPiece("e6", PieceType.Rook, PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
      createPiece("c2", PieceType.Bishop, PieceColor.White, true),
      createPiece("e2", PieceType.Bishop, PieceColor.White, true),
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
    // prettier-ignore
    const pieces = [
      createPiece("d1", PieceType.Bishop, PieceColor.White, true),
      createPiece("e2", PieceType.Bishop, PieceColor.White, true),
      createPiece("a6", PieceType.Bishop, PieceColor.Black, true),
      createPiece("b5", PieceType.Bishop, PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
      createPiece("c2", PieceType.Pawn, PieceColor.White, true),
      createPiece("c3", PieceType.King, PieceColor.White, true),
      createPiece("b2", PieceType.Pawn, PieceColor.Black, true),
      createPiece("b3", PieceType.Pawn, PieceColor.Black, true),
      createPiece("c7", PieceType.King, PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
      createPiece("e1", PieceType.Queen, PieceColor.White, true),
      createPiece("e2", PieceType.Queen, PieceColor.White, true),
      createPiece("f2", PieceType.Queen, PieceColor.White, true),
      createPiece("a6", PieceType.Queen, PieceColor.Black, true),
      createPiece("b5", PieceType.Queen, PieceColor.Black, true),
      createPiece("e5", PieceType.Queen, PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
      createPiece("c2", PieceType.Pawn, PieceColor.White, false),
      createPiece("a7", PieceType.Pawn, PieceColor.Black, false),
      createPiece("d4", PieceType.Pawn, PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
      createPiece("a1", PieceType.Rook,   PieceColor.White, false),
      createPiece("e1", PieceType.King,   PieceColor.White, false),
      createPiece("e2", PieceType.Bishop, PieceColor.White, false),
      createPiece("e3", PieceType.Queen,  PieceColor.White, false),
      createPiece("h1", PieceType.Rook,   PieceColor.White, false),
      createPiece("e8", PieceType.Rook,   PieceColor.Black, false),
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
    // prettier-ignore
    const pieces = [
      createPiece("a7", PieceType.Pawn, PieceColor.White, true),
      createPiece("b1", PieceType.Pawn, PieceColor.White, true),
      createPiece("a2", PieceType.Pawn, PieceColor.Black, true),
      createPiece("b8", PieceType.Pawn, PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
      createPiece("b1", PieceType.Rook, PieceColor.White, true),
      createPiece("d1", PieceType.King, PieceColor.White, true),
      createPiece("c1", PieceType.Rook, PieceColor.Black, true),
      createPiece("c6", PieceType.Rook, PieceColor.Black, true),
      createPiece("c7", PieceType.King, PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
      createPiece("b5", PieceType.Pawn, PieceColor.White, true),
      createPiece("d5", PieceType.Pawn, PieceColor.White, true),
      createPiece("f5", PieceType.Pawn, PieceColor.White, true),
      createPiece("f4", PieceType.King, PieceColor.White, true),
      createPiece("a7", PieceType.Pawn, PieceColor.Black, false),
      createPiece("e7", PieceType.Pawn, PieceColor.Black, false),
      createPiece("f7", PieceType.Rook, PieceColor.Black, true),
      createPiece("b7", PieceType.King, PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
      createPiece("a1", PieceType.Rook, PieceColor.White, false),
      createPiece("e1", PieceType.King, PieceColor.White, false),
      createPiece("h1", PieceType.Rook, PieceColor.White, false),
      createPiece("d8", PieceType.King, PieceColor.Black, true),
      createPiece("g8", PieceType.Rook, PieceColor.Black, false),
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
    // prettier-ignore
    const pieces = [
      createPiece("a1", PieceType.King, PieceColor.White, true),
      createPiece("a7", PieceType.Pawn, PieceColor.White, true),
      createPiece("d8", PieceType.King, PieceColor.Black, true),
      createPiece("h2", PieceType.Pawn, PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
      createPiece("b6", PieceType.King,   PieceColor.White, true),
      createPiece("h8", PieceType.Rook,   PieceColor.White, true),
      createPiece("a8", PieceType.King,   PieceColor.Black, true),
      createPiece("b8", PieceType.Bishop, PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
      createPiece("d1", PieceType.King,   PieceColor.White, true),
      createPiece("f2", PieceType.Queen,  PieceColor.White, true),
      createPiece("a2", PieceType.Rook,   PieceColor.Black, true),
      createPiece("e8", PieceType.Rook,   PieceColor.Black, true),
      createPiece("f3", PieceType.Rook,   PieceColor.Black, true),
      createPiece("g4", PieceType.Bishop, PieceColor.Black, true),
      createPiece("g5", PieceType.Bishop, PieceColor.Black, true),
      createPiece("h2", PieceType.Queen,  PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
      createPiece("b8", PieceType.Queen,  PieceColor.White, true),
      createPiece("c1", PieceType.King,   PieceColor.White, true),
      createPiece("e5", PieceType.Knight, PieceColor.White, true),
      createPiece("g2", PieceType.Pawn,   PieceColor.White, true),
      createPiece("h4", PieceType.Pawn,   PieceColor.White, true),

      createPiece("a2", PieceType.Rook,   PieceColor.Black, true),
      createPiece("b3", PieceType.Bishop, PieceColor.Black, true),
      createPiece("b4", PieceType.Bishop, PieceColor.Black, true),
      createPiece("b5", PieceType.Pawn,   PieceColor.Black, true),
      createPiece("c3", PieceType.Knight, PieceColor.Black, true),
      createPiece("c6", PieceType.Pawn,   PieceColor.Black, true),
      createPiece("f7", PieceType.Pawn,   PieceColor.Black, true),
      createPiece("g6", PieceType.Pawn,   PieceColor.Black, true),
      createPiece("g7", PieceType.King,   PieceColor.Black, true),
      createPiece("h5", PieceType.Pawn,   PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
      createPiece("b5", PieceType.Pawn,  PieceColor.White, true),
      createPiece("c5", PieceType.Queen, PieceColor.White, true),
      createPiece("h6", PieceType.Rook,  PieceColor.White, true),
      createPiece("h8", PieceType.Rook,  PieceColor.White, true),
      createPiece("a7", PieceType.Pawn,  PieceColor.Black, false),
      createPiece("b7", PieceType.King,  PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
      createPiece("b4", PieceType.King, PieceColor.White, true),
      createPiece("b5", PieceType.Pawn, PieceColor.White, true),
      createPiece("a7", PieceType.Pawn, PieceColor.Black, false),
      createPiece("a8", PieceType.Rook, PieceColor.Black, true),
      createPiece("c8", PieceType.Rook, PieceColor.Black, true),
      createPiece("h3", PieceType.Rook, PieceColor.Black, true),
      createPiece("h5", PieceType.Rook, PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
      createPiece("a1", PieceType.Rook, PieceColor.White, false),
      createPiece("e1", PieceType.King, PieceColor.White, false),
      createPiece("c7", PieceType.Pawn, PieceColor.Black, false),
      createPiece("c8", PieceType.Rook, PieceColor.Black, true),
      createPiece("d8", PieceType.King, PieceColor.Black, true),
      createPiece("e7", PieceType.Pawn, PieceColor.Black, false),
      createPiece("e8", PieceType.Rook, PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
      createPiece("a1", PieceType.Rook, PieceColor.White, false),
      createPiece("b1", PieceType.Knight, PieceColor.White, false),
      createPiece("c1", PieceType.Bishop, PieceColor.White, false),
      createPiece("d1", PieceType.Queen, PieceColor.White, false),
      createPiece("e1", PieceType.King, PieceColor.White, false),
      createPiece("f2", PieceType.Pawn, PieceColor.White, false),
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
    // prettier-ignore
    const pieces = [
      createPiece("a1", PieceType.Rook,   PieceColor.White, false),
      createPiece("b1", PieceType.Knight, PieceColor.White, false),
      createPiece("a2", PieceType.Pawn,   PieceColor.Black, true),
      createPiece("a3", PieceType.Pawn,   PieceColor.Black, true),
      createPiece("b4", PieceType.Pawn,   PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
      createPiece("a1", PieceType.Rook,   PieceColor.White, true),
      createPiece("a5", PieceType.Rook,   PieceColor.White, true),
      createPiece("e4", PieceType.Queen,  PieceColor.White, true),
      createPiece("h1", PieceType.Queen,  PieceColor.White, true),
      createPiece("h4", PieceType.Queen,  PieceColor.White, true),
      createPiece("a7", PieceType.Bishop, PieceColor.Black, true),
      createPiece("d6", PieceType.Bishop, PieceColor.Black, true),
      createPiece("d8", PieceType.Rook,   PieceColor.Black, true),
      createPiece("h8", PieceType.Rook,   PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
        createPiece("e2", PieceType.King, PieceColor.White, true),
        createPiece("e3", PieceType.Pawn, PieceColor.Black, true),
        createPiece("e7", PieceType.King, PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
        createPiece("c2", PieceType.Bishop, PieceColor.White, true),
        createPiece("e2", PieceType.King,   PieceColor.White, true),
        createPiece("e3", PieceType.Pawn,   PieceColor.Black, true),
        createPiece("e7", PieceType.King,   PieceColor.Black, true),
        createPiece("f7", PieceType.Bishop, PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
      createPiece("c2", PieceType.Bishop, PieceColor.White, true),
      createPiece("e2", PieceType.King,   PieceColor.White, true),
      createPiece("c7", PieceType.Bishop, PieceColor.Black, true),
      createPiece("e3", PieceType.Pawn,   PieceColor.Black, true),
      createPiece("e7", PieceType.King,   PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
        createPiece("c2", PieceType.Bishop, PieceColor.White, true),
        createPiece("e2", PieceType.King,   PieceColor.White, true),
        createPiece("e3", PieceType.Pawn,   PieceColor.Black, true),
        createPiece("e8", PieceType.King,   PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
        createPiece("e2", PieceType.King,   PieceColor.White, true),
        createPiece("c7", PieceType.Bishop, PieceColor.Black, true),
        createPiece("e3", PieceType.Pawn,   PieceColor.Black, true),
        createPiece("e8", PieceType.King,   PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
        createPiece("e2", PieceType.King,   PieceColor.White, true),
        createPiece("b2", PieceType.Knight, PieceColor.White, true),
        createPiece("e3", PieceType.Pawn,   PieceColor.Black, true),
        createPiece("e8", PieceType.King,   PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
        createPiece("e2", PieceType.King,   PieceColor.White, true),
        createPiece("b7", PieceType.Knight, PieceColor.Black, true),
        createPiece("e3", PieceType.Pawn,   PieceColor.Black, true),
        createPiece("e8", PieceType.King,   PieceColor.Black, true),
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
    // prettier-ignore
    const pieces = [
      createPiece("a8", PieceType.Rook, PieceColor.White, true),
      createPiece("b5", PieceType.Pawn, PieceColor.White, true),
      createPiece("g2", PieceType.King, PieceColor.White, true),
      createPiece("a7", PieceType.Pawn, PieceColor.Black, false),
      createPiece("b8", PieceType.Rook, PieceColor.Black, true),
      createPiece("c3", PieceType.King, PieceColor.Black, true),
    ]
    // prettier-ignore
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

  // Board template:
  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ⚊ ♚ ⚊ ⚊ 8
    7 ⚊ ⚊ ⚊ ⚊ ⚊ ♟ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ♙ ♔ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 2
    1 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupStalemate1() {
    // prettier-ignore
    const pieces = [
      createPiece("f8", PieceType.King, PieceColor.Black, true),
      createPiece("f7", PieceType.Pawn, PieceColor.Black, false),
      createPiece("e6", PieceType.Pawn, PieceColor.White, true),
      createPiece("f6", PieceType.King, PieceColor.White, true),
    ]
    return new BoardBase(pieces)
  }

  // Board template:
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
  public static setupStalemate2() {
    // prettier-ignore
    const pieces = [
      createPiece("a8", PieceType.King,   PieceColor.Black, true),
      createPiece("b8", PieceType.Bishop, PieceColor.Black, true),
      createPiece("b6", PieceType.King,   PieceColor.White, true),
      createPiece("h8", PieceType.Rook,   PieceColor.White, true),
    ]
    return new BoardBase(pieces)
  }

  // Board template:
  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 8
    7 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ♔ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ⚊ ♖ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 2
    1 ♚ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupStalemate3() {
    // prettier-ignore
    const pieces = [
      createPiece("a1", PieceType.King, PieceColor.Black, true),
      createPiece("b2", PieceType.Rook, PieceColor.White, true),
      createPiece("d4", PieceType.King, PieceColor.White, true),
    ]
    return new BoardBase(pieces)
  }

  // Board template:
  /*  a b c d e f g h
    8 ⚊ ♕ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 8
    7 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ♔ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 4
    3 ⚊ ♟ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ♟ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 2
    1 ♚ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupStalemate4() {
    // prettier-ignore
    const pieces = [
      createPiece("a1", PieceType.King,  PieceColor.Black, true),
      createPiece("a2", PieceType.Pawn,  PieceColor.Black, true),
      createPiece("b3", PieceType.Pawn,  PieceColor.Black, true),
      createPiece("g5", PieceType.King,  PieceColor.White, true),
      createPiece("b8", PieceType.Queen, PieceColor.White, true),
    ]
    return new BoardBase(pieces)
  }

  // Board template:
  /*  a b c d e f g h
    8 ♚ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 8
    7 ♙ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 6
    5 ♔ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ♗ ⚊ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 2
    1 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupStalemate5() {
    // prettier-ignore
    const pieces = [
      createPiece("a8", PieceType.King,   PieceColor.Black, true),
      createPiece("f4", PieceType.Bishop, PieceColor.White, true),
      createPiece("a5", PieceType.King,   PieceColor.White, true),
      createPiece("a7", PieceType.Pawn,   PieceColor.White, true),
    ]
    return new BoardBase(pieces)
  }

  // Board template:
  /*  a b c d e f g h
    8 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 8
    7 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ♙ ⚊ 7
    6 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ♚ 6
    5 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 5
    4 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ♔ ⚊ 4
    3 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 3
    2 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 2
    1 ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ ⚊ 1
      a b c d e f g h */
  public static setupStalemateFromPromotion() {
    // prettier-ignore
    const pieces = [
      createPiece("h6", PieceType.King, PieceColor.Black, true),
      createPiece("g4", PieceType.King, PieceColor.White, true),
      createPiece("g7", PieceType.Pawn, PieceColor.White, true),
    ]
    return new BoardBase(pieces)
  }
}
