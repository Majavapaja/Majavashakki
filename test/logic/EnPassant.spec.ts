import chai from "chai"
import chaiAsPromised from "chai-as-promised"
import factory from "./EnPassantFactory"
import { moveSequence } from "./BoardHelper"
chai.should()
chai.use(chaiAsPromised)

describe("EnPassant", () => {
  it("should allow en passant", done => {
    const promise = factory.build("board-enpassant").then(board =>
      moveSequence(board, [
        ["c2", "c4"],
        ["d4", "c3"],
      ])
    )
    promise.should.eventually.have.same.members(["move", "enpassant"]).notify(done)
  })
  it("should not allow en passant if pawn moves two steps", done => {
    const promise = factory.build("board-enpassant").then(board =>
      moveSequence(board, [
        ["c2", "c3"],
        ["c3", "c4"],
        ["d4", "c3"],
      ])
    )
    promise.should.eventually.have.same.members(["move", "move", "error"]).notify(done)
  })
  it("should not allow en passant if it is not the next move", done => {
    const promise = factory.build("board-enpassant").then(board =>
      moveSequence(board, [
        ["c2", "c4"],
        ["a7", "a6"],
        ["d4", "c3"],
      ])
    )
    promise.should.eventually.have.same.members(["move", "move", "error"]).notify(done)
  })
})
