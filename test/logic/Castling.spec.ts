import boardFactory from "./setup/BoardFactory"
import { moveSequence } from "./setup/BoardHelper"
import BoardBase from "common/BoardBase"
import * as Majavashakki from "../../src/common/GamePieces"

describe("Castling", () => {
  let subject: BoardBase

  beforeEach(() => {
    subject = boardFactory.setupCastling()
  })

  it("should allow castling with left rook", () => {
    const results = moveSequence(subject, [["e1", "c1"]])
    results.should.eql(["castling"])
    subject.getPiece({ col: "d", row: "1" }).type.should.eql(Majavashakki.PieceType.Rook)
  })

  it("should allow castling with right rook", () => {
    const results = moveSequence(subject, [["e1", "g1"]])
    results.should.eql(["castling"])
    subject.getPiece({ col: "f", row: "1" }).type.should.eql(Majavashakki.PieceType.Rook)
  })

  it("should allow castling if rook is threatened", () => {
    const results = moveSequence(subject, [
      ["e8", "h8"],
      ["e1", "g1"],
    ])
    results.should.eql(["move", "castling"])
  })

  it("should not allow castling if king has to move through square that is threatened", () => {
    const results = moveSequence(subject, [
      ["e8", "f8"],
      ["e1", "g1"],
    ])
    results.should.eql(["move", "error"])
  })

  it("should not allow castling if king has moved", () => {
    const results = moveSequence(subject, [
      ["e1", "f1"],
      ["f1", "e1"],
      ["e1", "c1"],
    ])
    results.should.eql(["move", "move", "error"])
  })

  it("should not allow castling if rook has moved", () => {
    const results = moveSequence(subject, [
      ["a1", "a2"],
      ["a2", "a1"],
      ["e1", "c1"],
    ])
    results.should.eql(["move", "move", "error"])
  })

  it("should not allow castling to left if there is a piece in way", () => {
    const results = moveSequence(subject, [
      ["e2", "d1"],
      ["e1", "c1"],
    ])
    results.should.eql(["move", "error"])
  })

  it("should not allow castling to right if there is a piece in way", () => {
    const results = moveSequence(subject, [
      ["e2", "f1"],
      ["e1", "g1"],
    ])
    results.should.eql(["move", "error"])
  })
})
