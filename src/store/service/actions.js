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

export const getServices = (id) => ({
    type: GET_SERVICE,
    id
  })
  
  export const getServicesSuccess = services => ({
    type: GET_SERVICE_SUCCESS,
    payload: services,
  })
  
  export const addNewService = service => ({
    type: ADD_NEW_SERVICE,
    payload: service,
  })
  
  export const addServiceSuccess = service => ({
    type: ADD_SERVICE_SUCCESS,
    payload: service,
  })
  
  export const addServiceFail = error => ({
    type: ADD_SERVICE_FAIL,
    payload: error,
  })
  
  export const getServicesFail = error => ({
    type: GET_SERVICE_FAIL,
    payload: error,
  })
  
  export const updateService = service => ({
    type: UPDATE_SERVICE,
    payload: service,
  })
  
  export const updateServiceSuccess = service => ({
    type: UPDATE_SERVICE_SUCCESS,
    payload: service,
  })
  
  export const updateServiceFail = error => ({
    type: UPDATE_SERVICE_FAIL,
    payload: error,
  })
  
  export const deleteService = service => ({
    type: DELETE_SERVICE,
    payload: service,
  })
  
  export const deleteServiceSuccess = service => ({
    type: DELETE_SERVICE_SUCCESS,
    payload: service,
  })
  
  export const deleteServiceFail = error => ({
    type: DELETE_SERVICE_FAIL,
    payload: error,
  })
  
