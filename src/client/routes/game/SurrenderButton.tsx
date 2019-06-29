import * as React from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core"
import { observer, inject } from "mobx-react"

const SurrenderButton = inject("game")(observer(({game}) => {
  return (
    <React.Fragment>
      <Button onClick={game.promptSurrender}>Surrender</Button>

      <Dialog open={game.surrenderDialogOpen}>
        <DialogTitle>Surrender</DialogTitle>
        <DialogContent>Are you sure you want to surrender?</DialogContent>
        <DialogActions>
          <Button onClick={game.confirmSurrender}>Yes</Button>
          <Button onClick={game.cancelSurrender}>No</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}))

export default SurrenderButton
