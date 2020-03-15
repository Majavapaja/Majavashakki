import factory from "./EnPassantFactory";
import {moveSequence} from "./BoardHelper";
import { expect } from "chai";
import BoardBase from "common/BoardBase";

describe("EnPassant", () => {

  let subject: BoardBase;

  beforeEach(() => {
    subject = factory.setupEnpassant()
  })

  it("should allow en passant", () => {
    const results = moveSequence(subject, [["c2", "c4"], ["d4", "c3"]])
    expect(results).to.eql(["move", "enpassant"])
  });

  it("should not allow en passant if pawn moves two steps", () => {
    const results = moveSequence(subject, [["c2", "c3"], ["c3", "c4"], ["d4", "c3"]])
    expect(results).to.eql(["move", "move", "error"])
  });

  it("should not allow en passant if it is not the next move", () => {
    const results = moveSequence(subject, [["c2", "c4"], ["a7", "a6"], ["d4", "c3"]])
    expect(results).to.eql(["move", "move", "error"])
  });

});
