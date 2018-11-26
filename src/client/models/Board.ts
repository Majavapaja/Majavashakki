import { observable, action, computed, decorate } from "mobx"
import * as Majavashakki from "../../common/GamePieces"
import Piece from "../../common/pieces/Piece"
import LogicBoard from "../../common/Board"

export default class Board extends LogicBoard {
    public pieces: Piece[]
    @observable
    public moveHistory: Majavashakki.IPosition[][]

    constructor(pieces: Piece[], moveHistory: Majavashakki.IPosition[][]) {
        super(pieces, moveHistory)
        // Decorate position in pieces, so it's changes will be noticed.
        // TODO: Understand what happens if new pieces are added to the array.
        // Will they be observed and is there even any case in chess where new objects are added to pieces
        pieces.map(piece => decorate(piece, { position: observable }))
    }

    @action
    public move(start: Majavashakki.IPosition, destination: Majavashakki.IPosition): Majavashakki.IMoveResponse {
        return super.move(start, destination)
    }

    @computed.struct
    get cells() {
        const cells = []
        for (let y = 8; y > 0; y--) {
            for (let x = 0; x < 8; x++) {
                const position = {
                    col: "abcdefgh"[x],
                    row: String(y),
                } as Majavashakki.IPosition

                const piece = this.getPiece(position)

                cells.push({
                    position,
                    piece
                })
            }
        }

        return cells
    }
}
