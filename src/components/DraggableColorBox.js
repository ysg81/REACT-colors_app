import React from 'react'
import {withStyles} from '@material-ui/styles'

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    cursor: "pointer",
    marginButton: "-3.5px"

  },
}

function DraggableColorBox(props) {
  const {color, name, classes} = props
  return (
    <div class={classes.root} style={{backgroundColor: color}}>
      {name}
    </div>
  )
}

export default withStyles(styles)(DraggableColorBox)
