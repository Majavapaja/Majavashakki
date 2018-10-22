import * as React from "react";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import ApiService from "../../common/ApiService";

// TODO an actual view with some reasonable ui and more fields! email! password! whoa, very much data, so doge
class ProfileView extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    // todo lol login page class
    return (
      <div className="login page">
        <div className="form">
          <h3 className="title">What's your nickname?</h3>
          <form onSubmit={this.onSubmitLogin}>
            <TextField name="username" label="Username" onChange={this.onInputChange} />
          </form>
        </div>
      </div>
    )
  }

  public onInputChange = ({target}) => {
      this.setState({[target.name]: target.value});
  }

  public onSubmitLogin = async (event) => {
    event.preventDefault();
    const name = this.cleanInput(this.state.username);
    if (name) {
      // Add separate button to navigate away from profile view? "back to lobby"
      await ApiService.write.user({name} as global.IUserContract);
      this.props.history.push("/")
    }
  }

  public cleanInput(input: string): string {
    return input.trim().replace("<", "").replace(">", "");
  }
}

export default withRouter(ProfileView);
