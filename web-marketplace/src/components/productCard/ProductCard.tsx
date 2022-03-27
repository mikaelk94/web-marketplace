import React from 'react'
import './productCard.css'

interface Props {
  price?: string
  location?: string
  title?: string
}

const ProductCard = (props: Props) => {
  return (
    <div className='product-card'>
      <h3>{props.title}</h3>
      <div>{props.location}</div>
      <div>{props.price}</div>
    </div>
  )
}

export default ProductCard
