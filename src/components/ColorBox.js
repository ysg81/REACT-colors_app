import React,{useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import chroma from 'chroma-js'
import {withStyles} from '@material-ui/styles'
import './ColorBox.css'

const styles = {
  copyText: {
    color: (props) => chroma(props.background).luminance() >= 0.7 ? "black" : "white"
  },
  colorName: {
    color: (props) => chroma(props.background).luminance() <= 0.1 ? "white" : "black"
  },
  seeMore: {
    color: props => chroma(props.background).luminance() >= 0.7 ? "black" : "white",
    background: "rgba(255,255,255,0.3)",
    border: "none",
    position: "absolute",
    right: "0",
    bottom: "0",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
    textTransform: "uppercase",
  }
}

function ColorBox(props) {

  const {background, name, paletteId, id, showLink, classes} = props
  const [copied, setCopied] = useState(false)
  const isLight = chroma(background).luminance() >= 0.7

  const changeCopyState = () => {
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500);
  }

  return (
    <div style={{background}} className="ColorBox">
      <div style={{background}} className={`copy-overlay ${copied && 'show'}`}/>
      <div className={`copy-msg ${copied && 'show'}`}>
        <h1 className={isLight && "dark-color"}>copied!</h1>
        <p className={classes.copyText}>{background}</p>
      </div>
      <div className="copy-container">
        <div className="box-content">
          <span className={classes.colorName}>{name}</span>
        </div>
        <CopyToClipboard text={background} onCopy={changeCopyState}>
          <button className={`copy-button ${isLight && "dark-color"}`}>Copy</button>
        </CopyToClipboard>
        {showLink && (
          <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
            <span className={classes.seeMore}>More</span>
          </Link>
        )}
      </div>
    </div>  
  )
}

export default withStyles(styles)(ColorBox)
