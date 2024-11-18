import {
  ADD_LANGUAGE_FAIL,
  ADD_LANGUAGE_SUCCESS,
  ADD_NEW_LANGUAGE,
  DELETE_LANGUAGE,
  DELETE_LANGUAGE_FAIL,
  DELETE_LANGUAGE_SUCCESS,
  GET_LANGUAGE,
  GET_LANGUAGE_FAIL,
  GET_LANGUAGE_SUCCESS,
  UPDATE_LANGUAGE,
  UPDATE_LANGUAGE_FAIL,
  UPDATE_LANGUAGE_SUCCESS
} from './actionTypes'


const INIT_STATE = {
  language: [],
  error: {},
  loading: true,
  btnLoad: false
}

const language = (state = INIT_STATE, action) => {
  switch (action.type) {


    case ADD_NEW_LANGUAGE:
      return {
        ...state,
        btnLoad: true
      }

    case UPDATE_LANGUAGE:
      return {
        ...state,
        btnLoad: true
      }

    case GET_LANGUAGE_SUCCESS:
      return {
        ...state,
        language: action.payload,
        loading: false
      }

    case GET_LANGUAGE_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case ADD_LANGUAGE_SUCCESS:
      return {
        ...state,
        language: [action.payload, ...state.language],
        loading: true,
        btnLoad: false
      }

    case ADD_LANGUAGE_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case UPDATE_LANGUAGE_SUCCESS:
      return {
        ...state,
        btnLoad: false,
        language: state.language.map(language =>
          language.id.toString() === action.payload.id.toString()
            ? { language, ...action.payload }
            : language
        ),
      }

    case UPDATE_LANGUAGE_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case DELETE_LANGUAGE_SUCCESS:
      return {
        ...state,
        language: state.language.filter(
          language => language.id.toString() !== action.payload.toString()
        ),
      }

    case DELETE_LANGUAGE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}



export default language


