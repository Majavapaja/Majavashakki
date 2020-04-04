import boardFactory from "./setup/BoardFactory";
import { moveSequence } from "./setup/BoardHelper";
import BoardBase from "common/BoardBase";
import * as Majavashakki from "../../src/common/GamePieces"

describe("Promotion", () => {
  let subject: BoardBase

  beforeEach(() => {
    subject = boardFactory.setupPromotion()
  })

  describe("Black pawn", () => {

    it("should allow black pawn to promote into Queen [a2, a1]", () => {
      const results = moveSequence(subject, [["a2", "a1", Majavashakki.PieceType.Queen]])
      results.should.eql(["promotion"])
      subject.getPiece({ col: "a", row: "1" }).type.should.eql(Majavashakki.PieceType.Queen)
    })

    it("should allow black pawn to promote to Knight [a2, a1]", () => {
      const results = moveSequence(subject, [["a2", "a1", Majavashakki.PieceType.Knight]])
      results.should.eql(["promotion"])
      subject.getPiece({ col: "a", row: "1" }).type.should.eql(Majavashakki.PieceType.Knight)
    })

    it("should allow black pawn to promote to Rook [a2, a1]", () => {
      const results = moveSequence(subject, [["a2", "a1", Majavashakki.PieceType.Rook]])
      results.should.eql(["promotion"])
      subject.getPiece({ col: "a", row: "1" }).type.should.eql(Majavashakki.PieceType.Rook)
    })

    it("should allow black pawn to promote to Bishop [a2, a1]", () => {
      const results = moveSequence(subject, [["a2", "a1", Majavashakki.PieceType.Bishop]])
      results.should.eql(["promotion"])
      subject.getPiece({ col: "a", row: "1" }).type.should.eql(Majavashakki.PieceType.Bishop)
    })

    it("should not allow black pawn to promote into Pawn [a2, a1]", () => {
      const results = moveSequence(subject, [["a2", "a1", Majavashakki.PieceType.Pawn]])
      results.should.eql(["error"])
    })

    it("should not allow black pawn to promote into King [a2, a1]", () => {
      const results = moveSequence(subject, [["a2", "a1", Majavashakki.PieceType.King]])
      results.should.eql(["error"])
    })

    it("should allow black pawn to promote on capture [a2, b1]", () => {
      const results = moveSequence(subject, [["a2", "b1", Majavashakki.PieceType.Queen]])
      results.should.eql(["promotion"])
      subject.getPiece({ col: "b", row: "1" }).type.should.eql(Majavashakki.PieceType.Queen)
    })
  })

  describe("White pawn", () => {

      it("should allow white pawn to promote into Queen [a7, a8]", () => {
        const results = moveSequence(subject, [["a7", "a8", Majavashakki.PieceType.Queen]])
        results.should.eql(["promotion"])
        subject.getPiece({ col: "a", row: "8" }).type.should.eql(Majavashakki.PieceType.Queen)
      })

      it("should allow white pawn to promote on capture [a7, b8]", () => {
        const results = moveSequence(subject, [["a7", "b8", Majavashakki.PieceType.Queen]])
        results.should.eql(["promotion"])
        subject.getPiece({ col: "b", row: "8" }).type.should.eql(Majavashakki.PieceType.Queen)
      })
  })
})
