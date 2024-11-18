import {
    GET_BROADCAST,
    GET_BROADCAST_FAIL,
    GET_BROADCAST_SUCCESS,
    GET_BROADCAST_DETAIL,
    UPDATE_BROADCAST,
    UPDATE_BROADCAST_SUCCESS,
    UPDATE_BROADCAST_FAIL,
    DELETE_BROADCAST,
    DELETE_BROADCAST_SUCCESS,
    DELETE_BROADCAST_FAIL,
    GET_BROADCAST_DETAIL_FAIL,
    GET_BROADCAST_DETAIL_SUCCESS,
    ADD_NEW_BROADCAST,
    ADD_BROADCAST_FAIL,
    ADD_BROADCAST_SUCCESS
  } from "./actionTypes"

  export const addNewBroadcast = (broadcast, history) => ({
    type: ADD_NEW_BROADCAST,
    payload: {broadcast, history},
  })
  
  export const addBroadcastSuccess = broadcast => ({
    type: ADD_BROADCAST_SUCCESS,
    payload: broadcast,
  })
  
  export const addBroadcastFail = error => ({
    type: ADD_BROADCAST_FAIL,
    payload: error,
  })
  
  export const getBroadcast = (id) => ({
    type: GET_BROADCAST
  })
  
  export const getBroadcastSuccess = broadcast => ({
    type: GET_BROADCAST_SUCCESS,
    payload: broadcast,
  })
  
  export const updateBroadcast = broadcast => ({
    type: UPDATE_BROADCAST,
    payload: broadcast,
  })
  
  export const updateBroadcastSuccess = broadcast => ({
    type: UPDATE_BROADCAST_SUCCESS,
    payload: broadcast,
  })
  
  export const updateBroadcastFail = error => ({
    type: UPDATE_BROADCAST_FAIL,
    payload: error,
  })
  
  export const deleteBroadcast = broadcast => ({
    type: DELETE_BROADCAST,
    payload: broadcast,
  })
  
  export const deleteBroadcastSuccess = broadcast => ({
    type: DELETE_BROADCAST_SUCCESS,
    payload: broadcast,
  })
  
  export const deleteBroadcastFail = error => ({
    type: DELETE_BROADCAST_FAIL,
    payload: error,
  })
  
  export const getBroadcastsFail = error => ({
    type: GET_BROADCAST_FAIL,
    payload: error,
  })
  
  export const getBroadcastDetail = broadcastId => ({
    type: GET_BROADCAST_DETAIL,
    broadcastId,
  })
  
  export const getBroadcastDetailSuccess = broadcastDetails => ({
    type: GET_BROADCAST_DETAIL_SUCCESS,
    payload: broadcastDetails,
  })
  
  export const getBroadcastDetailFail = error => ({
    type: GET_BROADCAST_DETAIL_FAIL,
    payload: error,
  })
  