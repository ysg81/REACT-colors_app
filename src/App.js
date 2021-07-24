import logo from './logo.svg';
import './App.css';
import Palette from './components/Palette';
import seedColors from './seedColors'

function App() {
  return (
    <div>
      <Palette palette={seedColors[4]}/>
    </div>
  );
}

export default App;
