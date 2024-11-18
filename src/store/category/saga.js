import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_CATEGORY,  ADD_NEW_CATEGORY, DELETE_CATEGORY, UPDATE_CATEGORY,} from "./actionTypes"

import {
    getCategoriesSuccess,
    getCategoriesFail,
    addCategoryFail,
    addCategorySuccess,
    updateCategorySuccess,
    updateCategoryFail,
    deleteCategorySuccess,
    deleteCategoryFail,
  } from "./actions"

import { toast } from "react-toastify"

// import {getCategories, addNewCategory} from '../../helpers/fakebackend_helper'

function* fetchCategory() {
    try {
      // const response = yield call(getCategories)
      const response = []
      yield put(getCategoriesSuccess(response))
    } catch (error) {
      yield put(getCategoriesFail(error))
    }
  }

  function* onAddNewCategory({ payload: category }) {
    try { 
      // const response = yield call(addNewCategory, category)
      const response = []
      yield put(addCategorySuccess(response))
      toast.success("Category Added Successfully", { autoClose: 2000 });
    } catch (error) {
      yield put(addCategoryFail(error))
      toast.error("Category Added Failed", { autoClose: 2000 });
    } 
  }


  function* categorySaga() {
    yield takeEvery(GET_CATEGORY, fetchCategory)
    yield takeEvery(ADD_NEW_CATEGORY, onAddNewCategory)

  }
  
  export default categorySaga;