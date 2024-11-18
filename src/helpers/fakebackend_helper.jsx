import axios from "axios";
import { del, get, post, put } from "./api_helper";
import * as url from "./url_helper"; 

//apply base url for axios
const API_URL = import.meta.env.VITE_APP_APIKEY ?? "";

const axiosApi = axios.create({
  baseURL: API_URL,
});

// axiosApi.interceptors.request.use((config) => {
//   let token = JSON.parse(localStorage.getItem("authUser"))?.access_token ??  ''; 
//   if (typeof window !== 'undefined'){
//       hostname = window.location.hostname;
//   }
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config
// },(error) => {
//   return Promise.reject(error);
// })



// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};


// Register Method
const postFakeRegister = data => {
  return axiosApi
    .post(url.POST_FAKE_REGISTER, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data;
      throw response.data;
    })
    .catch(err => {
      let message;
      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found";
            break;
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team";
            break;
          case 401:
            message = "Invalid credentials";
            break;
          default:
            message = err[1];
            break;
        }
      }
      throw message;
    });
};

// Login Method
const postFakeLogin = data => post(url.POST_FAKE_LOGIN, data);

// postForgetPwd
const postFakeForgetPwd = data => post(url.POST_FAKE_PASSWORD_FORGET, data);

// Edit profile
const postJwtProfile = data => post(url.POST_EDIT_JWT_PROFILE, data);

const postFakeProfile = data => post(url.POST_EDIT_PROFILE, data);

// Register Method
const postJwtRegister = (url, data) => {
  return axiosApi
    .post(url, data)
    .then(response => {
      if (response.status >= 200 || response.status <= 299) return response.data;
      throw response.data;
    })
    .catch(err => {
      var message;

      if (err.response && err.response.status) {
        switch (err.response.status) {
          case 404:
            message = "Sorry! the page you are looking for could not be found";
            break;
          case 500:
            message =
              "Sorry! something went wrong, please contact our support team";
            break;
          case 401:
            message = "Invalid credentials";
            break;
          default:
            message = err[1];
            break;
        }
      }
      return err?.response?.data ??  message;
    });
};

// Login Method
const postJwtLogin = data => post(url.POST_FAKE_JWT_LOGIN, data);

// postForgetPwd
const postJwtForgetPwd = data => post(url.POST_FAKE_JWT_PASSWORD_FORGET, data);

// postSocialLogin
export const postSocialLogin = data => post(url.SOCIAL_LOGIN, data);


// get Events
export const getEvents = () => get(url.GET_EVENTS);

// add Events
export const addNewEvent = event => post(url.ADD_NEW_EVENT, event);

// update Event
export const updateEvent = event => put(url.UPDATE_EVENT, event);

// delete Event
export const deleteEvent = event =>
  del(url.DELETE_EVENT, { headers: { event } });

// get Categories
export const getCategories = () => get(url.GET_TEMPLATE_CATEGORY); 

// Add Categories 
export const addNewCategory = cat => post(url.GET_TEMPLATE_CATEGORY, cat); 

//Email Chart
export const getDashboardEmailChart = (chartType) => get(`${url.GET_DASHBOARD_EMAILCHART}/${chartType}`, { param: chartType });

// get chats
export const getChats = () => get(url.GET_CHATS);

// get groups
export const getGroups = () => get(url.GET_GROUPS);

// get Contacts
export const getContacts = () => get(url.GET_CONTACTS);

// get messages
export const getMessages = (roomId) => get(`${url.GET_MESSAGES}/${roomId}`, { params: { roomId } });

// post messages
export const getselectedmails = (selectedmails) => post(url.GET_SELECTED_MAILS, selectedmails);

//post setfolderonmails
export const setfolderonmails = (selectedmails, folderId, activeTab) => post(url.SET_FOLDER_SELECTED_MAILS, { selectedmails, folderId, activeTab });


// get customers
export const getCustomers = () => get(url.GET_CUSTOMERS);

