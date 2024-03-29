import * as React from "react"
import { withRouter, RouteComponentProps } from "react-router-dom"
import { TextField, Typography, withStyles, createStyles, Paper, Button, WithStyles } from "@material-ui/core"
import Majava from "../../common/Majava"
import { makeObservable, observable } from "mobx"
import { inject, observer } from "mobx-react"
import { IRootStore } from "client/store/AppStore"
import UserStore from "client/store/UserStore"

@inject((stores: IRootStore) => ({ userStore: stores.app.user }))
@observer
class LoginView extends React.Component<ILoginViewProps, never> {
  private submitField: any = React.createRef()
  private store = new LoginStore()

  constructor(props: ILoginViewProps) {
    super(props)
  }

  public async componentDidMount() {
    await this.props.userStore.refreshFromServer()
    if (this.props.userStore.id) {
      this.props.history.push("/")
    }

    this.store.isLoading = false
  }

  public render() {
    const classes = this.props.classes

    const form = (
      <React.Fragment>
        <Typography color="error">{this.store.error}</Typography>
        <TextField
          autoFocus
          id="email"
          label="Email"
          type="email"
          margin="normal"
          required
          onChange={this.handleInputChange}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          margin="normal"
          required
          onChange={this.handleInputChange}
          inputRef={this.submitField}
        />

        <Button id="loginButton" variant="contained" color="primary" className={classes.button} type="submit">
          <Typography color="inherit">Sign in</Typography>
        </Button>

        <Typography variant="subtitle1">or</Typography>

        <Button
          id="registerButton"
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.navigateToSignup}
        >
          <Typography color="inherit">Register</Typography>
        </Button>

        <hr className={classes.divider} />

        <Button variant="contained" className={classes.facebookButton} href="/authFacebook">
          Sign in with Facebook
        </Button>
      </React.Fragment>
    )

    return (
      <form className={classes.root} onSubmit={this.handleSubmit}>
        <Paper className={classes.loginContainer} onKeyPress={this.handleEnterKey}>
          <Majava animation={this.store.isLoading ? "spin" : undefined} />
          {!this.store.isLoading && form}
        </Paper>
      </form>
    )
  }

  private handleEnterKey = (event: React.KeyboardEvent) => {
    if (!(event.target instanceof HTMLInputElement) || event.key !== "Enter") return
    if (event.target.id !== this.submitField.current.id) {
      this.submitField.current.focus()
    }
  }

  private handleInputChange = ({ target }) => {
    this.store[target.id] = target.value
  }

  private handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    await this.props.userStore.login(this.store.email, this.store.password)
    this.props.history.push("/")
  }

  private navigateToSignup = () => {
    this.props.history.push("/signup")
  }
}

interface ILoginViewProps extends RouteComponentProps<any>, WithStyles<typeof styles> {
  userStore: UserStore
}

class LoginStore {
  @observable public error?: string
  @observable public email: string = ""
  @observable public password: string = ""
  @observable public isLoading: boolean = true

  constructor() {
    makeObservable(this)
  }
}

const styles = createStyles({
  root: {
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    width: 500,
    padding: 25,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  facebookButton: {
    backgroundColor: "#3B5998",
    color: "#fff",
  },
  divider: {
    border: "1px solid rgba(0,0,0,.1)",
    width: "100%",
    margin: "25px 0",
  },
  button: {
    margin: "10px 0",
  },
})

export default withStyles(styles)(withRouter(LoginView))
