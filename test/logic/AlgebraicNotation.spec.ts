import boardFactory from "./setup/BoardFactory"
import { moveSequence } from "./setup/BoardHelper"
import { PieceType } from "../../src/common/GamePieces"

describe("Algebraic Notation", () => {
  describe("Movement notation", () => {
    it("should return correct notation for basic movement", () => {
      const subject = boardFactory.setupAlgebraicNotationMovement()
      moveSequence(subject, [
        ["a1", "a2"],
        ["b1", "a3"],
        ["c1", "b2"],
        ["d1", "d2"],
        ["e1", "e2"],
        ["f2", "f3"],
      ])

      subject.moveHistory[0].algebraicNotation.should.equal("Ra2")
      subject.moveHistory[1].algebraicNotation.should.equal("Na3")
      subject.moveHistory[2].algebraicNotation.should.equal("Bb2")
      subject.moveHistory[3].algebraicNotation.should.equal("Qd2")
      subject.moveHistory[4].algebraicNotation.should.equal("Ke2")
      subject.moveHistory[5].algebraicNotation.should.equal("f3")
    })
  })

  describe("Capture notation", () => {
    it("should have correct notation for captures", () => {
      const subject = boardFactory.setupAlgebraicNotationCaptures()
      moveSequence(subject, [
        ["a1", "a2"],
        ["b1", "a3"],
        ["b4", "a3"],
      ])

      subject.moveHistory[0].algebraicNotation.should.equal("Rxa2")
      subject.moveHistory[1].algebraicNotation.should.equal("Nxa3")
      subject.moveHistory[2].algebraicNotation.should.equal("bxa3")
    })
  })

  describe("Disambiguation", () => {
    it("should have correct disambiguation with rank/file conflicts", () => {
      const subject = boardFactory.setupAlgebraicNotationDisambiguation()
      moveSequence(subject, [
        ["d6", "b8"],
        ["d8", "f8"],
        ["a1", "a3"],
        ["h4", "e1"],
      ])

      subject.moveHistory[0].algebraicNotation.should.equal("Bdb8")
      subject.moveHistory[1].algebraicNotation.should.equal("Rdf8")
      subject.moveHistory[2].algebraicNotation.should.equal("R1a3")
      subject.moveHistory[3].algebraicNotation.should.equal("Qh4e1")
    })
  })

  describe("Special movements", () => {
    it("should have correct notation for promoting a pawn", () => {
      const subject = boardFactory.setupPromotion()
      moveSequence(subject, [
        ["a7", "a8", PieceType.Knight],
        ["a2", "b1", PieceType.Queen],
      ])
      subject.moveHistory[0].algebraicNotation.should.equal("a8N")
      subject.moveHistory[1].algebraicNotation.should.equal("xb1Q")
    })

    it("should have correct notation for castling to queenside", () => {
      const subject = boardFactory.setupCastling()
      moveSequence(subject, [["e1", "c1"]])
      subject.moveHistory[0].algebraicNotation.should.equal("0-0-0")
    })

    it("should have correct notation for castling to kingside", () => {
      const subject = boardFactory.setupCastling()
      moveSequence(subject, [["e1", "g1"]])
      subject.moveHistory[0].algebraicNotation.should.equal("0-0")
    })

    it("should have correct notation for enpassant", () => {
      const subject = boardFactory.setupEnpassant()
      moveSequence(subject, [
        ["c2", "c4"],
        ["d4", "c3"],
      ])
      subject.moveHistory[0].algebraicNotation.should.equal("c4")
      subject.moveHistory[1].algebraicNotation.should.equal("dxc3e.p.")
    })

    it("should have correct notation for check", () => {
      const subject = boardFactory.setupCheck()
      moveSequence(subject, [
        ["d1", "d2"],
        ["c1", "d1"],
      ])
      subject.moveHistory[1].algebraicNotation.should.equal("Rd1+")
    })

    it("should have correct notation for checkmate", () => {
      const subject = boardFactory.setupGameOfCentury()
      moveSequence(subject, [["a2", "c2"]])
      subject.moveHistory[0].algebraicNotation.should.equal("Rc2#")
    })
  })
})
