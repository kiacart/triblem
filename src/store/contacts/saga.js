import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_USERS, GET_USER_PROFILE, ADD_NEW_USER, DELETE_USER, UPDATE_USER, GET_PHONEBOOK, ADD_NEW_PHONE } from "./actionTypes"

import {
  getUsersSuccess,
  getUsersFail,
  getUserProfileSuccess,
  getUserProfileFail,
  addUserFail,
  addUserSuccess,
  updateUserSuccess,
  updateUserFail,
  deleteUserSuccess,
  deleteUserFail,
  getPhonebookSuccess,
  getPhoneFail,
  addPhoneSuccess,
  addPhoneFail,
} from "./actions"

//Include Both Helper File with needed methods
import { getUsers, getUserProfile, addNewUser, updateUser, deleteUser , getPhoneBooks, addNewPhoneBooks } from "../../helpers/fakebackend_helper"
import { toast } from "react-toastify"


function* fetchUsers() {
  try {
    const response = yield call(getUsers)
    yield put(getUsersSuccess(response))
  } catch (error) {
    yield put(getUsersFail(error))
  }
}

function* fetchPhoneBook() {
  try {
    const response = yield call(getPhoneBooks)
    yield put(getPhonebookSuccess(response))
  } catch (error) {
    yield put(getPhoneFail(error))
  }
}

function* fetchUserProfile() {
  try {
    const response = yield call(getUserProfile)
    yield put(getUserProfileSuccess(response))
  } catch (error) {
    yield put(getUserProfileFail(error))
  }
}

function* onUpdateUser({ payload: user }) {
  try {
    const response = yield call(updateUser, user)
    document.getElementById('jkhjhsjdfjhvfs')?.click()
    yield put(updateUserSuccess(response?.length > 0 ? response[0] : response))
    toast.success("Contact Updated Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(updateUserFail(error))
    toast.error("Contact Updated Failed", { autoClose: 2000 });
  }
}

function* onDeleteUser({ payload: user }) {
  try {
    const response = yield call(deleteUser, user)
    yield put(deleteUserSuccess(user))
    toast.success("Contact Deleted Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(deleteUserFail(error))
    toast.error("Contact Deleted Failed", { autoClose: 2000 });
  }
}

function* onAddNewUser({ payload: user }) {
  try { 
    const response = yield call(addNewUser, user)
    // yield put(addUserSuccess(response)); 
    const response2 = yield call(getUsers)
    yield put(getUsersSuccess(response2))
    document.getElementById('jkhjhsjdfjhvfs')?.click()
    toast.success("Contact Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addUserFail(error))
    toast.error("Contact Added Failed", { autoClose: 2000 });
  } 
  
}


function* onAddNewPhone({ payload: phone }) {
  try {
    const response = yield call(addNewPhoneBooks, phone)
    yield put(addPhoneSuccess(response))
    toast.success("Phone Book Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addPhoneFail(error))
    toast.error("Phone Book Added Failed", { autoClose: 2000 });
  }
}

function* contactsSaga() {
  yield takeEvery(GET_USERS, fetchUsers)
  yield takeEvery(GET_PHONEBOOK, fetchPhoneBook)
  yield takeEvery(GET_USER_PROFILE, fetchUserProfile)
  yield takeEvery(ADD_NEW_USER, onAddNewUser)
  yield takeEvery(ADD_NEW_PHONE, onAddNewPhone)
  yield takeEvery(UPDATE_USER, onUpdateUser)
  yield takeEvery(DELETE_USER, onDeleteUser)
}

export default contactsSaga;
