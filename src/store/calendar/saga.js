import { takeEvery, put, call } from "redux-saga/effects"

// Calender Redux States
import {
  ADD_NEW_CATEGORY,
  ADD_NEW_EVENT,
  DELETE_EVENT,
  GET_CATEGORIES,
  GET_EVENTS,
  UPDATE_EVENT,
} from "./actionTypes"
import {
  getEventsSuccess,
  getEventsFail,
  addEventFail,
  addEventSuccess,
  updateEventSuccess,
  updateEventFail,
  deleteEventSuccess,
  deleteEventFail,
  getCategoriesSuccess,
  getCategoriesFail,
  addCategorySuccess,
  addCategoryFail,
} from "./actions"

//Include Both Helper File with needed methods
import {
  getEvents,
  addNewEvent,
  updateEvent,
  deleteEvent,
  getCategories,
  addNewCategory
} from "../../helpers/fakebackend_helper"

function* fetchEvents() {
  try {
    const response = yield call(getEvents)
    yield put(getEventsSuccess(response))
  } catch (error) {
    yield put(getEventsFail(error))
  }
}

function* onAddNewEvent({ payload: event }) {
  try {
    const response = yield call(addNewEvent, event)
    yield put(addEventSuccess(response))
  } catch (error) {
    yield put(addEventFail(error))
  }
}

function* onUpdateEvent({ payload: event }) {
  try {
    const response = yield call(updateEvent, event)
    yield put(updateEventSuccess(response))
  } catch (error) {
    yield put(updateEventFail(error))
  }
}

function* onDeleteEvent({ payload: event }) {
  try {
    const response = yield call(deleteEvent, event)
    yield put(deleteEventSuccess(response))
  } catch (error) {
    yield put(deleteEventFail(error))
  }
}

function* onGetCategories() {
  try {
    const response = yield call(getCategories)
    yield put(getCategoriesSuccess(response))
  } catch (error) {
    yield put(getCategoriesFail(error))
  }
}

function* onAddNewCategory({ payload: category }) {
  try { 
    const response = yield call(addNewCategory, category)
    yield put(addCategorySuccess(response))
    toast.success("Category Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addCategoryFail(error))
    toast.error("Category Added Failed", { autoClose: 2000 });
  } 
}

function* calendarSaga() {
  yield takeEvery(GET_EVENTS, fetchEvents)
  yield takeEvery(ADD_NEW_EVENT, onAddNewEvent)
  yield takeEvery(UPDATE_EVENT, onUpdateEvent)
  yield takeEvery(DELETE_EVENT, onDeleteEvent)
  yield takeEvery(GET_CATEGORIES, onGetCategories)
  yield takeEvery(ADD_NEW_CATEGORY, onAddNewCategory)
}

export default calendarSaga;
