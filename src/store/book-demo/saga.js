import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_DEMO,  ADD_NEW_DEMO, DELETE_DEMO, UPDATE_DEMO,} from "./actionTypes"

import {
    getDemosSuccess,
    getDemosFail,
    addDemoFail,
    addDemoSuccess,
    updateDemoSuccess,
    updateDemoFail,
    deleteDemoSuccess,
    deleteDemoFail,
  } from "./actions"

import { toast } from "react-toastify"

import {getDemo, addNewDemo, updateDemo} from '../../helpers/fakebackend_helper'


function* fetchDemo({id}) {
    try {
      const response = yield call(getDemo, id)
      yield put(getDemosSuccess(response))
    } catch (error) {
      yield put(getDemosFail(error))
    }
  }

  function* onAddNewDemo({ payload: demo }) {
    try { 
      const response = yield call(addNewDemo, demo)
      yield put(addDemoSuccess(response?.data ?? response))
      document.getElementById('closeModelsuccess')?.click()
      toast.success(response?.message ?? "Demo Added Successfully", { autoClose: 2000 });
    } catch (error) {
      yield put(addDemoFail(error))
      toast.error(error?.message ?? "Demo Added Failed", { autoClose: 2000 });
    } 
  }

  function* onUpdateDemos({ payload: demo }) {
    try {
      const response = yield call(updateDemo, demo)
      yield put(updateDemoSuccess(response?.length > 0 ? response[0] : response))
      document.getElementById('closeModelsuccess')?.click()
      toast.success("Demo Update Successfully", { autoClose: 2000 })
    } catch (error) {
      yield put(updateDemoFail(error))
      toast.error("Demo Update Failded", { autoClose: 2000 })
    }
  }



  function* demoSaga() {
    yield takeEvery(GET_DEMO, fetchDemo)
    yield takeEvery(ADD_NEW_DEMO, onAddNewDemo)
    yield takeEvery(UPDATE_DEMO, onUpdateDemos)
  }
  
  export default demoSaga;