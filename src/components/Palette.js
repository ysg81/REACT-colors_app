import React,{useState} from 'react'
import ColorBox from './ColorBox'
import './Palette.css'
import Navbar from './partial/Navbar'

function Palette({palette}) {
  const {colors, palettename} = palette
  console.log(palette.id)
  const [level, setLevel] = useState(500)
  const [format, setFormat] = useState("hex")
  const changeLevel = (newlevel) => {
    setLevel(newlevel)
  }
  const colorBoxes = colors[level].map(color => (
    <ColorBox background={color[format]} name={color.name} key={color.id} />
  ))
  const changeFormat = (val) => {
    setFormat(val)
  }
  return (
    <div className="Palette">
    <Navbar level={level} changeLevel={changeLevel} handleChange={changeFormat}/>
    <div className="Palette-colors">
      {colorBoxes}
    </div>
    <footer className="Palette-footer">
      {palettename}
    </footer>
    </div>
  )
}

export default Palette
