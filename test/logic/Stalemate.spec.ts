import boardFactory from "./setup/BoardFactory";
import { moveSequence } from "./setup/BoardHelper";
import BoardBase from "common/BoardBase";
import * as Majavashakki from "../../src/common/GamePieces"

describe("Stalemate", () => {
  let subject: BoardBase;

  it("should be draw in stalemate scenario 1", () => {
    subject = boardFactory.setupStalemate1()
    const results = moveSequence(subject, [["e6", "f7"]])
    results.should.eql(["capture|draw"])
  })

  it("should be draw in stalemate scenario 2", () => {
    subject = boardFactory.setupStalemate2()
    const results = moveSequence(subject, [["a7", "a8"], ["b6", "a6"]])
    results.should.eql(["move", "move|draw"])
  })

  it("should be draw in stalemate scenario 3", () => {
    subject = boardFactory.setupStalemate3()
    const results = moveSequence(subject, [["d4", "c3"]])
    results.should.eql(["move|draw"])
  })

  it("should be draw in stalemate scenario 4", () => {
    subject = boardFactory.setupStalemate4()
    const results = moveSequence(subject, [["b8", "b3"]])
    results.should.eql(["capture|draw"])
  })

  it("should be draw in stalemate scenario 5", () => {
    subject = boardFactory.setupStalemate5()
    const results = moveSequence(subject, [["a5", "a6"]])
    results.should.eql(["move|draw"])
  })

  it("should be draw in stalemate with queen promotion", () => {
    subject = boardFactory.setupStalemateFromPromotion()
    const results = moveSequence(subject, [["g7", "g8", Majavashakki.PieceType.Queen]])
    results.should.eql(["promotion|draw"])
  })

  it("should not stalemate with rook promotion", () => {
    subject = boardFactory.setupStalemateFromPromotion()
    const results = moveSequence(subject, [["g7", "g8", Majavashakki.PieceType.Rook]])
    results.should.eql(["promotion"])
  })

})
