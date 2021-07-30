import React,{useState} from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import Avatar from '@material-ui/core/Avatar'
import blue from '@material-ui/core/colors/blue'
import red from '@material-ui/core/colors/red'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {Link} from 'react-router-dom'
import MiniPalette from './MiniPalette'
import {withStyles} from '@material-ui/styles'

const styles={
  container: {
    backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    overflow: "scroll",
    overflowX: "hidden"
  },
  subcontainer: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
    "@media screen and (max-width: 1024px)": {
      width: "70%"
    },
    "@media screen and (max-width: 768px)": {
      width: "80%"
    },

  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    color: "white",
    "& a": {
      color: "white",
      textDecoration: "none",
      position: "relative",
      "&:before": {
        display: "block",
        content: "''",
        width: "0",
        height: "2px",
        backgroundColor: "white",
        position: "absolute",
        bottom: "-8px",
        left: "50%",
        transform: "translateX(-50%)",
        transition: "0.2s"
      },
      "&:hover:before": {
        width: "100%"
      }
    }
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "5%",
    "@media screen and (max-width: 768px)": {
      gridTemplateColumns: "repeat(2, 50%)",
    },
    "@media screen and (max-width: 576px)": {
      gridTemplateColumns: "repeat(1, 100%)",
    }
  },
  minipalette:{
    transition: "0.3s",
    "&:hover": {
      transform: "translateY(-6px)",
      boxShadow: "0px 12px 12px rgba(0,0,0,0.6)"
    }
  }

}
function PaletteList(props) {

  const [openDeleteDialog, setstateOpenDeleteDialog] = useState(false)
  const [deletingId, setDeletingId] = useState("")
  const openDialog = (id) => {
    setstateOpenDeleteDialog(true)
    setDeletingId(id)
  }
  const closeDialog = () => {
    setstateOpenDeleteDialog(false)
    setDeletingId("")
  }
  const goToPalette = (id) => (
    props.history.push(`/palette/${id}`)
  )
  const handleDelete = () => {
    deletePalette(deletingId)
    setstateOpenDeleteDialog(false)
  }
  const {palettes, deletePalette} = props
  const {classes} = props

  return (
    <div className={classes.container}>

      <div className={classes.subcontainer}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </nav>

        <div className={classes.palettes}>  
          {palettes.map(palette => (
            <Link to={`/palette/${palette.id}`} className={classes.minipalette}>
              <MiniPalette {...palette}
                key={palette.id}
                id={palette.id}
                deletePalette={openDialog}
                handleClick={goToPalette} 
              />
            </Link>
            ))}
        </div>
      </div>
      <Dialog open={openDeleteDialog} aria-labelledby="delete-dialog-title" onClose={closeDialog}>
        <DialogTitle id="delete-dialog-title">
          Delete This Palette?
        </DialogTitle>
        <List>
          <ListItem button onClick={handleDelete}>
            <ListItemAvatar>
              <Avatar style={{background: blue[100], color:blue[600]}}>
                <CheckIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete"/>
          </ListItem>
          <ListItem button onClick={closeDialog}>
            <ListItemAvatar>
            <Avatar style={{background: red[100], color:red[600]}}>
                <CloseIcon/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cancle"/>
          </ListItem>
        </List>
      </Dialog>
    </div>
  )
}

export default withStyles(styles)(PaletteList)
