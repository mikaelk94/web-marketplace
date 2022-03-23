import React from 'react';
import './App.css';
import Navbar from './components/navbar/navbar'

function App() {
  return (

    <div className="App">
      <Navbar />
      <div>
        <h1 className="hero-header">
          Slogan tähän
        </h1>
      </div>
    </div>
  );
}

export default App;