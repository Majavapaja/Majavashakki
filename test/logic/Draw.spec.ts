import chai from "chai"
import chaiAsPromised from "chai-as-promised"
import factory from "./DrawFactory"
import {moveSequence} from "./BoardHelper"
chai.should()
chai.use(chaiAsPromised)

describe("Draw", () => {
    it("should be draw if only two kings left", done => {
        const promise = factory.build("board-draw-notenoughpieces-1")
            .then(board => moveSequence(board, [["e2", "e3"]]))
        promise.should.eventually.have.same.members(["capture|draw"]).notify(done)
    })

    it("should be draw if only king and bishop vs king + bishop left (and bishop on the same colors)", done => {
        const promise = factory.build("board-draw-notenoughpieces-2")
            .then(board => moveSequence(board, [["e2", "e3"]]))
        promise.should.eventually.have.same.members(["capture|draw"]).notify(done)
    })

    it("should not be a draw if king and bishop vs king + bishop left (and bishops on different colors)", done => {
        const promise = factory.build("board-draw-notenoughpieces-3")
            .then(board => moveSequence(board, [["e2", "e3"]]))
        promise.should.eventually.have.same.members(["capture"]).notify(done)
    })

    it("should be a draw if king and bishop vs king", done => {
        const promise = factory.build("board-draw-notenoughpieces-4")
            .then(board => moveSequence(board, [["e2", "e3"]]))
        promise.should.eventually.have.same.members(["capture|draw"]).notify(done)
    })

    it("should be a draw if king vs king and bishop", done => {
        const promise = factory.build("board-draw-notenoughpieces-5")
            .then(board => moveSequence(board, [["e2", "e3"]]))
        promise.should.eventually.have.same.members(["capture|draw"]).notify(done)
    })

    it("should be a draw if king vs king and knight", done => {
        const promise = factory.build("board-draw-notenoughpieces-6")
            .then(board => moveSequence(board, [["e2", "e3"]]))
        promise.should.eventually.have.same.members(["capture|draw"]).notify(done)
    })

    it("should be a draw if king and knight vs king", done => {
        const promise = factory.build("board-draw-notenoughpieces-7")
            .then(board => moveSequence(board, [["e2", "e3"]]))
        promise.should.eventually.have.same.members(["capture|draw"]).notify(done)
    })
})
