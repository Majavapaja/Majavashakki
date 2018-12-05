import * as Majavashakki from "../GamePieces"
import Piece from "./Piece"
import BoardBase from "../BoardBase"

export default class Knight extends Piece {
    constructor(color: Majavashakki.PieceColor, position: Majavashakki.IPosition) {
        super(color, position, Majavashakki.PieceType.Knight)
    }

    public isValidMove(board: BoardBase, destination: Majavashakki.IPosition): boolean {
        const start = this.positionToNumbers(this.position);
        const dest = this.positionToNumbers(destination);

        const rowDiff = Math.abs(dest.row - start.row);
        const colDiff = Math.abs(dest.col - start.col);

        if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
            return true;
        }

        return false;
    }

    public clone(): Knight {
        const knight = new Knight(this.color, this.position)
        knight.hasMoved = this.hasMoved
        return knight
    }
}