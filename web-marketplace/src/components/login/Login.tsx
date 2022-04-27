import '../../App.css'
import './login.css'
import { useState, useEffect, useRef, useContext } from 'react'
import Nav_bar from '../navbar/navbar'
import { UserContext } from '../../context/UserContext'
import axiosInstance from '../../axios/axiosInstance'
import Cookies from 'js-cookie'
import { Form, Button } from 'react-bootstrap'
const axios = axiosInstance

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { setUser, setToken } = useContext(UserContext)
  const inputRef = useRef<any>(null)

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    axios
      .post(
        '/login',
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
          console.log(response.data)
          window.localStorage.setItem(
            'user',
            JSON.stringify(response.data.user)
          )
          setUser(true)
          setToken(response.data.token)
          Cookies.set('user', 'true')
          Cookies.set('token', response.data.token)
        }
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          setError(true)
          setErrorMessage('Väärä tunnus tai salasana')
        } else {
          setError(true)
          setErrorMessage('virhe kirjautumisessa')
          console.error(error)
        }
      })
  }

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <Form>
      <Nav_bar />
      <div className='etusivu'>
        <div className='login'>
          <h2>Kirjaudu sisään</h2>
          <Form.Group className='form-group1'>
            {error && <div className='error'>{errorMessage}</div>}
            <Form.Label htmlFor='name'>Käyttäjänimi</Form.Label>
            <Form.Control
              className='form-group1'
              ref={inputRef}
              type='text'
              autoComplete='username'
              name='name'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='form-group2'>
            <Form.Label htmlFor='password'>Salasana</Form.Label>
            <Form.Control
              className='form-group2'
              type='password'
              autoComplete='current-password'
              name='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group style={{ textAlign: 'center' }}>
            <Button
              onClick={handleLogin}
              variant='success'
              className='mt-4'
              size='lg'
              type='submit'
            >
              Kirjaudu sisään
            </Button>
            <Button
              variant='secondary'
              className='mt-4'
              size='lg'
              href='/register'
            >
              Rekisteröidy
            </Button>
          </Form.Group>
        </div>
      </div>
    </Form>
  )
}

export default Login
