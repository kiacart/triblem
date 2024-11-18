import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_AGENT,  ADD_NEW_AGENT, DELETE_AGENT, UPDATE_AGENT,} from "./actionTypes"

import {
    getAgentsSuccess,
    getAgentsFail,
    addAgentFail,
    addAgentSuccess,
    updateAgentSuccess,
    updateAgentFail,
    deleteAgentSuccess,
    deleteAgentFail,
  } from "./actions"

import { toast } from "react-toastify"

import {getAgent, addNewAgent} from '../../helpers/fakebackend_helper'


function* fetchAgent({id}) {
    try {
      const response = yield call(getAgent, id)
      yield put(getAgentsSuccess(response))
    } catch (error) {
      yield put(getAgentsFail(error))
    }
  }

  function* onAddNewAgent({ payload: agent }) {
    try { 
      const response = yield call(addNewAgent, agent)
      yield put(addAgentSuccess(response?.data ?? response))
      document.getElementById('closeModelsuccess')?.click()
      toast.success(response?.message ?? "Agent Added Successfully", { autoClose: 2000 });
    } catch (error) {
      yield put(addAgentFail(error))
      toast.error(error?.message ?? "Agent Added Failed", { autoClose: 2000 });
    } 
  }


  function* agentSaga() {
    yield takeEvery(GET_AGENT, fetchAgent)
    yield takeEvery(ADD_NEW_AGENT, onAddNewAgent)

  }
  
  export default agentSaga;