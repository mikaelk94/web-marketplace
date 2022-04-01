import '../../App.css'
import Navbar from '../navbar/navbar'
import Search from '../search/Search'

function Home() {
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
