import {
    GET_TEMPLATES,
    GET_TEMPLATES_FAIL,
    GET_TEMPLATES_SUCCESS,
    GET_TEMPLATES_DETAIL,
    UPDATE_TEMPLATES,
    UPDATE_TEMPLATES_SUCCESS,
    UPDATE_TEMPLATES_FAIL,
    DELETE_TEMPLATES,
    DELETE_TEMPLATES_SUCCESS,
    DELETE_TEMPLATES_FAIL,
    GET_TEMPLATES_DETAIL_FAIL,
    GET_TEMPLATES_DETAIL_SUCCESS,
    ADD_NEW_TEMPLATES,
    ADD_TEMPLATES_FAIL,
    ADD_TEMPLATES_SUCCESS
  } from "./actionTypes"

  export const addNewTemplate = (templates, history) => ({
    type: ADD_NEW_TEMPLATES,
    payload: {templates, history},
  })
  
  export const addTemplateSuccess = templates => ({
    type: ADD_TEMPLATES_SUCCESS,
    payload: templates,
  })
  
  export const addTempFail = error => ({
    type: ADD_TEMPLATES_FAIL,
    payload: error,
  })
  
  export const getTemplate = (id) => ({
    type: GET_TEMPLATES,
    id
  })
  
  export const getTemplateSuccess = template => ({
    type: GET_TEMPLATES_SUCCESS,
    payload: template,
  })
  
  export const updateTemplate = template => ({
    type: UPDATE_TEMPLATES,
    payload: template,
  })
  
  export const updateTemplateSuccess = template => ({
    type: UPDATE_TEMPLATES_SUCCESS,
    payload: template,
  })
  
  export const updateTemplateFail = error => ({
    type: UPDATE_TEMPLATES_FAIL,
    payload: error,
  })
  
  export const deleteTemplate = template => ({
    type: DELETE_TEMPLATES,
    payload: template,
  })
  
  export const deleteTemplateSuccess = project => ({
    type: DELETE_TEMPLATES_SUCCESS,
    payload: project,
  })
  
  export const deleteTemplateFail = error => ({
    type: DELETE_TEMPLATES_FAIL,
    payload: error,
  })
  
  export const getTemplatesFail = error => ({
    type: GET_TEMPLATES_FAIL,
    payload: error,
  })
  
  export const getTemplateDetail = templateId => ({
    type: GET_TEMPLATES_DETAIL,
    templateId,
  })
  
  export const getTemplateDetailSuccess = templateDetails => ({
    type: GET_TEMPLATES_DETAIL_SUCCESS,
    payload: templateDetails,
  })
  
  export const getTemplateDetailFail = error => ({
    type: GET_TEMPLATES_DETAIL_FAIL,
    payload: error,
  })
  