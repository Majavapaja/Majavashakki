import * as React from "react"
import { withRouter, RouteComponentProps } from "react-router-dom"
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField } from "@material-ui/core"
import ApiService from "../../common/ApiService"
import { action, makeObservable, observable } from "mobx"
import { inject } from "mobx-react"
import { IRootStore } from "client/store/AppStore"
import { IGame } from "../../../common/GamePieces"

@inject((stores: IRootStore) => ({ api: stores.app.api }))
class NewGameForm extends React.Component<INewGameProps, never> {
  private store: NewGameFormStore

  constructor(props: any) {
    super(props)
    this.store = new NewGameFormStore(props.api)
  }

  public onSubmitNewRoom = async event => {
    event.preventDefault()

    const gameTitle = this.cleanInput(this.store.name)

    if (gameTitle) {
      const game = await this.store.createAndJoin(gameTitle)
      this.props.history.push(`/game/${game.id}`)
    }
  }

  public cleanInput(input: string): string {
    return input.trim().replace("<", "").replace(">", "")
  }

  @action.bound
  public onNameInputChange = ({ target }) => {
    this.store.name = target.value
  }

  public render() {
    return (
      <Dialog id="createGameDialog" open={this.props.open} onClose={this.props.handleClose}>
        <DialogTitle>Create new room</DialogTitle>
        <DialogContent>
          <form onSubmit={this.onSubmitNewRoom}>
            <TextField name="name" label="Room name" onChange={this.onNameInputChange} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button id="cancelButton" onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button id="createButton" onClick={this.onSubmitNewRoom} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

class NewGameFormStore {
  @observable public name: string = ""

  constructor(private api: ApiService) {
    makeObservable(this)
  }

  @action
  public async createAndJoin(gameName: string): Promise<IGame> {
    const game = await this.api.write.game(gameName)
    await this.api.write.joinGame(game.id)
    return game
  }
}

interface INewGameProps extends RouteComponentProps<any> {
  open: boolean
  api?: ApiService
  handleClose: () => void
}

export default withRouter(NewGameForm)
