import * as React from "react"
import { withStyles, createStyles } from "@material-ui/core/styles"

const styles = theme => ({
  root: {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0
  },
  timangi: {
    position: 'absolute',
    pointerEvents: 'none',
    animation: 'timangi 1.5s linear infinite'
  }
})

const EndScreen = ({ classes }) => (
  <div id="timangit-sataa" className={classes.root}>
    {Array.from(Array(75)).map((x, i) => {
      const size = Math.random() * 100
      const randomAnimationModifier = Math.floor(Math.random() * (98 - 1 + 1) + 1)
      return (
        <i
          key={i}
          className={classes.timangi}
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `0.${randomAnimationModifier}s`,
            fontSize: `${size}px`,
            animationDuration: `1.${randomAnimationModifier}s`
          }}
        >💎</i>
      )
    })}
  </div>
)

export default withStyles(styles)(EndScreen)