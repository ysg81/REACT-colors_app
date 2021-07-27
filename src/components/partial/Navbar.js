import React,{useState} from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import 'rc-slider/assets/index.css'
import './Navbar.css'
import Slider from 'rc-slider'

function Navbar(props) {
  const [format, setFormat] = useState("hex")
  const {level, changeLevel, handleChange} = props
  const thisChange = (e) => {
    setFormat(e.target.value)
    handleChange(e.target.value)
  }
  return (
    <nav className="Navbar">
      <div className="logo">
        <a href="/">reactcolorpicker</a>
      </div>
      <div className="slider-container">
        <span>Level: {level}</span>
        <div className="slider">
          <Slider
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onAfterChange={changeLevel}  
          />
        </div>
      </div>
      <div className="select-container">
        <Select value={format} onChange={thisChange}>
          <MenuItem value="hex">HEX = #ffffff</MenuItem>
          <MenuItem value="rgb">RGB = rgb(255,255,255)</MenuItem>
          <MenuItem value="rgba">RGBA = rgba(255,255,255,1.0)</MenuItem>
        </Select>
      </div>
    </nav>
  )
}

export default Navbar
