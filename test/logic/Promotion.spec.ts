import chai from "chai"
import chaiAsPromised from "chai-as-promised"
import factory from "./PromotionFactory"
import { moveSequence } from "./BoardHelper"
import * as Majavashakki from "../../src/common/GamePieces"

chai.should()
chai.use(chaiAsPromised)

describe("Promotion", () => {
  describe("Black pawn", () => {
    it("should allow black pawn to promote into Queen [a2, a1]", done => {
      factory.build("board-promotion").then(async board => {
        const moves = moveSequence(board, [["a2", "a1", Majavashakki.PieceType.Queen]])
        const piece = board.getPiece({ col: "a", row: "1" })

        moves.should.have.same.members(["promotion"])
        piece.type.should.equal(Majavashakki.PieceType.Queen)

        done()
      })
    })

    it("should allow black pawn to promote to Knight [a2, a1]", done => {
      factory.build("board-promotion").then(async board => {
        const moves = moveSequence(board, [["a2", "a1", Majavashakki.PieceType.Knight]])
        const piece = board.getPiece({ col: "a", row: "1" })

        moves.should.have.same.members(["promotion"])
        piece.type.should.equal(Majavashakki.PieceType.Knight)

        done()
      })
    })

    it("should allow black pawn to promote to Rook [a2, a1]", done => {
      factory.build("board-promotion").then(async board => {
        const moves = moveSequence(board, [["a2", "a1", Majavashakki.PieceType.Rook]])
        const piece = board.getPiece({ col: "a", row: "1" })

        moves.should.have.same.members(["promotion"])
        piece.type.should.equal(Majavashakki.PieceType.Rook)

        done()
      })
    })

    it("should allow black pawn to promote to Bishop [a2, a1]", done => {
      factory.build("board-promotion").then(async board => {
        const moves = moveSequence(board, [["a2", "a1", Majavashakki.PieceType.Bishop]])
        const piece = board.getPiece({ col: "a", row: "1" })

        moves.should.have.same.members(["promotion"])
        piece.type.should.equal(Majavashakki.PieceType.Bishop)

        done()
      })
    })

    it("should not allow black pawn to promote into Pawn [a2, a1]", done => {
      factory.build("board-promotion").then(async board => {
        const moves = moveSequence(board, [["a2", "a1", Majavashakki.PieceType.Pawn]])
        moves.should.have.same.members(["error"])
        done()
      })
    })

    it("should not allow black pawn to promote into King [a2, a1]", done => {
      factory.build("board-promotion").then(async board => {
        const moves = moveSequence(board, [["a2", "a1", Majavashakki.PieceType.King]])
        moves.should.have.same.members(["error"])
        done()
      })
    })

    it("should allow black pawn to promote on capture [a2, a1]", done => {
      factory.build("board-promotion").then(async board => {
        const moves = moveSequence(board, [["a2", "b1", Majavashakki.PieceType.Queen]])
        const piece = board.getPiece({ col: "b", row: "1" })

        moves.should.have.same.members(["promotion"])
        piece.type.should.equal(Majavashakki.PieceType.Queen)

        done()
      })
    })
  })

  describe("White pawn", () => {
    it("should allow white pawn to promote into Queen [a7, a8]", done => {
      factory.build("board-promotion").then(async board => {
        const moves = moveSequence(board, [["a7", "a8", Majavashakki.PieceType.Queen]])
        const piece = board.getPiece({ col: "a", row: "8" })

        moves.should.have.same.members(["promotion"])
        piece.type.should.equal(Majavashakki.PieceType.Queen)

        done()
      })
    })

    it("should allow white pawn to promote on capture [a7, b8]", done => {
      factory.build("board-promotion").then(async board => {
        const moves = moveSequence(board, [["a7", "b8", Majavashakki.PieceType.Queen]])
        const piece = board.getPiece({ col: "b", row: "8" })

        moves.should.have.same.members(["promotion"])
        piece.type.should.equal(Majavashakki.PieceType.Queen)

        done()
      })
    })
  })
})
