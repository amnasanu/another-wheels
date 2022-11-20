import axios from 'axios'

import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,

    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,

 } from '../constants/orderConstants'

 import { CART_CLEAR_ITEMS } from '../constants/cartConstants'


 export const createOrder=(order) => async (dispatch, getState)=>{

    try {
        dispatch({
            type :ORDER_CREATE_REQUEST
        })

        const{
            userLogin : { userInfo },
        } = getState()


        const { data } = await axios
        .create({
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json',
          },
        })
        .post(`/api/orders/add/`,order)

        
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload :data
        })

        dispatch({
            type: CART_CLEAR_ITEMS,
            payload :data
        })

        localStorage.removeItem('cartItems')

        
    }catch(error){
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload :error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })

    }
}


export const getOrderDetails=(id, paymentResult) => async (dispatch, getState)=>{

    try {
        dispatch({
            type :ORDER_DETAILS_REQUEST
        })

        const{
            userLogin : { userInfo },
        } = getState()


        const { data } = await axios
        .create({
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json',
          },
        })
        .get(`/api/orders/${id}/`)

        
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload :data
        })


        
    }catch(error){
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload :error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })

    }
}

export const payOrder=(id, paymentResult) => async (dispatch, getState)=>{

    try {
        dispatch({
            type :ORDER_PAY_REQUEST
        })

        const{
            userLogin : { userInfo },
        } = getState()


        const { data } = await axios
        .create({
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'application/json',
          },
        })
        .put(`/api/orders/${id}/pay/`,paymentResult)

        
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload :data
        })


        
    }catch(error){
        dispatch({
            type: ORDER_PAY_FAIL,
            payload :error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })

    }
}
