import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ApiService from "../../common/ApiService";
import { withStyles } from "@material-ui/core/styles";
import { Paper, WithStyles, createStyles, Theme, Typography, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

class GameList extends React.Component<IGameListProps, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const { classes, games } = this.props
    const noGames = !games || games.length === 0

    return (
      <Paper className={classes.root}>
        <div className={classes.header}>
          <Typography variant="h5">{this.props.title}</Typography>
          <Button onClick={this.props.openDialog}><AddIcon /> new room</Button>
        </div>
        <List>
          {games.map(game => (
            <ListItem
              button
              onClick={() => this.onRoomClick(game.title)}
            >
              <ListItemText primary={game.title} />
            </ListItem>
          ))}
        </List>
        {noGames && <Typography>No games available</Typography>}
      </Paper>
    );
  }

  private onRoomClick = async (gameTitle: string) => {
    const result = await ApiService.write.joinGame(gameTitle);
    this.props.history.push(`/game/${result.title}`)
  }
}

interface IGameListProps extends RouteComponentProps<any>, WithStyles<typeof styles> {
  title: string,
  games: global.IGameRef[],
  openDialog: any,
}

const styles = (theme: Theme) => createStyles({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    margin: "20px auto",
    padding: 10,
  },
  header: {
    display: "flex",
    justifyContent: "space-between"
  }
});

export default withStyles(styles)(withRouter(GameList));