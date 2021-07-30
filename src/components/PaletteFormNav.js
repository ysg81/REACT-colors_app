import React,{useState, useEffect} from 'react';
import PaletteMetaForm from './PaletteMetaForm';
import {Link} from 'react-router-dom'
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';

const styles = ({
  root: {
    display: 'flex',
  },
  navBtns: {
    position: 'absolute',
    right: '10px',
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    margin: "0px 14px",
    // border: "1px solid black"
  },
  button: {
    "& a": {
      textDecoration: "none"
    },
    "@media screen and (max-width: 576px)": {
      width: "60px",
      height: "60px",
      fontSize: "6px"
    }
  },
  link: {
    textDecoration: "none"
  },
  span: {
    fontSize: "20px",
    "@media screen and (max-width: 576px)": {
      marginLeft: "-16px",
      fontSize: "16px",
    }
  }
})

function PaletteFormNav(props) {

  const {open, classes, handleDrawerOpen, handleSubmit} = props

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        color='default'
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.span}>
            Create A Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
          <Link to="/" className={classes.link}>
            <Button variant="contained" color="secondary" style={{textDecoration: "none", marginRight: "10px"}} className={classes.button}>
              Go Back
            </Button>
          </Link>
          {/* {formShowing && ( */}
            <PaletteMetaForm
              palettes={props.palettes}
              handleSubmit={handleSubmit}
            />
          {/* )} */}
        </div>
      </AppBar>
    </div>
  )
}

export default withStyles(styles)(PaletteFormNav)
