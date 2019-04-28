import { observable, action } from "mobx"
import * as Majavashakki from "../../common/GamePieces"
import AppContainer from "./AppContainer"

export default class PromotionDialogStore {
  @observable public isOpen: boolean
  private rootStore: AppContainer
  private start: Majavashakki.IPosition
  private destination: Majavashakki.IPosition

  constructor(rootStore: AppContainer) {
    this.rootStore = rootStore
    this.isOpen = false
  }

  @action
  public openDialog = (start: Majavashakki.IPosition, destination: Majavashakki.IPosition) => {
    this.isOpen = true
    this.start = start
    this.destination = destination
  }

  @action
  public choosePiece = (pieceType: Majavashakki.PieceType) => {
    console.log(this.start, this.destination, pieceType)
    this.rootStore.game.move(this.start, this.destination, pieceType)
    this.isOpen = false
    this.start = undefined
    this.destination = undefined
  }
}