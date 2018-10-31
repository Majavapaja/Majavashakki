import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import ApiService from "../../common/ApiService";
import { Typography, Button, WithStyles, Dialog, DialogTitle, DialogActions, DialogContent } from "@material-ui/core";

class NewGameForm extends React.Component<INewGameProps, INewGameState> {
  constructor(props: any) {
    super(props);

    this.state = {
      newRoomForm: {
        name: ""
      },
    };
  }

  public onSubmitNewRoom = async (event) => {
    event.preventDefault();

    const gameTitle = this.cleanInput(this.state.newRoomForm.name);

    if (gameTitle) {
      await ApiService.write.game(gameTitle);
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
  handleClose: any,
}
interface INewGameState {
  newRoomForm: any,
}

export default withRouter(NewGameForm);
