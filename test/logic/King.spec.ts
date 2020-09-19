import boardFactory from "./setup/BoardFactory";
import { moveSequence } from "./setup/BoardHelper";
import BoardBase from "common/BoardBase";

describe("King", () => {
  let subject: BoardBase

  beforeEach(() => {
    subject = boardFactory.setupKing()
  })

  describe("Basic movement", () => {

    it("should allow king to move down [c7, c6]", () => {
      const results = moveSequence(subject, [["c7", "c6"]])
      results.should.eql(["move"])
    });

    it("should not allow king to move two down [c7, c5]", () => {
      const results = moveSequence(subject, [["c7", "c5"]])
      results.should.eql(["error"])
    });

    it("should allow king to move down right [c7, d6]", () => {
      const results = moveSequence(subject, [["c7", "d6"]])
      results.should.eql(["move"])
    });

    it("should not allow king to move two down right [c7, e5]", () => {
      const results = moveSequence(subject, [["c7", "e5"]])
      results.should.eql(["error"])
    });
  });

  describe("Capturing", () => {
    it("should allow king to capture sideways [c3, b3]", () => {
      const results = moveSequence(subject, [["c3", "b3"]])
      results.should.eql(["capture"])
    });

    it("should allow king to capture diagonally [c3, b2]", () => {
      const results = moveSequence(subject, [["c3", "b2"]])
      results.should.eql(["capture"])
    });

    it("should not allow king to capture allies [c3, c2]", () => {
      const results = moveSequence(subject, [["c3", "c2"]])
      results.should.eql(["error"])
    });
  });
});
