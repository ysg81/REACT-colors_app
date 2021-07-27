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
    width: "100%",
  },
  palettes: {
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "5%"
  }
}
function PaletteList(props) {
  const {palettes} = props
  const {classes} = props
  return (
    <div className={classes.container}>
      <div className={classes.subcontainer}>
        <nav className={classes.nav}>
          <h1>React Colors</h1>
        </nav>
        <div className={classes.palettes}>
          {palettes.map(palette => (
            <MiniPalette {...palette}/>
            ))}
        </div>
      </div>
        {/* // <p>
        //   <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
        // </p> */}
    </div>
  )
}

export default withStyles(styles)(PaletteList)
