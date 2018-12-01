import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import GameList from "./GameList";
import NewGameForm from "./NewGameForm";
import ApiService from "../../common/ApiService";

class LobbyView extends React.Component<ILobbyViewProps, ILobbyViewState> {
  constructor(props: any) {
    super(props);

    this.state = {
      newRoomForm: {
        name: ""
      },
      availableGames: [],
      myGames: [],
      error: "",
      dialogOpen: false,
    };

    // Need to create socket here, otherwise server crashes on game join, because api/game/join needs socket
    props.game.connectSocket()
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

interface ILobbyViewProps extends RouteComponentProps<any> {}
interface ILobbyViewState {
  newRoomForm: any,
  availableGames: global.IGameRef[],
  myGames: global.IGameRef[],
  error: string,
  dialogOpen: boolean,
}

export default withRouter(LobbyView);
