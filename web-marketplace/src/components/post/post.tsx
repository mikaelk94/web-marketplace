import './post.css'
import '../../App.css'
import Navbar from '../navbar/navbar'
import axios from '../../axios/axiosInstance'
import React, { useState, useContext, useEffect, useRef } from 'react'
import { UserContext } from '../../UserContext'
import FormData from 'form-data'

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

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <form onSubmit={(e) => submitPosting(e)}>
      <Navbar />
      <div className='Newpost'>
        <div className='Postbox'>
          <div className='input-div'>
            <h1>Luo uusi ilmoitus</h1>
            <h3>Otsikko:</h3>
            <input
              ref={inputRef}
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='input-div'>
            <h3>Kuvaus:</h3>
            <input
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className='input-div'>
            <h3>Tuotteen kategoria:</h3>
            <input
              type='text'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className='input-div'>
            <h3>Tuotteen hinta:</h3>
            <input
              type='text'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className='input-div'>
            <h3>Lisää sijainti:</h3>
            <input
              type='text'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className='input-div'>
            <h3>Lisää kuvia tuotteesta:</h3>
            <input
              style={{ cursor: 'pointer' }}
              id='imageInput'
              type='file'
              accept='image/jpg'
              onChange={(e) => {
                handleFile(e)
              }}
              multiple
            />
          </div>
          <div className='contact-div'>
            Myyjän tiedot:
            <p>
              Etunimi
              <input
                type='text'
                value={userInfo.firstName}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, firstName: e.target.value })
                }
              />
            </p>
            <p>
              Sukunimi
              <input
                type='text'
                value={userInfo.lastName}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, lastName: e.target.value })
                }
              />
            </p>
            <p>
              Puhelin
              <input
                type='text'
                value={userInfo.phoneNum}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, phoneNum: e.target.value })
                }
              />
            </p>
            <p>
              Sähköposti
              <input
                type='text'
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, email: e.target.value })
                }
              />
            </p>
          </div>
          <button className='btn'>Submit</button>
        </div>
      </div>
    </form>
  )
}

export default Post
