import * as React from "react"
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles"
import { Paper } from "@material-ui/core"
import { observer } from "mobx-react"

@observer
class SidePanel extends React.Component<ISidePanelProps, any> {
    public render() {
        return (
            <Paper>
                <div>Player badges</div>
                <div>Latest move</div>
                <div>Surrender button</div>
            </Paper>
        )
    }
}

interface ISidePanelProps extends WithStyles<typeof styles> { }

const styles = theme => ({
    sidePanel: {
      width: "200px",
    },
})

export default withStyles(styles)(SidePanel);
