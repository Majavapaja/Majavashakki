import * as React from "react";
import { withRouter } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import * as request from "request-promise";
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
      rooms: this.props.rooms
    };
  }

  public render() {
    return (
      <List>
        {this.props.rooms.map(room => (
            <React.Fragment key={room}>
                <ListItem onClick={() => this.onRoomClick(room)}>{room}</ListItem>
                <Divider />
            </React.Fragment>
        ))}
      </List>
    );
  }

  private onRoomClick = (gameName: string) => {
    this.joinGame(gameName).then(this.handleJoinResponse);
  }

  // TODO implement service layer / redux
  private joinGame = (name) => {
    return request({
        method: "POST",
        url: window.location.origin + "/api/games/join",
        body: {name},
        json: true,
    });
  }

  private handleJoinResponse = ({title}) => {
    this.props.history.push(`/game/${title}`)
  }
}

export default withStyles(styles)(withRouter(GameList));