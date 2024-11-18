import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_LANGUAGE,  ADD_NEW_LANGUAGE, DELETE_LANGUAGE, UPDATE_LANGUAGE,} from "./actionTypes"

import {
    getLanguageSuccess,
    getLanguageFail,
    addLanguageFail,
    addLanguageSuccess,
    updateLanguageSuccess,
    updateLanguageFail,
    deleteLanguageSuccess,
    deleteLanguageFail,
  } from "./actions"

import { toast } from "react-toastify"

import {getLanguage, addNewLanguage} from '../../helpers/fakebackend_helper'


function* fetchLanguage() {
    try {
      const response = yield call(getLanguage)
      yield put(getLanguageSuccess(response))
    } catch (error) {
      yield put(getLanguageFail(error))
    }
  }
  

  function* onAddNewLanguage({ payload: language }) {
    try { 
      const response = yield call(addNewLanguage, language)
      // yield put(addLanguageSuccess(response))
      const response2 = yield call(getLanguage)
      yield put(getLanguageSuccess(response2))
      toast.success("Language Added Successfully", { autoClose: 2000 });
    } catch (error) {
      yield put(addLanguageFail(error))
      toast.error("Language Added Failed", { autoClose: 2000 });
    } 
  }


  function* languageSaga() {
    yield takeEvery(GET_LANGUAGE, fetchLanguage)
    yield takeEvery(ADD_NEW_LANGUAGE, onAddNewLanguage)

  }
  
  export default languageSaga;