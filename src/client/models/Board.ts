import { observable, action } from "mobx"
import * as Majavashakki from "../../common/GamePieces"
import Piece from "../../common/pieces/Piece"
import LogicBoard from "../../common/Board"

export default class Board extends LogicBoard {
    @observable
    public pieces: Piece[]
    @observable
    public moveHistory: Majavashakki.IPosition[][]

    constructor() { super() }

    @action
    public move(start: Majavashakki.IPosition, destination: Majavashakki.IPosition): Majavashakki.IMoveResponse {
        return super.move(start, destination)
    }
}
