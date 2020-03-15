import boardFactory from "./setup/BoardFactory";
import {moveSequence} from "./setup/BoardHelper";
import BoardBase from "common/BoardBase";

describe("Pawn", () => {

  let subject: BoardBase;

  describe("Basic movement", () => {

    beforeEach(() => {
      subject = boardFactory.setupBasic()
    })

    it("should allow white pawn to move forward [a2, a3]", () => {
      const results = moveSequence(subject, [["a2", "a3"]])
      results.should.eql(["move"])
    });

    it("should allow black pawn to move forward [a7, a6]", () => {
      const results = moveSequence(subject, [["a7", "a6"]])
      results.should.eql(["move"])
    });

    it("should allow white pawn to move forward twice [a2, a3], [a3, a4]", () => {
      const results = moveSequence(subject, [["a2", "a3"], ["a3", "a4"]])
      results.should.eql(["move", "move"])
    });

    it("should allow black pawn to move forward twice [a7, a6], [a6, a5]", () => {
      const results = moveSequence(subject, [["a7", "a6"], ["a6", "a5"]])
      results.should.eql(["move", "move"])
    });

    it("should not allow white pawn to move diagoanlly [a2 b3]", () => {
      const results = moveSequence(subject, [["a2", "b3"]])
      results.should.eql(["error"])
    });

    it("should not allow black pawn to move diagoanlly [a7 b6]", () => {
      const results = moveSequence(subject, [["a7", "b6"]])
      results.should.eql(["error"])
    });

    it("should not allow white pawn to move three ranks [a2 a5]", () => {
      const results = moveSequence(subject, [["a2", "a5"]])
      results.should.eql(["error"])
    });

    it("should not allow black pawn to move three ranks [a7 a4]", () => {
      const results = moveSequence(subject, [["a7", "a4"]])
      results.should.eql(["error"])
    });

    it("should not allow white pawn to move forward and then backward [a2 a3], [a3 a2]", () => {
      const results = moveSequence(subject, [["a2", "a3"], ["a3", "a2"]])
      results.should.eql(["move", "error"])
    });

    it("should not allow black pawn to move forward and then backward [a7 a6], [a6 a7]", () => {
      const results = moveSequence(subject, [["a7", "a6"], ["a6", "a7"]])
      results.should.eql(["move", "error"])
    });
  });

  describe("Capturing", () => {

    beforeEach(() => {
      subject = boardFactory.setupPawnCapture()
    })

    it("should allow white pawn to capture diagonally [d4 e5]", () => {
      const results = moveSequence(subject, [["d4", "e5"]])
      results.should.eql(["capture"])
    });

    it("should allow black pawn to capture diagonally [e5 d4]", () => {
      const results = moveSequence(subject, [["e5", "d4"]])
      results.should.eql(["capture"])
    });

    it("should not allow white pawn to capture forward [d4 d5]", () => {
      const results = moveSequence(subject, [["d4", "d5"]])
      results.should.eql(["error"])
    });

    it("should not allow black pawn to capture forward [e5 e4]", () => {
      const results = moveSequence(subject, [["e5", "e4"]])
      results.should.eql(["error"])
    });

    it("should not allow white pawn to capture an ally [d4 c5]", () => {
      const results = moveSequence(subject, [["d4", "c5"]])
      results.should.eql(["error"])
    });

    it("should not allow black pawn to capture an ally [e5 f4]", () => {
      const results = moveSequence(subject, [["e5", "f4"]])
      results.should.eql(["error"])
    });
  });

  describe("Double movement", () => {
    beforeEach(() => {
      subject = boardFactory.setupPawnDoubleMove()
    })

    it("should allow white pawn to move two ranks [b2 b4]", () => {
      const results = moveSequence(subject, [["b2", "b4"]])
      results.should.eql(["move"])
    });

    it("should allow black pawn to move two ranks [b7 b5]", () => {
      const results = moveSequence(subject, [["b7", "b5"]])
      results.should.eql(["move"])
    });

    it("should not allow white pawn to move past pieces [a2 a4]", () => {
      const results = moveSequence(subject, [["a2", "a4"]])
      results.should.eql(["error"])
    });

    it("should not allow black pawn to move past pieces [a7 a5]", () => {
      const results = moveSequence(subject, [["a7", "a5"]])
      results.should.eql(["error"])
    });

    it("should not allow white pawn that has moved to move double [a3 a6]", () => {
      const results = moveSequence(subject, [["a3", "a6"]])
      results.should.eql(["error"])
    });

    it("should not allow black pawn that has moved to move double [a6 a4]", () => {
      const results = moveSequence(subject, [["a6", "a4"]])
      results.should.eql(["error"])
    });

    it("should not allow white pawn capture like a knight [c2 d4]", () => {
      const results = moveSequence(subject, [["c2", "d4"]])
      results.should.eql(["error"])
    });

    it("should not allow white pawn capture like a knight [c7 d5]", () => {
      const results = moveSequence(subject, [["c7", "d5"]])
      results.should.eql(["error"])
    });
  });
});
