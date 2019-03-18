import * as React from "react";
import { withRouter } from "react-router-dom";
import {TextField, Typography, withStyles, createStyles, Paper, Button} from "@material-ui/core";

import Majava from "../../common/Majava";
import { observable } from "mobx";
import { inject, observer } from "mobx-react";
import { IAppStore } from "client/models/AppContainer";

@inject((stores: IAppStore) => ({api: stores.app.api}))
@observer
class SignUpView extends React.Component<any, never> {
    private emailField: any = React.createRef();
    private nameField: any = React.createRef();
    private passwordField: any = React.createRef();
    private passwordConfirmField: any = React.createRef();

    private store: SignupStore = new SignupStore()

    constructor(props: any) {
        super(props);
    }

    public render() {
        const { classes } = this.props

        const form = (
            <React.Fragment>
                <TextField
                    autoFocus
                    id="email"
                    label="Email"
                    type="email"
                    value={this.store.email}
                    margin="normal"
                    required={true}
                    onChange={this.handleInputChange}
                    inputRef={this.emailField}
                />
                <TextField
                    id="username"
                    label="Username"
                    value={this.store.username}
                    margin="normal"
                    required={true}
                    onChange={this.handleInputChange}
                    inputRef={this.nameField}
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    value={this.store.password}
                    margin="normal"
                    inputProps={{ minLength: 4 }}
                    required={true}
                    onChange={this.handleInputChange}
                    inputRef={this.passwordField}
                />
                <TextField
                    id="passwordConfirm"
                    value={this.store.passwordConfirm}
                    label="Confirm password"
                    type="password"
                    margin="normal"
                    inputProps={{ minLength: 4 }}
                    required={true}
                    onChange={this.handleInputChange}
                    inputRef={this.passwordConfirmField}
                />
                <Button
                    id="signupButton"
                    variant="raised"
                    color="primary"
                    type="submit"
                    className={classes.button}
                >
                    <Typography color="inherit">Register</Typography>
                </Button>
            </React.Fragment>
        )

        return (
            <form className={classes.root} onSubmit={this.handleSubmit}>
                <Paper
                  className={classes.formContainer}
                  onKeyPress={this.handleEnterKey}
                >
                    <Majava animation={this.store.isLoading && "spin"}/>
                    <Typography color="error">{this.store.error}</Typography>
                    {!this.store.isLoading && form}
                </Paper>
            </form>
        );
    }

    private handleEnterKey = (event: React.KeyboardEvent) => {
      if (!(event.target instanceof HTMLInputElement) || event.key !== "Enter") return;
      switch (event.target.id) {
        case this.emailField.current.id:
          return this.focusField(this.nameField);
        case this.nameField.current.id:
          return this.focusField(this.passwordField);
        case this.passwordField.current.id:
          return this.focusField(this.passwordConfirmField);
      }
    }

    private focusField(fieldRef: any) {
      fieldRef.current.focus();
    }

    private handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        this.store.error = undefined
        if (this.store.password !== this.store.passwordConfirm) {
            this.store.error = "Passwords don't match D:"
        } else {
            this.store.isLoading = true
            try {
              await this.props.api.write.register({
                email: this.store.email,
                name: this.store.username,
                password: this.store.password,
              } as global.IUserContract);
              this.props.history.push("/");
            } catch (e) {
              this.store.isLoading = false
            }
        }
    }

    private handleInputChange = (event: any) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const id = target.id;
        this.store[id] = value
    }
}

class SignupStore {
  @observable public isLoading: boolean = false
  @observable public error?: string
  @observable public email: string = ""
  @observable public username: string = ""
  @observable public password: string = ""
  @observable public passwordConfirm: string = ""
}

const styles = createStyles({
    root: {
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
    },
    formContainer: {
        width: 500,
        padding: 25,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
    },
    button: {
        margin: "10px 0",
    },
})

export default withStyles(styles)(withRouter(SignUpView));
