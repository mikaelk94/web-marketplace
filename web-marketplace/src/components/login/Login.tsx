import '../../App.css'
import Navbar from '../navbar/navbar'
import axios from 'axios'
import './login.css'

const session_url = 'https://verkkokauppa-api.herokuapp.com/login'

const loginfunc = async () => {
  let user = (document.getElementById('username') as HTMLInputElement).value
  let pass = (document.getElementById('password') as HTMLInputElement).value
  axios
    .post(
      session_url,
      {},
      {
        auth: {
          username: user,
          password: pass,
        },
      }
    )
    .then(function (response) {
      console.log('Authenticated')
      console.log(response.data)
      console.log(user, pass)
    })
    .catch(function (error) {
      console.log('Error on Authentication')
    })
}

function Login() {
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
              <input type='text' name='name' id='username' />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Salasana</label>
              <input type='password' name='password' id='password' />
            </div>
            <button className='btn' onClick={loginfunc}>
              Kirjaudu sisään
            </button>
            <button className='btn'>Rekisteröidy</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
