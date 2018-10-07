import * as React from "react";
import { withRouter } from "react-router-dom";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import Majava from "./Majava";

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
    }

    public render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <Paper className={classes.loginContainer}>
                    <Majava />
                    <TextField
                        id="username"
                        label="Name"
                        margin="normal"
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        margin="normal"
                    />

                    <Button variant="raised" color="primary" className={classes.button}>
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
}

export default withStyles(styles)(withRouter(LoginView));
