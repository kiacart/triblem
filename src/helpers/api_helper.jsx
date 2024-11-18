import axios from "axios";
import accessToken from "./jwt-token-access/accessToken";

// pass new generated access token here
const token = accessToken;
// const token = JSON.parse(localStorage.getItem("authUser"))?.access_token;

//apply base url for axios
const API_URL = import.meta.env.VITE_APP_APIKEY ?? "";

const axiosApi = axios.create({
  baseURL: API_URL,
});

// axiosApi.defaults.headers.common["Authorization"] = token; 
// axiosApi.interceptors.response.use(
//   (response) => response,
//   (error) => Promise.reject(error)
// );

axiosApi.interceptors.request.use((config) => {
  let token = JSON.parse(localStorage.getItem("authUser"))?.access_token ??  ''; 
  if (typeof window !== 'undefined'){
      // hostname = window.location.hostname;
  }
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config
},(error) => {
  return Promise.reject(error);
})

export async function get(url, config = {}) {
  return await axiosApi
    .get(url, { ...config } )
    .then((response) => response.data).catch(err => {
      if(err?.response?.data?.response?.error?.message == 'Token has expired') {
        document.getElementById('throwlogoutpage')?.click()
      }else {
        throw Error
      }
    });
}

export async function post(url, data, config = {}) { 
  if(data?.fomdata) { 
    var formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if(key != 'fomdata') {
        formData.append(key, value);
      }
    });
    return axiosApi
      .post(url, formData, { ...config })
      .then((response) => response.data);
  }else {
    return axiosApi
    .post(url, {...data}, { ...config })
    .then((response) => response.data);
  }
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data);
}
