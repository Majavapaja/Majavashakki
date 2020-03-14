import * as React from "react"
import { observer, inject } from "mobx-react"
import { withStyles, WithStyles, createStyles } from "@material-ui/core/styles"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core"
import Flag from "@material-ui/icons/Flag"
import GameStore from "client/store/GameStore"

const SurrenderButton = inject("game")(observer((props: ISurrenderButtonProps) => {
  const { game, classes, disabled } = props

  return (
    <>
      <Button
        disabled={disabled}
        onClick={game.promptSurrender}
        className={classes.button}
        variant="contained"
        size="small"
        startIcon={<Flag />}
      >
        Surrender
      </Button>

      <Dialog open={game.surrenderDialogOpen} onClose={game.cancelSurrender}>
        <DialogTitle>Surrender</DialogTitle>
        <DialogContent>Are you sure you want to surrender?</DialogContent>
        <DialogActions>
          <Button onClick={game.confirmSurrender}>Yes</Button>
          <Button onClick={game.cancelSurrender}>No</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}))

interface ISurrenderButtonProps extends WithStyles<typeof styles> {
  game?: GameStore,
  disabled: boolean,
}

const styles = () => createStyles({
  button: {
    marginTop: "20px",
  },
})

export default withStyles(styles)(SurrenderButton)
