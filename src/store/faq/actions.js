import {
ADD_FAQ_FAIL,
ADD_FAQ_SUCCESS,
ADD_NEW_FAQ,
DELETE_FAQ,
DELETE_FAQ_FAIL,
DELETE_FAQ_SUCCESS,
GET_FAQ,
GET_FAQ_FAIL,
GET_FAQ_SUCCESS,
UPDATE_FAQ,
UPDATE_FAQ_FAIL,
UPDATE_FAQ_SUCCESS
} from './actionTypes'

export const getfaqs = (id) => ({
    type: GET_FAQ,
    id
  })
  
  export const getFaqsSuccess = plans => ({
    type: GET_FAQ_SUCCESS,
    payload: plans,
  })
  
  export const addNewFaq = plan => ({
    type: ADD_NEW_FAQ,
    payload: plan,
  })
  
  export const addFaqSuccess = plan => ({
    type: ADD_FAQ_SUCCESS,
    payload: plan,
  })
  
  export const addFaqFail = error => ({
    type: ADD_FAQ_FAIL,
    payload: error,
  })
  
  export const getFaqsFail = error => ({
    type: GET_FAQ_FAIL,
    payload: error,
  })
  
  export const updateFaq = plan => ({
    type: UPDATE_FAQ,
    payload: plan,
  })
  
  export const updateFaqSuccess = plan => ({
    type: UPDATE_FAQ_SUCCESS,
    payload: plan,
  })
  
  export const updateFaqFail = error => ({
    type: UPDATE_FAQ_FAIL,
    payload: error,
  })
  
  export const deleteFaq = plan => ({
    type: DELETE_FAQ,
    payload: plan,
  })
  
  export const deleteFaqSuccess = plan => ({
    type: DELETE_FAQ_SUCCESS,
    payload: plan,
  })
  
  export const deleteFaqFail = error => ({
    type: DELETE_FAQ_FAIL,
    payload: error,
  })
  
