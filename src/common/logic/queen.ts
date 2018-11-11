import Board from "../../server/entities/Board";
import * as Majavashakki from "../GamePieces"
import { isValidBishopMovement } from "./bishop"
import { isValidRookMovement } from "./rook"

export const isValidQueenMovement = (board: Board, startPiece: Majavashakki.IPiece, destination: Majavashakki.IPosition): boolean => {
    return isValidRookMovement(board, startPiece, destination) || isValidBishopMovement(board, startPiece, destination);
}
