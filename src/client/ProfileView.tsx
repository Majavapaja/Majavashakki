import * as React from "react";
import { withRouter } from "react-router-dom";
import TextField from "material-ui/TextField";
import * as request from "request-promise";

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
            <TextField name="username" hintText="Username" onChange={this.onInputChange} />
          </form>
        </div>
      </div>
    )
  }

  public onInputChange = ({target}) => {
      this.setState({[target.name]: target.value});
  }

  public onSubmitLogin = (event) => {
    event.preventDefault();
    const username = this.cleanInput(this.state.username);
    if (username) {
      // Add separate button to navigate away from profile view? "back to lobby"
      update(username).then(() => {
        // User has logged in. Switch the page to room selection.
        this.props.history.push("/");
      })
    }
  }

  public cleanInput(input: string): string {
    return input.trim().replace("<", "").replace(">", "");
  }
}

function update(name) {
  return request({
      method: "POST",
      url: window.location.origin + "/api/user",
      body: {name},
      json: true,
  })
}

export default withRouter(ProfileView);
