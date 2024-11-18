import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_META,  ADD_NEW_META, DELETE_META, UPDATE_META,} from "./actionTypes"

import {
    getMetasSuccess,
    getMetasFail,
    addMetaFail,
    addMetaSuccess,
    updateMetaSuccess,
    updateMetaFail,
    deleteMetaSuccess,
    deleteMetaFail,
  } from "./actions"

import { toast } from "react-toastify"

import {getMetas, addNewMeta, updateMeta} from '../../helpers/fakebackend_helper'

function* fetchMeta({id}) {
    try {
      const response = yield call(getMetas, id)
      yield put(getMetasSuccess(response))
    } catch (error) {
      yield put(getMetasFail(error))
    }
  }

  function* onAddNewMeta({ payload: meta }) {
    try { 
      const response = yield call(addNewMeta, meta)
      yield put(addMetaSuccess(response))
      document.getElementById('closeModelsuccess')?.click()
      toast.success("Meta Added Successfully", { autoClose: 2000 });
    } catch (error) {
      yield put(addMetaFail(error))
      toast.error("Meta Added Failed", { autoClose: 2000 });
    } 
  }

  function* onUpdateMeta({ payload: meta }) {
    try { 
      const response = yield call(updateMeta, meta)
      yield put(updateMetaSuccess(response?.length > 0 ? response[0] : response))
      document.getElementById('closeModelsuccess')?.click()
      toast.success("Meta Update Successfully", { autoClose: 2000 });
    } catch (error) {
      yield put(updateMetaFail(error))
      toast.error(error?.message ?? "Meta Update Failed", { autoClose: 2000 });
    } 
  }

  function* metaSaga() {
    yield takeEvery(GET_META, fetchMeta)
    yield takeEvery(ADD_NEW_META, onAddNewMeta)
    yield takeEvery(UPDATE_META, onUpdateMeta)
  }
  
  export default metaSaga;