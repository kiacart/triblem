import { call, put, takeEvery } from "redux-saga/effects"
import { useNavigate } from "react-router-dom"

// Crypto Redux States
import { GET_BROADCAST, GET_BROADCAST_DETAIL, DELETE_BROADCAST, UPDATE_BROADCAST, ADD_NEW_BROADCAST } from "./actionTypes"
import {
    getBroadcastSuccess,
    getBroadcastsFail,
    getBroadcastDetailSuccess,
    getBroadcastDetailFail,
    updateBroadcastSuccess,
    updateBroadcastFail,
    deleteBroadcastSuccess,
    deleteBroadcastFail,
    addBroadcastSuccess,
    addBroadcastFail
} from "./actions"

//Include Both Helper File with needed methods
import { getBroadcasts, getBroadcastDetails, updateBroadcast, deleteBroadcast, addBroadcast } from "../../helpers/fakebackend_helper"

import { toast } from "react-toastify"

function* fetchBroadcasts() {
  try {
    const response = yield call(getBroadcasts)
    yield put(getBroadcastSuccess(response))
  } catch (error) {
    yield put(getBroadcastsFail(error))
  }
}

function* fetchBroadcastDetail({ broadcastId }) {
  try {
    const response = yield call(getBroadcastDetails, broadcastId)
    yield put(getBroadcastDetailSuccess(response))
  } catch (error) {
    yield put(getBroadcastDetailFail(error))
  }
}

function* onUpdateBroadcast({ payload: broadcast }) {
  try {
    const response = yield call(updateBroadcast, broadcast)
    yield put(updateBroadcastSuccess(response))
    toast.success("Tenmplate Update Successfully", { autoClose: 2000 })
  } catch (error) {
    yield put(updateBroadcastFail(error))
    toast.error("Tenmplate Update Failded", { autoClose: 2000 })
  }
}

function* onDeleteBroadcast({ payload: broadcast }) {
  try {
    const response = yield call(deleteBroadcast, broadcast)
    yield put(deleteBroadcastSuccess(response))
    toast.success("Broadcast Delete Successfully", { autoClose: 2000 })
  } catch (error) {
    yield put(deleteBroadcastFail(error))
    toast.error("Broadcast Delete Failded", { autoClose: 2000 })
  }
}

const isEmptyObject = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
};

function* onAddNewBroadcast({ payload: {broadcast, history} }) {
  try {
   if(!isEmptyObject(broadcast)) {
     const response = yield call(addBroadcast, broadcast)
     yield put(addBroadcastSuccess(response)) ; 
     document.getElementById('btnLoadreoff')?.click(); 
     if(response?.msg) {
      return toast.info( response?.msg ?? "", { autoClose: 2000 });
     }else  if(response?.error) {
      return  toast.error(response?.msg ?? response?.error?.message ?? "Failed", { autoClose: 2000 });
     }
     toast.success( response?.message ?? "Successfull", { autoClose: 2000 });
    //  history('/broadcast-analytics');
   }
  } catch (error) {
    yield put(addBroadcastFail(error))
    toast.error("Broadcast Added Failed", { autoClose: 2000 });
  }
}

function* broadcastSaga() {
  yield takeEvery(GET_BROADCAST, fetchBroadcasts)
  yield takeEvery(ADD_NEW_BROADCAST, onAddNewBroadcast)
  yield takeEvery(GET_BROADCAST_DETAIL, fetchBroadcastDetail)
  yield takeEvery(UPDATE_BROADCAST, onUpdateBroadcast)
  yield takeEvery(DELETE_BROADCAST, onDeleteBroadcast)
}


export default broadcastSaga
