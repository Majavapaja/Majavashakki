import chai from "chai"
import chaiAsPromised from "chai-as-promised"
import factory from "./RookFactory"
import { moveSequence } from "./BoardHelper"
chai.should()
chai.use(chaiAsPromised)

describe("Rook", () => {
  describe("Basic movement", () => {
    it("should allow rook to move left [e2, a2]", done => {
      const promise = factory.build("board-rook-movement").then(board => moveSequence(board, [["e2", "a2"]]))
      promise.should.eventually.have.same.members(["move"]).notify(done)
    })

    it("should allow rook to move right [e2, h2]", done => {
      const promise = factory.build("board-rook-movement").then(board => moveSequence(board, [["e2", "h2"]]))
      promise.should.eventually.have.same.members(["move"]).notify(done)
    })

    it("should allow rook to move up [e2, e8]", done => {
      const promise = factory.build("board-rook-movement").then(board => moveSequence(board, [["e2", "e8"]]))
      promise.should.eventually.have.same.members(["move"]).notify(done)
    })

    it("should allow rook to move down [e2, e1]", done => {
      const promise = factory.build("board-rook-movement").then(board => moveSequence(board, [["e2", "e1"]]))
      promise.should.eventually.have.same.members(["move"]).notify(done)
    })

    it("should not allow rook to move through pieces [e2, e1], [e1, a1]", done => {
      const promise = factory.build("board-rook-movement").then(board =>
        moveSequence(board, [
          ["e2", "e1"],
          ["e1", "a1"],
        ])
      )
      promise.should.eventually.have.same.members(["move", "error"]).notify(done)
    })

    it("should not allow rook to move diagonally [e2, d3]", done => {
      const promise = factory.build("board-rook-movement").then(board => moveSequence(board, [["e2", "d3"]]))
      promise.should.eventually.have.same.members(["error"]).notify(done)
    })

    it("should not allow rook to move like bishop [e2, a6]", done => {
      const promise = factory.build("board-rook-movement").then(board => moveSequence(board, [["e2", "a6"]]))
      promise.should.eventually.have.same.members(["error"]).notify(done)
    })
  })

  describe("Capturing", () => {
    it("should allow rook to capture at the end of movement [e2, e5]", done => {
      const promise = factory.build("board-rook-capture").then(board => moveSequence(board, [["e2", "e5"]]))
      promise.should.eventually.have.same.members(["capture"]).notify(done)
    })

    it("should not allow rook to capture over other pieces [e2, e6]", done => {
      const promise = factory.build("board-rook-capture").then(board => moveSequence(board, [["e2", "e6"]]))
      promise.should.eventually.have.same.members(["error"]).notify(done)
    })

    it("should not allow rook to capture an ally [e2, e1]", done => {
      const promise = factory.build("board-rook-capture").then(board => moveSequence(board, [["e2", "e1"]]))
      promise.should.eventually.have.same.members(["error"]).notify(done)
    })
  })
})
