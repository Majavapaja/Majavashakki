import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import GameList from "./GameList";
import ApiService from "../../common/ApiService";
import {connectSocket} from "../socket"
import { Theme, createStyles, withStyles, Typography, Button, WithStyles } from "@material-ui/core";

class LobbyView extends React.Component<ILobbyViewProps, ILobbyViewState> {
  constructor(props: any) {
    super(props);

    connectSocket()

    this.state = {
      newRoomForm: {
        name: ""
      },
      availableGames: [],
      myGames: [],
      error: ""
    };
  }

  public async componentDidMount() {
    const [availableGames, myGames] = await Promise.all([
      ApiService.read.availableGames(),
      ApiService.read.myGames()
    ]);

    this.setState({ availableGames, myGames });
  }

  public onSubmitNewRoom = async (event) => {
    event.preventDefault();

    const gameTitle = this.cleanInput(this.state.newRoomForm.name);
    if (gameTitle) {
      const game = await ApiService.write.game(gameTitle);
      this.setState({availableGames: [...this.state.availableGames, game] });
      // TODO don't join game immediatly, instead push to my-games?
      const result = await ApiService.write.joinGame(gameTitle);
      this.props.history.push(`/game/${result.title}`)
    }
  }

  public cleanInput(input: string): string {
    return input.trim().replace("<", "").replace(">", "");
  }

  public onInputChange = ({target}) => {
    this.setState({
      newRoomForm: {
        ...this.state.newRoomForm,
        [target.name]: target.value,
      }
    });
  }

  public render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        {this.state.error && <Typography color="error" variant="h2">Error: {this.state.error}</Typography>}
        <form onSubmit={this.onSubmitNewRoom} className={classes.newRoom}>
          <TextField
            name="name"
            label="Room name"
            onChange={this.onInputChange}
          />
          <Button variant="raised" color="primary">Create</Button>
        </form>

        <GameList games={this.state.myGames} title="My games" />
        <GameList games={this.state.availableGames} title="Available games" />
      </div>
    );
  }
}

interface ILobbyViewProps extends RouteComponentProps<any>, WithStyles<typeof styles> {}
interface ILobbyViewState {
  newRoomForm: any,
  availableGames: global.IGameRef[],
  myGames: global.IGameRef[],
  error: string,
}

const styles = (theme: Theme) => createStyles({
  root: {
    display: "flex",
    flexDirection: "column"
  },
  newRoom: {
    display: "flex",
    alignItems: "center",
  }
});

export default withStyles(styles)(withRouter(LobbyView));
