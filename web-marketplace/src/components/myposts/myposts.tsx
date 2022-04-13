import './myposts.css'
import '../search/search.css'
import '../productCard/productCard.css'
import { useState, useEffect, useContext } from 'react'
import ProductCard from '../productCard/ProductCard'
import axiosInstance from '../../axios/axiosInstance'
import Nav_bar from '../navbar/navbar'
import { UserContext } from '../../context/UserContext'
import Cookies from 'js-cookie'
import { Nav, Button, Modal } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

interface Posting {
  product: {
    title?: string
    price?: string
    images: string[]
    location?: string
    id?: string
  }[]
  posting?: string
  category: string[]
}

const axios = axiosInstance

const Myposts = () => {
  const { token, setUser, setToken } = useContext(UserContext)
  const [postings, setPostings] = useState<Posting['product']>([])
  const [count, setCount] = useState<number>()
  const [showModal, setShowModal] = useState(false)
  const [index, setIndex] = useState<number>()

  const handleClose = () => setShowModal(false)
  const handleShow = (postingIndex: number) => {
    setShowModal(true)
    setIndex(postingIndex)
  }

  const userData = JSON.parse(localStorage.getItem('user')!)

  const getPostings = async () => {
    const user = Cookies.get('user')
    const token = Cookies.get('token')
    if (user && token) {
      setUser(true)
      setToken(token)
    }
    try {
      // Haetaan kaikki käyttäjän postaukset
      const response = await axios.get(`/postings/${userData.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setPostings(response.data)
      setCount(response.data.length)
    } catch (err) {
      console.log(err)
    }
  }

  const deletePosting = async () => {
    setShowModal(false)
    const postingId = postings[index!].id
    try {
      const response = await axios.delete(
        `/postings/${userData.userId}/${postingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.status === 202) {
        getPostings()
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getPostings()
  }, [])

  return (
    <div className='Site'>
      <Nav_bar />
      <Nav variant='tabs' defaultActiveKey='/myposts'>
        <Nav.Item>
          <Nav.Link href='/myposts'>Omat ilmoitukset</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='/account'>Käyttäjätiedot</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className='Search'>
        <h3>Omat ilmoitukset: {count} kpl</h3>
        <div className='product-container'>
          {postings.map((posting, i) => (
            <ProductCard
              key={i}
              title={posting.title}
              location={posting.location}
              image={posting.images[0]}
              price={posting.price}
              btnEdit={
                <Button variant='secondary' active={true}>
                  <Icon.Wrench />
                </Button>
              }
              btnDelete={
                <Button
                  variant='danger'
                  active={true}
                  onClick={() => handleShow(i)}
                >
                  <Icon.Trash />
                </Button>
              }
            />
          ))}
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose} centered={true} size='sm'>
        <Modal.Header closeButton>
          <Modal.Title>Poista ilmoitus?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose} active={true}>
            Sulje
          </Button>
          <Button variant='danger' onClick={deletePosting} active={true}>
            Poista
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default Myposts
