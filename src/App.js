import React from 'react';
import logo from './logo.svg';
import './App.css';
import Candidates from './components/Candidates';
import Clients from './components/Clients';
import Files from './components/Files';
import Jobs from './components/Jobs';
import SearchTab from './components/Searchtab';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      {/* Render your components */}
      <Candidates />
      <Clients />
      <Files />
      <Jobs />
      <SearchTab />
    </div>
  );
}

export default App;

