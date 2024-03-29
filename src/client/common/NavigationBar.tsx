import * as React from "react"
import { withStyles, createStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import AccountCircle from "@material-ui/icons/AccountCircle"
import MenuItem from "@material-ui/core/MenuItem"
import Menu from "@material-ui/core/Menu"
import { withRouter } from "react-router-dom"
import MajavapajaLogo from "./MajavapajaLogo"
import { IRootStore } from "../store/AppStore"
import { inject, observer } from "mobx-react"

const styles = createStyles({
  grow: {
    flexGrow: 1,
  },
})

class LoginMenu extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      anchorEl: null,
    }
  }

  public render() {
    const { anchorEl } = this.state

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
        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
          <MenuItem onClick={this.profile}>Profile</MenuItem>
          <MenuItem onClick={this.logout}>Logout</MenuItem>
        </Menu>
      </div>
    )
  }

  private logout = () => {
    this.handleClose()
    this.props.logout()
  }

  private handleClick = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  private handleClose = () => {
    this.setState({ anchorEl: null })
  }

  private profile = () => {
    this.handleClose()
    this.props.profile()
  }
}

@inject((stores: IRootStore) => ({ api: stores.app.api, userStore: stores.app.user }))
@observer
class NavigationBar extends React.Component<any, never> {
  public logout = () => {
    window.location.href = "/logout"
  }

  public login = () => {
    this.props.history.push("/login")
  }

  public profile = () => {
    this.props.history.push("/profile")
  }

  public navigateToMain = () => {
    if (this.props.userStore.name) this.props.history.push("/")
    else this.login()
  }

  public render() {
    const classes = this.props.classes
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <MajavapajaLogo onClick={this.navigateToMain} />
            {this.props.userStore.name && <LoginMenu logout={this.logout} profile={this.profile} />}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(withRouter(NavigationBar))
