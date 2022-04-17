import './navbar.css'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Nav, Navbar, Container, Offcanvas } from 'react-bootstrap'
import Cookies from 'js-cookie'

function Nav_bar() {
  const { user, setUser, setToken } = useContext(UserContext)

  const handleLogout = () => {
    setUser(false)
    setToken(null)
    Cookies.remove('user')
    Cookies.remove('token')
    window.localStorage.removeItem('user')
  }

  return (
    <Navbar bg='light' expand={false}>
      <Container fluid>
        <Navbar.Brand id='Header' href='/'>
          Web Marketplace
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='offcanvasNavbar' />
        <Navbar.Offcanvas
          id='offcanvasNavbar'
          aria-labelledby='offcanvasNavbarLabel'
          placement='end'
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id='offcanvasNavbarLabel'>
              Web Marketplace
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className='justify-content-end flex-grow-1 pe-3'>
              <Nav.Link href='/'>Etusivu</Nav.Link>
              {user ? (
                <>
                  <Nav.Link href='/post'>Jätä ilmoitus</Nav.Link>
                  <Nav.Link href='/myposts'>Omat tiedot</Nav.Link>
                  <Nav.Link href='/' onClick={handleLogout}>
                    Kirjaudu ulos
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link href='/login'>Kirjaudu sisään</Nav.Link>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  )
}

export default Nav_bar
