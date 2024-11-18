import {
  ADD_TEMPLATELIBRARY_FAIL,
  ADD_TEMPLATELIBRARY_SUCCESS,
  ADD_NEW_TEMPLATELIBRARY,
  DELETE_TEMPLATELIBRARY,
  DELETE_TEMPLATELIBRARY_FAIL,
  DELETE_TEMPLATELIBRARY_SUCCESS,
  GET_TEMPLATELIBRARY,
  GET_TEMPLATELIBRARY_FAIL,
  GET_TEMPLATELIBRARY_SUCCESS,
  UPDATE_TEMPLATELIBRARY,
  UPDATE_TEMPLATELIBRARY_FAIL,
  UPDATE_TEMPLATELIBRARY_SUCCESS,
  ADD_LIBRARY_CATEGORY_FAIL,
  ADD_LIBRARY_CATEGORY_SUCCESS,
  ADD_NEW_LIBRARY_CATEGORY,
  DELETE_LIBRARY_CATEGORY,
  DELETE_LIBRARY_CATEGORY_FAIL,
  DELETE_LIBRARY_CATEGORY_SUCCESS,
  GET_LIBRARY_CATEGORY,
  GET_LIBRARY_CATEGORY_FAIL,
  GET_LIBRARY_CATEGORY_SUCCESS,
  UPDATE_LIBRARY_CATEGORY,
  UPDATE_LIBRARY_CATEGORY_FAIL,
  UPDATE_LIBRARY_CATEGORY_SUCCESS
} from './actionTypes'


const INIT_STATE = {
  libary: [],
  category : [],
  error: {},
  loading: true,
  btnLoad: false
}

const TemplateLibrary = (state = INIT_STATE, action) => {
  switch (action.type) {

    case ADD_NEW_TEMPLATELIBRARY:
      return {
        ...state,
        btnLoad: true
      }

    case UPDATE_TEMPLATELIBRARY:
      return {
        ...state,
        btnLoad: true
      }
    case GET_TEMPLATELIBRARY_SUCCESS:
      return {
        ...state,
        libary: action.payload,
        loading: false,
        btnLoad: false
      }

    case GET_TEMPLATELIBRARY_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case ADD_TEMPLATELIBRARY_SUCCESS:
      return {
        ...state,
        libary: [action.payload, ...state.libary],
        loading: true,
        btnLoad: false
      }

    case ADD_TEMPLATELIBRARY_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case UPDATE_TEMPLATELIBRARY_SUCCESS:
      return {
        ...state,
        btnLoad: false,
        libary: state.libary.map(libary =>
          libary.id.toString() === action.payload.id.toString()
            ? { libary, ...action.payload }
            : libary
        ),
      }

    case UPDATE_TEMPLATELIBRARY_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case DELETE_TEMPLATELIBRARY_SUCCESS:
      return {
        ...state,
        libary: state.libary.filter(
          libary => libary.id.toString() !== action.payload.toString()
        ),
      }

    case DELETE_TEMPLATELIBRARY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

      case ADD_NEW_LIBRARY_CATEGORY:
      return {
        ...state,
        btnLoad: true
      }

    case UPDATE_LIBRARY_CATEGORY:
      return {
        ...state,
        btnLoad: true
      }
    case GET_LIBRARY_CATEGORY_SUCCESS:
      return {
        ...state,
        category: action.payload,
        loading: false,
        btnLoad: false
      }

    case GET_LIBRARY_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case ADD_LIBRARY_CATEGORY_SUCCESS:
      return {
        ...state,
        category: [action.payload, ...state.category],
        loading: true,
        btnLoad: false
      }

    case ADD_LIBRARY_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case UPDATE_LIBRARY_CATEGORY_SUCCESS:
      return {
        ...state,
        btnLoad: false,
        category: state.category.map(category =>
          category.id.toString() === action.payload.id.toString()
            ? { category, ...action.payload }
            : category
        ),
      }

    case UPDATE_LIBRARY_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case DELETE_LIBRARY_CATEGORY_SUCCESS:
      return {
        ...state,
        category: state.category.filter(
          category => category.id.toString() !== action.payload.toString()
        ),
      }

    case DELETE_LIBRARY_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}



export default TemplateLibrary


