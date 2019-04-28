import * as React from "react"
import { withStyles, createStyles, Theme, WithStyles } from "@material-ui/core/styles"

const EndScreen = (props: IEndScreenProps) => (
  <div id="timangit-sataa" className={props.classes.root}>
    {Array.from(Array(75)).map((x, i) => {
      const size = Math.random() * 100
      const randomAnimationModifier = Math.floor(Math.random() * (98 - 1 + 1) + 1)
      return (
        <i
          key={i}
          className={props.classes.timangi}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `0.${randomAnimationModifier}s`,
            fontSize: `${size}px`,
            animationDuration: `1.${randomAnimationModifier}s`,
          }}
        >
          💎
        </i>
      )
    })}
  </div>
)

interface IEndScreenProps extends WithStyles<typeof styles> { }

const styles = (theme: Theme) => createStyles({
  root: {
    pointerEvents: "none",
    width: "100vw",
    height: "100vh",
    position: "fixed",
    top: 0,
    left: 0,
  },
  timangi: {
    position: "absolute",
    animation: "timangi 1.5s linear infinite",
  },
})

export default withStyles(styles)(EndScreen)