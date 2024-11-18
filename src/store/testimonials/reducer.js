import {
  ADD_TESTIMONIAL_FAIL,
  ADD_TESTIMONIAL_SUCCESS,
  ADD_NEW_TESTIMONIAL,
  DELETE_TESTIMONIAL,
  DELETE_TESTIMONIAL_FAIL,
  DELETE_TESTIMONIAL_SUCCESS,
  GET_TESTIMONIAL,
  GET_TESTIMONIAL_FAIL,
  GET_TESTIMONIAL_SUCCESS,
  UPDATE_TESTIMONIAL,
  UPDATE_TESTIMONIAL_FAIL,
  UPDATE_TESTIMONIAL_SUCCESS
} from './actionTypes'


const INIT_STATE = {
  testimonials: [],
  error: {},
  loading: true,
  btnLoad: false
}

const testimonials = (state = INIT_STATE, action) => {
  switch (action.type) {

    case ADD_NEW_TESTIMONIAL:
      return {
        ...state,
        btnLoad: true
      }

    case UPDATE_TESTIMONIAL:
      return {
        ...state,
        btnLoad: true
      }

    case GET_TESTIMONIAL_SUCCESS:
      return {
        ...state,
        testimonials: action.payload,
        loading: false,
        btnLoad: false
      }

    case GET_TESTIMONIAL_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case ADD_TESTIMONIAL_SUCCESS:
      return {
        ...state,
        testimonials: [action.payload, ...state.testimonials],
        loading: true,
        btnLoad: false
      }

    case ADD_TESTIMONIAL_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case UPDATE_TESTIMONIAL_SUCCESS:
      return {
        ...state,
        btnLoad: false,
        testimonials: state.testimonials.map(testimonial =>
          testimonial.id.toString() === action.payload.id.toString()
            ? { testimonial, ...action.payload }
            : testimonial
        ),
      }

    case UPDATE_TESTIMONIAL_FAIL:
      return {
        ...state,
        error: action.payload,
        btnLoad: false
      }

    case DELETE_TESTIMONIAL_SUCCESS:
      return {
        ...state,
        testimonials: state.testimonials.filter(
          testimonial => testimonial.id.toString() !== action.payload.toString()
        ),
      }

    case DELETE_TESTIMONIAL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}



export default testimonials


