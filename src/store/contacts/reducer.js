import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  GET_PHONEBOOK_SUCCESS,
  GET_PHONEBOOK_FAIL,
  ADD_PHONE_SUCCESS,
  ADD_PHONE_FAIL,
  GET_USERS,
  ADD_NEW_USER,
  UPDATE_USER
} from "./actionTypes"

const INIT_STATE = {
  users: [],
  userProfile: {},
  error: {},
  phone: [],
  loading: true,
  btnLoad : false
}

const contacts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ADD_NEW_USER: 
    return {
      ...state,
      btnLoad : true
    }
    
    case UPDATE_USER: 
    return {
      ...state,
      btnLoad : true
    }

    case GET_PHONEBOOK_SUCCESS:
      return {
        ...state,
        phone: action.payload,
        loading: true,
        btnLoad : false
      }

    case GET_PHONEBOOK_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad : false
      }

    case ADD_PHONE_SUCCESS:
      return {
        ...state,
        phone: [action.payload, ...state.phone],
        btnLoad : false
      }

    case ADD_PHONE_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad : false
      }

    case GET_USERS:
      return {
        ...state,
        loading: true,
        btnLoad : false
      };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false,
        btnLoad : false,
      }

    case GET_USERS_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad : false,
        btnLoad : false
      }

    case ADD_USER_SUCCESS:
      return {
        ...state,
        users: [action.payload, ...state.users],
        loading: true,
        btnLoad : false
      }

    case ADD_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad : false
      }

    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
        btnLoad : false
      }

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        btnLoad : false,
        users: state.users.map(user =>
          user.id.toString() === action.payload.id.toString()
            ? { user, ...action.payload }
            : user
        ),
      }

    case UPDATE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad : false
      }

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(
          user => user.id.toString() !== action.payload.toString()
        ),
      }

    case DELETE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_USER_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}


export default contacts
