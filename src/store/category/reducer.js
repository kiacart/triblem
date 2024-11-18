import {
    ADD_CATEGORY_FAIL,
    ADD_CATEGORY_SUCCESS,
    ADD_NEW_CATEGORY,
    DELETE_CATEGORY,
    DELETE_CATEGORY_FAIL,
    DELETE_CATEGORY_SUCCESS,
    GET_CATEGORY,
    GET_CATEGORY_FAIL,
    GET_CATEGORY_SUCCESS,
    UPDATE_CATEGORY,
    UPDATE_CATEGORY_FAIL,
    UPDATE_CATEGORY_SUCCESS
    } from './actionTypes'


    const INIT_STATE = {
        categories: [],
        error: {},
        loading: true,
    }

    const categories = (state = INIT_STATE, action) => {
        switch (action.type) {
      
          case GET_CATEGORY_SUCCESS:
            return {
              ...state,
              categories: action.payload,
              loading: true
            }
            
          case GET_CATEGORY_FAIL:
            return {
              ...state,
              error: action.payload,
            }
      
          case ADD_CATEGORY_SUCCESS:
            return {
              ...state,
              categories: [action.payload, ...state.categories],
              loading: true
            }
      
          case ADD_CATEGORY_FAIL:
            return {
              ...state,
              error: action.payload,
            }
    
          case UPDATE_CATEGORY_SUCCESS:
            return {
              ...state,
              categories: state.categories.map(category =>
                category.id.toString() === action.payload.id.toString()
                  ? { category, ...action.payload }
                  : category
              ),
            }
      
          case UPDATE_CATEGORY_FAIL:
            return {
              ...state,
              error: action.payload,
            }
      
          case DELETE_CATEGORY_SUCCESS:
            return {
              ...state,
              categories: state.categories.filter(
                category => category.id.toString() !== action.payload.toString()
              ),
            }
      
          case DELETE_CATEGORY_FAIL:
            return {
              ...state,
              error: action.payload,
            }
      
          default:
            return state
        }
      }
      
      
      
      export default categories
      

    