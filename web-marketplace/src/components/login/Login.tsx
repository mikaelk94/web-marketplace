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
  const { setUser, setToken } = useContext(UserContext)
  const inputRef = useRef<any>(null)

  const loginfunc = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
        console.log('Error on Authentication')
        console.log(error)
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
            <Form.Label htmlFor='name'>Käyttäjänimi</Form.Label>
            <Form.Control
              className='form-group1'
              ref={inputRef}
              type='text'
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
              name='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            onClick={loginfunc}
            variant='success'
            className='mt-3 mt-4'
            size='lg'
            type='submit'
          >
            Kirjaudu sisään
          </Button>
          <Button
            variant='success'
            className='mt-3 mt-4'
            size='lg'
            type='submit'
            href='register'
          >
            Rekisteröidy
          </Button>
        </div>
      </div>
    </Form>
  )
}

export default Login
