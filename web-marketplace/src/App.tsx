import './App.css'
import { useState, useMemo, useEffect } from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import Login from './components/login/Login'
import Home from './components/home/Home'
import Post from './components/post/post'
import { UserContext } from './UserContext'
import Cookies from 'js-cookie'
import Register from './components/register/register'
import Myposts from './components/myposts/myposts'


function App() {
  const [user, setUser] = useState(false)
  const [token, setToken] = useState('null')
  const [register, setRegister] = useState(false)
  const [postingCreated, setPostingCreated] = useState(false)

  const userValues = useMemo(
    () => ({
      user,
      setUser,
      token,
      setToken,
      register,
      setRegister,
      postingCreated,
      setPostingCreated,
    }),
    [
      user,
      setUser,
      token,
      setToken,
      register,
      setRegister,
      postingCreated,
      setPostingCreated,
    ]
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
            <Route path='/myposts' element={<Myposts />} />
            <Route
              path='/login'
              element={user ? <Navigate replace to='/' /> : <Login />}
            />
            <Route
              path='/register'
              element={
                register ? <Navigate replace to='/login' /> : <Register />
              }
            />
            <Route
              path='/post'
              element={postingCreated ? <Navigate replace to='/' /> : <Post />}
            />
          </Routes>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  )
}

export default App