// add CUSTOMER
export const addNewCustomer = customer => post(url.ADD_NEW_CUSTOMER, customer);

// update CUSTOMER
export const updateCustomer = customer => put(url.UPDATE_CUSTOMER, customer);

// delete CUSTOMER
export const deleteCustomer = customer =>
  del(url.DELETE_CUSTOMER, { headers: { customer } });


// get contacts
export const getUsers = () => get(url.GET_USERS); 

// Phone Book 
export const getPhoneBooks = () => get(url.GET_PHONEBOOK); 

// add phone
export const addNewPhoneBooks = phone => post(url.GET_PHONEBOOK , phone); 

// add user
export const addNewUser = user => post(url.GET_USERS, user);

// update user
export const updateUser = user => post(url.UPDATE_USER, user);

// delete user
export const deleteUser = id => get(`${url.DELETE_USER}/${id}`);


export const getUserProfile = () => get(url.GET_USER_PROFILE);

// get maillist
export const getMailsLists = filter => post(url.GET_MAILS_LIST, { params: filter });

//update mail
export const deleteMail = (mail) => del(url.DELETE_MAIL, { headers: { mail } });
export const trashMail = (mail) => del(url.TRASH_MAIL, { headers: { mail } })
export const staredMail = (mail) => del(url.STARED_MAIL, { headers: { mail } })
export const getMailsListsId = ((id) => get(`${url.GET_MAILS_ID}/${id}`, { params: { id } }))

// get folderlist
export const selectFolders = () => get(url.SELECT_FOLDER);

// post messages
export const addMessage = message => post(url.ADD_MESSAGE, message);
// delete message
export const deleteMessage = data => del(url.DELETE_MESSAGE, { headers: { data } });



export const visitorData = roomId => get(`${url.GET_VISITOR_DATA}/${roomId}`, { params: { roomId } });

export const topSellingData = month =>
  get(`${url.TOP_SELLING_DATA}/${month}`, { params: { month } });

