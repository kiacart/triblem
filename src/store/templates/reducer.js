import {
  GET_TEMPLATES_FAIL,
  GET_TEMPLATES_SUCCESS,
  GET_TEMPLATES_DETAIL_FAIL,
  GET_TEMPLATES_DETAIL_SUCCESS,
  UPDATE_TEMPLATES_SUCCESS,
  UPDATE_TEMPLATES_FAIL,
  DELETE_TEMPLATES_SUCCESS,
  DELETE_TEMPLATES_FAIL,
  ADD_NEW_TEMPLATES,
  ADD_TEMPLATES_SUCCESS,
  ADD_TEMPLATES_FAIL,
  GET_TEMPLATES,
  UPDATE_TEMPLATES
} from "./actionTypes";

const INIT_STATE = {
  templates: [],
  templateDetail: {},
  error: {},
  loading: true,
  btnLoad: false
};

const templates = (state = INIT_STATE, action) => {
  switch (action.type) {


    case ADD_NEW_TEMPLATES:
      return {
        ...state,
        btnLoad: true
      }

    case UPDATE_TEMPLATES:
      return {
        ...state,
        btnLoad: true
      }

    case GET_TEMPLATES_SUCCESS:
      return {
        ...state,
        templates: action.payload,
        loading: false,
        btnLoad: false,
      };

    case ADD_TEMPLATES_SUCCESS:
      return {
        ...state,
        templates: [
          action.payload,
          ...state.templates,
        ],
        loading: true,
        btnLoad: false,
      }

    case ADD_TEMPLATES_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case GET_TEMPLATES_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false,
      };

    case GET_TEMPLATES_DETAIL_SUCCESS:
      return {
        ...state,
        templateDetail: action.payload,
        btnLoad: false,
      };

    case UPDATE_TEMPLATES_SUCCESS:
      return {
        ...state,
        btnLoad: false,
        templates: state.templates.map(template =>
          template.id.toString() === action.payload.id.toString()
            ? { template, ...action.payload }
            : template
        ),
      };

    case UPDATE_TEMPLATES_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false,
      };

    case DELETE_TEMPLATES_SUCCESS:
      return {
        ...state,
        templates: state.templates.filter(
          template => template.id.toString() !== action.payload.toString()
        ),
      };

    case DELETE_TEMPLATES_FAIL:
      return {
        ...state,
        error: action.payload,
      };


    case GET_TEMPLATES_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default templates;
