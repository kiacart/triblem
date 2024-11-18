import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_TESTIMONIAL,  ADD_NEW_TESTIMONIAL, DELETE_TESTIMONIAL, UPDATE_TESTIMONIAL,} from "./actionTypes"

import {
    getTestimonialsSuccess,
    getTestimonialsFail,
    addTestimonialFail,
    addTestimonialSuccess,
    updateTestimonialSuccess,
    updateTestimonialFail,
    deleteTestimonialSuccess,
    deleteTestimonialFail,
  } from "./actions"

import { toast } from "react-toastify"

import {getTestimonial, addNewTestimonial, deleteTestimonial , updateTestimonial} from '../../helpers/fakebackend_helper'


function* fetchTestimonial({id}) {
    try {
      const response = yield call(getTestimonial, id)
      yield put(getTestimonialsSuccess(response))
    } catch (error) {
      yield put(getTestimonialsFail(error))
    }
  }

  function* onAddNewTestimonial({ payload: testimonial }) {
    try { 
      const response = yield call(addNewTestimonial, testimonial)
      // yield put(addTestimonialSuccess(response?.data ?? response))
      const response1 = yield call(getTestimonial, 'id')
      yield put(getTestimonialsSuccess(response1))
      document.getElementById('closeModelsuccess')?.click()
      toast.success(response?.message ?? "Testimonial Added Successfully", { autoClose: 2000 });
    } catch (error) {
      yield put(addTestimonialFail(error))
      toast.error(error?.message ?? "Testimonial Added Failed", { autoClose: 2000 });
    } 
  }

  function* onUpdateTestimonials({ payload: testimonial }) {
    try {
      const response = yield call(updateTestimonial, testimonial)
      yield put(updateTestimonialSuccess(response?.length > 0 ? response[0] : response))
      document.getElementById('closeModelsuccess')?.click()
      toast.success("Testimonial Update Successfully", { autoClose: 2000 })
    } catch (error) {
      yield put(updateTestimonialFail(error))
      toast.error("Testimonial Update Failded", { autoClose: 2000 })
    }
  }
  
  function* onDeleteTestimonials({ payload: testimonial }) {
    try {
      const response = yield call(deleteTestimonial, testimonial)
      yield put(deleteTestimonialSuccess(testimonial))
      toast.success("Testimonial Delete Successfully", { autoClose: 2000 })
    } catch (error) {
      yield put(deleteTestimonialFail(error))
      toast.error("Testimonial Delete Failded", { autoClose: 2000 })
    }
  }


  function* testimonialSaga() {
    yield takeEvery(GET_TESTIMONIAL, fetchTestimonial)
    yield takeEvery(ADD_NEW_TESTIMONIAL, onAddNewTestimonial)
    // yield takeEvery(GET_TESTIMONIAL_DETAIL, fetchTemplateDetail)
    yield takeEvery(UPDATE_TESTIMONIAL, onUpdateTestimonials)
    yield takeEvery(DELETE_TESTIMONIAL, onDeleteTestimonials)
  }
  
  export default testimonialSaga;