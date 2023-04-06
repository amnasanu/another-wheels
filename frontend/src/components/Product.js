import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
import './cssfiles/Product.css';




function Product({product}) {
  return (
    <Card className = "card my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
            <Card.Img className='productImage' src={product.image} />
        </Link>
        <Card.Body>
        <Link style={{textDecoration:"none"}} to={`/product/${product._id}`}>
            <Card.Title >
                <h4 >{product.name}</h4>
            </Card.Title>
        </Link>
        <Card.Text as="div">
            <div className = "my-3">
                {product.rating} from {product.numReviews} reviews
                <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
            </div>
        </Card.Text>
        <div className='prod-price' >
            <h2>₹ {product.price}</h2> 
        </div>
        </Card.Body>
    </Card>
  )
}


export default Product