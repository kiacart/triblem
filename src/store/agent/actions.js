import {
ADD_AGENT_FAIL,
ADD_AGENT_SUCCESS,
ADD_NEW_AGENT,
DELETE_AGENT,
DELETE_AGENT_FAIL,
DELETE_AGENT_SUCCESS,
GET_AGENT,
GET_AGENT_FAIL,
GET_AGENT_SUCCESS,
UPDATE_AGENT,
UPDATE_AGENT_FAIL,
UPDATE_AGENT_SUCCESS
} from './actionTypes'

export const getAgents = (id) => ({
    type: GET_AGENT,
    id
  })
  
  export const getAgentsSuccess = agents => ({
    type: GET_AGENT_SUCCESS,
    payload: agents,
  })
  
  export const addNewAgent = agent => ({
    type: ADD_NEW_AGENT,
    payload: agent,
  })
  
  export const addAgentSuccess = agent => ({
    type: ADD_AGENT_SUCCESS,
    payload: agent,
  })
  
  export const addAgentFail = error => ({
    type: ADD_AGENT_FAIL,
    payload: error,
  })
  
  export const getAgentsFail = error => ({
    type: GET_AGENT_FAIL,
    payload: error,
  })
  
  export const updateAgent = agent => ({
    type: UPDATE_AGENT,
    payload: agent,
  })
  
  export const updateAgentSuccess = agent => ({
    type: UPDATE_AGENT_SUCCESS,
    payload: agent,
  })
  
  export const updateAgentFail = error => ({
    type: UPDATE_AGENT_FAIL,
    payload: error,
  })
  
  export const deleteAgent = agent => ({
    type: DELETE_AGENT,
    payload: agent,
  })
  
  export const deleteAgentSuccess = agent => ({
    type: DELETE_AGENT_SUCCESS,
    payload: agent,
  })
  
  export const deleteAgentFail = error => ({
    type: DELETE_AGENT_FAIL,
    payload: error,
  })
  
