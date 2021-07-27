import React from 'react'
import {Link} from 'react-router-dom'
import MiniPalette from './MiniPalette'
import {withStyles} from '@material-ui/styles'

const styles={
  container: {
    backgroundColor: "blue",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start"
  },
  subcontainer: {
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
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
    gridGap: "5%"
  },

}
function PaletteList(props) {
  const goToPalette = (id) => (
    props.history.push(`/palette/${id}`)
  )

  const {palettes} = props
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
            <Link to={`/palette/${palette.id}`}>
              <MiniPalette {...palette} handleClick={goToPalette} />
            </Link>
            ))}
        </div>
      </div>
    </div>
  )
}

export default withStyles(styles)(PaletteList)
