import React from 'react'
import './productCard.css'

interface Props {
  price?: string
  location?: string
  title?: string
  image?: string
}

const ProductCard = (props: Props) => {
  return (
    <div className='product-card'>
      <div className='product-title'>{props.title}</div>
      <div className='product-location'>{props.location}</div>
      <div className='image-div'>
        <img src={props.image} className='product-image' />
      </div>
      <div className='product-price'>{props.price} €</div>
    </div>
  )
}

export default ProductCard
