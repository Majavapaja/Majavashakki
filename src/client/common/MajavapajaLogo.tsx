import * as React from "react";
import { withStyles, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import * as logo from "../assets/majavapajalogo.png";

const styles = createStyles({
    root: {
        position: "relative",
        flexGrow: 1,
        display: "block",
        "&:hover $logo": {
            transform: "rotate(45deg)"
        }
    },
    logo: {
        width: 50,
        transition: "750ms",
        background: "#FFF",
        borderRadius: "30px",
    },
    title: {
        fontFamily: "'Josefin Sans', sans-serif",
        color: "#FFF",
        fontSize: "1.75em",
        position: "absolute",
        top: "0",
        left: "60px",
    },
    description: {
        color: "#FFF",
        fontSize: "0.8em",
        position: "absolute",
        bottom: "5px",
        left: "75px",
        whiteSpace: "nowrap"
    }
})

class MajavapajaLogo extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        const { classes } = this.props
        return (
            <a className={classes.root} href="/">
                <img src={logo} className={classes.logo} />
                <Typography className={classes.title} component="div">
                    Majavapaja
                </Typography>
                <Typography className={classes.description} component="div">
                    Exactly as programmed
                </Typography>
            </a>
        );
    }
}

export default withStyles(styles)(MajavapajaLogo);
