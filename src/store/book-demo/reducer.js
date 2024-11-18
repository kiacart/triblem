import {
  ADD_DEMO_FAIL,
  ADD_DEMO_SUCCESS,
  ADD_NEW_DEMO,
  DELETE_DEMO,
  DELETE_DEMO_FAIL,
  DELETE_DEMO_SUCCESS,
  GET_DEMO,
  GET_DEMO_FAIL,
  GET_DEMO_SUCCESS,
  UPDATE_DEMO,
  UPDATE_DEMO_FAIL,
  UPDATE_DEMO_SUCCESS
} from './actionTypes'


const INIT_STATE = {
  demos: [],
  error: {},
  loading: true,
  btnLoad: false
}

const demos = (state = INIT_STATE, action) => {
  switch (action.type) {

    case ADD_NEW_DEMO:
      return {
        ...state,
        btnLoad: true
      }

    case UPDATE_DEMO:
      return {
        ...state,
        btnLoad: true
      }

    case GET_DEMO_SUCCESS:
      return {
        ...state,
        demos: action.payload,
        loading: false,
        btnLoad: false
      }

    case GET_DEMO_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case ADD_DEMO_SUCCESS:
      return {
        ...state,
        demos: [action.payload, ...state.demos],
        loading: true,
        btnLoad: false
      }

    case ADD_DEMO_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case UPDATE_DEMO_SUCCESS:
      return {
        ...state,
        btnLoad: false,
        demos: state.demos.map(demo =>
          demo.id.toString() === action.payload.id.toString()
            ? { demo, ...action.payload }
            : demo
        ),
      }

    case UPDATE_DEMO_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case DELETE_DEMO_SUCCESS:
      return {
        ...state,
        demos: state.demos.filter(
          demo => demo.id.toString() !== action.payload.toString()
        ),
      }

    case DELETE_DEMO_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}



export default demos


