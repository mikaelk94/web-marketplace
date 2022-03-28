import React from 'react'
import './App.css'
import Navbar from './components/navbar/navbar'
import Search from './components/search/Search'

function Login() {
    return (
        <div className='etusivu'>
            <Navbar />

            <div>
                <h1>Welcome to login!</h1>
            </div>
        </div>
    )
}

export default Login;
