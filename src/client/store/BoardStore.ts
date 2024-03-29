import { observable, action, computed, makeObservable } from "mobx"
import * as Majavashakki from "../../common/GamePieces"
import Piece from "../../common/pieces/Piece"
import BoardBase from "../../common/BoardBase"
import GameStore from "./GameStore"

export default class BoardStore extends BoardBase {
  @observable public declare pieces: Piece[]
  @observable.struct public selectedCell: Majavashakki.IPosition
  @observable.struct public erroredCell: Majavashakki.IPosition
  @observable public declare moveHistory: Majavashakki.IMove[]

  private gameStore: GameStore

  constructor(gameStore: GameStore, pieces?: Piece[], moveHistory?: Majavashakki.IMove[]) {
    super(pieces, moveHistory)
    this.gameStore = gameStore
    makeObservable(this)
    // Decorate position in pieces, so their changes will be noticed.
    pieces.forEach(piece => makeObservable(piece, { position: observable }))
  }

  @action
  public move(
    start: Majavashakki.IPosition,
    destination: Majavashakki.IPosition,
    promotionPiece: Majavashakki.PieceType
  ): Majavashakki.IMoveResponse {
    return super.move(start, destination, promotionPiece)
  }

  @action
  public promotePiece(start: Majavashakki.IPosition, pieceType: Majavashakki.PieceType): Piece {
    const piece = super.promotePiece(start, pieceType)
    makeObservable(piece, { position: observable })
    return piece
  }

  @action
  public async onCellClick(position: Majavashakki.IPosition): Promise<any> {
    this.erroredCell = null

    if (!this.selectedCell && this.getPiece(position)) {
      this.selectedCell = position
    } else if (this.comparePos(position, this.selectedCell)) {
      this.selectedCell = null
    } else if (this.selectedCell) {
      const result = await this.gameStore.move(this.selectedCell, position)
      if (result.status === Majavashakki.MoveStatus.Error) {
        this.erroredCell = position
      }
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
          isError: this.comparePos(this.erroredCell, position),
        })
      }
    }

    return cells
  }
}
