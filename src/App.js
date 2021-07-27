import './App.css';
import {Route, Switch} from 'react-router-dom'
import Palette from './components/Palette';
import PaletteList from './components/PaletteList'
import seedColors from './seedColors'
import { generatePalette } from './colorHelper'

function App() {

  const findPalette = (id) => {
    return generatePalette(seedColors.find(p => p.id === id))
  }

  return (
    <Switch>
      <Route exact path="/" render={() => <PaletteList palettes={seedColors}/>}/>
      <Route exact path="/palette/:id" 
        render={(routeProps) => (
          <Palette palette={findPalette(routeProps.match.params.id)}/>
        )}
      />
    </Switch>
  );
}

export default App;
