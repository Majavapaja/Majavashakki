import boardFactory from "./setup/BoardFactory"
import { moveSequence } from "./setup/BoardHelper"
import BoardBase from "common/BoardBase"

describe("Rook", () => {
  let subject: BoardBase

  describe("Basic movement", () => {
    beforeEach(() => {
      subject = boardFactory.setupRookMovement()
    })

    it("should allow rook to move left [e2, a2]", () => {
      const results = moveSequence(subject, [["e2", "a2"]])
      results.should.eql(["move"])
    })

    it("should allow rook to move right [e2, h2]", () => {
      const results = moveSequence(subject, [["e2", "h2"]])
      results.should.eql(["move"])
    })

    it("should allow rook to move up [e2, e8]", () => {
      const results = moveSequence(subject, [["e2", "e8"]])
      results.should.eql(["move"])
    })

    it("should allow rook to move down [e2, e1]", () => {
      const results = moveSequence(subject, [["e2", "e1"]])
      results.should.eql(["move"])
    })

    it("should not allow rook to move through pieces [e2, e1], [e1, a1]", () => {
      const results = moveSequence(subject, [
        ["e2", "e1"],
        ["e1", "a1"],
      ])
      results.should.eql(["move", "error"])
    })

    it("should not allow rook to move diagonally [e2, d3]", () => {
      const results = moveSequence(subject, [["e2", "d4"]])
      results.should.eql(["error"])
    })

    it("should not allow rook to move like bishop [e2, a6]", () => {
      const results = moveSequence(subject, [["e2", "a6"]])
      results.should.eql(["error"])
    })
  })

  describe("Capturing", () => {
    beforeEach(() => {
      subject = boardFactory.setupRookCapture()
    })

    it("should allow rook to capture at the end of movement [e2, e5]", () => {
      const results = moveSequence(subject, [["e2", "e5"]])
      results.should.eql(["capture"])
    })

    it("should not allow rook to capture over other pieces [e2, e6]", () => {
      const results = moveSequence(subject, [["e2", "e6"]])
      results.should.eql(["error"])
    })

    it("should not allow rook to capture an ally [e2, e1]", () => {
      const results = moveSequence(subject, [["e2", "e1"]])
      results.should.eql(["error"])
    })
  })
})
