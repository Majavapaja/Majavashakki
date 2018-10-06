import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import factory from "./CheckmateFactory";
import {moveSequence} from "./BoardHelper";
chai.should();
chai.use(chaiAsPromised);

describe("Checkmate", () => {
    describe("Basics", () => {
            it("should not checkmate if king can move away", done => {
                const promise = factory.build("board-kingcanmove")
                    .then(board => moveSequence(board, [["c2", "d2"]]));
                promise.should.eventually.have.same.members(["check"]).notify(done);
            });
            it("should checkmate when king can't move and is in double check", done => {
                const promise = factory.build("board-doublecheck")
                    .then(board => moveSequence(board, [["c2", "d2"]]));
                promise.should.eventually.have.same.members(["checkmate"]).notify(done);
            });
            it("should not checkmate if someone can capture checking piece", done => {
                const promise = factory.build("board-checkmate-piececancapture")
                    .then(board => moveSequence(board, [["c2", "d2"]]));
                promise.should.eventually.have.same.members(["check"]).notify(done);
            });
            it("should not checkmate if someone can block checking piece", done => {
                const promise = factory.build("board-checkmate-piececanblock")
                    .then(board => moveSequence(board, [["h2", "h1"]]));
                promise.should.eventually.have.same.members(["check"]).notify(done);
            });
    })
    describe("Real scenarios", () => {
        it("should checkmate (foolsmate)", done => {
            const promise = factory.build("board-foolsmate")
                .then(board => moveSequence(board, [["d8", "h4"]]));
            promise.should.eventually.have.same.members(["checkmate"]).notify(done);
        });
        it("should checkmate (game of century)", done => {
            const promise = factory.build("board-gameofcentury")
                .then(board => moveSequence(board, [["a2", "c2"]]));
            promise.should.eventually.have.same.members(["checkmate"]).notify(done);
        });
    })
});
