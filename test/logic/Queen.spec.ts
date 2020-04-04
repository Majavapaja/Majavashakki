import boardFactory from "./setup/BoardFactory";
import { moveSequence } from "./setup/BoardHelper";
import BoardBase from "common/BoardBase";

describe("Queen", () => {
  let subject: BoardBase

  beforeEach(() => {
    subject = boardFactory.setupQueen()
  })

  describe("Basic movement", () => {

    it("should allow queen to move up [f2, f8]", () => {
      const results = moveSequence(subject, [["f2", "f8"]])
      results.should.eql(["move"])
    });

    it("should allow queen to move up left [f2, a7]", () => {
      const results = moveSequence(subject, [["f2", "a7"]])
      results.should.eql(["move"])
    });

    it("should allow queen to move right [e1, h1]", () => {
      const results = moveSequence(subject, [["e1", "h1"]])
      results.should.eql(["move"])
    });

    it("should allow queen to move down right [e2, f1]", () => {
      const results = moveSequence(subject, [["e2", "f1"]])
      results.should.eql(["move"])
    });

    it("should not allow queen to move through pieces diagonally [e1, g3]", () => {
      const results = moveSequence(subject, [["e1", "g3"]])
      results.should.eql(["error"])
    });

    it("should not allow queen to move through pieces sideways [e2, g2]", () => {
      const results = moveSequence(subject, [["e2", "g2"]])
      results.should.eql(["error"])
    });

  });

  describe("Capturing", () => {

    it("should allow queen to capture like a bishop [e2, b5]", () => {
      const results = moveSequence(subject, [["e2", "b5"]])
      results.should.eql(["capture"])
    });

    it("should allow queen to capture like a rook [e2, e5]", () => {
      const results = moveSequence(subject, [["e2", "e5"]])
    });

    it("should not allow queen to capture over other pieces [e2, a6]", () => {
      const results = moveSequence(subject, [["e1", "e5"]])
      results.should.eql(["error"])
    });

    it("should not allow queen to capture an ally [e1, e2]", () => {
      const results = moveSequence(subject, [["e1", "e2"]])
      results.should.eql(["error"])
    });

  });
});
