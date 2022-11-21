import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from 'redux-thunk'
import { productListReducers, productDetailsReducer } from './reducers/productReducers'
import { cartReducers } from './reducers/cartReducers'
import { userLoginReducers, userRegisterReducers, userDetailsReducers, userUpdateProfileReducers , userListReducer,userDeleteReducer } from './reducers/userReduser'
import { orderCreateReducer,orderDetailsReducer,orderPayReducer, orderListMyReducer  } from './reducers/orderReducers'

const reducer = combineReducers({
    productList :productListReducers,
    productDetails :productDetailsReducer,
    cart :cartReducers,
    userLogin : userLoginReducers,
    userRegister : userRegisterReducers,
    userDetails :userDetailsReducers,
    userUpdateProfile : userUpdateProfileReducers,
    orderCreate :orderCreateReducer,
    orderDetails :orderDetailsReducer,
    orderPay : orderPayReducer,
    orderListMy :orderListMyReducer,
    userList : userListReducer,
    userDelete :userDeleteReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
        JSON.parse(localStorage.getItem('cartItems')) :[]


const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
    JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: {
        cartItems : cartItemsFromStorage,
        shippingAddress : shippingAddressFromStorage
    },
    userLogin :{userInfo :userInfoFromStorage}
};




const middleware = [thunk];
 
const store = configureStore({
    reducer: reducer,
    preloadedState: initialState,
    middleware: middleware,
});

export default store
