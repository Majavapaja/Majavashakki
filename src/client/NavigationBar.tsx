import * as React from "react";
import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import FlatButton from "material-ui/FlatButton";
import Toggle from "material-ui/Toggle";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import { Link, withRouter } from "react-router-dom";

class Login extends React.Component {
  private static muiName = "FlatButton";

  public render() {
    return (
      <FlatButton {...this.props} label="Login" />
    );
  }
}

class Logged extends React.Component {
  private static muiName = "IconMenu";
  public render() {
    return (
      <IconMenu
        {...this.props}
        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
        targetOrigin={{horizontal: "right", vertical: "top"}}
        anchorOrigin={{horizontal: "right", vertical: "top"}}
      >
        <MenuItem primaryText="Profile" containerElement={<Link to="/profile" />} />
        <MenuItem primaryText="Help" />
        <MenuItem primaryText="Sign out" />
      </IconMenu>
    )
  }
};

/**
 * This example is taking advantage of the composability of the `AppBar`
 * to render different components depending on the application state.
 */
class NavigationBar extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {logged: true};
  }

  public handleChange = (event, logged) => {
    this.setState({logged});
  };

  public navigateToMain = (event: any) => {
    this.props.history.push("/")
  }

  public render() {
    return (
      <div>
        <Toggle
          label="Logged (TODO: toggle properly by login status)"
          defaultToggled={true}
          onToggle={this.handleChange}
          labelPosition="right"
          style={{margin: 20}}
        />
        <AppBar
          title={<span onClick={this.navigateToMain} style={{cursor: "pointer"}}>Majavashakki</span>}
          // titleStyle={{cursor: "pointer"}}
          // onTitleClick={this.navigateToMain}
          showMenuIconButton={false}
          iconElementRight={this.state.logged ? <Logged /> : <Login />}
        />
      </div>
    );
  }
}

export default withRouter(NavigationBar);
