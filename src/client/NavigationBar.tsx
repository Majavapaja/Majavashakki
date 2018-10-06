import * as React from "react";
import * as request from "request-promise";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import {Link} from "react-router-dom";

import { withRouter } from "react-router-dom";

const styles = theme => ({
  grow: {
    flexGrow: 1
  }
})

class LoginMenu extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  public render() {
    const { anchorEl } = this.state;

    return (
      <div style={{ color: "#FFF" }}>
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
          color="inherit"
        >
          <AccountCircle color="inherit" />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.profile}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose}>My account</MenuItem>
          <MenuItem onClick={this.logout}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }

  private logout = () => {
    this.handleClose()
    this.props.logout()
  }

  private handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  }

  private handleClose = () => {
    this.setState({ anchorEl: null });
  }

  private profile = () => {
    this.handleClose()
    this.props.profile();
  }
}

class NavigationBar extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {logged: false};
    this.init();
  }

  private init = () => {
    request({ method: "GET", url: window.location.origin + "/api/user" }).then(user => {
      this.setState({ logged: !!user });
    });
  }

  public logout = () => {
    this.props.history.push("/logout");
    this.setState({ logged: false });
  };

  public login = () => {
    this.props.history.push("/login");
  };

  public profile = () => {
    this.props.history.push("/profile");
  };

  public navigateToMain = (event: any) => {
    this.props.history.push("/")
  }

  public render() {
    const classes = this.props.classes
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.grow}>
              Majavashakki
            </Typography>
            {this.state.logged && <LoginMenu logout={this.logout} profile={this.profile} />}
            {!this.state.logged && <Button onClick={this.login}><Typography color="textSecondary">Login</Typography></Button>}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(NavigationBar));
