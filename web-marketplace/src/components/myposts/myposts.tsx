import './myposts.css'
import '../search/search.css'
import '../productCard/productCard.css'
import ProductCard from '../productCard/ProductCard'
import { useState, useEffect, useContext } from 'react'
import axiosInstance from '../../axios/axiosInstance'
import Nav_bar from '../navbar/navbar'
import { UserContext } from '../../context/UserContext'
import Cookies from 'js-cookie'

interface Posting {
  product: {
    title?: string
    price?: string
    images: string[]
    location?: string
  }[]
  posting?: string
  category: string[]
}

interface Category {
  category: string
}

const axios = axiosInstance

const Myposts = () => {
  const { token, setUser, setToken } = useContext(UserContext)
  const [postings, setPostings] = useState<Posting['product']>([])
  const [category, setCategory] = useState<string>('Kaikki osastot')
  const [count, setCount] = useState<number>()
  const [input, setInput] = useState('')
  const [categories, setCategories] = useState<Posting['category']>([
    'Kaikki osastot',
  ])
  let categoriesArray: string[] = ['Kaikki osastot']

  const getPostings = async () => {
    try {
      const user = Cookies.get('user')
      const token = Cookies.get('token')
      if (user && token) {
        setUser(true)
        setToken(token)
      }
      console.log('token:', token)
      const userData = JSON.parse(localStorage.getItem('user')!)
      // Haetaan kaikki postaukset
      if (category === 'Kaikki osastot') {
        const response = await axios.get(`/postings/${userData.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        response.data.map((posting: Category) => {
          if (!categoriesArray.includes(posting.category)) {
            categoriesArray.push(posting.category)
            /* console.log(posting.category) */
          }
        })
        setPostings(response.data)
        setCount(response.data.length)
        setCategories(categoriesArray)
        /* console.log(categoriesArray) */
      }
      // Haetaan kategorian perusteella
      else {
        const response = await axios.get(`/postings/${userData.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setPostings(response.data)
        setCount(response.data.length)
        /* console.log(response.data) */
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getPostings()
  }, [])

  return (
    <div className='Site'>
      <Nav_bar />
      <div className='Search'>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <select onChange={(e) => setCategory(e.target.value)}>
          {categories.map((posting, i) => (
            <option key={i}>{posting}</option>
          ))}
        </select>
        <button onClick={getPostings}>Search</button>
        <h3>{count} hakutulosta</h3>
        <div className='product-container'>
          {postings.map((posting, i) => (
            <ProductCard
              key={i}
              title={posting.title}
              location={posting.location}
              image={posting.images[0]}
              price={posting.price}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
export default Myposts
