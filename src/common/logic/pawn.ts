import Board from "../../server/entities/Board";
import * as Majavashakki from "../GamePieces"

export const isValidPawnMovement = (board: Board, startPiece: Majavashakki.IPiece, destination: Majavashakki.IPosition): boolean => {
    const start = this.positionToNumbers(startPiece.position);
    const dest = this.positionToNumbers(destination);

    const rowDiff = dest.row - start.row;
    const colDiff = dest.col - start.col;

    const destinationPiece = board.getPiece(destination);

    const movementDirection = startPiece.color === "white" ? 1 : -1;

    // Check if pawn is capturing
    if (destinationPiece && rowDiff === movementDirection && (colDiff === 1 || colDiff === -1)) return true;
    else if (!destinationPiece && colDiff === 0) {
        // Check if pawn is moving
        if (!startPiece.hasMoved && rowDiff === movementDirection * 2) {
            // Ensure that double move is not blocked by piece
            dest.row -= movementDirection;
            if (!board.getPiece(this.numbersToPosition(dest))) return true;
        }

        if (rowDiff === movementDirection) return true;
    }

    return false;
}

export const isEnPassant = (board: Board, startPiece: Majavashakki.IPiece, destination: Majavashakki.IPosition): boolean => {
    if (startPiece.type === "pawn") {
        const start = this.positionToNumbers(startPiece.position);
        const dest = this.positionToNumbers(destination);

        const rowDiff = dest.row - start.row;
        const colDiff = dest.col - start.col;

        const movementDirection = startPiece.color === "white" ? 1 : -1;

        // Check if diagonal movement
        if (rowDiff === movementDirection && (colDiff === 1 || colDiff === -1)) {
            // Check if there is a piece below destination and that piece is enemy pawn
            dest.row -= movementDirection;
            const targetPiece: Majavashakki.IPiece = board.getPiece(this.numbersToPosition(dest));

            if (targetPiece && targetPiece.type === "pawn" && targetPiece.color !== startPiece.color) {
                // Check if last move was double move and that its destination was targetPiece
                const lastMove: Majavashakki.IPosition[] = board.moveHistory[board.moveHistory.length - 1];
                const lastStart = this.positionToNumbers(lastMove[0]);
                const lastDest = this.positionToNumbers(lastMove[1]);

                const lastMoveDiff: number = Math.abs(lastDest.row - lastStart.row);
                if (lastMoveDiff === 2 && board.comparePos(lastMove[1], targetPiece.position)) return true;
            }
        }
    }

    return false;
}
