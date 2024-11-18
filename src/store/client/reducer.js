import {
    ADD_CLIENT_FAIL,
    ADD_CLIENT_SUCCESS,
    ADD_NEW_CLIENT,
    DELETE_CLIENT,
    DELETE_CLIENT_FAIL,
    DELETE_CLIENT_SUCCESS,
    GET_CLIENT,
    GET_CLIENT_FAIL,
    GET_CLIENT_SUCCESS,
    UPDATE_CLIENT,
    UPDATE_CLIENT_FAIL,
    UPDATE_CLIENT_SUCCESS,
    } from './actionTypes'


    const INIT_STATE = {
        clients: [],
        error: {},
        loading: true,
        btnLoad : false
    }

    const clients = (state = INIT_STATE, action) => {
        switch (action.type) {
          
          case ADD_NEW_CLIENT : 
          return {
            ...state,
            btnLoad : true
          }
      
          case GET_CLIENT_SUCCESS:
            return {
              ...state,
              clients: action.payload,
              loading: false,
              btnLoad : false
              
            }
            
          case GET_CLIENT_FAIL:
            return {
              ...state,
              error: action.payload,
              btnLoad : false
            }
      
          case ADD_CLIENT_SUCCESS:
            return {
              ...state,
              clients: [action.payload, ...state.clients],
              loading: true,
              btnLoad : false
            }
      
          case ADD_CLIENT_FAIL:
            return {
              ...state,
              error: action.payload,
              btnLoad : false
            }
    
          case UPDATE_CLIENT_SUCCESS:
            return {
              ...state,
              clients: state.clients.map(client =>
                client.id.toString() === action.payload.id.toString()
                  ? { client, ...action.payload }
                  : client
              ),
            }
      
          case UPDATE_CLIENT_FAIL:
            return {
              ...state,
              error: action.payload,
            }
      
          case DELETE_CLIENT_SUCCESS:
            return {
              ...state,
              clients: state.clients.filter(
                client => client.id.toString() !== action.payload.toString()
              ),
            }
      
          case DELETE_CLIENT_FAIL:
            return {
              ...state,
              error: action.payload,
            }
      
          default:
            return state
        }
      }
      
      
      
      export default clients
      

    