import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_BANNER,  ADD_NEW_BANNER, DELETE_BANNER, UPDATE_BANNER,} from "./actionTypes"

import {
    getBannersSuccess,
    getBannersFail,
    addBannerFail,
    addBannerSuccess,
    updateBannerSuccess,
    updateBannerFail,
    deleteBannerSuccess,
    deleteBannerFail,
  } from "./actions"

import { toast } from "react-toastify"

import {getBanner, addNewBanner, deleteBanner } from '../../helpers/fakebackend_helper'

function* fetchBanner({id}) {
    try {
      const response = yield call(getBanner, id)
      yield put(getBannersSuccess(response))
    } catch (error) {
      yield put(getBannersFail(error))
    }
  }

  function* onAddNewBanner({ payload: banner }) {
    try { 
      const response = yield call(addNewBanner, banner)
      // yield put(addBannerSuccess(response?.data ?? response))
      const response2 = yield call(getBanner, '')
      yield put(getBannersSuccess(response2))
      document.getElementById('closeModelsuccess')?.click()
      toast.success(response?.message ?? "Banner Added Successfully", { autoClose: 2000 });
    } catch (error) {
      yield put(addBannerFail(error))
      toast.error(error?.message ?? "Banner Added Failed", { autoClose: 2000 });
    } 
  }

  // function* onUpdateBanners({ payload: banner }) {
  //   try {
  //     const response = yield call(updateBanner, banner)
  //     yield put(updateBannerSuccess(response?.length > 0 ? response[0] : response))
  //     toast.success("Banner Update Successfully", { autoClose: 2000 })
  //   } catch (error) {
  //     yield put(updateBannerFail(error))
  //     toast.error("Banner Update Failded", { autoClose: 2000 })
  //   }
  // }
  
  function* onDeleteBanners({ payload: banner }) {
    try {
      const response = yield call(deleteBanner, banner)
      yield put(deleteBannerSuccess(banner))
      toast.success("Banner Delete Successfully", { autoClose: 2000 })
    } catch (error) {
      yield put(deleteBannerFail(error))
      toast.error("Banner Delete Failded", { autoClose: 2000 })
    }
  }

  function* bannerSaga() {
    yield takeEvery(GET_BANNER, fetchBanner)
    yield takeEvery(ADD_NEW_BANNER, onAddNewBanner)
    // yield takeEvery(GET_BANNER_DETAIL, fetchTemplateDetail)
    // yield takeEvery(UPDATE_BANNER, onUpdateBanners)
    yield takeEvery(DELETE_BANNER, onDeleteBanners)
  }
  
  export default bannerSaga;