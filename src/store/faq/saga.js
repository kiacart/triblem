import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_FAQ,  ADD_NEW_FAQ, DELETE_FAQ, UPDATE_FAQ,} from "./actionTypes"

import {
    getFaqsSuccess,
    getFaqsFail,
    addFaqFail,
    addFaqSuccess,
    updateFaqSuccess,
    updateFaqFail,
    deleteFaqSuccess,
    deleteFaqFail,
  } from "./actions"

import { toast } from "react-toastify"

import {getFaq, addNewFaq, deleteFaq , updateFaq} from '../../helpers/fakebackend_helper'


function* fetchFaq({id}) {
    try {
      const response = yield call(getFaq, id)
      yield put(getFaqsSuccess(response))
    } catch (error) {
      yield put(getFaqsFail(error))
    }
  }

  function* onAddNewFaq({ payload: faq }) {
    try { 
      const response = yield call(addNewFaq, faq)
      // yield put(addFaqSuccess(response?.data ?? response))
      const response2 = yield call(getFaq, '')
      yield put(getFaqsSuccess(response2))
      document.getElementById('closeModelsuccess')?.click()
      toast.success(response?.message ?? "Faq Added Successfully", { autoClose: 2000 });
    } catch (error) {
      yield put(addFaqFail(error))
      toast.error(error?.message ?? "Faq Added Failed", { autoClose: 2000 });
    } 
  }

  function* onUpdateFaqs({ payload: faq }) {
    try {
      const response = yield call(updateFaq, faq)
      yield put(updateFaqSuccess(response?.length > 0 ? response[0] : response))
      document.getElementById('closeModelsuccess')?.click()
      toast.success("Faq Update Successfully", { autoClose: 2000 })
    } catch (error) {
      yield put(updateFaqFail(error))
      toast.error("Faq Update Failded", { autoClose: 2000 })
    }
  }
  
  function* onDeleteFaqs({ payload: faq }) {
    try {
      const response = yield call(deleteFaq, faq)
      yield put(deleteFaqSuccess(faq))
      toast.success("Faq Delete Successfully", { autoClose: 2000 })
    } catch (error) {
      yield put(deleteFaqFail(error))
      toast.error("Faq Delete Failded", { autoClose: 2000 })
    }
  }


  function* faqSaga() {
    yield takeEvery(GET_FAQ, fetchFaq)
    yield takeEvery(ADD_NEW_FAQ, onAddNewFaq)
    // yield takeEvery(GET_FAQ_DETAIL, fetchTemplateDetail)
    yield takeEvery(UPDATE_FAQ, onUpdateFaqs)
    yield takeEvery(DELETE_FAQ, onDeleteFaqs)
  }
  
  export default faqSaga;