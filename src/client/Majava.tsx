import * as React from "react";
import PropTypes from "prop-types"
import { withStyles, createStyles } from "@material-ui/core/styles";

import * as logo from "./assets/logo.png";

const styles = createStyles({
    logo: {
        width: 100
    },
    "@keyframes spin": {
        from: {
            transform: "rotate(0deg)"
        },
        to: {
            transform: "rotate(360deg)"
        }
    },
    "@keyframes bounce": {
        from: {
            transform: "translateY(0)"
        },
        to: {
            transform: "translateY(-20%)"
        }
    },
    "@keyframes pulse": {
        from: {
            transform: "scale(1)"
        },
        to: {
            transform: "scale(1.5)"
        }
    }
})

class Majava extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        let anim: any

        if (this.props.animation) {
            anim = { animation: `${this.props.animation} 1s infinite alternate`}
        }

        const { classes } = this.props
        return (
            <img
                src={String(logo)}
                className={classes.logo}
                style={styles}
            />
        );
    }
}

export default withStyles(styles)(Majava);
