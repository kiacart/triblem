import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_CLIENT,  ADD_NEW_CLIENT, DELETE_CLIENT, UPDATE_CLIENT,} from "./actionTypes"

import {
    getClientsSuccess,
    getClientsFail,
    addClientFail,
    addClientSuccess,
    updateClientSuccess,
    updateClientFail,
    deleteClientSuccess,
    deleteClientFail,
  } from "./actions"

import { toast } from "react-toastify"

import {getClient, addNewClient, deleteClient } from '../../helpers/fakebackend_helper'

function* fetchClient({id}) {
    try {
      const response = yield call(getClient, id)
      yield put(getClientsSuccess(response))
    } catch (error) {
      yield put(getClientsFail(error))
    }
  }

  function* onAddNewClient({ payload: client }) {
    try { 
      const response = yield call(addNewClient, client)
      const response2 = yield call(getClient, '')
      yield put(getClientsSuccess(response2))
      // yield put(addClientSuccess(response?.data ?? response))
      document.getElementById('closeModelsuccess')?.click()
      toast.success(response?.message ?? "Client Added Successfully", { autoClose: 2000 });
    } catch (error) {
      yield put(addClientFail(error))
      toast.error(error?.message ?? "Client Added Failed", { autoClose: 2000 });
    } 
  }

  // function* onUpdateClients({ payload: client }) {
  //   try {
  //     const response = yield call(updateClient, client)
  //     yield put(updateClientSuccess(response?.length > 0 ? response[0] : response))
  //     toast.success("Client Update Successfully", { autoClose: 2000 })
  //   } catch (error) {
  //     yield put(updateClientFail(error))
  //     toast.error("Client Update Failded", { autoClose: 2000 })
  //   }
  // }
  
  function* onDeleteClients({ payload: client }) {
    try {
      const response = yield call(deleteClient, client)
      yield put(deleteClientSuccess(client))
      toast.success("Client Delete Successfully", { autoClose: 2000 })
    } catch (error) {
      yield put(deleteClientFail(error))
      toast.error("Client Delete Failded", { autoClose: 2000 })
    }
  }

  function* clientSaga() {
    yield takeEvery(GET_CLIENT, fetchClient)
    yield takeEvery(ADD_NEW_CLIENT, onAddNewClient)
    // yield takeEvery(GET_CLIENT_DETAIL, fetchTemplateDetail)
    // yield takeEvery(UPDATE_CLIENT, onUpdateClients)
    yield takeEvery(DELETE_CLIENT, onDeleteClients)
  }
  
  export default clientSaga;