import React,{useState} from 'react'
import ColorBox from './ColorBox';



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

  const colorBoxes = shades.map(s => (
    <ColorBox
      key={s.id}
      name={s.name}
      background={s.hex}/>
  ))
  return (
    <div className="Palette">
      <h1>Single Color Palette</h1>
      <div class="Palette-colors">{colorBoxes}</div>
    </div>
  )
}

export default SingleColorPalette
