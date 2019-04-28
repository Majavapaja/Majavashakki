import * as React from "react"
import { inject, observer } from "mobx-react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, WithStyles, createStyles, withStyles } from "@material-ui/core"
import { IAppStore } from "client/models/AppContainer"
import { PieceType } from "../../../../common/GamePieces"
import PromotionDialogStore from "client/models/PromotionDialogStore"
import Game from "client/models/Game"
import PromotionButton from "./PromotionButton"

const PromotionDialog = inject((stores: IAppStore) => ({
  dialog: stores.app.promotionDialog,
}))(observer((props: IPromotionDialogProps) => (
    <Dialog
      open={props.dialog.isOpen}
    >
      <DialogTitle>Pawn promotion</DialogTitle>
      <DialogContent>Choose the piece you want to promote your pawn into</DialogContent>
      <DialogActions className={props.classes.actions}>
        <PromotionButton id="promoteQueen" type={PieceType.Queen} />
        <PromotionButton id="promoteRook" type={PieceType.Rook} />
        <PromotionButton id="promoteBishop" type={PieceType.Bishop} />
        <PromotionButton id="promoteKnight" type={PieceType.Knight} />
      </DialogActions>
    </Dialog>
)))

interface IPromotionDialogProps extends WithStyles<typeof styles> {
  dialog?: PromotionDialogStore,
}

const styles = theme => createStyles({
  actions: {
    justifyContent: "space-between",
  },
})

export default withStyles(styles)(PromotionDialog)