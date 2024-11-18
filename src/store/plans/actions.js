import {
ADD_PLAN_FAIL,
ADD_PLAN_SUCCESS,
ADD_NEW_PLAN,
DELETE_PLAN,
DELETE_PLAN_FAIL,
DELETE_PLAN_SUCCESS,
GET_PLAN,
GET_PLAN_FAIL,
GET_PLAN_SUCCESS,
UPDATE_PLAN,
UPDATE_PLAN_FAIL,
UPDATE_PLAN_SUCCESS
} from './actionTypes'

export const getPlans = (id) => ({
    type: GET_PLAN,
    id
  })
  
  export const getPlansSuccess = plans => ({
    type: GET_PLAN_SUCCESS,
    payload: plans,
  })
  
  export const addNewPlan = plan => ({
    type: ADD_NEW_PLAN,
    payload: plan,
  })
  
  export const addPlanSuccess = plan => ({
    type: ADD_PLAN_SUCCESS,
    payload: plan,
  })
  
  export const addPlanFail = error => ({
    type: ADD_PLAN_FAIL,
    payload: error,
  })
  
  export const getPlansFail = error => ({
    type: GET_PLAN_FAIL,
    payload: error,
  })
  
  export const updatePlan = plan => ({
    type: UPDATE_PLAN,
    payload: plan,
  })
  
  export const updatePlanSuccess = plan => ({
    type: UPDATE_PLAN_SUCCESS,
    payload: plan,
  })
  
  export const updatePlanFail = error => ({
    type: UPDATE_PLAN_FAIL,
    payload: error,
  })
  
  export const deletePlan = plan => ({
    type: DELETE_PLAN,
    payload: plan,
  })
  
  export const deletePlanSuccess = plan => ({
    type: DELETE_PLAN_SUCCESS,
    payload: plan,
  })
  
  export const deletePlanFail = error => ({
    type: DELETE_PLAN_FAIL,
    payload: error,
  })
  
