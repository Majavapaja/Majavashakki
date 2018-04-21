import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import factory from "./KingFactory";
import {moveSequence} from "./BoardHelper";
chai.should();
chai.use(chaiAsPromised);

describe("King", () => {
    describe("Basic movement", () => {
        it("should allow king to move up [c2, c3]", done => {
            const promise = factory.build("board-king-movement")
                .then(board => moveSequence(board, [["c2", "c3"]]));
            promise.should.eventually.have.same.members(["move"]).notify(done);
        });

        it("should allow king to move down right [c2, d1]", done => {
            const promise = factory.build("board-king-movement")
                .then(board => moveSequence(board, [["c2", "d1"]]));
            promise.should.eventually.have.same.members(["move"]).notify(done);
        });

        it("should not allow king to move three up [c2, c5]", done => {
            const promise = factory.build("board-king-movement")
                .then(board => moveSequence(board, [["c2", "c5"]]));
            promise.should.eventually.have.same.members(["error"]).notify(done);
        });

        it("should not allow king to move three diagonally [c2, f5]", done => {
            const promise = factory.build("board-king-movement")
                .then(board => moveSequence(board, [["c2", "f5"]]));
            promise.should.eventually.have.same.members(["error"]).notify(done);
        });
    });
    
    describe("Capturing", () => { 
        it("should allow king to capture sideways [c2, b2]", done => {
            const promise = factory.build("board-king-capture")
                .then(board => moveSequence(board, [["c2", "b2"]]));
            promise.should.eventually.have.same.members(["capture"]).notify(done);
        });

        it("should allow king to capture diagonally [c2, b3]", done => {
            const promise = factory.build("board-king-capture")
                .then(board => moveSequence(board, [["c2", "b3"]]));
            promise.should.eventually.have.same.members(["capture"]).notify(done);
        });

        it("should not allow king to capture allies [c2, c1]", done => {
            const promise = factory.build("board-king-capture")
                .then(board => moveSequence(board, [["c2", "c1"]]));
            promise.should.eventually.have.same.members(["error"]).notify(done);
        });
    });
});
