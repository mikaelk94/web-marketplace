import './App.css'
import Login from './components/login/Login'
import Home from './components/home/Home'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
