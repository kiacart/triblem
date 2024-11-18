import { call, put, takeEvery } from "redux-saga/effects"
import { useNavigate } from "react-router-dom"

// Crypto Redux States
import { GET_TEMPLATES, GET_TEMPLATES_DETAIL, DELETE_TEMPLATES, UPDATE_TEMPLATES, ADD_NEW_TEMPLATES } from "./actionTypes"
import {
  getTemplateSuccess,
  getTemplatesFail,
  getTemplateDetailSuccess,
  getTemplateDetailFail,
  updateTemplateSuccess,
  updateTemplateFail,
  deleteTemplateSuccess,
  deleteTemplateFail,
  addTemplateSuccess,
  addTempFail
} from "./actions"

//Include Both Helper File with needed methods
import { getTemplates, getTemplateDetails, updateTemplate, deleteTemplate, addTemplate } from "../../helpers/fakebackend_helper"

import { toast } from "react-toastify"

function* fetchTemplates({ id }) {
  try {
    const response = yield call(getTemplates, id)
    if (response?.error) {
      yield put(getTemplatesFail(response?.error?.message))
    }
    yield put(getTemplateSuccess(response?.data ?? []))
  } catch (error) {
    yield put(getTemplatesFail(error))
  }
}

function* fetchTemplateDetail({ templateId }) {
  try {
    const response = yield call(getTemplateDetails, templateId)
    yield put(getTemplateDetailSuccess(response))
  } catch (error) {
    yield put(getTemplateDetailFail(error))
  }
}

function* onUpdateTemplate({ payload: template }) {
  try {
    const response = yield call(updateTemplate, template)
    yield put(updateTemplateSuccess(response))
    toast.success("Tenmplate Update Successfully", { autoClose: 2000 })
  } catch (error) {
    yield put(updateTemplateFail(error))
    toast.error("Tenmplate Update Failded", { autoClose: 2000 })
  }
}

function* onDeleteTemplate({ payload: template }) {
  try {
    const response = yield call(deleteTemplate, template)
    yield put(deleteTemplateSuccess(template))
    toast.success("Template Delete Successfully", { autoClose: 2000 })
  } catch (error) {
    yield put(deleteTemplateFail(error))
    toast.error("Template Delete Failded", { autoClose: 2000 })
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

function* onAddNewTemp({ payload: { templates, history } }) {
  try {
    if (!isEmptyObject(templates)) {
      const response = yield call(addTemplate, templates)
      if (response?.error) {
        yield put(addTempFail(response?.error?.message))
        return toast.error(response?.error?.error_user_msg ?? response?.error?.message ?? "Template Added Failed", { autoClose: 2000 })
      }
      const response2 = yield call(getTemplates, templates?.user_id)
      if (response?.error) {
        yield put(getTemplatesFail(response2?.error?.message))
      }
      yield put(getTemplateSuccess(response2?.data ?? []))
      // document.getElementById('yyfytekjsddfhf')?.click();
      //  yield put(addTemplateSuccess(response))
      history('/templates');
      toast.success(response?.message ?? "Template Added Successfully", { autoClose: 2000 });
    }
  } catch (error) {
    yield put(addTempFail(error))
    // toast.error("Template Added Failed", { autoClose: 2000 });
  }
}


function* templatesSaga() {
  yield takeEvery(GET_TEMPLATES, fetchTemplates)
  yield takeEvery(ADD_NEW_TEMPLATES, onAddNewTemp)
  yield takeEvery(GET_TEMPLATES_DETAIL, fetchTemplateDetail)
  yield takeEvery(UPDATE_TEMPLATES, onUpdateTemplate)
  yield takeEvery(DELETE_TEMPLATES, onDeleteTemplate)
}

export default templatesSaga
