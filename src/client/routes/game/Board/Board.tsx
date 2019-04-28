import * as React from "react";
import { observer, inject } from "mobx-react"
import * as Majavashakki from "../../../../common/GamePieces"
import {IAppStore} from "../../../models/AppContainer"
import Cell from "./Cell"
import { WithStyles, createStyles, withStyles } from "@material-ui/core"
import Game from "../../../models/Game"

@inject((stores: IAppStore) => ({game: stores.app.game}))
@observer
class Board extends React.Component<IBoardProps, any> {
  constructor(props) {
    super(props)
    this.state = {
      selectedCell: null,
      moveTarget: null,
    }
  }

  public render() {
    const board = this.props.game.board

    return (
      <React.Fragment>
      <div className={this.props.classes.board}>
        {board.cells.map(({position, piece}) => (
            <Cell
              piece={piece}
              cellColor={board.getCellColor(position)}
              onClick={() => this.onCellClick(position)}
              selected={board.comparePos(this.state.selectedCell, position)}
              targeted={board.comparePos(this.state.moveTarget, position)}
              position={position}
              key={position.col + position.row}
            />
        ))}
      </div>
      </React.Fragment>
    )
  }

  private onCellClick = (pos: Majavashakki.IPosition) => {
    if (this.state.moveTarget) {
      return;
    }

    if (!this.state.selectedCell && this.props.game.board.getPiece(pos)) {
      return this.setState({selectedCell: pos});
    }

    if (pos === this.state.selectedCell) {
      this.setState({selectedCell: null});
      return;
    }

    if (this.state.selectedCell) {
      this.props.game.move(this.state.selectedCell, pos)
      this.setState({
        moveTarget: null,
        selectedCell: null,
      })
    }

  }
}

interface IBoardProps extends WithStyles<typeof styles> {
  game?: Game
}

const styles = theme => createStyles({
  board: {
    display: "flex",
    flexFlow: "row wrap",
    width: "60vmin",
  },
})

export default withStyles(styles)(Board)
