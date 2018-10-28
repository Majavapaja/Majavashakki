import * as React from "react";
import { withRouter } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ApiService from "../../common/ApiService";
import { withStyles } from "@material-ui/core/styles";

// TODO styles
const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class GameList extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      title: this.props.title,
      games: this.props.games
    };
  }

  public render() {
    const { classes } = this.props
    const games: global.IGameRef[] = this.props.games;
    return (
      <div className={classes.root}>
        <h2>{this.state.title}</h2>
        <List>
          {
            games.map(game => (
              <React.Fragment key={game.ref}>
                  <ListItem onClick={() => this.onRoomClick(game.ref)}>{game.title}</ListItem>
                  <Divider />
              </React.Fragment>
          ))}
        </List>
      </div>
    );
  }

  private onRoomClick = async (gameId: string) => {
    const result = await ApiService.write.joinGame(gameId);
    this.props.history.push(`/game/${result.title}`)
  }
}

export default withStyles(styles)(withRouter(GameList));