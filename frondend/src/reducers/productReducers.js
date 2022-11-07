import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL } from '../constants/productConstants'
export const productListReducers=(state={product:[]}, action) =>{
    switch (action.type){

        case PRODUCT_LIST_REQUEST:
            console.log("INside the rpoduct list request")
            return {loading :true, products:[]}
        
        case PRODUCT_LIST_SUCCESS:
            console.log("Inside the list sucess page")
            return {loading:false,products:action.payload}
        
        case PRODUCT_LIST_FAIL:
            return {loading:false,error: action.payload}
        
        
        default:
            return state

    }

}