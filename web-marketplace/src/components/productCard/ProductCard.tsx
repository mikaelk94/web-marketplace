import React from 'react'
import './productCard.css'

interface Props {
  title?: string
  location?: string
  image?: string
  price?: string
}

const ProductCard = (props: Props) => {
  const { title, location, image, price } = props
  return (
    <div className='product-card'>
      <div className='product-title'>{title}</div>
      <div className='product-location'>{location}</div>
      <div className='image-div'>
        <img src={image} className='product-image' />
      </div>
      <div className='product-price'>{price} €</div>
    </div>
  )
}

export default ProductCard
