import { enablePatches } from '@reduxjs/toolkit/node_modules/immer';
import './App.css';
import { PuzzleSolver } from './PuzzleSolver';

enablePatches()
function App() {
  return (
    <div className="App">
      <header className="App-header">
          <PuzzleSolver />
      </header>
    </div>
  );
}

export default App;
