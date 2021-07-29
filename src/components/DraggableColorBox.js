import React from 'react'
import {SortableElement} from 'react-sortable-hoc'
import {withStyles} from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete'

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    position: "relative",
    display: "inline-block",
    cursor: "pointer",
    marginButton: "-3.5px"
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0",
    bottom: "10px",
    color: "black",
    textTransfrom: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0px 10px"
  },
  deleteIcon: {
    transform: "scale(0.8)",
    transition: "0.2s",
    "&:hover" :{
      color: "white",
      transform: "scale(1.2)"
    }
  }
}

const DraggableColorBox = SortableElement((props) => {
  const {color, name, classes, handleClick} = props
  return (
    <div class={classes.root} style={{backgroundColor: color, marginBottom: '-6px'}}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <span>
          <DeleteIcon className={classes.deleteIcon}
            onClick={handleClick}
          />
        </span>
      </div>
    </div>
  )
  })

export default withStyles(styles)(DraggableColorBox)
