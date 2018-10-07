import * as React from "react";
import { withRouter } from "react-router-dom";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Majava from "./Majava";

const styles = createStyles({
    root: {
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center"
    },
    formContainer: {
        width: 500,
        padding: 25,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    }
})

class SignUpView extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <Paper className={classes.formContainer}>
                    <Majava />
                    <TextField
                        id="email"
                        label="Email"
                        margin="normal"
                    />
                    <TextField
                        id="password"
                        label="Password"
                        type="password"
                        margin="normal"
                    />
                    <TextField
                        id="password-confirm"
                        label="Gonfirm Bassword"
                        type="password"
                        margin="normal"
                    />
                    <TextField
                        id="username"
                        label="Name"
                        margin="normal"
                    />
                    <TextField
                        id="library"
                        label="Library card number"
                        margin="normal"
                    />
                    <TextField
                        id="ssn"
                        label="Social security number"
                        margin="normal"
                    />
                    <TextField
                        id="soulid"
                        label="Soul id"
                        margin="normal"
                    />
                    <TextField
                        id="dog"
                        label="Your dogs middlename"
                        margin="normal"
                    />
                    <Button variant="raised" color="primary">
                        Sell your soul
                    </Button>
                </Paper>
            </div>
        );
    }
}

export default withStyles(styles)(withRouter(SignUpView));
