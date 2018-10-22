import * as React from "react";
import { withRouter } from "react-router-dom";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ApiService from "../../common/ApiService";

import Majava from "../../common/Majava";

const styles = createStyles({
    root: {
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center"
    },
    loginContainer: {
        width: 500,
        padding: 25,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    },
    facebookButton: {
        backgroundColor: "#3B5998",
        color: "#fff"
    },
    divider: {
        border: "1px solid rgba(0,0,0,.1)",
        width: "100%",
        margin: "25px 0"
    },
    button: {
        margin: "10px 0"
    }
})

class LoginView extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { }
    }

    public render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <Paper className={classes.loginContainer}>
                    <Majava />
                    <Typography color="error">{this.state.error}</Typography>
                    <TextField
                        name="email"
                        label="Email"
                        margin="normal"
                        onChange={this.handleInputChange}
                    />
                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        margin="normal"
                        onChange={this.handleInputChange}
                    />

                    <Button
                        variant="raised"
                        color="primary"
                        className={classes.button}
                        onClick={this.handleSubmit}
                    >
                        <Typography color="inherit">Sign in</Typography>
                    </Button>

                    <Typography variant="subheading">or</Typography>

                    <Button
                        variant="raised"
                        color="primary"
                        className={classes.button}
                        href="/signup"
                    >
                        <Typography color="inherit">Register</Typography>
                    </Button>

                    <hr className={classes.divider} />

                    <Button variant="raised" className={classes.facebookButton} href="/authFacebook">
                        Sign in with Facebook
                    </Button>
                </Paper>
            </div>
        );
    }

    private handleInputChange = event => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }

    private handleSubmit = async () => {
        try {
            await ApiService.write.login({email: this.state.email, password: this.state.password} as global.IUserContract);
            this.props.history.push("/");
        } catch (error) {
            this.setState({ error: error.message })
        }
    }
}

export default withStyles(styles)(withRouter(LoginView));
