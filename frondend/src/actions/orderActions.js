import axios from 'axios'

import { 
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,

 } from '../constants/orderConstants'


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


        
    }catch(error){
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload :error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })

    }
}
