import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from 'redux-thunk'
import { productListReducers, productDetailsReducer } from './reducers/productReducers'
import { cartReducers } from './reducers/cartReducers'
import { userLoginReducers, userRegisterReducers, userDetailsReducers } from './reducers/userReduser'


const reducer = combineReducers({
    productList :productListReducers,
    productDetails :productDetailsReducer,
    cart :cartReducers,
    userLogin : userLoginReducers,
    userRegister : userRegisterReducers,
    userDetails :userDetailsReducers,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ?
        JSON.parse(localStorage.getItem('cartItems')) :[]


const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart: {cartItems : cartItemsFromStorage},
    userLogin :{userInfo :userInfoFromStorage}
};




const middleware = [thunk];
 
const store = configureStore({
    reducer: reducer,
    preloadedState: initialState,
    middleware: middleware,
});

export default store
