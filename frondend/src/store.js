import { configureStore, combineReducers } from "@reduxjs/toolkit";
import thunk from 'redux-thunk'
import { productListReducers, productDetailsReducer } from './reducers/productReducers'
import { cartReducers } from './reducers/cartReducers'


const reducer = combineReducers({
    productList :productListReducers,
    productDetails :productDetailsReducer,
    cart :cartReducers,
});
const initialState = {};


const middleware = [thunk];
 
const store = configureStore({
    reducer: reducer,
    preloadedState: initialState,
    middleware: middleware,
});

export default store
