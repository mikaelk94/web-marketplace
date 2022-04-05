import '../../App.css'
import '../register/register.css'
import { useState, useRef, useContext } from 'react'
import { UserContext } from '../../UserContext'
import Navbar from '../navbar/navbar'
import axios from 'axios'



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
    const inputRef = useRef<any>(null)
    const { register, setRegister } = useContext(UserContext)

    const sendJson = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()

        if (password === passwordcheck) {

            try {
                const response = await axios.post(session_url, {
                    username: username, password: password, firstName: firstname, lastName: lastname,
                    email: email, phoneNum: phonenumber, dateofbirth: dateofbirth
                })
                if (response.status = 201) {
                    setRegister(true)
                }

            } catch (error: any) {
                document.getElementById('error')!.innerHTML = error.response.data.error
            }

        }
        else {
            checkpassword()
        }
    }

    return (
        <div className='etusivu'>
            <Navbar />
            <div className='login'></div>
            <div>
                <form className='registerForm'>
                    <div className='form-inner'>
                        <h2>Rekisteröidy</h2>
                        <div className='errorLabel'>
                            <label htmlFor='error' id='error'></label>
                        </div>
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
                        <div className='form-group'>
                            <label htmlFor='passwordcheck'>Varmista salasana</label>
                            <input
                                type='password'
                                name='passwordcheck'
                                id='passwordcheck'
                                value={passwordcheck}
                                onChange={(e) => setPasswordcheck(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='firstname'>Etunimi</label>
                            <input
                                type='text'
                                name='firstname'
                                id='firstname'
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='lastname'>Sukunimi</label>
                            <input
                                type='text'
                                name='lastname'
                                id='lastname'
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='email'>Sähköposti</label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='PhoneNum'>Puhelinumero</label>
                            <input
                                type='text'
                                name='phonenum'
                                id='phonenum'
                                value={phonenumber}
                                onChange={(e) => setPhonenumber(e.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='dateOfBirth'>Syntymäaika</label>
                            <input
                                type='text'
                                name='dateofbith'
                                id='dateofbirth'
                                value={dateofbirth}
                                onChange={(e) => setDateofbirth(e.target.value)}
                            />
                        </div>
                        <button className='btn' onClick={sendJson}>
                            Rekisteröidy
                        </button>
                        <div className='link'>
                            <a href='login'>Kirjaudu sisään</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default Register
