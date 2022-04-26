import './product.css'
import Nav_bar from '../navbar/navbar'
import { useLocation } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'

const Product = () => {
  const previousLocation: any = useLocation()
  const { props } = previousLocation.state
  const { title, description, location, images, price, contactInfo } = props
  const { firstName, lastName, phoneNum, email } = contactInfo

  return (
    <>
      <Nav_bar />
      <div className='product-div'>
        {images.length !== 0 && (
          <Carousel variant='dark'>
            {images.map((image: string, i: number) => (
              <Carousel.Item className='mb-4' key={i}>
                <img
                  className='img'
                  src={image.replace('upload/', 'upload/c_fit/')}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        )}
        <h5 className='title'>
          {title} <span className='price'>{price} €</span>
        </h5>
        <div className='description-title'>Kuvaus</div>
        <div className='description'>{description}</div>
      </div>
      <div className='product-div mt-2'>
        <div className='seller-title'>Lisätiedot </div>
        <span className='contact-info'>
          Myyjä
          <span>
            {firstName} {lastName}
          </span>
        </span>
        <span className='contact-info'>
          Puhelin <span>{phoneNum}</span>
        </span>
        <span className='contact-info'>
          Sähköposti <span className='email'>{email}</span>
        </span>
        <span className='contact-info'>
          Sijainti <span>{location}</span>
        </span>
      </div>
    </>
  )
}

export default Product
