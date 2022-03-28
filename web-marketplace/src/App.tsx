import React from 'react'
import './App.css'
import Navbar from './components/navbar/navbar'
import Search from './components/search/Search'
import Login from './login'
import Home from './home'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className='App'>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </div>

  )
}

export default App
