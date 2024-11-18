import {
ADD_DEMO_FAIL,
ADD_DEMO_SUCCESS,
ADD_NEW_DEMO,
DELETE_DEMO,
DELETE_DEMO_FAIL,
DELETE_DEMO_SUCCESS,
GET_DEMO,
GET_DEMO_FAIL,
GET_DEMO_SUCCESS,
UPDATE_DEMO,
UPDATE_DEMO_FAIL,
UPDATE_DEMO_SUCCESS
} from './actionTypes'

export const getDemos = (id) => ({
    type: GET_DEMO,
    id
  })
  
  export const getDemosSuccess = demos => ({
    type: GET_DEMO_SUCCESS,
    payload: demos,
  })
  
  export const addNewDemo = demo => ({
    type: ADD_NEW_DEMO,
    payload: demo,
  })
  
  export const addDemoSuccess = demo => ({
    type: ADD_DEMO_SUCCESS,
    payload: demo,
  })
  
  export const addDemoFail = error => ({
    type: ADD_DEMO_FAIL,
    payload: error,
  })
  
  export const getDemosFail = error => ({
    type: GET_DEMO_FAIL,
    payload: error,
  })
  
  export const updateDemo = demo => ({
    type: UPDATE_DEMO,
    payload: demo,
  })
  
  export const updateDemoSuccess = demo => ({
    type: UPDATE_DEMO_SUCCESS,
    payload: demo,
  })
  
  export const updateDemoFail = error => ({
    type: UPDATE_DEMO_FAIL,
    payload: error,
  })
  
  export const deleteDemo = demo => ({
    type: DELETE_DEMO,
    payload: demo,
  })
  
  export const deleteDemoSuccess = demo => ({
    type: DELETE_DEMO_SUCCESS,
    payload: demo,
  })
  
  export const deleteDemoFail = error => ({
    type: DELETE_DEMO_FAIL,
    payload: error,
  })
  
