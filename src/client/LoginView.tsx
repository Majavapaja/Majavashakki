import * as React from "react";
import { withRouter } from "react-router-dom";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import * as logo from "./assets/logo.png";

const styles = createStyles({
    root: {
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginContainer: {
        width: 500,
        padding: 25,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    logo: {
        width: 100
    },
    facebookButton: {
        backgroundColor: '#3B5998',
        color: '#fff'
    },
    divider: {
        border: '1px solid rgba(0,0,0,.1)',
        width: '100%',
        margin: '25px 0'
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
                    <img src={String(logo)} className={classes.logo} />
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
                    <Button variant="raised" color="primary">
                        Sign in
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
