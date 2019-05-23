import * as React from "react"
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles"
import { Paper } from "@material-ui/core"
import { observer } from "mobx-react"
import SurrenderButton from "./SurrenderButton"

@observer
class SidePanel extends React.Component<ISidePanelProps, any> {
  public render() {
    return (
      <div className={this.props.classes.sidePanel}>
        <div>Player badges</div>
        <div>Latest move</div>
        <div><SurrenderButton /></div>
      </div>
    )
  }
}

interface ISidePanelProps extends WithStyles<typeof styles> { }

const styles = () => createStyles({
  sidePanel: {
    display: "flex",
    flexDirection: "column",
    width: "20vmin",
  },
})

export default withStyles(styles)(SidePanel);
