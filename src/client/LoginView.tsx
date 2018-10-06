import * as React from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import RaisedButton from "material-ui/RaisedButton";

const styles = theme => ({
    root: {
        display: 'flex',
        height: '100vh',
        justifyContent: 'center'
        alignItems: 'center'
    },
    loginContainer: {
        width: 500,
        padding: 25
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
                    <RaisedButton label="Facebook" href="/authFacebook" />
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(LoginView));
