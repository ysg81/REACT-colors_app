import logo from './logo.svg';
import './App.css';
import Palette from './components/Palette';
import seedColors from './seedColors'
import { generatePalette } from './colorHelper'

function App() {
  console.log(generatePalette(seedColors[4]))
  return (
    <div>
      <Palette palette={seedColors[4]}/>
    </div>
  );
}

export default App;
