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

export const getTestimonials = (id) => ({
    type: GET_TESTIMONIAL,
    id
  })
  
  export const getTestimonialsSuccess = testimonials => ({
    type: GET_TESTIMONIAL_SUCCESS,
    payload: testimonials,
  })
  
  export const addNewTestimonial = testimonial => ({
    type: ADD_NEW_TESTIMONIAL,
    payload: testimonial,
  })
  
  export const addTestimonialSuccess = testimonial => ({
    type: ADD_TESTIMONIAL_SUCCESS,
    payload: testimonial,
  })
  
  export const addTestimonialFail = error => ({
    type: ADD_TESTIMONIAL_FAIL,
    payload: error,
  })
  
  export const getTestimonialsFail = error => ({
    type: GET_TESTIMONIAL_FAIL,
    payload: error,
  })
  
  export const updateTestimonial = testimonial => ({
    type: UPDATE_TESTIMONIAL,
    payload: testimonial,
  })
  
  export const updateTestimonialSuccess = testimonial => ({
    type: UPDATE_TESTIMONIAL_SUCCESS,
    payload: testimonial,
  })
  
  export const updateTestimonialFail = error => ({
    type: UPDATE_TESTIMONIAL_FAIL,
    payload: error,
  })
  
  export const deleteTestimonial = testimonial => ({
    type: DELETE_TESTIMONIAL,
    payload: testimonial,
  })
  
  export const deleteTestimonialSuccess = testimonial => ({
    type: DELETE_TESTIMONIAL_SUCCESS,
    payload: testimonial,
  })
  
  export const deleteTestimonialFail = error => ({
    type: DELETE_TESTIMONIAL_FAIL,
    payload: error,
  })
  
