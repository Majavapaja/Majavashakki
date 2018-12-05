import * as Majavashakki from "../GamePieces"
import Piece from "./Piece"
import Bishop from "./Bishop"
import Rook from "./Rook"
import BoardBase from "../BoardBase"

export default class Queen extends Piece {
    constructor(color: Majavashakki.PieceColor, position: Majavashakki.IPosition) {
        super(color, position, Majavashakki.PieceType.Queen)
    }

    public isValidMove(board: BoardBase, destination: Majavashakki.IPosition): boolean {
        const bishop = new Bishop(this.color, this.position)
        const rook = new Rook(this.color, this.position)
        return bishop.isValidMove(board, destination) || rook.isValidMove(board, destination)
    }

    public clone(): Queen {
        const queen = new Queen(this.color, this.position)
        queen.hasMoved = this.hasMoved
        return queen
    }
}