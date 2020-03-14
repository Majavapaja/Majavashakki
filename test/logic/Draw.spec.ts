import chai from "chai"
import chaiAsPromised from "chai-as-promised"
import factory from "./DrawFactory"
import { moveSequence, stringToPosition } from "./BoardHelper"
chai.should()
chai.use(chaiAsPromised)

describe("Draw", () => {
  describe("Small boards", () => {
    it("should be draw if only two kings left", done => {
      const promise = factory.build("board-draw-notenoughpieces-1").then(board => moveSequence(board, [["e2", "e3"]]))
      promise.should.eventually.have.same.members(["capture|draw"]).notify(done)
    })

    it("should be draw if only king and bishop vs king + bishop left (and bishop on the same colors)", done => {
      const promise = factory.build("board-draw-notenoughpieces-2").then(board => moveSequence(board, [["e2", "e3"]]))
      promise.should.eventually.have.same.members(["capture|draw"]).notify(done)
    })

    it("should not be a draw if king and bishop vs king + bishop left (and bishops on different colors)", done => {
      const promise = factory.build("board-draw-notenoughpieces-3").then(board => moveSequence(board, [["e2", "e3"]]))
      promise.should.eventually.have.same.members(["capture"]).notify(done)
    })

    it("should be a draw if king and bishop vs king", done => {
      const promise = factory.build("board-draw-notenoughpieces-4").then(board => moveSequence(board, [["e2", "e3"]]))
      promise.should.eventually.have.same.members(["capture|draw"]).notify(done)
    })

    it("should be a draw if king vs king and bishop", done => {
      const promise = factory.build("board-draw-notenoughpieces-5").then(board => moveSequence(board, [["e2", "e3"]]))
      promise.should.eventually.have.same.members(["capture|draw"]).notify(done)
    })

    it("should be a draw if king vs king and knight", done => {
      const promise = factory.build("board-draw-notenoughpieces-6").then(board => moveSequence(board, [["e2", "e3"]]))
      promise.should.eventually.have.same.members(["capture|draw"]).notify(done)
    })

    it("should be a draw if king and knight vs king", done => {
      const promise = factory.build("board-draw-notenoughpieces-7").then(board => moveSequence(board, [["e2", "e3"]]))
      promise.should.eventually.have.same.members(["capture|draw"]).notify(done)
    })
  })

  describe("Fifty move rule", () => {
    it("should be a draw if there has been 50 moves without action", done => {
      factory.build("board-draw-49moves").then(board => {
        moveSequence(board, [
          ["g2", "g1"],
          ["c3", "b3"],
        ]).should.have.same.members(["move", "move|draw"])
        done()
      })
    })

    it("should not be a draw if there are only 49 moves", done => {
      factory.build("board-draw-49moves").then(board => {
        moveSequence(board, [["g2", "g1"]]).should.have.same.members(["move"])
        done()
      })
    })

    it("should be a draw if last pawn movement was 51 moves ago", done => {
      factory.build("board-draw-49moves").then(board => {
        board.moveHistory = [
          {
            start: stringToPosition("b4"),
            destination: stringToPosition("b5"),
            algebraicNotation: "b5",
          },
          ...board.moveHistory,
        ]

        moveSequence(board, [
          ["g2", "g1"],
          ["c3", "b3"],
        ]).should.have.same.members(["move", "move|draw"])
        done()
      })
    })

    it("should not be a draw if last move was pawn movement", done => {
      factory.build("board-draw-49moves").then(board => {
        moveSequence(board, [
          ["g2", "g1"],
          ["b5", "b6"],
        ]).should.have.same.members(["move", "move"])
        done()
      })
    })

    it("should not be a draw if last move was capture", done => {
      factory.build("board-draw-49moves").then(board => {
        moveSequence(board, [
          ["g2", "g1"],
          ["b8", "b5"],
        ]).should.have.same.members(["move", "capture"])
        done()
      })
    })
  })
})
