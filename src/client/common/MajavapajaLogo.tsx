import * as React from "react"
import { withStyles, createStyles, WithStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import * as logo from "../assets/majavapajalogo.png"

class MajavapajaLogo extends React.Component<IMajavapajaLogoProps, never> {
  constructor(props: any) {
    super(props)
  }

  public render() {
    const { classes } = this.props

    return (
      <a className={classes.root} onClick={this.props.onClick}>
        <img src={logo.default} className={classes.logo} />
        <Typography className={classes.title} component="div">
          Majavapaja
        </Typography>
        <Typography className={classes.description} component="div">
          {this.getSlogan()}
        </Typography>
      </a>
    )
  }

  private getSlogan = () => {
    const slogans = [
      "Exactly as programmed",
      "Hard work is money",
      "Hard code is money",
      "Oispa kaljaa",
      "Mennään mistä aita on Majavin",
    ]
    const randomIndex = Math.floor(Math.random() * slogans.length)
    return slogans[randomIndex]
  }
}

interface IMajavapajaLogoProps extends WithStyles<typeof styles> {
  onClick: () => {}
}

const styles = createStyles({
  root: {
    position: "relative",
    flexGrow: 1,
    display: "block",
    "&:hover $logo": {
      transform: "rotate(45deg)",
    },
    cursor: "pointer",
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
    whiteSpace: "nowrap",
  },
})

export default withStyles(styles)(MajavapajaLogo)
