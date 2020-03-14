import { observable, action, computed, decorate } from "mobx"
import * as Majavashakki from "../../common/GamePieces"
import Piece from "../../common/pieces/Piece"
import BoardBase from "../../common/BoardBase"
import GameStore from "./GameStore"

export default class BoardStore extends BoardBase {
  @observable public pieces: Piece[]
  @observable.struct public selectedCell: Majavashakki.IPosition
  @observable public moveHistory: Majavashakki.IMove[]

  private gameStore: GameStore

  constructor(gameStore: GameStore, pieces?: Piece[], moveHistory?: Majavashakki.IMove[]) {
    super(pieces, moveHistory)
    this.gameStore = gameStore
    // Decorate position in pieces, so their changes will be noticed.
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

  @action
  public onCellClick(position: Majavashakki.IPosition): any {
    if (!this.selectedCell && this.getPiece(position)) {
      this.selectedCell = position
    } else if (this.comparePos(position, this.selectedCell)) {
      this.selectedCell = null
    } else if (this.selectedCell) {
      this.gameStore.move(this.selectedCell, position)
      this.selectedCell = null
    }
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
          cellColor: this.getCellColor(position),
          isSelected: this.comparePos(this.selectedCell, position),
        })
      }
    }

    return cells
  }
}
