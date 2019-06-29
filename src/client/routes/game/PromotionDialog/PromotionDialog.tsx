import * as React from "react"
import { inject, observer } from "mobx-react"
import { Dialog, DialogTitle, DialogContent, DialogActions, WithStyles, createStyles, withStyles } from "@material-ui/core"
import { IRootStore } from "client/store/AppStore"
import { PieceType } from "../../../../common/GamePieces"
import PromotionDialogStore from "client/store/PromotionDialogStore"
import PromotionButton from "./PromotionButton"

const PromotionDialog = inject((stores: IRootStore) => ({
  dialog: stores.app.promotionDialog,
}))(observer((props: IPromotionDialogProps) => (
    <Dialog
      open={props.dialog.isOpen}
    >
      <DialogTitle>Pawn promotion</DialogTitle>
      <DialogContent>Choose the piece you want to promote your pawn into</DialogContent>
      <DialogActions className={props.classes.actions}>
        <PromotionButton type={PieceType.Queen} />
        <PromotionButton type={PieceType.Rook} />
        <PromotionButton type={PieceType.Bishop} />
        <PromotionButton type={PieceType.Knight} />
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