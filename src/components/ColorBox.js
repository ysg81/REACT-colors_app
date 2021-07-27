import React,{useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import chroma from 'chroma-js'
import './ColorBox.css'

function ColorBox(props) {

  const {background, name, paletteId, id, showLink} = props
  const [copied, setCopied] = useState(false)
  const isDrak = chroma(background).luminance() <= 0.1
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
        <p className={isLight && "dark-color"}>{background}</p>
      </div>
      <div className="copy-container">
        <div className="box-content">
          <span className={isDrak && "light-color"}>{name}</span>
        </div>
        <CopyToClipboard text={background} onCopy={changeCopyState}>
          <button className={`copy-button ${isLight && "dark-color"}`}>Copy</button>
        </CopyToClipboard>
        {showLink && (
          <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
            <span className={`see-more ${isLight && "dark-color"}`}>More</span>
          </Link>
        )}
      </div>
    </div>  
  )
}

export default ColorBox
