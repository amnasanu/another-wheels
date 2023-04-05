import React, {useState, useEffect} from 'react';
import { Link, useLocation ,useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import Loader from '../components/Loadar';
import Message from '../components/Messages';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userAction';

import './css/LoginScreen.css';

function LoginScreen({ history}) {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const location = useLocation() 
    const dispatch = useDispatch()
    let navigate = useNavigate()

    const redirect = location.search ? location.search.split('=')[1] :'/'
    const userLogin = useSelector(state => state.userLogin)

    const {error , loading , userInfo} = userLogin

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[history, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
    
  return (
    <div className="login-container">
      <Card className="login-card">
        <h2 className="text-center">Sign In</h2>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader/>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className="login-button">Sign In</Button>
        </Form>
        <Row className='py-3'>
          <Col>
            New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
          </Col>
        </Row>
      </Card>
    </div>
  )
}

export default LoginScreen;
