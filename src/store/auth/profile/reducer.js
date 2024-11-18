import {
  PROFILE_ERROR, PROFILE_SUCCESS, EDIT_PROFILE, RESET_PROFILE_FLAG,
  GET_CURRENT_USER,
  GET_CURRENT_USER_FAIL,
  GET_CURRENT_USER_SUCCESS,
  UPDATE_CURRENT_USER,
  UPDATE_CURRENT_USER_FAIL,
  UPDATE_CURRENT_USER_SUCCESS
} from "./actionTypes";

const initialState = {
  error: "",
  success: "",
  user: {},
  loading: true
};

const profile = (state = initialState, action) => {
  switch (action.type) {

    case GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: true
      }

    case GET_CURRENT_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: state.user.map(user =>
          user.id.toString() === action.payload.id.toString()
            ? { user, ...action.payload }
            : user
        ),
        // user : {...state.user, ...action.payload}
      }

    case UPDATE_CURRENT_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case EDIT_PROFILE:
      state = { ...state };
      break;
    case PROFILE_SUCCESS:
      state = { ...state, success: action.payload };
      break;
    case PROFILE_ERROR:
      state = { ...state, error: action.payload };
      break;
    case RESET_PROFILE_FLAG:
      state = { ...state, success: null };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default profile;
