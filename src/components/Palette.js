import React,{useState} from 'react'
import ColorBox from './ColorBox'
import './Palette.css'
import Footer from './partial/Footer'
import Navbar from './partial/Navbar'

function Palette({palette}) {
  const {colors, palettename, id} = palette
  const [level, setLevel] = useState(500)
  const [format, setFormat] = useState("hex")

  const changeLevel = (newlevel) => {
    setLevel(newlevel)
  }
  const colorBoxes = colors[level].map(color => (
    <ColorBox
      background={color[format]}
      name={color.name}
      key={color.id}
      id={color.id}
      paletteId={id}
      showLink={true}/>
  ))
  const changeFormat = (val) => {
    setFormat(val)
  }
  return (
    <div className="Palette">
    <Navbar
      shownavbar={true}
      level={level}
      changeLevel={changeLevel}
      handleChange={changeFormat}
    />
    <div className="Palette-colors">
      {colorBoxes}
    </div>
    <Footer footer={palettename}/>
    </div>
  )
}

export default Palette
