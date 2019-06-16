import * as React from "react"
import { WithStyles, withStyles, createStyles } from "@material-ui/core/styles"
import { Typography, Paper } from "@material-ui/core"

class MessagePanel extends React.Component<IMessagePanelProps, any> {
    public render() {
        return (
            <Paper>
                MESSSAGESS
            </Paper>
        )
    }
}

interface IMessagePanelProps extends WithStyles<typeof styles> {
    message: string,
    type: "info" | "error",
}

const styles = () => createStyles({
    sidePanel: {
        height: "100px",
    },
    error: {
        color: "#C00",
    },
})

export default withStyles(styles)(MessagePanel)
