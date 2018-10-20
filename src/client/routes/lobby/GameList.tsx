import * as React from "react";
import { withRouter } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import * as request from "request-promise";
import { withStyles } from "@material-ui/core/styles";
import * as Majavashakki from "../../../common/GamePieces"

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
    const games: Majavashakki.IGameRef[] = this.props.games;
    return (
      <div className={classes.root}>
        <h2>{this.state.title}</h2>
        <List>
          {
            games.map(game => (
              <React.Fragment key={game.title}>
                  <ListItem onClick={() => this.onRoomClick(game.title)}>{game.title}</ListItem>
                  <Divider />
              </React.Fragment>
          ))}
        </List>
      </div>
    );
  }

  private onRoomClick = (gameTitle: string) => {
    this.joinGame(gameTitle).then(this.handleJoinResponse);
  }

  // TODO implement service layer / redux
  private joinGame = (title) => {
    return request({
        method: "POST",
        url: window.location.origin + "/api/games/join",
        body: {title},
        json: true,
    });
  }

  private handleJoinResponse = ({title}) => {
    this.props.history.push(`/game/${title}`)
  }
}

export default withStyles(styles)(withRouter(GameList));