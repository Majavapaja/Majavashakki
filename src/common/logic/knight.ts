import * as Majavashakki from "../GamePieces"

export const isValidKnightMovement = (startPiece: Majavashakki.IPiece, destination: Majavashakki.IPosition): boolean => {
    const start = this.positionToNumbers(startPiece.position);
    const dest = this.positionToNumbers(destination);

    const rowDiff = Math.abs(dest.row - start.row);
    const colDiff = Math.abs(dest.col - start.col);

    if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
        return true;
    }

    return false;
}
