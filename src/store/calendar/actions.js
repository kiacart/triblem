import {
  GET_EVENTS,
  GET_EVENTS_FAIL,
  GET_EVENTS_SUCCESS,
  ADD_NEW_EVENT,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAIL,
  UPDATE_EVENT,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  DELETE_EVENT,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  ADD_NEW_CATEGORY,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAIL,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  DELETE_CATEGORY,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
} from "./actionTypes";

export const getEvents = () => ({
  type: GET_EVENTS,
});

export const getEventsSuccess = events => ({
  type: GET_EVENTS_SUCCESS,
  payload: events,
});

export const getEventsFail = error => ({
  type: GET_EVENTS_FAIL,
  payload: error,
});

export const addNewEvent = event => ({
  type: ADD_NEW_EVENT,
  payload: event,
});

export const addEventSuccess = event => ({
  type: ADD_EVENT_SUCCESS,
  payload: event,
});

export const addEventFail = error => ({
  type: ADD_EVENT_FAIL,
  payload: error,
});

export const updateEvent = event => ({
  type: UPDATE_EVENT,
  payload: event,
});

export const updateEventSuccess = event => ({
  type: UPDATE_EVENT_SUCCESS,
  payload: event,
});

export const updateEventFail = error => ({
  type: UPDATE_EVENT_FAIL,
  payload: error,
});

export const deleteEvent = event => ({
  type: DELETE_EVENT,
  payload: event,
});

export const deleteEventSuccess = event => ({
  type: DELETE_EVENT_SUCCESS,
  payload: event,
});

export const deleteEventFail = error => ({
  type: DELETE_EVENT_FAIL,
  payload: error,
});

export const getCategories = () => ({
  type: GET_CATEGORIES,
});

export const getCategoriesSuccess = categories => ({
  type: GET_CATEGORIES_SUCCESS,
  payload: categories,
});

export const getCategoriesFail = error => ({
  type: GET_CATEGORIES_FAIL,
  payload: error,
});



export const addNewCategory = category => ({
  type: ADD_NEW_CATEGORY,
  payload: category,
})

export const addCategorySuccess = category => ({
  type: ADD_CATEGORY_SUCCESS,
  payload: category,
})

export const addCategoryFail = error => ({
  type: ADD_CATEGORY_FAIL,
  payload: error,
})


export const updateCategory = category => ({
  type: UPDATE_CATEGORY,
  payload: category,
})

export const updateCategorySuccess = category => ({
  type: UPDATE_CATEGORY_SUCCESS,
  payload: category,
})

export const updateCategoryFail = error => ({
  type: UPDATE_CATEGORY_FAIL,
  payload: error,
})

export const deleteCategory = category => ({
  type: DELETE_CATEGORY,
  payload: category,
})

export const deleteCategorySuccess = category => ({
  type: DELETE_CATEGORY_SUCCESS,
  payload: category,
})

export const deleteCategoryFail = error => ({
  type: DELETE_CATEGORY_FAIL,
  payload: error,
})