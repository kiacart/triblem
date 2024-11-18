import {
  ADD_META_FAIL,
  ADD_META_SUCCESS,
  ADD_NEW_META,
  DELETE_META,
  DELETE_META_FAIL,
  DELETE_META_SUCCESS,
  GET_META,
  GET_META_FAIL,
  GET_META_SUCCESS,
  UPDATE_META,
  UPDATE_META_FAIL,
  UPDATE_META_SUCCESS
} from './actionTypes'


const INIT_STATE = {
  metas: [],
  error: {},
  loading: true,
  btnLoad: false
}

const metas = (state = INIT_STATE, action) => {
  switch (action.type) {


    case ADD_NEW_META:
      return {
        ...state,
        btnLoad: true
      }

    case UPDATE_META:
      return {
        ...state,
        btnLoad: true
      }

    case GET_META_SUCCESS:
      return {
        ...state,
        metas: action.payload,
        loading: true,
        btnLoad: false
      }

    case GET_META_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case ADD_META_SUCCESS:
      return {
        ...state,
        metas: [action.payload, ...state.metas],
        loading: true,
        btnLoad: false
      }

    case ADD_META_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case UPDATE_META_SUCCESS:
      return {
        ...state,
        btnLoad: false,
        metas: state.metas.map(meta =>
          meta.id.toString() === action.payload.id.toString()
            ? { meta, ...action.payload }
            : meta
        ),
      }

    case UPDATE_META_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case DELETE_META_SUCCESS:
      return {
        ...state,
        metas: state.metas.filter(
          meta => meta.id.toString() !== action.payload.toString()
        ),
      }

    case DELETE_META_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}



export default metas


