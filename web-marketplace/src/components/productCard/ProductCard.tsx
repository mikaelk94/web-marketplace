import './productCard.css'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

interface Props {
  posting?: {
    title?: string
    description?: string
    category?: string
    location?: string
    images?: string[]
    price?: string
  }
  title?: string
  location?: string
  image?: string
  price?: string
  btnDelete?: any
  btnEdit?: any
}

const ProductCard = (props: Props) => {
  const { title, location, image, price, btnDelete, btnEdit, posting } = props
  const croppedImage = image?.replace('upload/', 'upload/c_fit,w_330,h_200/')

  return (
    <Card className='product-card'>
      <div className='product-title'>
        {title}
        {btnEdit}
        {btnDelete}
      </div>
      <div className='product-location'>{location}</div>
      <Link
        className='image-div'
        to='/product'
        state={{
          props: posting,
          from: '/',
        }}
      >
        <img src={croppedImage} />
      </Link>
      <div className='product-price'>{price} €</div>
    </Card>
  )
}

export default ProductCard
