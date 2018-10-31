import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ApiService from "../../common/ApiService";
import { withStyles } from "@material-ui/core/styles";
import { Paper, WithStyles, createStyles, Theme, Typography } from "@material-ui/core";

class GameList extends React.Component<IGameListProps, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const { classes } = this.props
    const games: global.IGameRef[] = this.props.games;
    return (
      <Paper className={classes.root}>
        <Typography variant="h5">{this.props.title}</Typography>
        <List>
          {
            games.map(game => (
              <React.Fragment key={game.title}>
                  <ListItem onClick={() => this.onRoomClick(game.title)}>{game.title}</ListItem>
                  <Divider />
              </React.Fragment>
          ))}
        </List>
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
  games: global.IGameRef[]
}

const styles = (theme: Theme) => createStyles({
  root: {
    width: "100%",

    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }
});

export default withStyles(styles)(withRouter(GameList));