import { PROFILE_ERROR, PROFILE_SUCCESS, EDIT_PROFILE, RESET_PROFILE_FLAG,
  GET_CURRENT_USER,
  GET_CURRENT_USER_FAIL,
  GET_CURRENT_USER_SUCCESS,
  UPDATE_CURRENT_USER,
  UPDATE_CURRENT_USER_FAIL,
  UPDATE_CURRENT_USER_SUCCESS

 } from "./actionTypes" 

 export const getCurrentuser = (id) => ({
  type: GET_CURRENT_USER,
  id
})

export const getCurrentuserSuccess = user => ({
  type: GET_CURRENT_USER_SUCCESS,
  payload: user,
})

export const getCurrentuserFail = error => ({
  type: GET_CURRENT_USER_FAIL,
  payload: error,
})

export const updateCurrentuser = user => ({
  type: UPDATE_CURRENT_USER,
  payload: user,
})

export const updateCurrentuserSuccess = user => ({
  type: UPDATE_CURRENT_USER_SUCCESS,
  payload: user,
})

export const updateCurrentuserFail = error => ({
  type: UPDATE_CURRENT_USER_FAIL,
  payload: error,
})

export const editProfile = user => {
  return {
    type: EDIT_PROFILE,
    payload: { user },
  }
}

export const profileSuccess = msg => {
  return {
    type: PROFILE_SUCCESS,
    payload: msg,
  }
}

export const profileError = error => {
  return {
    type: PROFILE_ERROR,
    payload: error,
  }
}

export const resetProfileFlag = error => {
  return {
    type: RESET_PROFILE_FLAG,
  }
}



