import '../../App.css'
import Navbar from '../navbar/navbar'
import Search from '../search/Search'

function Home() {
  return (
    <div className='App'>
      <Navbar />
      <div>
        <h1 className='hero-header'>Slogan tähän</h1>
      </div>
      <Search />
    </div>
  )
}

export default Home
