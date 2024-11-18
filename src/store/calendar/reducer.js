import {
  GET_EVENTS_SUCCESS,
  GET_EVENTS_FAIL,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAIL,
  UPDATE_EVENT_SUCCESS,
  UPDATE_EVENT_FAIL,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  ADD_CATEGORY_SUCCESS,
  ADD_CATEGORY_FAIL,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  events: [],
  categories: [],
  error: {},
  loading : true 
};

const Calendar = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload,
      };

    case GET_EVENTS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        events: [...state.events, action.payload],
      };

    case ADD_EVENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_EVENT_SUCCESS:
      return {
        ...state,
        events: state.events.map(event =>
          event.id.toString() === action.payload.id.toString()
            ? { event, ...action.payload }
            : event
        ),
      };

    case UPDATE_EVENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_EVENT_SUCCESS:
      return {
        ...state,
        events: state.events.filter(
          event => event.id.toString() !== action.payload.toString()
        ),
      };

    case DELETE_EVENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false
      };

    case GET_CATEGORIES_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [action.payload, ...state.categories],
        loading: true
      }

    case ADD_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id.toString() === action.payload.id.toString()
            ? { category, ...action.payload }
            : category
        ),
      }

    case UPDATE_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(
          category => category.id.toString() !== action.payload.toString()
        ),
      }

    case DELETE_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      }



    default:
      return state;
  }
};

export default Calendar;
