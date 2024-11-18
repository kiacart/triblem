import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_TEMPLATELIBRARY,  ADD_NEW_TEMPLATELIBRARY, DELETE_TEMPLATELIBRARY, UPDATE_TEMPLATELIBRARY, GET_LIBRARY_CATEGORY,  ADD_NEW_LIBRARY_CATEGORY, DELETE_LIBRARY_CATEGORY, UPDATE_LIBRARY_CATEGORY} from "./actionTypes"

import {
    getTemplateLibrarySuccess,
    getTemplateLibraryFail,
    addTemplateLibraryFail,
    addTemplateLibrarySuccess,
    updateTemplateLibrarySuccess,
    updateTemplateLibraryFail,
    deleteTemplateLibrarySuccess,
    deleteTemplateLibraryFail,
    getCategorylSuccess,
    getCategorylFail,
    addCategorylFail,
    addCategorylSuccess,
    updateCategorylSuccess,
    updateCategorylFail,
    deleteCategorylSuccess,
    deleteCategorylFail,
  } from "./actions"

import { toast } from "react-toastify"

import {getTemplateLibrary, addNewTemplateLibrary, deleteTemplateLibrary , updateTemplateLibrary, getCategoryl, addNewCategoryl, deleteCategoryl , updateCategoryl } from '../../helpers/fakebackend_helper'

function* fetchTemplateLibrary({id}) {
    try {
      const response = yield call(getTemplateLibrary, id)
      yield put(getTemplateLibrarySuccess(response))
    } catch (error) {
      yield put(getTemplateLibraryFail(error))
    }
  }

  function* onAddNewTemplateLibrary({ payload: library }) {
    try { 
      const response = yield call(addNewTemplateLibrary, library)
      // yield put(addTemplateLibrarySuccess(response?.data ?? response))
      const response1 = yield call(getTemplateLibrary, '')
      yield put(getTemplateLibrarySuccess(response1))
      document.getElementById('closeModelsuccess')?.click()
      toast.success(response?.message ?? "Template Library Added Successfully", { autoClose: 2000 });
    } catch (error) {
      yield put(addTemplateLibraryFail(error))
      toast.error(error?.message ?? "Template Library Added Failed", { autoClose: 2000 });
    } 
  }

  function* onUpdateTemplateLibrary({ payload: library }) {
    try {
      const response = yield call(updateTemplateLibrary, library)
      yield put(updateTemplateLibrarySuccess(response?.length > 0 ? response[0] : response))
      document.getElementById('closeModelsuccess')?.click()
      toast.success("TemplateLibrary Update Successfully", { autoClose: 2000 })
    } catch (error) {
      yield put(updateTemplateLibraryFail(error))
      toast.error("TemplateLibrary Update Failded", { autoClose: 2000 })
    }
  }

  function* onDeleteTemplateLibrary({ payload: library }) {
    try {
      const response = yield call(deleteTemplateLibrary, library)
      yield put(deleteTemplateLibrarySuccess(library))
      toast.success("TemplateLibrary Delete Successfully", { autoClose: 2000 })
    } catch (error) {
      yield put(deleteTemplateLibraryFail(error))
      toast.error("TemplateLibrary Delete Failded", { autoClose: 2000 })
    }
  }

  // category
  function* fetchCategoryl({id}) {
    try {
      const response = yield call(getCategoryl, id)
      yield put(getCategorylSuccess(response))
    } catch (error) {
      yield put(getCategorylFail(error))
    }
  }

  function* onAddNewCategoryl({ payload: category }) {
    try { 
      const response = yield call(addNewCategoryl, category)
      // yield put(addCategorySuccess(response?.data ?? response))
      const response1 = yield call(getCategoryl, '')
      yield put(getCategorylSuccess(response1))
      document.getElementById('closeModelsuccess')?.click()
      toast.success(response?.message ?? "Category Added Successfully", { autoClose: 2000 });
    } catch (error) {
      yield put(addCategorylFail(error))
      toast.error(error?.message ?? "Category Added Failed", { autoClose: 2000 });
    } 
  }

  function* onUpdateCategoryl({ payload: category }) {
    try {
      const response = yield call(updateCategoryl, category)
      yield put(updateCategorylSuccess(response?.length > 0 ? response[0] : response))
      document.getElementById('closeModelsuccess')?.click()
      toast.success("Category Update Successfully", { autoClose: 2000 })
    } catch (error) {
      yield put(updateCategorylFail(error))
      toast.error("Category Update Failded", { autoClose: 2000 })
    }
  }

  function* onDeleteCategoryl({ payload: category }) {
    try {
      const response = yield call(deleteCategoryl, category)
      yield put(deleteCategorylSuccess(category))
      toast.success("Category Delete Successfully", { autoClose: 2000 })
    } catch (error) {
      yield put(deleteCategorylFail(error))
      toast.error("Category Delete Failded", { autoClose: 2000 })
    }
  }


  function* librarySaga() {
    yield takeEvery(GET_TEMPLATELIBRARY, fetchTemplateLibrary)
    yield takeEvery(ADD_NEW_TEMPLATELIBRARY, onAddNewTemplateLibrary)
    yield takeEvery(UPDATE_TEMPLATELIBRARY, onUpdateTemplateLibrary)
    yield takeEvery(DELETE_TEMPLATELIBRARY, onDeleteTemplateLibrary)

    yield takeEvery(GET_LIBRARY_CATEGORY, fetchCategoryl)
    yield takeEvery(ADD_NEW_LIBRARY_CATEGORY, onAddNewCategoryl)
    yield takeEvery(UPDATE_LIBRARY_CATEGORY, onUpdateCategoryl)
    yield takeEvery(DELETE_LIBRARY_CATEGORY, onDeleteCategoryl)
  }
  
  export default librarySaga;