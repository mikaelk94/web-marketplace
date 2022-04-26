import '../../App.css'
import Nav_bar from '../navbar/navbar'
import Search from '../search/Search'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'

function Home() {
  const { setPostingCreated } = useContext(UserContext)

  useEffect(() => {
    setPostingCreated(false)
  }, [])

  return (
    <>
      <Nav_bar />
      <div>
        <h1 className='hero-header'>Osta & Myy</h1>
      </div>
      <Search />
    </>
  )
}

export default Home
