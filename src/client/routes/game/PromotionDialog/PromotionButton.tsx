import * as React from "react"
import { inject, observer } from "mobx-react"
import { Button, WithStyles, createStyles, withStyles } from "@material-ui/core"
import { IAppStore } from "client/store/AppStore"
import ChessPiece from "../ChessPiece"
import PromotionDialogStore from "client/store/PromotionDialogStore"
import GameStore from "client/store/GameStore"
import { PieceType } from "../../../../common/GamePieces"

const PromotionButton = inject((stores: IAppStore) => ({
  dialog: stores.app.promotionDialog,
  gameStore: stores.app.game,
}))(observer((props: IPromotionButtonProps) => (
  <Button
    data-promote-type={props.type}
    onClick={() => props.dialog.choosePiece(props.type)}
    classes={{ label: props.classes.label }}
    className={props.classes.button}
    variant="raised"
    color="primary"
  >
    <ChessPiece color={props.gameStore.currentTurn} type={props.type} />
  </Button>
)))

interface IPromotionButtonProps extends WithStyles<typeof styles> {
  type: PieceType
  dialog?: PromotionDialogStore,
  gameStore?: GameStore,
}

const styles = theme => createStyles({
  button: {
    width: "20%",
    height: "100%",
    "&:before": {
      content: "\"\"",
      display: "block",
      paddingTop: "100%",
    },
  },
  label: {
    height: "100%",
  },
})

export default withStyles(styles)(PromotionButton)