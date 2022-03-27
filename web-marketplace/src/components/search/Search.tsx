import './search.css'
import '../productCard/productCard.css'
import { useState, useEffect } from 'react'
import axios, { AxiosInstance } from 'axios'
import ProductCard from '../productCard/ProductCard'

interface Posting {
  product: {
    title?: string
    price?: string
    location?: string
  }[]
  posting?: string
  category: string
}

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
})

const Search = () => {
  const [allPostings, setAllPostings] = useState<Array<Posting>>([])
  const [postings, setPostings] = useState<Posting['product']>([])
  const [category, setCategory] = useState('')
  /* const [categories, setCategories] = useState<Array<string>>([]) */
  const [count, setCount] = useState<number>()

  const getPostings = async () => {
    try {
      if (category === 'Kaikki osastot' || category === '') {
        const response = await instance.get('/postings')
        setAllPostings(response.data)
        setPostings(response.data)
        console.log(response.data)
        setCount(response.data.length)
      } else {
        const response = await instance.get('/postings', {
          params: { category: category },
        })
        setPostings(response.data)
        console.log(response.data)
        setCount(response.data.length)
      }
    } catch (err) {}
  }

  useEffect(() => {
    getPostings()
  }, [])

  /* const updateCategories = async () => {
    try {
      allPostings.map((posting) => {
        if (!categories.includes(posting.category)) {
          categories.push(posting.category)
        }
      })
      console.log(categories)
    } catch (err) {}
  } */

  /* useEffect(() => {
    updateCategories()
  }, [allPostings]) */

  return (
    <div className='Search'>
      <input type='text' />
      <select
        name='categoryList'
        id='categoryList'
        onChange={(e) => setCategory(e.target.value)}
      >
        <option key='kaikki'>Kaikki osastot</option>
        {allPostings.map((posting, i) => (
          <option key={i}>{posting.category}</option>
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
            price={posting.price}
          />
        ))}
      </div>
    </div>
  )
}

export default Search
