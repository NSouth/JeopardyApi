import logo from './logo.svg';
import './App.css';
import LoadSampleQuestion from './components/LoadSampleQuestion';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Jeopardy</h1>
      </header>
      <div style={{marginTop: '40px'}}>
        <LoadSampleQuestion />
      </div>
    </div>
  );
}

export default App;
