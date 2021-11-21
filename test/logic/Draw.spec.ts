import BoardBase from "common/BoardBase"
import boardFactory from "./setup/BoardFactory"
import { moveSequence, stringToPosition } from "./setup/BoardHelper"

describe("Draw", () => {
  describe("Not enough pieces for checkmate", () => {
    it("should be draw if there are only two kings", () => {
      const subject = boardFactory.setupDrawKingVsKing()
      const results = moveSequence(subject, [["e2", "e3"]])
      results.should.eql(["capture|draw"])
    })

    it("should be a draw if there are only two bishops on the same color", () => {
      const subject = boardFactory.setupDrawSameColorBishop()
      const results = moveSequence(subject, [["e2", "e3"]])
      results.should.eql(["capture|draw"])
    })

    it("should not be a draw if there are only two bishops on different colors", () => {
      const subject = boardFactory.setupDrawDifferentColorBishop()
      const results = moveSequence(subject, [["e2", "e3"]])
      results.should.eql(["capture"])
    })

    it("should be a draw if there is only a black bishop", () => {
      const subject = boardFactory.setupDrawOneWhiteBishop()
      const results = moveSequence(subject, [["e2", "e3"]])
      results.should.eql(["capture|draw"])
    })

    it("should be a draw if there is only a white bishop", () => {
      const subject = boardFactory.setupDrawOneBlackBishop()
      const results = moveSequence(subject, [["e2", "e3"]])
      results.should.eql(["capture|draw"])
    })

    it("should be a draw if there is only a white knight", () => {
      const subject = boardFactory.setupDrawOneWhiteKnight()
      const results = moveSequence(subject, [["e2", "e3"]])
      results.should.eql(["capture|draw"])
    })

    it("should be a draw if there is only a black knight", () => {
      const subject = boardFactory.setupDrawOneBlackKnight()
      const results = moveSequence(subject, [["e2", "e3"]])
      results.should.eql(["capture|draw"])
    })
  })

  describe("Fifty move rule", () => {
    let subject: BoardBase

    beforeEach(() => {
      subject = boardFactory.setupDraw48Moves()
    })

    it("should be a draw if there has been 50 moves without action", () => {
      const results = moveSequence(subject, [
        ["g2", "g1"],
        ["c3", "b3"],
      ])
      results.should.eql(["move", "move|draw"])
    })

    it("should not be a draw if there are only 49 moves", () => {
      const results = moveSequence(subject, [["g2", "g1"]])
      results.should.eql(["move"])
    })

    it("should be a draw if last pawn movement was 51 moves ago", () => {
      const pawnMove = {
        start: stringToPosition("b4"),
        destination: stringToPosition("b5"),
        algebraicNotation: "b5",
      }
      subject.moveHistory = [pawnMove, ...subject.moveHistory]
      const results = moveSequence(subject, [
        ["g2", "g1"],
        ["c3", "b3"],
      ])
      results.should.eql(["move", "move|draw"])
    })

    it("should not be a draw if last move was pawn movement", () => {
      const results = moveSequence(subject, [
        ["g2", "g1"],
        ["b5", "b6"],
      ])
      results.should.eql(["move", "move"])
    })

    it("should not be a draw if last move was capture", () => {
      const results = moveSequence(subject, [
        ["g2", "g1"],
        ["b8", "b5"],
      ])
      results.should.eql(["move", "capture"])
    })
  })
})
