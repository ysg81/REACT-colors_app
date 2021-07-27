import React,{useState} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import './ColorBox.css'

function ColorBox(props) {

  const {background, name, paletteId, id, showLink} = props
  const [copied, setCopied] = useState(false)
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
        <h1>copied!</h1>
        <p>{background}</p>
      </div>
      <div className="copy-container">
        <div className="box-content">
          <span>{name}</span>
        </div>
        <CopyToClipboard text={background} onCopy={changeCopyState}>
          <button className="copy-button">Copy</button>
        </CopyToClipboard>
        {showLink && (
          <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
            <span className="see-more">More</span>
          </Link>
        )}
      </div>
    </div>  
  )
}

export default ColorBox
