import React from 'react'
import {withStyles} from '@material-ui/styles'
import DeleteIcon from '@material-ui/icons/Delete'

const styles = {
  container: {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    "&:hover svg": {
      opacity: '1'
    },
  },
  colors: {
    backgroundColor: "#dae1e4",
    width: "100%",
    height: "150px",
    borderRadius: "5px",
    overflow: "hidden"
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem"
  },
  miniColor: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    marginBottom: "-4.5px",
  },
  delete:{
    
  },
  deleteIcon:{
    color: "white",
    backgroundColor: "#eb3d30",
    width: "20px",
    height: "20px",
    position: "absolute",
    right: "0px",
    top: "0px",
    padding: "10px",
    opacity: '0',
    transition: "0.4s",
    "&:hover": {
      width: "30px",
      height: "30px",
      padding: "15px"
    }
  }
}

function MiniPalette(props) {

  const {classes, paletteName, emoji, colors, handleClick, id} = props
  const miniColorBoxes = colors.map(color => (
    <div
      className={classes.miniColor}
      style={{backgroundColor: color.color}}
      key={color.name}  
    />
  ))
  const deletePalette = (evt) => {
    evt.stopPropagation()
    evt.preventDefault()
    props.deletePalette(id)
  }
  return (
    <div className={classes.container} onClick={handleClick}>
      <div 
        className={classes.delete}
        onClick={deletePalette}
      >
        <DeleteIcon
          className={classes.deleteIcon}
        />
      </div>
      <div className={classes.colors}>
        {miniColorBoxes}
      </div>
      <h5 className={classes.title}>
        {paletteName} <span className={classes.emoji}>{emoji}</span>
      </h5>
    </div> 
  )
}

export default withStyles(styles)(MiniPalette)
