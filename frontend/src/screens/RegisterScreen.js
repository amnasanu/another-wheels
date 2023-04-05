import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Loader from '../components/Loadar'
import Message from '../components/Messages'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userAction'
import './css/RegisterScreen.css';


function RegisterScreen({ history }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const location = useLocation()
  const dispatch = useDispatch()
  let navigate = useNavigate()

  const redirect = location.search ? location.search.split('=')[1] : '/'
  const userRegister = useSelector((state) => state.userRegister)

  const { loading, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type='name'
            placeholder='Enter Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            required
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='passwordConfirm'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            required
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' className='btn-block'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an account?{' '}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
            className='text-primary'
          >
            Sign In
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen

