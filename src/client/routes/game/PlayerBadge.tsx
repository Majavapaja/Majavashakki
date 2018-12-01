import * as React from "react"
import { withRouter } from "react-router-dom"
import { withStyles, createStyles } from "@material-ui/core/styles"
import Board from "./Board"
import { observer } from "mobx-react"
import { Chip, Typography, Avatar } from "@material-ui/core"
import classNames from 'classnames'

@observer
class PlayerBadge extends React.Component<any, any> {
    public render() {
        const { classes, player, isCurrentPlayer } = this.props

        const rootClasses = classNames(
            classes.root,
            { active: isCurrentPlayer }
        )

        return (
            <Chip
                className={rootClasses}
                avatar={
                    <Avatar className={[classes.playerColor, player.color].join(' ')}></Avatar>
                }
                label={player.name}
            />
        )
    }
}

const styles = theme => ({
    root: {
        '&.active': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
        }
    },
    playerColor: {
        width: 50,
        height: 50,
        border: '1px solid rgba(0,0,0,0.5)',
        borderRadius: '50%',
        '&.white': {
            backgroundColor: '#FFF'
        },
        '&.black': {
            backgroundColor: '#000'
        }
    },
})

export default withStyles(styles)(PlayerBadge);
