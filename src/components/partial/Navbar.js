import React,{useState} from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import 'rc-slider/assets/index.css'
import './Navbar.css'
import Slider from 'rc-slider'

function Navbar(props) {
  const [format, setFormat] = useState("hex")
  const {level, changeLevel, handleChange} = props
  const [open, setOpen] = useState(false)
  const thisChange = (e) => {
    setFormat(e.target.value)
    handleChange(e.target.value)
    setOpen(true)
  }
  const closeSnackbar = () => {
    setOpen(false)
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
      <Snackbar anchorOrigin={{vertical: "bottom", horizontal: "left"}}
        open={open}
        autoHideDuration={3000}
        message={<span id="message-id">Format Changed To {format.toUpperCase()}</span>}  
        ContentProps={{
          "aria-describedby":"message-id"
        }}
        onClose={closeSnackbar}
        action={[
          <IconButton
            onClick={closeSnackbar}
            color="inherit"
            key="close"
            aria-label="close">
            <CloseIcon/>
          </IconButton>
        ]}
      />
    </nav>
  )
}

export default Navbar
