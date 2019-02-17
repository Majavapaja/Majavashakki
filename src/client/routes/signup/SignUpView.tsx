import * as React from "react";
import { withRouter } from "react-router-dom";
import {TextField, Typography, withStyles, createStyles, Paper, Button} from "@material-ui/core";
import ApiService from "../../common/ApiService";

import Majava from "../../common/Majava";

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

class SignUpView extends React.Component<any, any> {
  private emailField: any = React.createRef();
  private nameField: any = React.createRef();
  private passwordField: any = React.createRef();
  private submitField: any = React.createRef();

    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: false,
            error: "",
        }
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
                    margin="normal"
                    required={true}
                    onChange={this.handleInputChange}
                    inputRef={this.emailField}
                />
                <TextField
                    id="username"
                    label="Username"
                    margin="normal"
                    required={true}
                    onChange={this.handleInputChange}
                    inputRef={this.nameField}
                />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    margin="normal"
                    inputProps={{ minlength: 4 }}
                    required={true}
                    onChange={this.handleInputChange}
                    inputRef={this.passwordField}
                />
                <TextField
                    id="passwordConfirm"
                    label="Confirm password"
                    type="password"
                    margin="normal"
                    inputProps={{ minlength: 4 }}
                    required={true}
                    onChange={this.handleInputChange}
                    inputRef={this.submitField}
                />
                <Button
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
                    <Majava animation={this.state.isLoading && "spin"}/>
                    <Typography color="error">{this.state.error}</Typography>
                    {!this.state.isLoading && form}
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
          return this.focusField(this.submitField);
      }
    }

    private focusField(fieldRef: any) {
      fieldRef.current.focus();
    }

    private handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        if (this.state.password !== this.state.passwordConfirm) {
            this.setState({error: "Passwords don't match D:"})
        } else {
            this.setState({isLoading: true});
            try {
                await ApiService.write.register({email: this.state.email, name: this.state.username, password: this.state.password} as global.IUserContract);
                this.props.history.push("/login");
            } catch (error) {
                this.setState({isLoading: false, error: error.message})
            }
        }
    }

    private handleInputChange = (event: any) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const id = target.id;

        this.setState({
          [id]: value,
        });
    }
}

export default withStyles(styles)(withRouter(SignUpView));
