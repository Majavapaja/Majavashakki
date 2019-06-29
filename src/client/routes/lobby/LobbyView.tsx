import * as React from "react"
import { withRouter, RouteComponentProps } from "react-router-dom"
import GameList from "./GameList"
import NewGameForm from "./NewGameForm"
import ApiService from "../../common/ApiService"
import { inject, observer } from "mobx-react"
import {IRootStore} from "../../store/AppStore"
import LobbyStore from "../../store/LobbyStore"
import Majava from "../../common/Majava"
import { Paper, Button, Typography } from "@material-ui/core";

@inject((stores: IRootStore) => ({ lobby: stores.app.lobby, game: stores.app.game, api: stores.app.api}))
@observer
class LobbyView extends React.Component<ILobbyViewProps, never> {
  constructor(props: any) {
    super(props)
    // Need to create socket here, otherwise server crashes on game join, because api/game/join needs socket
    props.game.connectSocket()
    props.game.socket.on("lobby_updated", this.props.lobby.onLobbyUpdate)
  }

  public async componentDidMount() {
    await this.props.lobby.fetchGames()
  }

  public render() {
    const store = this.props.lobby

    if (store.isLoading) {
      return (
        <Paper>
          <Majava animation="spin" />
        </Paper>
      )
    } else if (store.error) {
      return (
        <Paper>
          <Typography variant="h5" >Something went wrong while fetching games</Typography>
          <Button onClick={store.fetchGames}>Try again!</Button>
        </Paper>
      )
    }

    return (
      <div>
        <NewGameForm open={store.dialogOpen} handleClose={store.closeNewForm} />

        <GameList id="myGames" games={store.myGames} title="My games" openDialog={store.openNewForm} />
        <GameList id="availableGames" games={store.availableGames} title="Available games" openDialog={store.openNewForm} />
        <GameList id="finishedGames" games={store.finishedGames} title="Finished games" openDialog={store.openNewForm} />
      </div>
    )
  }
}

interface ILobbyViewProps extends RouteComponentProps<any> {
  api?: ApiService
  lobby?: LobbyStore
}

export default withRouter(LobbyView)
