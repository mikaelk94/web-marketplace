import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import login from '../../login'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "../../App"
import Login from "../../login"

class Navbar extends React.Component {


    render() {
        return (

            <nav className="NavbarItems">
                <h1 className="Navbar-logo">Web Marketplace</h1>
                <div className="menu-icon">


                </div>
                <ul className="nav-menu">
                    <li><Link to="/">Etusivu</Link></li>
                    <li><Link to="/">Services</Link></li>
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/login">Kirjaudu sisään</Link></li>
                </ul>
            </nav>
        )
    }
}

export default Navbar