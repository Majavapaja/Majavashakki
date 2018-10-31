import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import GameList from "./GameList";
import NewGameForm from "./NewGameForm";
import ApiService from "../../common/ApiService";
import {connectSocket} from "../socket"
import { Theme, createStyles, withStyles, Button, WithStyles } from "@material-ui/core";

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
      error: "",
      dialogOpen: false,
    };
  }

  public async componentDidMount() {
    const [availableGames, myGames] = await Promise.all([
      ApiService.read.availableGames(),
      ApiService.read.myGames()
    ]);

    this.setState({ availableGames, myGames });
  }

  public closeNewForm = () => this.setState({ dialogOpen: false })
  public openNewForm = () => this.setState({ dialogOpen: true })

  public render() {
    return (
      <div>
        <NewGameForm open={this.state.dialogOpen} handleClose={this.closeNewForm}/>

        <GameList games={this.state.myGames} title="My games" openDialog={this.openNewForm} />
        <GameList games={this.state.availableGames} title="Available games" openDialog={this.openNewForm} />
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
  dialogOpen: boolean,
}

const styles = (theme: Theme) => createStyles({ });

export default withStyles(styles)(withRouter(LobbyView));
