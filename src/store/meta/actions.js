import {
ADD_META_FAIL,
ADD_META_SUCCESS,
ADD_NEW_META,
DELETE_META,
DELETE_META_FAIL,
DELETE_META_SUCCESS,
GET_META,
GET_META_FAIL,
GET_META_SUCCESS,
UPDATE_META,
UPDATE_META_FAIL,
UPDATE_META_SUCCESS
} from './actionTypes'

export const getMetas = (id) => ({
    type: GET_META,
    id
  })
  
  export const getMetasSuccess = metas => ({
    type: GET_META_SUCCESS,
    payload: metas,
  })
  
  export const addNewMeta = meta => ({
    type: ADD_NEW_META,
    payload: meta,
  })
  
  export const addMetaSuccess = meta => ({
    type: ADD_META_SUCCESS,
    payload: meta,
  })
  
  export const addMetaFail = error => ({
    type: ADD_META_FAIL,
    payload: error,
  })
  
  export const getMetasFail = error => ({
    type: GET_META_FAIL,
    payload: error,
  })
  
  export const updateMeta = meta => ({
    type: UPDATE_META,
    payload: meta,
  })
  
  export const updateMetaSuccess = meta => ({
    type: UPDATE_META_SUCCESS,
    payload: meta,
  })
  
  export const updateMetaFail = error => ({
    type: UPDATE_META_FAIL,
    payload: error,
  })
  
  export const deleteMeta = meta => ({
    type: DELETE_META,
    payload: meta,
  })
  
  export const deleteMetaSuccess = meta => ({
    type: DELETE_META_SUCCESS,
    payload: meta,
  })
  
  export const deleteMetaFail = error => ({
    type: DELETE_META_FAIL,
    payload: error,
  })
  
