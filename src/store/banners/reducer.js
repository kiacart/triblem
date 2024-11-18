import {
    ADD_BANNER_FAIL,
    ADD_BANNER_SUCCESS,
    ADD_NEW_BANNER,
    DELETE_BANNER,
    DELETE_BANNER_FAIL,
    DELETE_BANNER_SUCCESS,
    GET_BANNER,
    GET_BANNER_FAIL,
    GET_BANNER_SUCCESS,
    UPDATE_BANNER,
    UPDATE_BANNER_FAIL,
    UPDATE_BANNER_SUCCESS
    } from './actionTypes'


    const INIT_STATE = {
        banners: [],
        error: {},
        loading: true,
        btnLoad: false
    }

    const banners = (state = INIT_STATE, action) => {
        switch (action.type) {
          case ADD_NEW_BANNER : 
          return {
            ...state,
            btnLoad : true
          }
          case GET_BANNER_SUCCESS:
            return {
              ...state,
              banners: action.payload,
              loading: false,
              btnLoad : false
            }
            
          case GET_BANNER_FAIL:
            return {
              ...state,
              error: action.payload,
              btnLoad : false
            }
      
          case ADD_BANNER_SUCCESS:
            return {
              ...state,
              banners: [action.payload, ...state.banners],
              loading: true,
              btnLoad : false
            }
      
          case ADD_BANNER_FAIL:
            return {
              ...state,
              error: action.payload,
              btnLoad : false
            }
    
          case UPDATE_BANNER_SUCCESS:
            return {
              ...state,
              banners: state.banners.map(banner =>
                banner.id.toString() === action.payload.id.toString()
                  ? { banner, ...action.payload }
                  : banner
              ),
            }
      
          case UPDATE_BANNER_FAIL:
            return {
              ...state,
              error: action.payload,
            }
      
          case DELETE_BANNER_SUCCESS:
            return {
              ...state,
              banners: state.banners.filter(
                banner => banner.id.toString() !== action.payload.toString()
              ),
            }
      
          case DELETE_BANNER_FAIL:
            return {
              ...state,
              error: action.payload,
            }
      
          default:
            return state
        }
      }
      
      
      
      export default banners
      

    