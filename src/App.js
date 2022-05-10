import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import CatsTable from './components/CatsTable'

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CatsTable></CatsTable>
      </header>
    </div>
  );
}
