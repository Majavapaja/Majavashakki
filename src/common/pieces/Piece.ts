import * as Majavashakki from "../../common/GamePieces"
import BoardBase from "../BoardBase";

export default class Piece implements Majavashakki.IPiece {
    public type: Majavashakki.PieceType
    public color: Majavashakki.PieceColor
    public position: Majavashakki.IPosition
    public board: BoardBase
    public hasMoved: boolean

    constructor(color: Majavashakki.PieceColor, position: Majavashakki.IPosition, board: BoardBase, type: Majavashakki.PieceType) {
        this.board = board
        this.color = color
        this.position = position
        this.type = type
        this.hasMoved = false
    }

    public isValidMove(_destination: Majavashakki.IPosition): boolean {
        return false
    }

    public clone(board: BoardBase): Piece {
        const piece = new Piece(this.color, this.position, board, this.type)
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
