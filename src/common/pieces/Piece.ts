import * as Majavashakki from "../../common/GamePieces"
import BoardBase from "../BoardBase";

export default class Piece implements Majavashakki.IPiece {
    public type: Majavashakki.PieceType
    public color: Majavashakki.PieceColor
    public position: Majavashakki.IPosition
    public hasMoved: boolean

    constructor(color: Majavashakki.PieceColor, position: Majavashakki.IPosition, type: Majavashakki.PieceType) {
        this.color = color
        this.position = position
        this.type = type
        this.hasMoved = false
    }

    public isValidMove(board: BoardBase, _destination: Majavashakki.IPosition): boolean {
        return false
    }

    public clone(): Piece {
        const piece = new Piece(this.color, this.position, this.type)
        piece.hasMoved = piece.hasMoved
        return piece
    }

    // TODO: Refactor this so it doesn't need parameters or if not possible make it static
    public positionToNumbers(pos: Majavashakki.IPosition) {
        return {col: BoardBase.cols.indexOf(pos.col), row: BoardBase.rows.indexOf(pos.row)};
    }

    // TODO: Refactor this so it doesn't need parameters or if not possible make it static
    public numbersToPosition(pos): Majavashakki.IPosition {
        return {col: BoardBase.cols.charAt(pos.col), row: BoardBase.rows.charAt(pos.row)};
    }
}
