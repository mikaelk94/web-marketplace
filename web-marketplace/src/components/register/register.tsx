import '../../App.css'
import '../register/register.css'
import { useState, useRef, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import Nav_bar from '../navbar/navbar'
import axios from 'axios'
import { Form, Button } from 'react-bootstrap'
const session_url = 'https://verkkokauppa-api.herokuapp.com/users'

function checkpassword() {
  document.getElementById('error')!.innerHTML = 'salasana ei täsmää'
}

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordcheck, setPasswordcheck] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [dateofbirth, setDateofbirth] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const inputRef = useRef<any>(null)
  const { setRegister } = useContext(UserContext)

  const sendJson = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (password === passwordcheck) {
      try {
        const response = await axios.post(session_url, {
          username: username,
          password: password,
          firstName: firstname,
          lastName: lastname,
          email: email,
          phoneNum: phonenumber,
          dateofbirth: dateofbirth,
        })
        if (response.status === 201) {
          setRegister(true)
        }
      } catch (error: any) {
        setError(true)
        setErrorMessage(error.response.data.error)
      }
    } else {
      checkpassword()
    }
  }

  return (
    <Form>
      <Nav_bar />
      <div className='etusivu'>
        <div className='register'>
          <h2>Rekisteröidy</h2>
          {error && <div className='error'>{errorMessage}</div>}
          <Form.Group className='form-group1'>
            <Form.Label htmlFor='name'>Käyttäjänimi</Form.Label>
            <Form.Control
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
              type='password'
              name='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='form-group'>
            <Form.Label htmlFor='passwordcheck'>Varmista salasana</Form.Label>
            <Form.Control
              type='password'
              name='passwordcheck'
              id='passwordcheck'
              value={passwordcheck}
              onChange={(e) => setPasswordcheck(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='form-group'>
            <Form.Label htmlFor='firstname'>Etunimi</Form.Label>
            <Form.Control
              type='text'
              name='firstname'
              id='firstname'
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='form-group'>
            <Form.Label htmlFor='lastname'>Sukunimi</Form.Label>
            <Form.Control
              type='text'
              name='lastname'
              id='lastname'
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='form-group'>
            <Form.Label htmlFor='email'>Sähköposti</Form.Label>
            <Form.Control
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='form-group'>
            <Form.Label htmlFor='PhoneNum'>Puhelinumero</Form.Label>
            <Form.Control
              type='text'
              name='phonenum'
              id='phonenum'
              value={phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='form-group'>
            <Form.Label htmlFor='dateOfBirth'>Syntymäaika</Form.Label>
            <Form.Control
              type='text'
              name='dateofbith'
              id='dateofbirth'
              value={dateofbirth}
              onChange={(e) => setDateofbirth(e.target.value)}
            />
          </Form.Group>
          <Form.Group style={{ textAlign: 'center' }}>
            <Button
              onClick={sendJson}
              variant='success'
              className='mt-3 mt-4'
              size='lg'
              type='submit'
            >
              Rekisteröidy
            </Button>
            <Button
              variant='secondary'
              className='mt-3 mt-4'
              style={{ marginLeft: '5px' }}
              size='lg'
              type='submit'
              href='login'
            >
              Takaisin
            </Button>
          </Form.Group>
        </div>
      </div>
    </Form>
  )
}

export default Register
