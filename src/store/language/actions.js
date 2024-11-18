import {
ADD_LANGUAGE_FAIL,
ADD_LANGUAGE_SUCCESS,
ADD_NEW_LANGUAGE,
DELETE_LANGUAGE,
DELETE_LANGUAGE_FAIL,
DELETE_LANGUAGE_SUCCESS,
GET_LANGUAGE,
GET_LANGUAGE_FAIL,
GET_LANGUAGE_SUCCESS,
UPDATE_LANGUAGE,
UPDATE_LANGUAGE_FAIL,
UPDATE_LANGUAGE_SUCCESS
} from './actionTypes'

export const getLanguage = () => ({
    type: GET_LANGUAGE,
  })
  
  export const getLanguageSuccess = language => ({
    type: GET_LANGUAGE_SUCCESS,
    payload: language,
  })
  
  export const addNewLanguage = language => ({
    type: ADD_NEW_LANGUAGE,
    payload: language,
  })
  
  export const addLanguageSuccess = language => ({
    type: ADD_LANGUAGE_SUCCESS,
    payload: language,
  })
  
  export const addLanguageFail = error => ({
    type: ADD_LANGUAGE_FAIL,
    payload: error,
  })
  
  export const getLanguageFail = error => ({
    type: GET_LANGUAGE_FAIL,
    payload: error,
  })
  
  export const updateLanguage = language => ({
    type: UPDATE_LANGUAGE,
    payload: language,
  })
  
  export const updateLanguageSuccess = language => ({
    type: UPDATE_LANGUAGE_SUCCESS,
    payload: language,
  })
  
  export const updateLanguageFail = error => ({
    type: UPDATE_LANGUAGE_FAIL,
    payload: error,
  })
  
  export const deleteLanguage = language => ({
    type: DELETE_LANGUAGE,
    payload: language,
  })
  
  export const deleteLanguageSuccess = language => ({
    type: DELETE_LANGUAGE_SUCCESS,
    payload: language,
  })
  
  export const deleteLanguageFail = error => ({
    type: DELETE_LANGUAGE_FAIL,
    payload: error,
  })
  
