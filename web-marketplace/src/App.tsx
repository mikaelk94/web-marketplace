import './App.css'
import { useState, useMemo, useEffect } from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import Login from './components/login/Login'
import Home from './components/home/Home'
import Post from './components/post/post'
import { UserContext } from './UserContext'
import Cookies from 'js-cookie'

function App() {
  const [user, setUser] = useState(false)
  const [token, setToken] = useState('null')

  const userValues = useMemo(
    () => ({ user, setUser, token, setToken }),
    [user, setUser, token, setToken]
  )

  useEffect(() => {
    const user = Cookies.get('user')
    const token = Cookies.get('token')
    if (user && token) {
      setUser(true)
      setToken(token)
    }
  }, [])

  return (
    <BrowserRouter>
      <div className='App'>
        <UserContext.Provider value={userValues}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/login'
              element={user ? <Navigate replace to='/' /> : <Login />}
            />
            <Route path='/post' element={<Post />} />
          </Routes>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  )
}

export default App
