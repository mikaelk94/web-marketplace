import './editPosting.css'
import Nav_bar from '../navbar/navbar'
import { useLocation } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useState, useEffect, useContext } from 'react'
import axios from '../../axios/axiosInstance'
import { UserContext } from '../../context/UserContext'

interface Posting {
  title?: string
  description?: string
  location?: string
  price?: string
  category?: string
  contactInfo: {
    firstName?: string
    lastName?: string
    phoneNum?: string
    email?: string
  }
}

const EditPosting = () => {
  const previousLocation: any = useLocation()
  const { props } = previousLocation.state
  const { token } = useContext(UserContext)
  const { setPostingEdited } = useContext(UserContext)

  const [posting, setPosting] = useState<Posting>({
    title: '',
    description: '',
    location: '',
    price: '',
    category: '',
    contactInfo: {
      firstName: '',
      lastName: '',
      phoneNum: '',
      email: '',
    },
  })

  useEffect(() => {
    setPosting(props)
  }, [])

  const submitEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const editedPosting = {
      title: posting.title,
      description: posting.description,
      category: posting.category,
      location: posting.location,
      price: posting.price,
      contactInfo: {
        firstName: posting.contactInfo.firstName,
        lastName: posting.contactInfo.lastName,
        phoneNum: posting.contactInfo.phoneNum,
        email: posting.contactInfo.email,
      },
      deliveryType: { shipping: true, pickup: true },
    }

    try {
      const response = await axios.put(
        `/postings/${props.userId}/${props.id}`,
        editedPosting,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.status === 202) {
        console.log('API response:', response.data)
        setPostingEdited(true)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Form onSubmit={(e) => submitEdit(e)}>
      <Nav_bar />
      <div className='edit-post-div'>
        <div className='edit-box'>
          <h2 style={{ textAlign: 'center' }}>
            Muokkaa ilmoitusta
            <h2>"{props.title}"</h2>
          </h2>

          <Form.Label className='m-0 mt-2'>Otsikko</Form.Label>
          <Form.Control
            className='mb-3'
            defaultValue={posting.title}
            onChange={(e) => setPosting({ ...posting, title: e.target.value })}
          />
          <Form.Label className='m-0'>Kuvaus</Form.Label>
          <Form.Control
            className='mb-3'
            as='textarea'
            defaultValue={posting.description}
            style={{ height: 'fit-content' }}
            onChange={(e) =>
              setPosting({ ...posting, description: e.target.value })
            }
          />
          <Form.Label className='m-0'>Kategoria</Form.Label>
          <Form.Control
            className='mb-3'
            defaultValue={posting.category}
            onChange={(e) =>
              setPosting({ ...posting, category: e.target.value })
            }
          />
          <Form.Label className='m-0'>Hinta</Form.Label>
          <Form.Control
            type='number'
            className='mb-3'
            defaultValue={posting.price}
            onChange={(e) => setPosting({ ...posting, price: e.target.value })}
          />
          <Form.Label className='m-0'>Sijainti</Form.Label>
          <Form.Control
            className='mb-3'
            defaultValue={posting.location}
            onChange={(e) =>
              setPosting({ ...posting, location: e.target.value })
            }
          />
          <h3>Myyjän tiedot</h3>
          <Form.Label className='m-0'>Etunimi</Form.Label>
          <Form.Control
            className='mb-3'
            defaultValue={posting.contactInfo.firstName}
            onChange={(e) =>
              setPosting({ ...posting, location: e.target.value })
            }
          />
          <Form.Label className='m-0'>Sukunimi</Form.Label>
          <Form.Control
            className='mb-3'
            defaultValue={posting.contactInfo.lastName}
            onChange={(e) =>
              setPosting({ ...posting, location: e.target.value })
            }
          />
          <Form.Label className='m-0'>Puhelin</Form.Label>
          <Form.Control
            className='mb-3'
            defaultValue={posting.contactInfo.phoneNum}
            onChange={(e) =>
              setPosting({ ...posting, location: e.target.value })
            }
          />
          <Form.Label className='m-0'>Sähköposti</Form.Label>
          <Form.Control
            className='mb-3'
            defaultValue={posting.contactInfo.email}
            onChange={(e) =>
              setPosting({ ...posting, location: e.target.value })
            }
          />
          <Form.Group style={{ textAlign: 'center' }}>
            <Button
              style={{ margin: '1rem 4rem 0rem 0rem' }}
              variant='success'
              size='lg'
              type='submit'
            >
              Tallenna
            </Button>
            <Button
              style={{ margin: '1rem 0rem 0rem 0rem' }}
              variant='secondary'
              size='lg'
              href='/myposts'
            >
              Peruuta
            </Button>
          </Form.Group>
        </div>
      </div>
    </Form>
  )
}

export default EditPosting
