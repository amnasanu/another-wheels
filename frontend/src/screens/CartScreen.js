import React, { useEffect } from 'react'
import { Link, useSearchParams, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Messages'
import { addToCart, removeFromCart } from '../actions/cartActions'


function CartScreen({ location, history }) {
  const match = useParams()
  let navigate = useNavigate()
  const productID = match.id
  const [searchParams, setSearchParams] = useSearchParams()
  const qty = searchParams.get('qty')



  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty))
    }
  }, [dispatch, productID, qty])

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping')
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant='info'>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.product} className="cart-wrap">
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3} className="wrap-con">
                    <Link className='pro-name' to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2} className="wrap-con">
                    <div className='pro-name'>
                    Rs:{item.price}
                     </div>
                  </Col>
                  <Col md={3} className="wrap-con">
                    <Form.Control
                    className="cart-count"
                      as="select"
                      value={item.qty}
                      onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}
                    >
                      {
                        [...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))
                      }

                    </Form.Control>
                  </Col>
                  <Col md={1} className="wrap-con">
                    <Button className="cart-count" type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                      <i className='fas fa-trash'></i>

                    </Button>
                  </Col>
                </Row>

              </ListGroup.Item>
            ))}

          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}) items</h2>
              Rs: {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="button-wrap">
                <Button type='button' className='btn-block' disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout

                </Button>
              </div>

            </ListGroup.Item>

          </ListGroup>
        </Card>

      </Col>

    </Row>

  )
}

export default CartScreen