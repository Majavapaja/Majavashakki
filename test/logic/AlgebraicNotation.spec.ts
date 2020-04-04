import chai from "chai"
import chaiAsPromised from "chai-as-promised"
import factory from "./AlgebraicNotationFactory"
import boardFactory from "./setup/BoardFactory"
import checkFactory from "./CheckFactory"
import checkmateFactory from "./CheckmateFactory"
import {moveSequence} from "./setup/BoardHelper"
import { PieceType } from "../../src/common/GamePieces"
chai.should()
chai.use(chaiAsPromised)

describe("AlgebraicNotation", () => {
    it("should return correct notation for basic movement", done => {
        factory.build("board-an-movement")
            .then(board => {
                moveSequence(board, [
                    ["a1", "a2"],
                    ["b1", "a3"],
                    ["c1", "b2"],
                    ["d1", "d2"],
                    ["e1", "e2"],
                    ["f2", "f3"],
                ])

                board.moveHistory[0].algebraicNotation.should.equal("Ra2")
                board.moveHistory[1].algebraicNotation.should.equal("Na3")
                board.moveHistory[2].algebraicNotation.should.equal("Bb2")
                board.moveHistory[3].algebraicNotation.should.equal("Qd2")
                board.moveHistory[4].algebraicNotation.should.equal("Ke2")
                board.moveHistory[5].algebraicNotation.should.equal("f3")

                done()
            })
    })

    it("should have correct notation for captures", done => {
        factory.build("board-an-captures").then(board => {
            moveSequence(board, [
                ["a1", "a2"],
                ["b1", "a3"],
                ["b4", "a3"],
            ])

            board.moveHistory[0].algebraicNotation.should.equal("Rxa2")
            board.moveHistory[1].algebraicNotation.should.equal("Nxa3")
            board.moveHistory[2].algebraicNotation.should.equal("bxa3")

            done()
        })
    })

    it("should have correct disambiguate if rank/file conflicts", done => {
        factory.build("board-an-disambiguation").then(board => {
            moveSequence(board, [
                ["d6", "b8"],
                ["d8", "f8"],
                ["a1", "a3"],
                ["h4", "e1"],
            ])

            board.moveHistory[0].algebraicNotation.should.equal("Bdb8")
            board.moveHistory[1].algebraicNotation.should.equal("Rdf8")
            board.moveHistory[2].algebraicNotation.should.equal("R1a3")
            board.moveHistory[3].algebraicNotation.should.equal("Qh4e1")

            done()
        })
    })

    it("should have correct notation when promoting a pawn", () => {
      const subject = boardFactory.setupPromotion()
      moveSequence(subject, [
        ["a7", "a8", PieceType.Knight],
        ["a2", "b1", PieceType.Queen],
      ])
      subject.moveHistory[0].algebraicNotation.should.equal("a8N")
      subject.moveHistory[1].algebraicNotation.should.equal("xb1Q")
    })

    it("should have correct notation when castling to queenside", () => {
      const subject = boardFactory.setupCastling()
      moveSequence(subject, [["e1", "c1"]])
      subject.moveHistory[0].algebraicNotation.should.equal("0-0-0")
    })

    it("should have correct notation when castling to kingside", () => {
      const subject = boardFactory.setupCastling()
      moveSequence(subject, [["e1", "g1"]])
      subject.moveHistory[0].algebraicNotation.should.equal("0-0")
    })

    it("should have correct notation when enpassant", () => {
      const subject = boardFactory.setupEnpassant()
      moveSequence(subject, [["c2", "c4"], ["d4", "c3"]])
      subject.moveHistory[0].algebraicNotation.should.equal("c4")
      subject.moveHistory[1].algebraicNotation.should.equal("dxc3e.p.")
    })

    it("should have correct notation for check", () => {
      const subject = boardFactory.setupCheck()
      moveSequence(subject, [["d1", "d2"], ["c1", "d1"]])
      subject.moveHistory[1].algebraicNotation.should.equal("Rd1+")
    })

    it("should have correct notation for checkmate", done => {
        checkmateFactory.build("board-foolsmate").then(board => {
            moveSequence(board, [[ "d8", "h4" ]])

            board.moveHistory[0].algebraicNotation.should.equal("Qh4#")

            done()
        })
    })
})
