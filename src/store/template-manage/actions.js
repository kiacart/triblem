import {
ADD_TEMPLATELIBRARY_FAIL,
ADD_TEMPLATELIBRARY_SUCCESS,
ADD_NEW_TEMPLATELIBRARY,
DELETE_TEMPLATELIBRARY,
DELETE_TEMPLATELIBRARY_FAIL,
DELETE_TEMPLATELIBRARY_SUCCESS,
GET_TEMPLATELIBRARY,
GET_TEMPLATELIBRARY_FAIL,
GET_TEMPLATELIBRARY_SUCCESS,
UPDATE_TEMPLATELIBRARY,
UPDATE_TEMPLATELIBRARY_FAIL,
UPDATE_TEMPLATELIBRARY_SUCCESS,
ADD_LIBRARY_CATEGORY_FAIL,
ADD_LIBRARY_CATEGORY_SUCCESS,
ADD_NEW_LIBRARY_CATEGORY,
DELETE_LIBRARY_CATEGORY,
DELETE_LIBRARY_CATEGORY_FAIL,
DELETE_LIBRARY_CATEGORY_SUCCESS,
GET_LIBRARY_CATEGORY,
GET_LIBRARY_CATEGORY_FAIL,
GET_LIBRARY_CATEGORY_SUCCESS,
UPDATE_LIBRARY_CATEGORY,
UPDATE_LIBRARY_CATEGORY_FAIL,
UPDATE_LIBRARY_CATEGORY_SUCCESS
} from './actionTypes'

// Template Library
export const getTemplateLibrary = (id) => ({
    type: GET_TEMPLATELIBRARY,
    id
  })
  
  export const getTemplateLibrarySuccess = temp => ({
    type: GET_TEMPLATELIBRARY_SUCCESS,
    payload: temp,
  })
  
  export const addNewTemplateLibrary = temp => ({
    type: ADD_NEW_TEMPLATELIBRARY,
    payload: temp,
  })
  
  export const addTemplateLibrarySuccess = temp => ({
    type: ADD_TEMPLATELIBRARY_SUCCESS,
    payload: temp,
  })
  
  export const addTemplateLibraryFail = error => ({
    type: ADD_TEMPLATELIBRARY_FAIL,
    payload: error,
  })
  
  export const getTemplateLibraryFail = error => ({
    type: GET_TEMPLATELIBRARY_FAIL,
    payload: error,
  })
  
  export const updateTemplateLibrary = temp => ({
    type: UPDATE_TEMPLATELIBRARY,
    payload: temp,
  })
  
  export const updateTemplateLibrarySuccess = temp => ({
    type: UPDATE_TEMPLATELIBRARY_SUCCESS,
    payload: temp,
  })
  
  export const updateTemplateLibraryFail = error => ({
    type: UPDATE_TEMPLATELIBRARY_FAIL,
    payload: error,
  })
  
  export const deleteTemplateLibrary = temp => ({
    type: DELETE_TEMPLATELIBRARY,
    payload: temp,
  })
  
  export const deleteTemplateLibrarySuccess = temp => ({
    type: DELETE_TEMPLATELIBRARY_SUCCESS,
    payload: temp,
  })
  
  export const deleteTemplateLibraryFail = error => ({
    type: DELETE_TEMPLATELIBRARY_FAIL,
    payload: error,
  })
  

  // Library Categories 

  export const getCategoryl = (id) => ({
    type: GET_LIBRARY_CATEGORY,
    id
  })
  
  export const getCategorylSuccess = category => ({
    type: GET_LIBRARY_CATEGORY_SUCCESS,
    payload: category,
  })
  
  export const addNewCategoryl = category => ({
    type: ADD_NEW_LIBRARY_CATEGORY,
    payload: category,
  })
  
  export const addCategorylSuccess = category => ({
    type: ADD_LIBRARY_CATEGORY_SUCCESS,
    payload: category,
  })
  
  export const addCategorylFail = error => ({
    type: ADD_LIBRARY_CATEGORY_FAIL,
    payload: error,
  })
  
  export const getCategorylFail = error => ({
    type: GET_LIBRARY_CATEGORY_FAIL,
    payload: error,
  })
  
  export const updateCategoryl = category => ({
    type: UPDATE_LIBRARY_CATEGORY,
    payload: category,
  })
  
  export const updateCategorylSuccess = category => ({
    type: UPDATE_LIBRARY_CATEGORY_SUCCESS,
    payload: category,
  })
  
  export const updateCategorylFail = error => ({
    type: UPDATE_LIBRARY_CATEGORY_FAIL,
    payload: error,
  })
  
  export const deleteCategoryl = category => ({
    type: DELETE_LIBRARY_CATEGORY,
    payload: category,
  })
  
  export const deleteCategorylSuccess = category => ({
    type: DELETE_LIBRARY_CATEGORY_SUCCESS,
    payload: category,
  })
  
  export const deleteCategorylFail = error => ({
    type: DELETE_LIBRARY_CATEGORY_FAIL,
    payload: error,
  })


