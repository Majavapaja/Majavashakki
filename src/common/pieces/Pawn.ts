import * as Majavashakki from "../GamePieces"
import Piece from "./Piece"
import BoardBase from "../BoardBase"

export default class Pawn extends Piece {
    constructor(color: Majavashakki.PieceColor, position: Majavashakki.IPosition, board: BoardBase) {
        super(color, position, board, Majavashakki.PieceType.Pawn)
    }

    public isValidMove(destination: Majavashakki.IPosition): boolean {
        const start = this.positionToNumbers(this.position)
        const dest = this.positionToNumbers(destination)

        const rowDiff = dest.row - start.row
        const colDiff = dest.col - start.col

        const destinationPiece = this.board.getPiece(destination)

        const movementDirection = this.color === Majavashakki.PieceColor.White ? 1 : -1

        // Check if pawn is capturing
        if (destinationPiece && rowDiff === movementDirection && (colDiff === 1 || colDiff === -1)) return true
        else if (!destinationPiece && colDiff === 0) {
            // Check if pawn is moving
            if (!this.hasMoved && rowDiff === movementDirection * 2) {
                // Ensure that double move is not blocked by piece
                dest.row -= movementDirection
                if (!this.board.getPiece(this.numbersToPosition(dest))) return true
            }

            if (rowDiff === movementDirection) return true
        }

        return false
    }

    public isEnPassant(destination: Majavashakki.IPosition): boolean {
        const start = this.positionToNumbers(this.position)
        const dest = this.positionToNumbers(destination)

        const rowDiff = dest.row - start.row
        const colDiff = dest.col - start.col

        const movementDirection = this.color === "white" ? 1 : -1

        // Check if diagonal movement
        if (rowDiff === movementDirection && (colDiff === 1 || colDiff === -1)) {
            // Check if there is a piece below destination and that piece is enemy pawn
            dest.row -= movementDirection
            const targetPiece = this.board.getPiece(this.numbersToPosition(dest))

            if (targetPiece && targetPiece.type === "pawn" && targetPiece.color !== this.color) {
                // Check if last move was double move and that its destination was targetPiece
                const lastMove: Majavashakki.IPosition[] = this.board.moveHistory[this.board.moveHistory.length - 1]
                const lastStart = this.positionToNumbers(lastMove[0])
                const lastDest = this.positionToNumbers(lastMove[1])

                const lastMoveDiff: number = Math.abs(lastDest.row - lastStart.row)
                if (lastMoveDiff === 2 && this.board.comparePos(lastMove[1], targetPiece.position)) return true
            }
        }
    }

    public clone(board: BoardBase): Pawn {
        const pawn = new Pawn(this.color, this.position, board)
        pawn.hasMoved = this.hasMoved
        return pawn
    }
}