import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import GameList from "./GameList";
import NewGameForm from "./NewGameForm";
import ApiService from "../../common/ApiService";
import { ApiGameInfo } from "../../../common/types";
import { action, observable } from "mobx";
import { inject, observer } from "mobx-react";
import {IAppStore} from "../../models/AppContainer"

@inject((stores: IAppStore) => ({game: stores.app.game, api: stores.app.api}))
@observer
class LobbyView extends React.Component<ILobbyViewProps, never> {
  private store = new LobbyViewStore()

  constructor(props: any) {
    super(props);
    // Need to create socket here, otherwise server crashes on game join, because api/game/join needs socket
    props.game.connectSocket()
  }

  public async componentDidMount() {
    this.fetchGames()
  }

  @action.bound
  public async fetchGames() {
    const [availableGames, myGames] = await Promise.all([
      this.props.api.read.availableGames(),
      this.props.api.read.myGames(),
    ]);

    this.store.availableGames = availableGames
    this.store.myGames = myGames
  }

  @action.bound
  public closeNewForm() {
    this.store.dialogOpen = false
  }

  @action.bound
  public openNewForm() {
    this.store.dialogOpen = true
  }

  public render() {
    return (
      <div>
        <NewGameForm open={this.store.dialogOpen} handleClose={this.closeNewForm}/>

        <GameList games={this.store.myGames} title="My games" openDialog={this.openNewForm} />
        <GameList games={this.store.availableGames} title="Available games" openDialog={this.openNewForm} />
      </div>
    );
  }
}

class LobbyViewStore {
  @observable public availableGames: ApiGameInfo[] = []
  @observable public myGames: ApiGameInfo[] = []
  @observable public dialogOpen: boolean = false
}

interface ILobbyViewProps extends RouteComponentProps<any> {
  api?: ApiService;
}

export default withRouter(LobbyView);
