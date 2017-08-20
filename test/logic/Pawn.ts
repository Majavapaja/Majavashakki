import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import factory from "./PawnFactory";
import {moveSequence} from "./BoardHelper";
chai.should();
chai.use(chaiAsPromised);

describe("Pawn", () => {
    describe("Basic movement", () => {
        it("should allow white pawn to move forward [a2, a3]", done => {
            const promise = factory.build("board")
                .then(board => moveSequence(board, [["a2", "a3"]]));
            promise.should.eventually.have.same.members(["move"]).notify(done);
        });

        it("should allow black pawn to move forward [a7, a6]", done => {
            const promise = factory.build("board")
                .then(board => moveSequence(board, [["a7", "a6"]]));
            promise.should.eventually.have.same.members(["move"]).notify(done);
        });

        it("should allow white pawn to move forward twice [a2, a3], [a3, a4]", done => {
            const promise = factory.build("board")
                .then(board => moveSequence(board, [["a2", "a3"], ["a3", "a4"]]));
            promise.should.eventually.have.same.members(["move", "move"]).notify(done);
        });

        it("should allow black pawn to move forward twice [a7, a6], [a6, a5]", done => {
            const promise = factory.build("board")
                .then(board => moveSequence(board, [["a7", "a6"], ["a6", "a5"]]));
            promise.should.eventually.have.same.members(["move", "move"]).notify(done);
        });

        it("should not allow white pawn to move diagoanlly [a2 b3]", done => {
            const promise = factory.build("board")
                .then(board => moveSequence(board, [["a2", "b3"]]));
            promise.should.eventually.have.same.members(["error"]).notify(done);
        });

        it("should not allow black pawn to move diagoanlly [a7 b6]", done => {
            const promise = factory.build("board")
                .then(board => moveSequence(board, [["a7", "b6"]]));
            promise.should.eventually.have.same.members(["error"]).notify(done);
        });

        it("should not allow white pawn to move three ranks [a2 a5]", done => {
            const promise = factory.build("board")
                .then(board => moveSequence(board, [["a2", "a5"]]));
            promise.should.eventually.have.same.members(["error"]).notify(done);
        });

        it("should not allow black pawn to move three ranks [a7 a4]", done => {
            const promise = factory.build("board")
                .then(board => moveSequence(board, [["a7", "a4"]]));
            promise.should.eventually.have.same.members(["error"]).notify(done);
        });

        it("should not allow white pawn to move forward and then backward [a2 a3], [a3 a2]", done => {
            const promise = factory.build("board")
                .then(board => moveSequence(board, [["a2", "a3"], ["a3", "a2"]]));
            promise.should.eventually.have.same.members(["move", "error"]).notify(done);
        });

        it("should not allow black pawn to move forward and then backward [a7 a6], [a6 a7]", done => {
            const promise = factory.build("board")
                .then(board => moveSequence(board, [["a7", "a6"], ["a6", "a7"]]));
            promise.should.eventually.have.same.members(["move", "error"]).notify(done);
        });
    });

    describe("Capturing", () => {
        it("should allow white pawn to capture diagonally [d4 e5]", done => {
            const promise = factory.build("board-capture")
                .then(board => moveSequence(board, [["d4", "e5"]]));
            promise.should.eventually.have.same.members(["capture"]).notify(done);
        });

        it("should allow black pawn to capture diagonally [e5 d4]", done => {
            const promise = factory.build("board-capture")
                .then(board => moveSequence(board, [["e5", "d4"]]));
            promise.should.eventually.have.same.members(["capture"]).notify(done);
        });

        it("should not allow white pawn to capture forward [d4 d5]", done => {
            const promise = factory.build("board-capture")
                .then(board => moveSequence(board, [["d4", "d5"]]));
            promise.should.eventually.have.same.members(["error"]).notify(done);
        });

        it("should not allow black pawn to capture forward [e5 e4]", done => {
            const promise = factory.build("board-capture")
                .then(board => moveSequence(board, [["e5", "e4"]]));
            promise.should.eventually.have.same.members(["error"]).notify(done);
        });

        it("should not allow white pawn to capture an ally [d4 c5]", done => {
            const promise = factory.build("board-capture")
                .then(board => moveSequence(board, [["d4", "c5"]]));
            promise.should.eventually.have.same.members(["error"]).notify(done);
        });

        it("should not allow black pawn to capture an ally [e5 f4]", done => {
            const promise = factory.build("board-capture")
                .then(board => moveSequence(board, [["e5", "f4"]]));
            promise.should.eventually.have.same.members(["error"]).notify(done);
        });
    });

    describe("Double movement", () => {
        it("should allow white pawn to move two ranks [b2 b4]", done => {
            const promise = factory.build("board-double-move")
                .then(board => moveSequence(board, [["b2", "b4"]]));
            promise.should.eventually.have.same.members(["move"]).notify(done);
        });

        it("should allow black pawn to move two ranks [b7 b5]", done => {
            const promise = factory.build("board-double-move")
                .then(board => moveSequence(board, [["b7", "b5"]]));
            promise.should.eventually.have.same.members(["move"]).notify(done);
        });

        it("should not allow white pawn to move past pieces [a2 a4]", done => {
            const promise = factory.build("board-double-move")
                .then(board => moveSequence(board, [["a2", "a4"]]));
            promise.should.eventually.have.same.members(["error"]).notify(done);
        });

        it("should not allow black pawn to move past pieces [a7 a5]", done => {
            const promise = factory.build("board-double-move")
                .then(board => moveSequence(board, [["a7", "a5"]]));
            promise.should.eventually.have.same.members(["error"]).notify(done);
        });

        it("should not allow white pawn that has moved to move double [a3 a6]", done => {
            const promise = factory.build("board-double-move")
                .then(board => moveSequence(board, [["a3", "a6"]]));
            promise.should.eventually.have.same.members(["error"]).notify(done);
        });

        it("should not allow black pawn that has moved to move double [a6 a4]", done => {
            const promise = factory.build("board-double-move")
                .then(board => moveSequence(board, [["a6", "a4"]]));
            promise.should.eventually.have.same.members(["error"]).notify(done);
        });

        it("should not allow white pawn capture like a knight [c2 d4]", done => {
            const promise = factory.build("board-double-move")
                .then(board => moveSequence(board, [["c2", "d4"]]));
            promise.should.eventually.have.same.members(["error"]).notify(done);
        });

        it("should not allow white pawn capture like a knight [c7 d5]", done => {
            const promise = factory.build("board-double-move")
                .then(board => moveSequence(board, [["c7", "d5"]]));
            promise.should.eventually.have.same.members(["error"]).notify(done);
        });
    });
});
