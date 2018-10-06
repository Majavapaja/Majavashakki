import * as React from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import * as logo from "./assets/logo.png";

const styles = theme => ({
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
                    <Button variant="raised" className={classes.facebookButton} href="/authFacebook">
                        Facebook
                    </Button>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(LoginView));
