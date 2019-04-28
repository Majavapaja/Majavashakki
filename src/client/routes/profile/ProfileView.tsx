import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {TextField, WithStyles, withStyles, createStyles, Theme, Button, Typography} from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { IAppStore } from "client/store/AppStore";
import UserStore from "client/store/UserStore";
import { observable } from "mobx";

class ProfileViewForm {
  @observable public email: string = ""
  @observable public name: string = ""
}

@inject((stores: IAppStore) => ({ userStore: stores.app.user }))
@observer
class ProfileView extends React.Component<IProfileViewProps, never> {
  private submitField: any = React.createRef();
  private form = new ProfileViewForm()

  constructor(props: IProfileViewProps) {
    super(props);
  }

  public async componentDidMount() {
    await this.props.userStore.refreshFromServer()
    this.form.name = this.props.userStore.name
    this.form.email = this.props.userStore.email
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
          value={this.form.name}
          onChange={this.onInputChange}
          margin="normal"
        />
        <br/>
        <TextField
          required
          id="email"
          label="Email"
          className={this.props.classes.textField}
          value={this.form.email}
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
    this.form[target.id] = target.value
  }

  public handleSubmit = async () => {
    if (this.form.name && this.form.email) {
      await this.props.userStore.update(this.form.email, this.form.name)
      this.props.history.push("/")
    }
  }

  private handleEnterKey = (event: any) => {
    if (!(event.target instanceof HTMLInputElement) || event.key !== "Enter") return;
    return (event.target.id === this.submitField.current.id) ? this.handleSubmit() : this.submitField.current.focus();
  }
}

interface IProfileViewProps extends RouteComponentProps<any>, WithStyles<typeof styles> {
  userStore: UserStore;
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
