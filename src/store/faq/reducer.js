import {
  ADD_FAQ_FAIL,
  ADD_FAQ_SUCCESS,
  ADD_NEW_FAQ,
  DELETE_FAQ,
  DELETE_FAQ_FAIL,
  DELETE_FAQ_SUCCESS,
  GET_FAQ,
  GET_FAQ_FAIL,
  GET_FAQ_SUCCESS,
  UPDATE_FAQ,
  UPDATE_FAQ_FAIL,
  UPDATE_FAQ_SUCCESS
} from './actionTypes'


const INIT_STATE = {
  faqs: [],
  error: {},
  loading: true,
  btnLoad: false
}

const faqs = (state = INIT_STATE, action) => {
  switch (action.type) {

    case ADD_NEW_FAQ:
      return {
        ...state,
        btnLoad: true
      }

    case UPDATE_FAQ:
      return {
        ...state,
        btnLoad: true
      }

    case GET_FAQ_SUCCESS:
      return {
        ...state,
        faqs: action.payload,
        loading: false,
        btnLoad: false
      }

    case GET_FAQ_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case ADD_FAQ_SUCCESS:
      return {
        ...state,
        faqs: [action.payload, ...state.faqs],
        loading: true,
        btnLoad: false
      }

    case ADD_FAQ_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case UPDATE_FAQ_SUCCESS:
      return {
        ...state,
        btnLoad: false,
        faqs: state.faqs.map(faq =>
          faq.id.toString() === action.payload.id.toString()
            ? { faq, ...action.payload }
            : faq
        ),
      }

    case UPDATE_FAQ_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case DELETE_FAQ_SUCCESS:
      return {
        ...state,
        faqs: state.faqs.filter(
          faq => faq.id.toString() !== action.payload.toString()
        ),
      }

    case DELETE_FAQ_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}



export default faqs


