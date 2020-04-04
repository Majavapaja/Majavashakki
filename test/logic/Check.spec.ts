import boardFactory from "./setup/BoardFactory";
import BoardBase from "common/BoardBase";
import chai from "chai"
import chaiAsPromised from "chai-as-promised"
import factory from "./CheckFactory"
import {moveSequence} from "./setup/BoardHelper"
import { PieceType } from "../../src/common/GamePieces"
chai.should()
chai.use(chaiAsPromised)

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
      const results = moveSequence(subject, [["d1", "d2"], ["c7", "b7"]])
      results.should.eql(["move", "error"])
    })

    it("should check", () => {
      const results = moveSequence(subject, [["d1", "d2"], ["c1", "d1"]])
      results.should.eql(["move", "move|check"])
    })

    it("should allow king to capture checking piece", () => {
      const results = moveSequence(subject, [["d1", "d2"], ["c1", "d1"], ["d2", "d1"]])
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
      const results = moveSequence(subject, [["b1", "c1"], ["c6", "h6"]])
      results.should.eql(["capture", "error"])
    })
  })

  describe("Enpassant", () => {
      it("should be able to check with enpassant", done => {
          const promise = factory.build("board-check-enpassant")
              .then(board => moveSequence(board, [["a7", "a5"], ["b5", "a6"]]))
          promise.should.eventually.have.same.members(["move", "enpassant|check"]).notify(done)
      })

      it("should not allow enpassant if it causes check to current player", done => {
          factory.build("board-check-enpassant-suicide").then(board => {
              const result = moveSequence(board, [["c7", "c5"], ["b5", "c6"]])
              result.should.have.same.members(["move", "error"])
              done()
          })
      })

      it("should allow enpassant to save king from check", done => {
          factory.build("board-check-enpassant-save").then(board => {
              const result = moveSequence(board, [["c7", "c5"], ["b5", "c6"]])
              result.should.have.same.members(["move|check", "enpassant"])
              done()
          })
      })
  })

  describe("Castling causes check", () => {
      it("should be able to check with castling", done => {
          const promise = factory.build("board-check-castling")
              .then(board => moveSequence(board, [["e1", "c1"]]))
          promise.should.eventually.have.same.members(["castling|check"]).notify(done)
      })
  })

  describe("Promotion causes check", () => {
      it("should cause check after promoting to Queen", done => {
          const promise = factory.build("board-check-promotion")
              .then(board => moveSequence(board, [["a7", "a8", PieceType.Queen]]))
          promise.should.eventually.have.same.members(["promotion|check"]).notify(done)
      })

      it("should not cause check after promoting to Knight", done => {
          const promise = factory.build("board-check-promotion")
              .then(board => moveSequence(board, [["a7", "a8", PieceType.Knight]]))
          promise.should.eventually.have.same.members(["promotion"]).notify(done)
      })
  })

  describe("Two kings", () => {
      it("should not be able to move in range of another king", done => {
          const promise = factory.build("board-check-two-kings")
              .then(board => moveSequence(board, [["a8", "a7"]]))
          promise.should.eventually.have.same.members(["error"]).notify(done)
      })
  })
})
