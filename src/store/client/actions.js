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
UPDATE_CLIENT_SUCCESS
} from './actionTypes'

export const getClients = (id) => ({
    type: GET_CLIENT,
    id
  })
  
  export const getClientsSuccess = banners => ({
    type: GET_CLIENT_SUCCESS,
    payload: banners,
  })
  
  export const addNewClient = banner => ({
    type: ADD_NEW_CLIENT,
    payload: banner,
  })
  
  export const addClientSuccess = banner => ({
    type: ADD_CLIENT_SUCCESS,
    payload: banner,
  })
  
  export const addClientFail = error => ({
    type: ADD_CLIENT_FAIL,
    payload: error,
  })
  
  export const getClientsFail = error => ({
    type: GET_CLIENT_FAIL,
    payload: error,
  })
  
  export const updateClient = banner => ({
    type: UPDATE_CLIENT,
    payload: banner,
  })
  
  export const updateClientSuccess = banner => ({
    type: UPDATE_CLIENT_SUCCESS,
    payload: banner,
  })
  
  export const updateClientFail = error => ({
    type: UPDATE_CLIENT_FAIL,
    payload: error,
  })
  
  export const deleteClient = banner => ({
    type: DELETE_CLIENT,
    payload: banner,
  })
  
  export const deleteClientSuccess = banner => ({
    type: DELETE_CLIENT_SUCCESS,
    payload: banner,
  })
  
  export const deleteClientFail = error => ({
    type: DELETE_CLIENT_FAIL,
    payload: error,
  })
  
