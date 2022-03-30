import './search.css'
import '../productCard/productCard.css'
import { useState, useEffect } from 'react'
import axios, { AxiosInstance } from 'axios'
import ProductCard from '../productCard/ProductCard'

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

const instance: AxiosInstance = axios.create({
  baseURL: 'https://verkkokauppa-api.herokuapp.com/',
})

const Search = () => {
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
      // Haetaan kaikki postaukset
      if (category === 'Kaikki osastot') {
        const response = await instance.get('/postings')
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
        const response = await instance.get('/postings', {
          params: { category: category },
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
  )
}

export default Search
