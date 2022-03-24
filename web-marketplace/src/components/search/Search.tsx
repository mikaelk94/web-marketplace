import { useState, useEffect } from 'react'
import './search.css'
import axios, { AxiosInstance } from 'axios'

interface Posting {
  posting?: string
  category: string
}

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
})

const Search = () => {
  const [allPostings, setAllPostings] = useState<Array<Posting>>([])
  const [postings, setPostings] = useState<Array<Posting>>([])
  const [category, setCategory] = useState('')
  /* const [categories, setCategories] = useState<Array<string>>([]) */

  const getPostings = async () => {
    try {
      if (category === 'Kaikki osastot' || category === '') {
        const response = await instance.get('/postings')
        setAllPostings(response.data)
        console.log(response.data)
      } else {
        const response = await instance.get('/postings', {
          params: { category: category },
        })
        setPostings(response.data)
        console.log(response.data)
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
    </div>
  )
}

export default Search
