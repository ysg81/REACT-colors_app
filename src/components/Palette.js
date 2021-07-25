import React from 'react'
import ColorBox from './ColorBox'
import './Palette.css'

function Palette({palette}) {
  const colorBoxes = palette.colors.map(color => (
    <ColorBox background={color.color} name={color.name} />
  ))
  return (
    <div className="Palette">
      {/* Navbar */}
      <div className="Palette-colors">
        {colorBoxes}
      </div>
      {/* footer */}
    </div>
  )
}

export default Palette
