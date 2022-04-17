import './App.css'
import { useState, useMemo, useEffect } from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import { UserContext } from './context/UserContext'
import Cookies from 'js-cookie'
import Login from './components/login/Login'
import Home from './components/home/Home'
import Post from './components/post/post'
import Register from './components/register/register'
import Myposts from './components/myposts/myposts'
import Account from './components/account/Account'
import Product from './components/product/Product'

function App() {
  const [user, setUser] = useState(false)
  const [token, setToken] = useState('null')
  const [register, setRegister] = useState(false)
  const [postingCreated, setPostingCreated] = useState(false)
  const [product, setProduct] = useState(false)

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
      product,
      setProduct,
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
      product,
      setProduct,
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
            <Route path='/account' element={<Account />} />
            <Route path='/product' element={<Product />} />
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
              element={
                postingCreated ? <Navigate replace to='/myposts' /> : <Post />
              }
            />
          </Routes>
        </UserContext.Provider>
      </div>
    </BrowserRouter>
  )
}

export default App
