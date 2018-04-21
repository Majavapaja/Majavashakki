import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import factory from "./QueenFactory";
import {moveSequence} from "./BoardHelper";
chai.should();
chai.use(chaiAsPromised);

describe("Queen", () => {
    describe("Basic movement", () => {
        it("should allow queen to move up left [e2, a6]", done => {
            const promise = factory.build("board-queen-movement")
                .then(board => moveSequence(board, [["e2", "a6"]]));
            promise.should.eventually.have.same.members(["move"]).notify(done);
        });

        it("should allow queen to move down right [e2, f1]", done => {
            const promise = factory.build("board-queen-movement")
                .then(board => moveSequence(board, [["e2", "f1"]]));
            promise.should.eventually.have.same.members(["move"]).notify(done);
        });

        it("should allow queen to move right [e2, h2]", done => {
            const promise = factory.build("board-queen-movement")
                .then(board => moveSequence(board, [["e2", "h2"]]));
            promise.should.eventually.have.same.members(["move"]).notify(done);
        });

        it("should allow queen to move up [e2, e8]", done => {
            const promise = factory.build("board-queen-movement")
                .then(board => moveSequence(board, [["e2", "e8"]]));
            promise.should.eventually.have.same.members(["move"]).notify(done);
        });

        it("should not allow queen to move through pieces diagonally [e2, d1], [d1, a4]", done => {
            const promise = factory.build("board-queen-movement")
                .then(board => moveSequence(board, [["e2", "d1"], ["d1", "a4"]]));
            promise.should.eventually.have.same.members(["move", "error"]).notify(done);
        });

        it("should not allow queen to move through pieces sideways [e2, a2]", done => {
            const promise = factory.build("board-queen-movement")
                .then(board => moveSequence(board, [["e2", "a2"]]));
            promise.should.eventually.have.same.members(["error"]).notify(done);
        });
    });

    describe("Capturing", () => {
        it("should allow queen to capture like a bishop [e2, b5]", done => {
            const promise = factory.build("board-queen-capture")
                .then(board => moveSequence(board, [["e2", "b5"]]));
            promise.should.eventually.have.same.members(["capture"]).notify(done);
        });

        it("should allow queen to capture like a took [e2, e5]", done => {
            const promise = factory.build("board-queen-capture")
                .then(board => moveSequence(board, [["e2", "e5"]]));
            promise.should.eventually.have.same.members(["capture"]).notify(done);
        });

        it("should not allow queen to capture over other pieces [e2, a6]", done => {
            const promise = factory.build("board-queen-capture")
                .then(board => moveSequence(board, [["e2", "a6"]]));
            promise.should.eventually.have.same.members(["error"]).notify(done);
        });

        it("should not allow queen to capture an ally [e2, e1]", done => {
            const promise = factory.build("board-queen-capture")
                .then(board => moveSequence(board, [["e2", "e1"]]));
            promise.should.eventually.have.same.members(["error"]).notify(done);
        });
    });
});
