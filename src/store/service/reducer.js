import {
    ADD_SERVICE_FAIL,
    ADD_SERVICE_SUCCESS,
    ADD_NEW_SERVICE,
    DELETE_SERVICE,
    DELETE_SERVICE_FAIL,
    DELETE_SERVICE_SUCCESS,
    GET_SERVICE,
    GET_SERVICE_FAIL,
    GET_SERVICE_SUCCESS,
    UPDATE_SERVICE,
    UPDATE_SERVICE_FAIL,
    UPDATE_SERVICE_SUCCESS
    } from './actionTypes'


    const INIT_STATE = {
        services: [],
        error: {},
        loading: true,
        btnLoad: false
    }

    const services = (state = INIT_STATE, action) => {
        switch (action.type) {

          case ADD_NEW_SERVICE:
            return {
              ...state,
              btnLoad: true
            }
      
          case UPDATE_SERVICE:
            return {
              ...state,
              btnLoad: true
            }
      
          case GET_SERVICE_SUCCESS:
            return {
              ...state,
              services: action.payload,
              loading: false,
              btnLoad: false
            }
            
          case GET_SERVICE_FAIL:
            return {
              ...state,
              error: action.payload,
              btnLoad: false
            }
      
          case ADD_SERVICE_SUCCESS:
            return {
              ...state,
              services: [action.payload, ...state.services],
              loading: true,
              btnLoad: false
            }
      
          case ADD_SERVICE_FAIL:
            return {
              ...state,
              error: action.payload,
              btnLoad: false
            }
    
          case UPDATE_SERVICE_SUCCESS:
            return {
              ...state,
              btnLoad: false,
              services: state.services.map(service =>
                service.id.toString() === action.payload.id.toString()
                  ? { service, ...action.payload }
                  : service
              ),
            }
      
          case UPDATE_SERVICE_FAIL:
            return {
              ...state,
              error: action.payload,
              btnLoad: false
            }
      
          case DELETE_SERVICE_SUCCESS:
            return {
              ...state,
              services: state.services.filter(
                service => service.id.toString() !== action.payload.toString()
              ),
            }
      
          case DELETE_SERVICE_FAIL:
            return {
              ...state,
              error: action.payload,
            }
      
          default:
            return state
        }
      }
      
      
      
      export default services
      

    