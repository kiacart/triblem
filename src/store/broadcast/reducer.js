import {
  GET_BROADCAST_FAIL,
  GET_BROADCAST_SUCCESS,
  GET_BROADCAST_DETAIL_FAIL,
  GET_BROADCAST_DETAIL_SUCCESS,
  UPDATE_BROADCAST_SUCCESS,
  UPDATE_BROADCAST_FAIL,
  DELETE_BROADCAST_SUCCESS,
  DELETE_BROADCAST_FAIL,
  ADD_NEW_BROADCAST,
  UPDATE_BROADCAST,
  ADD_BROADCAST_SUCCESS,
  ADD_BROADCAST_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  boradcast: [],
  broadcastDetail: {},
  error: {},
  loading: true,
  btnLoad: false
};

const boradcast = (state = INIT_STATE, action) => {
  switch (action.type) {

    case ADD_NEW_BROADCAST:
      return {
        ...state,
        btnLoad: true
      }

    case UPDATE_BROADCAST:
      return {
        ...state,
        btnLoad: true
      }
    case ADD_BROADCAST_SUCCESS:
      return {
        ...state,
        btnLoad: false,
        // boradcast: [action.payload, ...state.boradcast],
      }

    case ADD_BROADCAST_FAIL:
      return {
        ...state,
        btnLoad: false,
        error: action.payload,
      }

    case GET_BROADCAST_SUCCESS:
      return {
        ...state,
        loading: true,
        btnLoad: false,
        boradcast: action.payload,
      };

    case GET_BROADCAST_FAIL:
      return {
        ...state,
        btnLoad: false,
        error: action.payload,
      };

    case GET_BROADCAST_DETAIL_SUCCESS:
      return {
        ...state,
        btnLoad: false,
        broadcastDetail: action.payload,
      };

    case UPDATE_BROADCAST_SUCCESS:
      return {
        ...state,
        btnLoad: false,
        boradcast: state.boradcast.map(broadcast =>
          broadcast.id.toString() === action.payload.id.toString()
            ? { broadcast, ...action.payload }
            : broadcast
        ),
      };

    case UPDATE_BROADCAST_FAIL:
      return {
        ...state,
        btnLoad: false,
        error: action.payload,
      };

    case DELETE_BROADCAST_SUCCESS:
      return {
        ...state,
        boradcast: state.boradcast.filter(
          broadcast => broadcast.id.toString() !== action.payload.toString()
        ),
      };

    case DELETE_BROADCAST_FAIL:
      return {
        ...state,
        error: action.payload,
      };


    case GET_BROADCAST_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default boradcast;
