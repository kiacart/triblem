import {
  ADD_AGENT_FAIL,
  ADD_AGENT_SUCCESS,
  ADD_NEW_AGENT,
  DELETE_AGENT,
  DELETE_AGENT_FAIL,
  DELETE_AGENT_SUCCESS,
  GET_AGENT,
  GET_AGENT_FAIL,
  GET_AGENT_SUCCESS,
  UPDATE_AGENT,
  UPDATE_AGENT_FAIL,
  UPDATE_AGENT_SUCCESS
} from './actionTypes'


const INIT_STATE = {
  agents: [],
  error: {},
  loading: true,
  btnLoad: false
}

const agents = (state = INIT_STATE, action) => {
  switch (action.type) {


    case ADD_NEW_AGENT:
      return {
        ...state,
        btnLoad: true
      }

    case UPDATE_AGENT:
      return {
        ...state,
        btnLoad: true
      }

    case GET_AGENT_SUCCESS:
      return {
        ...state,
        agents: action.payload,
        loading: false,
        btnLoad: false
      }

    case GET_AGENT_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case ADD_AGENT_SUCCESS:
      return {
        ...state,
        agents: [action.payload, ...state.agents],
        loading: true,
        btnLoad: false
      }

    case ADD_AGENT_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case UPDATE_AGENT_SUCCESS:
      return {
        ...state,
        btnLoad: false,
        agents: state.agents.map(agent =>
          agent.id.toString() === action.payload.id.toString()
            ? { agent, ...action.payload }
            : agent
        ),
      }

    case UPDATE_AGENT_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case DELETE_AGENT_SUCCESS:
      return {
        ...state,
        agents: state.agents.filter(
          agent => agent.id.toString() !== action.payload.toString()
        ),
      }

    case DELETE_AGENT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}



export default agents


