import { observable, action, computed, decorate } from "mobx"
import * as Majavashakki from "../../common/GamePieces"
import Piece from "../../common/pieces/Piece"
import BoardBase from "../../common/BoardBase"

export default class Board extends BoardBase {
    @observable
    public pieces: Piece[]

    constructor(pieces?: Piece[], moveHistory?: Majavashakki.IMove[]) {
        super(pieces, moveHistory)
        // Decorate position in pieces, so it's changes will be noticed.
        pieces.forEach(piece => decorate(piece, { position: observable }))
    }

    @action
    public move(start: Majavashakki.IPosition, destination: Majavashakki.IPosition, promotionPiece: Majavashakki.PieceType): Majavashakki.IMoveResponse {
        return super.move(start, destination, promotionPiece)
    }

    @action
    public promotePiece(start: Majavashakki.IPosition, pieceType: Majavashakki.PieceType): Piece {
        const piece = super.promotePiece(start, pieceType)
        decorate(piece, { position: observable })
        return piece
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
                    piece,
                })
            }
        }

        return cells
    }
}
