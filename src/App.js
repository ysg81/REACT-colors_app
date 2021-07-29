import './App.css';
import React,{useState, useEffect} from 'react'
import {Route, Switch} from 'react-router-dom'
import Palette from './components/Palette';
import PaletteList from './components/PaletteList'
import SingleColorPalette from './components/SingleColorPalette'
import NewPalette from './components/NewPalette'
import seedColors from './seedColors'
import { generatePalette } from './colorHelper'

function App() {
  const saveToLocal = JSON.parse(window.localStorage.getItem("palette"))
  const [palette, setPalette] = useState(saveToLocal || seedColors)
  const findPalette = (id) => {
    return generatePalette(palette.find(p => p.id === id))
  }
  const savePalette = (newPalette) => {
    setPalette([...palette, newPalette])
  }
  useEffect(() => {
    window.localStorage.setItem("palette",JSON.stringify(palette))
  }, [palette])

  return (
    <Switch>
      <Route exact path="/" render={(routeProps) => <PaletteList palettes={palette} {...routeProps}/>}/>
      <Route exact path="/palette/new" render={(routeProps) => <NewPalette savePalette={savePalette} palettes={palette} {...routeProps}/>}/>
      <Route exact path="/palette/:id"  render={(routeProps) => (
        <Palette palette={findPalette(routeProps.match.params.id)}/> 
      )}/>
      <Route exact path="/palette/:paletteId/:colorId" render={(routeProps) => (
        <SingleColorPalette
          palette={findPalette(routeProps.match.params.paletteId)}
          colorId={routeProps.match.params.colorId}  
        />
      )}/>
    </Switch>
  );
}

export default App;
