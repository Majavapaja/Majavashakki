import boardFactory from "./setup/BoardFactory"
import BoardBase from "common/BoardBase"
import { moveSequence } from "./setup/BoardHelper"
import { PieceType } from "../../src/common/GamePieces"

describe("Check", () => {
  let subject: BoardBase

  describe("Basics", () => {
    beforeEach(() => {
      subject = boardFactory.setupCheck()
    })

    it("should allow king to escape check", () => {
      const results = moveSequence(subject, [["d1", "d2"]])
      results.should.eql(["move"])
    })

    it("should not allow king to move from check to check", () => {
      const results = moveSequence(subject, [["d1", "f1"]])
      results.should.eql(["error"])
    })

    it("should not allow king to move into check", () => {
      const results = moveSequence(subject, [
        ["d1", "d2"],
        ["c7", "b7"],
      ])
      results.should.eql(["move", "error"])
    })

    it("should check", () => {
      const results = moveSequence(subject, [
        ["d1", "d2"],
        ["c1", "d1"],
      ])
      results.should.eql(["move", "move|check"])
    })

    it("should allow king to capture checking piece", () => {
      const results = moveSequence(subject, [
        ["d1", "d2"],
        ["c1", "d1"],
        ["d2", "d1"],
      ])
      results.should.eql(["move", "move|check", "capture"])
    })

    it("should not allow king to capture checking piece if it causes check", () => {
      const results = moveSequence(subject, [["d1", "c1"]])
      results.should.eql(["error"])
    })

    it("should not allow other pieces to move if king is in check", () => {
      const results = moveSequence(subject, [["b1", "a1"]])
      results.should.eql(["error"])
    })

    it("should allow other pieces to capture checking piece", () => {
      const results = moveSequence(subject, [["b1", "c1"]])
      results.should.eql(["capture"])
    })

    it("should not allow other pieces moving to cause check", () => {
      const results = moveSequence(subject, [
        ["b1", "c1"],
        ["c6", "h6"],
      ])
      results.should.eql(["capture", "error"])
    })
  })

  describe("Enpassant", () => {
    beforeEach(() => {
      subject = boardFactory.setupCheckEnpassant()
    })

    it("should be able to check with enpassant", () => {
      const results = moveSequence(subject, [
        ["a7", "a5"],
        ["b5", "a6"],
      ])
      results.should.eql(["move", "enpassant|check"])
    })

    it("should allow enpassant to save king from check", () => {
      const results = moveSequence(subject, [
        ["e7", "e5"],
        ["d5", "e6"],
      ])
      results.should.eql(["move|check", "enpassant"])
    })

    it("should not allow enpassant if it causes check to current player", () => {
      const results = moveSequence(subject, [
        ["e7", "e5"],
        ["f5", "e6"],
      ])
      results.should.eql(["move|check", "error"])
    })
  })

  describe("Castling", () => {
    beforeEach(() => {
      subject = boardFactory.setupCheckCastling()
    })

    it("should be able to check with castling", () => {
      const results = moveSequence(subject, [["e1", "c1"]])
      results.should.eql(["castling|check"])
    })

    it("should not allow castling if it would cause check to self", () => {
      const results = moveSequence(subject, [["e1", "g1"]])
      results.should.eql(["error"])
    })

    it("should not allow castling if king is in check", () => {
      const results = moveSequence(subject, [
        ["g8", "e8"],
        ["e1", "c1"],
      ])
      results.should.eql(["move|check", "error"])
    })
  })

  describe("Promotion", () => {
    beforeEach(() => {
      subject = boardFactory.setupCheckPromotion()
    })

    it("should cause check after promoting to Queen", () => {
      const results = moveSequence(subject, [["a7", "a8", PieceType.Queen]])
      results.should.eql(["promotion|check"])
    })

    it("should not cause check after promoting to Knight", () => {
      const results = moveSequence(subject, [["a7", "a8", PieceType.Knight]])
      results.should.eql(["promotion"])
    })
  })

  describe("Two kings", () => {
    it("should not be able to move in range of another king", () => {
      subject = boardFactory.setupCheckWithTwoKings()
      const results = moveSequence(subject, [["a8", "a7"]])
      results.should.eql(["error"])
    })
  })
})
