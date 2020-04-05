import boardFactory from "./setup/BoardFactory";
import BoardBase from "common/BoardBase";
import {moveSequence} from "./setup/BoardHelper"

describe("Checkmate", () => {
  let subject: BoardBase

  describe("Basics", () => {

    beforeEach(() => {
      subject = boardFactory.setupCheckmate()
    })

    it("should not checkmate if king can move away", () => {
      const results = moveSequence(subject, [["a2", "a1"]])
      results.should.eql(["move|check"])
    })

    it("should not checkmate if someone can block checking piece", () => {
      const results = moveSequence(subject, [["h2", "h1"]])
      results.should.eql(["move|check"])
    })

    it("should not checkmate if someone can capture checking piece", () => {
      const results = moveSequence(subject, [["h2", "g1"]])
      results.should.eql(["move|check"])
    })

    it("should checkmate when king can't move and is in double check", () => {
      const results = moveSequence(subject, [["f3", "d3"]])
      results.should.eql(["move|checkmate"])
    })
  })

  describe("Real scenarios", () => {

    it("should checkmate (fool's mate)", () => {
      subject = boardFactory.setupBasic()
      const results = moveSequence(subject, [["f2", "f3"], ["e7", "e6"], ["g2", "g4"], ["d8", "h4"]])
      results.should.eql(["move", "move", "move", "move|checkmate"])
    })

    it("should checkmate (game of century)", () => {
      subject = boardFactory.setupGameOfCentury()
      const results = moveSequence(subject, [["a2", "c2"]])
      results.should.eql(["move|checkmate"])
    })
  })

  describe("Enpassant", () => {
    it("should be able to checkmate with enpassant", () => {
      subject = boardFactory.setupCheckmateEnpassant()
      const results = moveSequence(subject, [["a7", "a5"], ["b5", "a6"]])
      results.should.eql(["move", "enpassant|checkmate"])
    })

    it("should not cause checkmate if it can be prevented with enpassant", () => {
      subject = boardFactory.setupCheckmateEnpassantEscape()
      const results = moveSequence(subject, [["a7", "a5"]])
      results.should.eql(["move|check"])
    })
  })

  describe("Castling causes checkmate", () => {
      it("should be able to checkmate with castling", () => {
        subject = boardFactory.setupCheckmateCastling()
        const results = moveSequence(subject, [["e1", "c1"]])
        results.should.eql(["castling|checkmate"])
      })
  })
})
