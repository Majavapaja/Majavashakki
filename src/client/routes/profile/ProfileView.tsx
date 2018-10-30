import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {TextField, WithStyles, withStyles, createStyles, Theme, Button} from "@material-ui/core";
import ApiService from "../../common/ApiService";

class ProfileView extends React.Component<IProfileViewProps, IProfileViewState> {
  constructor(props: IProfileViewProps) {
    super(props);
    this.state = {} as IProfileViewState
  }

  public async componentDidMount() {
    const user = await ApiService.read.user();
    this.setState(user);
  }

  public render() {

    return (
      <form className={this.props.classes.container}>
        <TextField
          required
          id="name"
          label="Name"
          className={this.props.classes.textField}
          value={this.state.name || ""}
          onChange={this.onInputChange}
          margin="normal"
        />
        <br/>
        <TextField
          required
          id="email"
          label="Email"
          className={this.props.classes.textField}
          value={this.state.email || ""}
          onChange={this.onInputChange}
          margin="normal"
        />
      </form>
    )
  }

  public onInputChange = ({target}) => {
    this.setState({...this.state, [target.id]: target.value});
  }

  public onSubmitLogin = async (event) => {
    event.preventDefault();
    const name = this.state.name;
    if (name) {
      // Add separate button to navigate away from profile view? "back to lobby"
      await ApiService.write.user({name} as global.IUserContract);
      this.props.history.push("/")
    }
  }
}

interface IProfileViewProps extends RouteComponentProps<any>, WithStyles<typeof styles> { }
interface IProfileViewState extends global.IUserContract {
  todo: boolean;
 }

const styles = (theme: Theme) => createStyles({
  container: {
    margin: "10px"
  },
  textField: {
    width: 350,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

export default withStyles(styles)(withRouter(ProfileView));
