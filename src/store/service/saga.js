import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_SERVICE,  ADD_NEW_SERVICE, DELETE_SERVICE, UPDATE_SERVICE,} from "./actionTypes"

import {
    getServicesSuccess,
    getServicesFail,
    addServiceFail,
    addServiceSuccess,
    updateServiceSuccess,
    updateServiceFail,
    deleteServiceSuccess,
    deleteServiceFail,
  } from "./actions"

import { toast } from "react-toastify"

import {getService, addNewService, deleteService , updateService} from '../../helpers/fakebackend_helper'


function* fetchService({id}) {
    try {
      const response = yield call(getService, id)
      yield put(getServicesSuccess(response))
    } catch (error) {
      yield put(getServicesFail(error))
    }
  }

  function* onAddNewService({ payload: service }) {
    try { 
      const response = yield call(addNewService, service)
      const response2 = yield call(getService, '')
      yield put(getServicesSuccess(response2))
      // yield put(addServiceSuccess(response?.data ?? response))
      document.getElementById('closeModelsuccess')?.click()
      toast.success(response?.message ?? "Service Added Successfully", { autoClose: 2000 });
    } catch (error) {
      yield put(addServiceFail(error))
      toast.error(error?.message ?? "Service Added Failed", { autoClose: 2000 });
    } 
  }

  function* onUpdateServices({ payload: service }) {
    try {
      const response = yield call(updateService, service)
      yield put(updateServiceSuccess(response?.length > 0 ? response[0] : response))
      document.getElementById('closeModelsuccess')?.click()
      toast.success("Service Update Successfully", { autoClose: 2000 })
    } catch (error) {
      yield put(updateServiceFail(error))
      toast.error("Service Update Failded", { autoClose: 2000 })
    }
  }
  
  function* onDeleteServices({ payload: service }) {
    try {
      const response = yield call(deleteService, service)
      yield put(deleteServiceSuccess(service))
      toast.success("Service Delete Successfully", { autoClose: 2000 })
    } catch (error) {
      yield put(deleteServiceFail(error))
      toast.error("Service Delete Failded", { autoClose: 2000 })
    }
  }


  function* serviceSaga() {
    yield takeEvery(GET_SERVICE, fetchService)
    yield takeEvery(ADD_NEW_SERVICE, onAddNewService)
    // yield takeEvery(GET_SERVICE_DETAIL, fetchTemplateDetail)
    yield takeEvery(UPDATE_SERVICE, onUpdateServices)
    yield takeEvery(DELETE_SERVICE, onDeleteServices)
  }
  
  export default serviceSaga;