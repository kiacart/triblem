import { call, put, takeEvery } from "redux-saga/effects"

// Crypto Redux States
import { GET_PLAN,  ADD_NEW_PLAN, DELETE_PLAN, UPDATE_PLAN,} from "./actionTypes"

import {
    getPlansSuccess,
    getPlansFail,
    addPlanFail,
    addPlanSuccess,
    updatePlanSuccess,
    updatePlanFail,
    deletePlanSuccess,
    deletePlanFail,
  } from "./actions"

import { toast } from "react-toastify"

import {getPlan, addNewPlan, deletePlan , updatePlan} from '../../helpers/fakebackend_helper'


function* fetchPlan({id}) {
    try {
      const response = yield call(getPlan, id)
      yield put(getPlansSuccess(response))
    } catch (error) {
      yield put(getPlansFail(error))
    }
  }

  function* onAddNewPlan({ payload: plan }) {
    try { 
      const response = yield call(addNewPlan, plan)
      // yield put(addPlanSuccess(response?.data ?? response))
      const response1 = yield call(getPlan, '')
      yield put(getPlansSuccess(response1))
      document.getElementById('closeModelsuccess')?.click()
      toast.success(response?.message ?? "Plan Added Successfully", { autoClose: 2000 });
    } catch (error) {
      yield put(addPlanFail(error))
      toast.error(error?.message ?? "Plan Added Failed", { autoClose: 2000 });
    } 
  }

  function* onUpdatePlans({ payload: plan }) {
    try {
      const response = yield call(updatePlan, plan)
      yield put(updatePlanSuccess(response?.length > 0 ? response[0] : response))
      document.getElementById('closeModelsuccess')?.click()
      toast.success("Plan Update Successfully", { autoClose: 2000 })
    } catch (error) {
      yield put(updatePlanFail(error))
      toast.error("Plan Update Failded", { autoClose: 2000 })
    }
  }
  
  function* onDeletePlans({ payload: plan }) {
    try {
      const response = yield call(deletePlan, plan)
      yield put(deletePlanSuccess(plan))
      toast.success("Plan Delete Successfully", { autoClose: 2000 })
    } catch (error) {
      yield put(deletePlanFail(error))
      toast.error("Plan Delete Failded", { autoClose: 2000 })
    }
  }


  function* planSaga() {
    yield takeEvery(GET_PLAN, fetchPlan)
    yield takeEvery(ADD_NEW_PLAN, onAddNewPlan)
    // yield takeEvery(GET_PLAN_DETAIL, fetchTemplateDetail)
    yield takeEvery(UPDATE_PLAN, onUpdatePlans)
    yield takeEvery(DELETE_PLAN, onDeletePlans)
  }
  
  export default planSaga;