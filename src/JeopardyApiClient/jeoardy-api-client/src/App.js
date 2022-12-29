import logo from './logo.svg';
import './App.css';
import LoadSampleQuestion from './components/LoadSampleQuestion';
import GameArea from './components/GameArea';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Jeopardy</h1>
      </header>
      <div style={{marginTop: '40px'}}>
        <GameArea />
      </div>
    </div>
  );
}

export default App;
