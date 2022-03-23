import React from 'react'
import { MenuItems } from "./menuItems"
import './navbar.css'

class Navbar extends React.Component {
    state = { clicked: false }

    render() {
        return (

            <nav className="NavbarItems">
                <h1 className="Navbar-logo">Web Marketplace</h1>
                <div className="menu-icon">


                </div>
                <ul className="nav-menu">
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}><a className={item.cName} href={item.url}>
                                {item.title}
                            </a>
                            </li>
                        )
                    })}

                </ul>
            </nav>
        )
    }
}

export default Navbar