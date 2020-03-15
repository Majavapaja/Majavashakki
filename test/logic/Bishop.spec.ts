import boardFactory from "./setup/BoardFactory";
import { moveSequence } from "./setup/BoardHelper";
import BoardBase from "common/BoardBase";

describe("Bishop", () => {
  let subject: BoardBase;

  describe("Basic movement", () => {

    beforeEach(() => {
      subject = boardFactory.setupBishopMovement()
    })

    it("should allow bishop to move up left [e2, a6]", () => {
      const results = moveSequence(subject, [["e2", "a6"]])
      results.should.eql(["move"])
    });

    it("should allow bishop to move up right [e2, h5]", () => {
      const results = moveSequence(subject, [["e2", "h5"]])
      results.should.eql(["move"])
    });

    it("should allow bishop to move down left [e2, d1]", () => {
      const results = moveSequence(subject, [["e2", "d1"]])
      results.should.eql(["move"])
    });

    it("should allow bishop to move down right [e2, f1]", () => {
      const results = moveSequence(subject, [["e2", "f1"]])
      results.should.eql(["move"])
    });

    it("should not allow bishop to move through pieces [e2, d1], [d1, a4]", () => {
      const results = moveSequence(subject, [["e2", "d1"], ["d1", "a4"]])
      results.should.eql(["move", "error"])
    });

    it("should not allow bishop to move forward [e2, e3]", () => {
      const results = moveSequence(subject, [["e2", "e3"]])
      results.should.eql(["error"])
    });

    it("should not allow bishop to move like rook [e2, e8]", () => {
      const results = moveSequence(subject, [["e2", "e8"]])
      results.should.eql(["error"])
    });
  });

  describe("Capturing", () => {

    beforeEach(() => {
      subject = boardFactory.setupBishopCapture()
    })

    it("should allow bishop to capture at the end of movement [e2, b5]", () => {
      const results = moveSequence(subject, [["e2", "b5"]])
      results.should.eql(["capture"])
    });

    it("should not allow bishop to capture over other pieces [e2, a6]", () => {
      const results = moveSequence(subject, [["e2", "a6"]])
      results.should.eql(["error"])
    });

    it("should not allow rook to capture an ally [e2, d1]", () => {
      const results = moveSequence(subject, [["e2", "d1"]])
      results.should.eql(["error"])
    });
  });
});
