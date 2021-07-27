import './App.css';
import {Route, Switch} from 'react-router-dom'
import Palette from './components/Palette';
import PaletteList from './components/PaletteList'
import SingleColorPalette from './components/SingleColorPalette'
import seedColors from './seedColors'
import { generatePalette } from './colorHelper'

function App() {

  const findPalette = (id) => {
    return generatePalette(seedColors.find(p => p.id === id))
  }

  return (
    <Switch>
      <Route exact path="/" render={(routeProps) => <PaletteList palettes={seedColors} {...routeProps}/>}/>
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