const onLikeComment = (commentId, productId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}`, {
    params: { commentId, productId },
  });
};
const onLikeReply = (commentId, productId, replyId) => {
  return post(`${url.ON_LIKNE_COMMENT}/${productId}/${commentId}/${replyId}`, {
    params: { commentId, productId, replyId },
  });
};

const onAddReply = (commentId, productId, replyText) => {
  return post(`${url.ON_ADD_REPLY}/${productId}/${commentId}`, {
    params: { commentId, productId, replyText },
  });
};

const onAddComment = (productId, commentText) => {
  return post(`${url.ON_ADD_COMMENT}/${productId}`, {
    params: { productId, commentText },
  });
};

// lang 
export const getLanguage = () => get(url.GET_LANGUAGE);  
export const addNewLanguage = lang => post(url.GET_LANGUAGE, lang); 

// TEmplete 
export const getTemcategory = () => get(url.GET_TEMPLATE_CATEGORY); 
export const getlanguageApi = () => get(url.GET_LANGUAGE);  
export const deleteTemplate = template => get(`${url.DELETE_TEMPLATES}/${template}`); 
export const updateTemplate = template => put(url.UPDATE_TEMPLATES, template);
export const addTemplate = template =>  post(url.ADD_TEMPLATE, template);
export const getTemplates = (id) => get(url.GET_TEMPLATES+'/'+id);  
export const getTemplateDetails = id =>
  get(`${url.GET_TEMPLATES_DETAIL}/${id}`, { params: { id } });

// Broadcast
export const deleteBroadcast = broadcast => del(url.DELETE_BROADCASTS, { headers: { broadcast } }); 
export const updateBroadcast = broadcast => put(url.UPDATE_BROADCASTS, broadcast);
export const addBroadcast = broadcast =>  post(url.ADD_BROADCAST, broadcast);
export const getBroadcasts = () => get(url.GET_BROADCASTS);  
export const getBroadcastDetails = id =>
  get(`${url.GET_BROADCASTS_DETAIL}/${id}`, { params: { id } });

// meta 
export const getMetas = (id) => get(`${url.GET_METAS}/${id}`); 
export const addNewMeta = meta => post(url.GET_METAS, meta); 
export const updateMeta = meta => post(url.UPADTE_METAS, meta); 

// Plans
export const getPlan = (id) => get(`${url.GET_PLANS}`); 
export const addNewPlan = plan => post(url.GET_PLANS, plan); 
export const updatePlan = plan => post(url.UPADTE_PLAN, plan); 
export const deletePlan = plan => get(`${url.DELETE_PLAN}/${plan}`); 

// Service
export const getService = (id) => get(`${url.GET_SERVICE}`); 
export const addNewService = service => post(url.GET_SERVICE, service); 
export const updateService = service => post(url.UPADTE_SERVICE, service); 
export const deleteService = service => get(`${url.DELETE_SERVICE}/${service}`); 

// Testimonials
export const getTestimonial = (id) => get(`${url.GET_TESTIMONIAL}`); 
export const addNewTestimonial = testimonial => post(url.GET_TESTIMONIAL, testimonial); 
export const updateTestimonial = testimonial => post(url.UPADTE_TESTIMONIAL, testimonial); 
export const deleteTestimonial = testimonial => get(`${url.DELETE_TESTIMONIAL}/${testimonial}`); 

// getTemplateLibrary, addNewTemplateLibrary, deleteTemplateLibrary , updateTemplateLibrary, getCategoryl, addNewCategoryl, deleteCategoryl , updateCategoryl

// Template Library
export const getTemplateLibrary = (id) => get(`${url.GET_LIBRARY}`); 
export const addNewTemplateLibrary = library => post(url.GET_LIBRARY, library); 
export const updateTemplateLibrary = library => post(url.UPADTE_LIBRARY, library); 
export const deleteTemplateLibrary = library => get(`${url.DELETE_LIBRARY}/${library}`); 

// Template Library Categories
export const getCategoryl = (id) => get(`${url.GET_CATEGORYL}`); 
export const addNewCategoryl = category => post(url.GET_CATEGORYL, category); 
export const updateCategoryl = category => post(url.UPADTE_CATEGORYL, category); 
export const deleteCategoryl = category => get(`${url.DELETE_CATEGORYL}/${category}`); 



// Faq
export const getFaq = (id) => get(`${url.GET_FAQS}`); 
export const addNewFaq = faq => post(url.GET_FAQS, faq); 
export const updateFaq = faq => post(url.UPADTE_FAQ, faq); 
export const deleteFaq = faq => get(`${url.DELETE_FAQ}/${faq}`); 

// Book Demo
export const getDemo = (id) => get(`${url.GET_DEMOS}`); 
export const addNewDemo = demo => post(url.GET_DEMOS, demo); 
export const updateDemo = demo => post(url.UPADTE_DEMO, demo); 

// Banner
export const getBanner = (id) => get(`${url.GET_BANNERS}`); 
export const addNewBanner = banner => post(url.GET_BANNERS, banner); 
export const deleteBanner = banner => get(`${url.DELETE_BANNER}/${banner}`); 

// Client
export const getClient = (id) => get(`${url.GET_CLIENT}`); 
export const addNewClient = client => post(url.GET_CLIENT, client); 
export const deleteClient = client => get(`${url.DELETE_CLIENT}/${client}`); 


// agent 
export const getAgent = (id) => get(`${url.GET_AGENT}/${id}`); 
export const addNewAgent = meta => post(url.ADD_AGENT, meta); 

// user 
export const getCurrentUser = (id) => get(`${url.GET_CURRENT_USER}/${id}`); 

export {
  getLoggedInUser,
  isUserAuthenticated,
  postFakeRegister,
  postFakeLogin,
  postFakeProfile,
  postFakeForgetPwd,
  postJwtRegister,
  postJwtLogin,
  postJwtForgetPwd,
  postJwtProfile,
  onLikeComment,
  onLikeReply,
  onAddReply,
  onAddComment,
};