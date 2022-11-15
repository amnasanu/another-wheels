import React, { useEffect } from 'react'
import { Link,useSearchParams,   useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import  Message  from '../components/Messages'
import { addToCart } from '../actions/cartActions'
 
 
function CartScreen(location) 
{
  const match = useParams()
  let navigate = useNavigate()
  const productID = match.id
  const [searchParams,setSearchParams]=useSearchParams()
  const qty=searchParams.get('qty')

 
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart
  console.log(cartItems)

  useEffect(() => {
    if(productID) {
      dispatch(addToCart(productID, qty))
    }
  }, [dispatch, productID, qty])
 
  return (
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
        </Col>
        <Col md={4}>
          {cartItems.length===0 ? (
            <Message variant = 'info'>
              {console.log(cartItems)}
              Your cart is empty
            </Message>
          ):(
            <ListGroup variant='flush'>

            </ListGroup>
          )}
        </Col>
          
      </Row>
     
  )
}
 
export default CartScreen