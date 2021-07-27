import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import ColorBox from './ColorBox';
import Footer from './partial/Footer';
import Navbar from './partial/Navbar';
import './ColorBox.css'

function SingleColorPalette(props) {

  const {palette, colorId} = props
  const gatherShades = (palette, FilterBy) => {
    let shades = []
    const allColors = palette.colors;
    for(let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === FilterBy)
      )
    }
    return shades.slice(1)
    
  }

  const [shades, setShades] = useState(gatherShades(palette, colorId))
  const [format, setFormat] = useState("hex")

  const colorBoxes = shades.map(s => (
    <ColorBox
      key={s.id}
      name={s.name}
      background={s[format]}
      showLink={false}/>
  ))

  const changeFormat = (val) => {
    setFormat(val)
  }

  return (
    <div className="SinglePalette Palette">
      <Navbar
        shownavbar={false}
        handleChange={changeFormat}
      />
      <h1>Single Color Palette</h1>
      <div class="Palette-colors">
        {colorBoxes}
        <div className="go-back ColorBox">
          <Link to={`/palette/${palette.id}`} className="back-button">Go Back</Link>
        </div>
      </div>
      <Footer footer={palette.id} />
    </div>
  )
}

export default SingleColorPalette
