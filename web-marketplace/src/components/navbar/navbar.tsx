import './navbar.css'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../UserContext'

function Navbar() {
  const { user } = useContext(UserContext)
  return (
    <nav className='NavbarItems'>
      <h1 className='Navbar-logo'>Web Marketplace</h1>
      <div className='menu-icon'></div>
      <ul className='nav-menu'>
        <li>
          <Link to='/'>Etusivu</Link>
        </li>
        <li>
          <Link to='/'>Services</Link>
        </li>
        <li>
          <Link to='/'>Products</Link>
        </li>
        {user ? (
          <li>
            <Link to='/post'>Jätä ilmoitus</Link>
          </li>
        ) : (
          <li>
            <Link to='/login'>Kirjaudu sisään</Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
