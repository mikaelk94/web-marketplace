import React from 'react'
import Navbar from '../navbar/navbar'
import axios from 'axios'
import './post.css'
import '../../App.css'

function Post() {
    return(
      <div className='Site'> 
      <Navbar/>
       
       <div className='Newpost'>

        <div className='Postbox'>
            <div className='Post'>
            <h1>Luo uusi ilmoitus</h1>
            <h3>Otsikko:</h3>
            <input type='text' />
          </div>
          <div className='Category'>
          <h3>Valitse tuotteen kategoria:</h3>
          
          </div>
          <div className='Price'>
          <h3>Tuotteen hinta:</h3>
            <input type='text' />

          </div>
          <div className='Location'>
        <h3>Lisää sijainti:</h3>
        <input type='text' />
        </div>
        
        
        <div className='Image'>
        <h3>Lisää kuvia tuotteesta:</h3>

        </div>
         </div> 
          </div>
        </div>   
    )
}       

export default Post;