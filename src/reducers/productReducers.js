import {PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL

} from '../constants/productConstants'

export const productListReducer = (state = { products : []}, action) => {
      
      switch (action.type) {
            case PRODUCT_LIST_REQUEST :
                return {loading : true}
            case PRODUCT_LIST_SUCCESS : 
                 return { 
                      loading:false,
                      products:action.payload.products, 
                      pages : action.payload.pages,
                      page : action.payload.page,
                    }
            case PRODUCT_LIST_FAIL :
                  return {loading : false, error : action.payload}
            default :
              return state
      }
}

// in order to use this reducer we have to add this reducer in the store 
// import this file in store file 

// in product screen we get only one product so initial state product is empty object
export const productDetailsReducer = (state = {product : { reviews: []}}, action) => {

      switch(action.type) {
          case PRODUCT_DETAILS_REQUEST: 
          //it will go to productActions file and action.type to type as PRODUCT_LIST_REQUEST
              return { loading : true , ...state }
  
          case PRODUCT_DETAILS_SUCCESS : 
              return {loading : false, product : action.payload }
          
          case PRODUCT_DETAILS_FAIL : 
              return {  loading : false , error : action.payload } 
          default :
              return state
      }
  
  }