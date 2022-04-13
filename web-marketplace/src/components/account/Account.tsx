import { useState } from 'react'
import { Nav } from 'react-bootstrap'
import Nav_bar from '../navbar/navbar'

function Account() {
  return (
    <div className='Site'>
      <Nav_bar />
      <Nav variant='tabs' defaultActiveKey='/myposts' activeKey='account'>
        <Nav.Item>
          <Nav.Link href='/myposts'>Omat ilmoitukset</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='/account' eventKey='account'>
            Käyttäjätiedot
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  )
}

export default Account
