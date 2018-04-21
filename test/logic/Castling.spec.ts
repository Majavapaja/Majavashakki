import * as chai from "chai";
import * as chaiAsPromised from "chai-as-promised";
import factory from "./CastlingFactory";
import {moveSequence} from "./BoardHelper";
chai.should();
chai.use(chaiAsPromised);

describe("Castling", () => {
    describe("Basics", () => {
        it("should allow castling with left rook", done => {
            const promise = factory.build("board-castling")
                .then(board => moveSequence(board, [["e1", "c1"]]));
            promise.should.eventually.have.same.members(["castling"]).notify(done);
        });
        
        it("should allow castling with right rook", done => {
            const promise = factory.build("board-castling")
                .then(board => moveSequence(board, [["e1", "g1"]]));
            promise.should.eventually.have.same.members(["castling"]).notify(done);
        });
        
        it("should not allow castling if king has moved", done => {
            const promise = factory.build("board-castling")
                .then(board => moveSequence(board, [["e1", "f1"], ["f1", "e1"], ["e1", "c1"]]));
            promise.should.eventually.have.same.members(["move", "move", "error"]).notify(done);
        });
        
        it("should not allow castling if rook has moved", done => {
            const promise = factory.build("board-castling")
                .then(board => moveSequence(board, [["a1", "a2"], ["a2", "a1"], ["e1", "c1"]]));
            promise.should.eventually.have.same.members(["move", "move", "error"]).notify(done);
        });

        it("should not allow castling to left if there is a piece in way", done => {
            const promise = factory.build("board-castling")
                .then(board => moveSequence(board, [["d2", "d1"], ["e1", "c1"]]));
            promise.should.eventually.have.same.members(["move", "error"]).notify(done);
        });

        it("should not allow castling to right if there is a piece in way", done => {
            const promise = factory.build("board-castling")
                .then(board => moveSequence(board, [["e2", "f1"], ["e1", "g1"]]));
            promise.should.eventually.have.same.members(["move", "error"]).notify(done);
        });
    })

    describe("Under attack", () => {
        it("should not allow castling if king is in check", done => {
            const promise = factory.build("board-castling-threat")
                .then(board => moveSequence(board, [["a2", "e2"], ["e1", "c1"]]));
            promise.should.eventually.have.same.members(["check", "error"]).notify(done);
        });

        it("should not allow king to move through square that are under attack", done => {
            const promise = factory.build("board-castling-threat")
                .then(board => moveSequence(board, [["a2", "c2"], ["e1", "c1"]]));
            promise.should.eventually.have.same.members(["move", "error"]).notify(done);
        });

        it("should not allow castling if destination is under attack", done => {
            const promise = factory.build("board-castling-threat")
            .then(board => moveSequence(board, [["a2", "d2"], ["e1", "c1"]]));
            promise.should.eventually.have.same.members(["move", "error"]).notify(done);
        })

        it("should allow castling if rook is threatened", done => {
            const promise = factory.build("board-castling-threat")
                .then(board => moveSequence(board, [["e1", "c1"]]));
            promise.should.eventually.have.same.members(["castling"]).notify(done);
        });
    })
});
