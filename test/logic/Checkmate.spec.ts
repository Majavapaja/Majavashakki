import chai from "chai"
import chaiAsPromised from "chai-as-promised"
import factory from "./CheckmateFactory"
import {moveSequence} from "./setup/BoardHelper"
chai.should()
chai.use(chaiAsPromised)

describe("Checkmate", () => {
    describe("Basics", () => {
            it("should not checkmate if king can move away", done => {
                const promise = factory.build("board-kingcanmove")
                    .then(board => moveSequence(board, [["c2", "d2"]]))
                promise.should.eventually.have.same.members(["move|check"]).notify(done)
            })

            it("should checkmate when king can't move and is in double check", done => {
                const promise = factory.build("board-doublecheck")
                    .then(board => moveSequence(board, [["c2", "d2"]]))
                promise.should.eventually.have.same.members(["move|checkmate"]).notify(done)
            })

            it("should not checkmate if someone can capture checking piece", done => {
                const promise = factory.build("board-checkmate-piececancapture")
                    .then(board => moveSequence(board, [["c2", "d2"]]))
                promise.should.eventually.have.same.members(["move|check"]).notify(done)
            })

            it("should not checkmate if someone can block checking piece", done => {
                const promise = factory.build("board-checkmate-piececanblock")
                    .then(board => moveSequence(board, [["h2", "h1"]]))
                promise.should.eventually.have.same.members(["move|check"]).notify(done)
            })
    })

    describe("Real scenarios", () => {
        it("should checkmate (foolsmate)", done => {
            const promise = factory.build("board-foolsmate")
                .then(board => moveSequence(board, [["d8", "h4"]]))
            promise.should.eventually.have.same.members(["move|checkmate"]).notify(done)
        })

        it("should checkmate (game of century)", done => {
            const promise = factory.build("board-gameofcentury")
                .then(board => moveSequence(board, [["a2", "c2"]]))
            promise.should.eventually.have.same.members(["move|checkmate"]).notify(done)
        })
    })

    describe("Enpassant", () => {
        it("should be able to checkmate with enpassant", done => {
            const promise = factory.build("board-checkmate-enpassant")
                .then(board => moveSequence(board, [["a7", "a5"], ["b5", "a6"]]))
            promise.should.eventually.have.same.members(["move", "enpassant|checkmate"]).notify(done)
        })

        it("should not cause checkmate if it can be prevented with enpassant", done => {
            factory.build("board-checkmate-enpassant-save").then(board => {
                const result = moveSequence(board, [["a7", "a5"]])
                result.should.have.same.members(["move|check"])
                done()
            })
        })
    })

    describe("Castling causes checkmate", () => {
        it("should be able to checkmate with castling", done => {
            const promise = factory.build("board-checkmate-castling")
                .then(board => moveSequence(board, [["e1", "c1"]]))
            promise.should.eventually.have.same.members(["castling|checkmate"]).notify(done)
        })
    })
})
