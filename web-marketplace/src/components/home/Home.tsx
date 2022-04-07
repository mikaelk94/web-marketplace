import '../../App.css'
import Navbar from '../navbar/navbar'
import Search from '../search/Search'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../UserContext'

function Home() {
  const { setPostingCreated } = useContext(UserContext)

  useEffect(() => {
    setPostingCreated(false)
  }, [])

  return (
    <>
      <Navbar />
      <div>
        <h1 className='hero-header'>Slogan tähän</h1>
      </div>
      <Search />
    </>
  )
}

export default Home
