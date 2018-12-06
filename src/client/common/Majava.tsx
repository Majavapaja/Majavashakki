import * as React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";

import * as logo from "../assets/logo.png";

const styles = createStyles({
    logo: {
        width: 100,
    },
    "@keyframes spin": {
        from: {
            transform: "rotate(0deg)",
        },
        to: {
            transform: "rotate(360deg)",
        },
    },
    "@keyframes bounce": {
        from: {
            transform: "translateY(0)",
        },
        to: {
            transform: "translateY(-20%)",
        },
    },
    "@keyframes pulse": {
        from: {
            transform: "scale(1)",
        },
        to: {
            transform: "scale(1.5)",
        },
    },
})

class Majava extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        let inlineStyles: any

        if (this.props.animation) {
            inlineStyles = { animation: `${this.props.animation} 1s infinite alternate`}
        }

        const { classes } = this.props
        return (
            <img
                src={logo.default}
                className={classes.logo}
                style={inlineStyles}
            />
        );
    }
}

export default withStyles(styles)(Majava);
