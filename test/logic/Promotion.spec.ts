import boardFactory from "./setup/BoardFactory";
import { moveSequence } from "./setup/BoardHelper";
import BoardBase from "common/BoardBase";
import { PieceType } from "../../src/common/GamePieces"

describe("Promotion", () => {
  let subject: BoardBase

  beforeEach(() => {
    subject = boardFactory.setupPromotion()
  })

  describe("Black pawn", () => {

    it("should allow black pawn to promote into Queen [a2, a1]", () => {
      const results = moveSequence(subject, [["a2", "a1", PieceType.Queen]])
      results.should.eql(["promotion"])
      subject.getPiece({ col: "a", row: "1" }).type.should.eql(PieceType.Queen)
    })

    it("should allow black pawn to promote to Knight [a2, a1]", () => {
      const results = moveSequence(subject, [["a2", "a1", PieceType.Knight]])
      results.should.eql(["promotion"])
      subject.getPiece({ col: "a", row: "1" }).type.should.eql(PieceType.Knight)
    })

    it("should allow black pawn to promote to Rook [a2, a1]", () => {
      const results = moveSequence(subject, [["a2", "a1", PieceType.Rook]])
      results.should.eql(["promotion"])
      subject.getPiece({ col: "a", row: "1" }).type.should.eql(PieceType.Rook)
    })

    it("should allow black pawn to promote to Bishop [a2, a1]", () => {
      const results = moveSequence(subject, [["a2", "a1", PieceType.Bishop]])
      results.should.eql(["promotion"])
      subject.getPiece({ col: "a", row: "1" }).type.should.eql(PieceType.Bishop)
    })

    it("should not allow black pawn to promote into Pawn [a2, a1]", () => {
      const results = moveSequence(subject, [["a2", "a1", PieceType.Pawn]])
      results.should.eql(["error"])
    })

    it("should not allow black pawn to promote into King [a2, a1]", () => {
      const results = moveSequence(subject, [["a2", "a1", PieceType.King]])
      results.should.eql(["error"])
    })

    it("should allow black pawn to promote on capture [a2, b1]", () => {
      const results = moveSequence(subject, [["a2", "b1", PieceType.Queen]])
      results.should.eql(["promotion"])
      subject.getPiece({ col: "b", row: "1" }).type.should.eql(PieceType.Queen)
    })
  })

  describe("White pawn", () => {

      it("should allow white pawn to promote into Queen [a7, a8]", () => {
        const results = moveSequence(subject, [["a7", "a8", PieceType.Queen]])
        results.should.eql(["promotion"])
        subject.getPiece({ col: "a", row: "8" }).type.should.eql(PieceType.Queen)
      })

      it("should allow white pawn to promote on capture [a7, b8]", () => {
        const results = moveSequence(subject, [["a7", "b8", PieceType.Queen]])
        results.should.eql(["promotion"])
        subject.getPiece({ col: "b", row: "8" }).type.should.eql(PieceType.Queen)
      })
  })
})
