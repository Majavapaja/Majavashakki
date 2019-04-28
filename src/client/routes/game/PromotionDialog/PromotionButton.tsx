import * as React from "react"
import { inject, observer } from "mobx-react"
import { Button, WithStyles, createStyles, withStyles } from "@material-ui/core"
import { IAppStore } from "client/models/AppContainer"
import ChessPiece from "../ChessPiece"
import PromotionDialogStore from "client/models/PromotionDialogStore"
import Game from "client/models/Game"
import { PieceType } from "../../../../common/GamePieces"

const PromotionButton = inject((stores: IAppStore) => ({
  id: string,
  dialog: stores.app.promotionDialog,
  game: stores.app.game,
}))(observer((props: IPromotionButtonProps) => (
  <Button
    id={id}
    onClick={() => props.dialog.choosePiece(props.type)}
    classes={{ label: props.classes.label }}
    className={props.classes.button}
    variant="raised"
    color="primary"
  >
    <ChessPiece color={props.game.currentTurn} type={props.type} />
  </Button>
)))

interface IPromotionButtonProps extends WithStyles<typeof styles> {
  type: PieceType
  dialog?: PromotionDialogStore,
  game?: Game,
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