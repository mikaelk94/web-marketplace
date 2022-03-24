import React from 'react'
import './App.css'
import Navbar from './components/navbar/navbar'
import Search from './components/search/Search'

function App() {
  return (
    <div className='App'>
      <Navbar />
      <div>
        <h1 className='hero-header'>Slogan tähän</h1>
      </div>
      <Search />
    </div>
  )
}

export default App
