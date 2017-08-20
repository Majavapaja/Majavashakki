import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import factory from "./BishopFactory";
import {moveSequence} from "./BoardHelper";
chai.should();
chai.use(chaiAsPromised);

describe("Bishop", () => {
    describe("Basic movement", () => {
        it("should allow bishop to move up left [e2, a6]", done => {
            const promise = factory.build("board-bishop-movement")
                .then(board => moveSequence(board, [["e2", "a6"]]));
            promise.should.eventually.have.same.members(["move"]).notify(done);
        });

        it("should allow bishop to move up right [e2, h5]", done => {
            const promise = factory.build("board-bishop-movement")
                .then(board => moveSequence(board, [["e2", "h5"]]));
            promise.should.eventually.have.same.members(["move"]).notify(done);
        });

        it("should allow bishop to move down left [e2, d1]", done => {
            const promise = factory.build("board-bishop-movement")
                .then(board => moveSequence(board, [["e2", "d1"]]));
            promise.should.eventually.have.same.members(["move"]).notify(done);
        });

        it("should allow bishop to move down right [e2, f1]", done => {
            const promise = factory.build("board-bishop-movement")
                .then(board => moveSequence(board, [["e2", "f1"]]));
            promise.should.eventually.have.same.members(["move"]).notify(done);
        });

        it("should not allow bishop to move through pieces [e2, d1], [d1, a4]", done => {
            const promise = factory.build("board-bishop-movement")
                .then(board => moveSequence(board, [["e2", "d1"], ["d1", "a4"]]));
            promise.should.eventually.have.same.members(["move", "error"]).notify(done);
        });

        it("should not allow bishop to move forward [e2, e3]", done => {
            const promise = factory.build("board-bishop-movement")
                .then(board => moveSequence(board, [["e2", "e3"]]));
            promise.should.eventually.have.same.members(["error"]).notify(done);
        });

        it("should not allow bishop to move like rook [e2, e8]", done => {
            const promise = factory.build("board-bishop-movement")
                .then(board => moveSequence(board, [["e2", "e8"]]));
            promise.should.eventually.have.same.members(["error"]).notify(done);
        });
    });

    describe("Capturing", () => {
        it("should allow bishop to capture at the end of movement [e2, b5]", done => {
            const promise = factory.build("board-bishop-capture")
                .then(board => moveSequence(board, [["e2", "b5"]]));
            promise.should.eventually.have.same.members(["capture"]).notify(done);
        });

        it("should not allow bishop to capture over other pieces [e2, a6]", done => {
            const promise = factory.build("board-bishop-capture")
                .then(board => moveSequence(board, [["e2", "a6"]]));
            promise.should.eventually.have.same.members(["error"]).notify(done);
        });

        it("should not allow rook to capture an ally [e2, d1]", done => {
            const promise = factory.build("board-bishop-capture")
                .then(board => moveSequence(board, [["e2", "d1"]]));
            promise.should.eventually.have.same.members(["error"]).notify(done);
        });
    });
});
