import '../../App.css'
import './login.css'
import { useState, useEffect, useRef, useContext } from 'react'
import Navbar from '../navbar/navbar'
import { UserContext } from '../../UserContext'
import axios from 'axios'
import Cookies from 'js-cookie'

const session_url = 'https://verkkokauppa-api.herokuapp.com/login'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { token, setToken } = useContext(UserContext)
  const { user, setUser } = useContext(UserContext)
  const inputRef = useRef<any>(null)

  const loginfunc = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    axios
      .post(
        session_url,
        {},
        {
          auth: {
            username: username,
            password: password,
          },
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          setUser(true)
          setToken(response.data.token)
          Cookies.set('user', 'true')
          Cookies.set('token', response.data.token)
        }
      })
      .catch(function (error) {
        console.log('Error on Authentication')
        console.log(error)
      })
  }

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <div className='etusivu'>
      <Navbar />
      <div className='login'></div>
      <div>
        <form className='loginForm'>
          <div className='form-inner'>
            <h2>Kirjaudu sisään</h2>
            <div className='form-group'>
              <label htmlFor='name'>Käyttäjänimi</label>
              <input
                ref={inputRef}
                type='text'
                name='name'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Salasana</label>
              <input
                type='password'
                name='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className='btn' onClick={loginfunc}>
              Kirjaudu sisään
            </button>
            <div className='link'>
              <a href='register'>Rekisteröidy</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
