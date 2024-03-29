import * as React from "react"
import { inject, observer } from "mobx-react"
import { Button, WithStyles, createStyles, withStyles } from "@material-ui/core"
import { IRootStore } from "client/store/AppStore"
import ChessPiece from "../ChessPiece"
import PromotionDialogStore from "client/store/PromotionDialogStore"
import GameStore from "client/store/GameStore"
import { PieceType } from "../../../../common/GamePieces"

const PromotionButton = inject((stores: IRootStore) => ({
  dialog: stores.app.promotionDialog,
  gameStore: stores.app.game,
}))(
  observer((props: IPromotionButtonProps) => (
    <Button
      data-promote-type={props.type}
      onClick={() => props.dialog.choosePiece(props.type)}
      classes={{ label: props.classes.label }}
      className={props.classes.button}
      variant="contained"
      color="primary"
    >
      <ChessPiece color={props.gameStore.currentTurn} type={props.type} />
    </Button>
  ))
)

interface IPromotionButtonProps extends WithStyles<typeof styles> {
  type: PieceType
  dialog?: PromotionDialogStore
  gameStore?: GameStore
}

const styles = theme =>
  createStyles({
    button: {
      width: "20%",
      height: "100%",
      padding: 0,
      "&:before": {
        content: '""',
        display: "block",
        paddingTop: "100%",
      },
    },
    label: {
      height: "100%",
      position: "absolute",
    },
  })

export default withStyles(styles)(PromotionButton)
