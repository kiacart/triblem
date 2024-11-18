import {
  ADD_PLAN_FAIL,
  ADD_PLAN_SUCCESS,
  ADD_NEW_PLAN,
  DELETE_PLAN,
  DELETE_PLAN_FAIL,
  DELETE_PLAN_SUCCESS,
  GET_PLAN,
  GET_PLAN_FAIL,
  GET_PLAN_SUCCESS,
  UPDATE_PLAN,
  UPDATE_PLAN_FAIL,
  UPDATE_PLAN_SUCCESS
} from './actionTypes'


const INIT_STATE = {
  plans: [],
  error: {},
  loading: true,
  btnLoad: false
}

const plans = (state = INIT_STATE, action) => {
  switch (action.type) {

    case ADD_NEW_PLAN:
      return {
        ...state,
        btnLoad: true
      }

    case UPDATE_PLAN:
      return {
        ...state,
        btnLoad: true
      }
    case GET_PLAN_SUCCESS:
      return {
        ...state,
        plans: action.payload,
        loading: false,
        btnLoad: false
      }

    case GET_PLAN_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case ADD_PLAN_SUCCESS:
      return {
        ...state,
        plans: [action.payload, ...state.plans],
        loading: true,
        btnLoad: false
      }

    case ADD_PLAN_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case UPDATE_PLAN_SUCCESS:
      return {
        ...state,
        btnLoad: false,
        plans: state.plans.map(plan =>
          plan.id.toString() === action.payload.id.toString()
            ? { plan, ...action.payload }
            : plan
        ),
      }

    case UPDATE_PLAN_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case DELETE_PLAN_SUCCESS:
      return {
        ...state,
        plans: state.plans.filter(
          plan => plan.id.toString() !== action.payload.toString()
        ),
      }

    case DELETE_PLAN_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}



export default plans


