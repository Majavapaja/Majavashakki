import chai from "chai"
import chaiAsPromised from "chai-as-promised"
import factory from "./StalemateFactory"
import {moveSequence} from "./setup/BoardHelper"
import { PieceType } from "../../src/common/GamePieces"
chai.should()
chai.use(chaiAsPromised)

describe("Stalemate", () => {
    it("should be stalemate in scenario 1", done => {
        const promise = factory.build("board-stalemate-1")
            .then(board => moveSequence(board, [["e6", "f7"]]))

        promise.should.eventually.have.same.members(["capture|draw"]).notify(done)
    })

    it("should be a stalemate in scenario 2 after two moves", done => {
        const promise = factory.build("board-stalemate-2")
            .then(board => moveSequence(board, [["a7", "a8"], ["b6", "a6"]]))

        promise.should.eventually.have.same.members(["move", "move|draw"]).notify(done)
    })

    it("should be a stalemate in scenario 3", done => {
        const promise = factory.build("board-stalemate-3")
            .then(board => moveSequence(board, [["d4", "c3"]]))

        promise.should.eventually.have.same.members(["move|draw"]).notify(done)
    })

    it("should be a stalemate in scenario 4", done => {
        const promise = factory.build("board-stalemate-4")
            .then(board => moveSequence(board, [["b8", "b3"]]))

        promise.should.eventually.have.same.members(["capture|draw"]).notify(done)
    })

    it("should be a stalemate in scenario 5", done => {
        const promise = factory.build("board-stalemate-5")
            .then(board => moveSequence(board, [["a5", "a6"]]))

        promise.should.eventually.have.same.members(["move|draw"]).notify(done)
    })

    it("should be a stalemate when promoted to queen", done => {
        const promise = factory.build("board-stalemate-promotion")
            .then(board => moveSequence(board, [["g7", "g8", PieceType.Queen]]))

        promise.should.eventually.have.same.members(["promotion|draw"]).notify(done)
    })

    it("should not be a stalemate when promoted to rook", done => {
        const promise = factory.build("board-stalemate-promotion")
            .then(board => moveSequence(board, [["g7", "g8", PieceType.Rook]]))

        promise.should.eventually.have.same.members(["promotion"]).notify(done)
    })
})
