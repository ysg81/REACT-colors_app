import React,{useState} from 'react'
import ColorBox from './ColorBox'
import './Palette.css'
import Navbar from './partial/Navbar'

function Palette({palette}) {

  const [level, setLevel] = useState(500)
  const [format, setFormat] = useState("hex")
  
  const changeLevel = (newlevel) => {
    setLevel(newlevel)
  }
  const colorBoxes = palette.colors[level].map(color => (
    <ColorBox background={color[format]} name={color.name} />
  ))
  const changeFormat = (val) => {
    setFormat(val)
  }
  return (
    <div className="Palette">
    <Navbar level={level} changeLevel={changeLevel} handleChange={changeFormat}/>
      {/* Navbar */}
      <div className="Palette-colors">
        {colorBoxes}
      </div>
      {/* footer */}
    </div>
  )
}

export default Palette
