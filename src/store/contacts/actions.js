import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  ADD_NEW_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_PHONEBOOK,
  GET_PHONEBOOK_SUCCESS,
  GET_PHONEBOOK_FAIL,
  
  ADD_NEW_PHONE,
  ADD_PHONE_SUCCESS,
  ADD_PHONE_FAIL,
} from "./actionTypes"

export const getUsers = () => ({
  type: GET_USERS,
})

export const getUsersSuccess = users => ({
  type: GET_USERS_SUCCESS,
  payload: users,
})

export const getPhoneBook = () => ({
  type: GET_PHONEBOOK,
})

export const getPhonebookSuccess = phone => ({
  type: GET_PHONEBOOK_SUCCESS,
  payload: phone,
})

export const getPhoneFail = error => ({
  type: GET_PHONEBOOK_FAIL,
  payload: error,
})

export const addNewPhone = phone => ({
  type: ADD_NEW_PHONE,
  payload: phone,
})

export const addPhoneSuccess = phone => ({
  type: ADD_PHONE_SUCCESS,
  payload: phone,
})

export const addPhoneFail = error => ({
  type: ADD_PHONE_FAIL,
  payload: error,
})


export const addNewUser = user => ({
  type: ADD_NEW_USER,
  payload: user,
})

export const addUserSuccess = user => ({
  type: ADD_USER_SUCCESS,
  payload: user,
})

export const addUserFail = error => ({
  type: ADD_USER_FAIL,
  payload: error,
})

export const getUsersFail = error => ({
  type: GET_USERS_FAIL,
  payload: error,
})

export const getUserProfile = () => ({
  type: GET_USER_PROFILE,
})

export const getUserProfileSuccess = userProfile => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: userProfile,
})

export const getUserProfileFail = error => ({
  type: GET_USER_PROFILE_FAIL,
  payload: error,
})

export const updateUser = user => ({
  type: UPDATE_USER,
  payload: user,
})

export const updateUserSuccess = user => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
})

export const updateUserFail = error => ({
  type: UPDATE_USER_FAIL,
  payload: error,
})

export const deleteUser = user => ({
  type: DELETE_USER,
  payload: user,
})

export const deleteUserSuccess = user => ({
  type: DELETE_USER_SUCCESS,
  payload: user,
})

export const deleteUserFail = error => ({
  type: DELETE_USER_FAIL,
  payload: error,
})
