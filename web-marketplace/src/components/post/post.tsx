import './post.css'
import '../../App.css'
import Nav_bar from '../navbar/navbar'
import axios from '../../axios/axiosInstance'
import React, { useState, useContext, useEffect, useRef } from 'react'
import { UserContext } from '../../context/UserContext'
import FormData from 'form-data'
import { Form, Button, Row, Col } from 'react-bootstrap'

interface Posting {
  userId?: string
  postingId?: string
  title: string
  description?: string
  category: string
  location: string
  price: string
  images?: any
  deliveryType?: {
    shipping: boolean
    pickup: boolean
  }
  contactInfo: {
    firstName: string
    lastName: string
    phoneNum: string
    email: string
  }
}

function Post() {
  const { token, setPostingCreated } = useContext(UserContext)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [title, setTitle] = useState<Posting['title']>('')
  const [description, setDescription] = useState<Posting['description']>('')
  const [category, setCategory] = useState<Posting['category']>('')
  const [location, setLocation] = useState<Posting['location']>('')
  const [price, setPrice] = useState<Posting['price']>('')
  const [userInfo, setUserInfo] = useState<Posting['contactInfo']>({
    firstName: '',
    lastName: '',
    phoneNum: '',
    email: '',
  })
  const inputRef = useRef<any>(null)
  const formData: any = new FormData()

  useEffect(() => {
    const userData = window.localStorage.getItem('user')
    setUserInfo(JSON.parse(userData!))
    inputRef.current.focus()
  }, [])

  const handleFile = (e: React.ChangeEvent<any>) => {
    e.preventDefault()

    for (let i = 0; i < e.target.files!.length; i++) {
      formData.append('images', e.target.files![i])
    }

    /* for (const [key, value] of formData) {
      console.log(`key ${key}`)
      console.log(`value ${value}`)
    } */
  }

  const uploadImages = async (postingId: string) => {
    formData.append('postingId', postingId)
    try {
      const response = await axios.put('/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.status === 200) {
        setPostingCreated(true)
        console.log('Cloudinary response:', response)
      } else {
      }
    } catch (err) {
      console.error(err)
    }
  }

  const submitPosting = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const userData = JSON.parse(localStorage.getItem('user')!)

    const posting = {
      title: title,
      description: description,
      category: category,
      location: location,
      price: price,
      contactInfo: {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNum: userData.phoneNum,
        email: userData.email,
      },
      deliveryType: { shipping: true, pickup: true },
    }

    try {
      const response = await axios.post(
        `/postings/${userData.userId}`,
        posting,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.status === 201) {
        uploadImages(response.data._id)
        console.log('API response:', response.data)
      }
    } catch (err: any) {
      setError(true)
      if (err.response.status === 400) {
        setErrorMessage('Missing information')
      } else {
        setErrorMessage('Virhe ilmoituksen luonnissa')
      }
      console.error(err)
    }
  }

  return (
    <Form onSubmit={(e) => submitPosting(e)}>
      <Nav_bar />
      <div className='Newpost'>
        <div className='Postbox mb-4'>
          <h1 className='mb-3'>Uusi ilmoitus</h1>
          {error && <div className='error'>{errorMessage}</div>}
          <Form.Group className='mb-2'>
            <Form.Label className='m-0'>Otsikko</Form.Label>
            <Form.Control
              className='mb-2'
              ref={inputRef}
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Form.Label className='m-0'>Kuvaus</Form.Label>
            <Form.Control
              className='mb-2'
              as='textarea'
              rows={2}
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Form.Label className='m-0'>Kategoria</Form.Label>
            <Form.Control
              className='mb-2'
              type='text'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Form.Label className='m-0'>Hinta</Form.Label>
            <Form.Control
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label className='m-0'>Sijainti</Form.Label>
            <Form.Control
              htmlSize={1}
              type='text'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId='imageInput' style={{ margin: '0rem 2rem' }}>
            <h4 className='mb-2'>Lisää kuvia</h4>
            <Form.Control
              style={{ cursor: 'pointer' }}
              type='file'
              accept='image/jpg'
              onChange={(e) => {
                handleFile(e)
              }}
              multiple
            />
          </Form.Group>
          <Form.Group as={Row} className='mt-4'>
            <h4>Myyjän tiedot</h4>
            <Form.Label column sm='3' style={{ marginLeft: '1rem' }}>
              Etunimi
            </Form.Label>
            <Col sm='8'>
              <Form.Control
                type='text'
                value={userInfo.firstName}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, firstName: e.target.value })
                }
              />
            </Col>
            <Form.Label column sm='3' style={{ marginLeft: '1rem' }}>
              Sukunimi
            </Form.Label>
            <Col sm='8'>
              <Form.Control
                className=''
                type='text'
                value={userInfo.lastName}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, lastName: e.target.value })
                }
              />
            </Col>
            <Form.Label column sm='3' style={{ marginLeft: '1rem' }}>
              Puhelin
            </Form.Label>
            <Col sm='8'>
              <Form.Control
                type='text'
                value={userInfo.phoneNum}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, phoneNum: e.target.value })
                }
              />
            </Col>
            <Form.Label column sm='3' style={{ marginLeft: '1rem' }}>
              Sähköposti
            </Form.Label>
            <Col sm='8'>
              <Form.Control
                type='text'
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
              />
            </Col>
          </Form.Group>
          <Form.Group style={{ textAlign: 'center' }}>
            <Button
              style={{
                margin: '1.5rem 0rem 0rem 0px',
                width: '130px',
              }}
              variant='success'
              size='lg'
              type='submit'
            >
              Lähetä
            </Button>
            <Button
              style={{
                margin: '1.5rem 0rem 0rem 2rem',
                width: '130px',
              }}
              variant='secondary'
              size='lg'
              href='/'
            >
              Peruuta
            </Button>
          </Form.Group>
        </div>
      </div>
    </Form>
  )
}

export default Post
