import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {TextField, WithStyles, withStyles, createStyles, Theme, Button, Typography} from "@material-ui/core";
import ApiService from "../../common/ApiService";
import { UserUpdateRequest } from "../../../common/types";
import { inject } from "mobx-react";
import { IAppStore } from "client/models/AppContainer";

@inject((stores: IAppStore) => ({api: stores.app.api}))
class ProfileView extends React.Component<IProfileViewProps, IProfileViewState> {
  private submitField: any = React.createRef();

  constructor(props: IProfileViewProps) {
    super(props);
    this.state = {name: "", email: ""}
  }

  public async componentDidMount() {
    const {name, email} = await this.props.api.read.user();
    this.setState({name, email});
  }

  public render() {
    return (
      <form
        className={this.props.classes.container}
        onKeyPress={this.handleEnterKey}
      >
        <TextField
          autoFocus
          required
          id="name"
          label="Name"
          className={this.props.classes.textField}
          value={this.state.name}
          onChange={this.onInputChange}
          margin="normal"
        />
        <br/>
        <TextField
          required
          id="email"
          label="Email"
          className={this.props.classes.textField}
          value={this.state.email}
          onChange={this.onInputChange}
          margin="normal"
          inputRef={this.submitField}
        />
        <br/>
        <Button
          variant="raised"
          color="primary"
          className={this.props.classes.button}
          onClick={this.handleSubmit}
        >
          <Typography color="inherit">Save</Typography>
        </Button>
      </form>
    )
  }

  public onInputChange = ({target}) => {
    this.setState({[target.id]: target.value} as IProfileViewState);
  }

  public handleSubmit = async () => {
    if (this.state.name && this.state.email) {
      const payload: UserUpdateRequest = {
        name: this.state.name,
        email: this.state.email,
      }
      try {
        await this.props.api.write.user(payload);
        this.props.history.push("/")
      } catch (e) {
        // Error happened! ApiService created error notification
        // so we don't have to do anything here.
      }
    }
  }

  private handleEnterKey = (event: any) => {
    if (!(event.target instanceof HTMLInputElement) || event.key !== "Enter") return;
    return (event.target.id === this.submitField.current.id) ? this.handleSubmit() : this.submitField.current.focus();
  }
}

interface IProfileViewProps extends RouteComponentProps<any>, WithStyles<typeof styles> {
  api?: ApiService;
}

interface IProfileViewState  {
  name: string
  email: string
}

const styles = (theme: Theme) => createStyles({
  container: {
    margin: "10px",
  },
  textField: {
    width: 350,
  },
  button: {
    margin: "10px 0",
  },
});

export default withStyles(styles)(withRouter(ProfileView));
