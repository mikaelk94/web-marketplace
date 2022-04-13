import './productCard.css'

interface Props {
  title?: string
  location?: string
  image?: string
  price?: string
  btnDelete?: any
  btnEdit?: any
}

const ProductCard = (props: Props) => {
  const { title, location, image, price, btnDelete, btnEdit } = props
  const croppedImage = image?.replace('upload/', 'upload/c_fit,w_330,h_200/')

  return (
    <div className='product-card'>
      <div className='product-title'>
        {title}
        {btnEdit}
        {btnDelete}
      </div>
      <div className='product-location'>{location}</div>
      <div className='image-div'>
        <img src={croppedImage} />
      </div>
      <div className='product-price'>{price} €</div>
    </div>
  )
}

export default ProductCard
