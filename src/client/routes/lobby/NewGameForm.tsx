import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Button, Dialog, DialogTitle, DialogActions, DialogContent, TextField } from "@material-ui/core";
import ApiService from "../../common/ApiService";
import { inject } from "mobx-react";
import { IAppStore } from "client/models/AppContainer";

@inject((stores: IAppStore) => ({api: stores.app.api}))
class NewGameForm extends React.Component<INewGameProps, INewGameState> {
  constructor(props: any) {
    super(props);

    this.state = {
      newRoomForm: {
        name: "",
      },
    };
  }

  public onSubmitNewRoom = async (event) => {
    event.preventDefault();

    const gameTitle = this.cleanInput(this.state.newRoomForm.name);

    if (gameTitle) {
      const game = await this.props.api.write.game(gameTitle);
      await this.props.api.write.joinGame(game.id);
      this.props.history.push(`/game/${game.id}`)
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
      },
    });
  }

  public render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
      >
        <DialogTitle>Create new room</DialogTitle>
        <DialogContent>
          <form onSubmit={this.onSubmitNewRoom}>
            <TextField
              name="name"
              label="Room name"
              onChange={this.onInputChange}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.onSubmitNewRoom} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

interface INewGameProps extends RouteComponentProps<any> {
  open: boolean,
  api?: ApiService,
  handleClose: () => void,
}
interface INewGameState {
  newRoomForm: any,
}

export default withRouter(NewGameForm);
