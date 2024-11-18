import {
ADD_BANNER_FAIL,
ADD_BANNER_SUCCESS,
ADD_NEW_BANNER,
DELETE_BANNER,
DELETE_BANNER_FAIL,
DELETE_BANNER_SUCCESS,
GET_BANNER,
GET_BANNER_FAIL,
GET_BANNER_SUCCESS,
UPDATE_BANNER,
UPDATE_BANNER_FAIL,
UPDATE_BANNER_SUCCESS
} from './actionTypes'

export const getBanners = (id) => ({
    type: GET_BANNER,
    id
  })
  
  export const getBannersSuccess = banners => ({
    type: GET_BANNER_SUCCESS,
    payload: banners,
  })
  
  export const addNewBanner = banner => ({
    type: ADD_NEW_BANNER,
    payload: banner,
  })
  
  export const addBannerSuccess = banner => ({
    type: ADD_BANNER_SUCCESS,
    payload: banner,
  })
  
  export const addBannerFail = error => ({
    type: ADD_BANNER_FAIL,
    payload: error,
  })
  
  export const getBannersFail = error => ({
    type: GET_BANNER_FAIL,
    payload: error,
  })
  
  export const updateBanner = banner => ({
    type: UPDATE_BANNER,
    payload: banner,
  })
  
  export const updateBannerSuccess = banner => ({
    type: UPDATE_BANNER_SUCCESS,
    payload: banner,
  })
  
  export const updateBannerFail = error => ({
    type: UPDATE_BANNER_FAIL,
    payload: error,
  })
  
  export const deleteBanner = banner => ({
    type: DELETE_BANNER,
    payload: banner,
  })
  
  export const deleteBannerSuccess = banner => ({
    type: DELETE_BANNER_SUCCESS,
    payload: banner,
  })
  
  export const deleteBannerFail = error => ({
    type: DELETE_BANNER_FAIL,
    payload: error,
  })
  
