import * as React from "react"
import { inject, observer } from "mobx-react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core"
import { IAppStore } from "client/models/AppContainer"
import { PieceType } from "../../../common/GamePieces"

@inject((stores: IAppStore) => ({ dialog: stores.app.promotionDialog }))
@observer
class PromotionDialog extends React.Component<IPromotionDialogProps, any> {
  public render() {
    return (
      <Dialog
        open={this.props.dialog.isOpen}
      >
        <DialogTitle>Pawn promotion</DialogTitle>
        <DialogContent>Choose the piece you want to promote your pawn into</DialogContent>
        <DialogActions>
          <Button id="promoteQueen" onClick={() => this.props.dialog.choosePiece(PieceType.Queen)}>Queen</Button>
          <Button id="promoteKnight" onClick={() => this.props.dialog.choosePiece(PieceType.Knight)}>Knight</Button>
          <Button id="promoteRook" onClick={() => this.props.dialog.choosePiece(PieceType.Rook)}>Rook</Button>
          <Button id="promoteBishop" onClick={() => this.props.dialog.choosePiece(PieceType.Bishop)}>Bishop</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

interface IPromotionDialogProps {
  dialog?: any
}

export default PromotionDialog