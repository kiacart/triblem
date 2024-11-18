//REGISTER
export const POST_FAKE_REGISTER = "/post-fake-register";

//LOGIN
export const POST_FAKE_LOGIN = "/post-fake-login";
// export const POST_FAKE_JWT_LOGIN = "/post-jwt-login";
export const POST_FAKE_JWT_LOGIN = "/auth/login";
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const SOCIAL_LOGIN = "/social-login";

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
export const POST_EDIT_PROFILE = "/post-fake-profile";

// TEMPLATE 
export const GET_TEMPLATE_CATEGORY = "/v1/templatecategory";

// language
export const GET_LANGUAGE = "/v1/templatelanguage";

//Mails
export const GET_MAILS_LIST = "/mailslists";
export const SELECT_FOLDER = "/folders";
export const GET_SELECTED_MAILS = "/selectedmails";
export const SET_FOLDER_SELECTED_MAILS = "/setfolderonmail";
export const DELETE_MAIL = "/delete/mail";
export const TRASH_MAIL = "/trash/mail";
export const STARED_MAIL = "/stared/mail";
export const GET_MAILS_ID = "/mail:id"

//CALENDER
export const GET_EVENTS = "/events";
export const ADD_NEW_EVENT = "/add/event";
export const UPDATE_EVENT = "/update/event";
export const DELETE_EVENT = "/delete/event";
export const GET_CATEGORIES = "/categories";

//CHATS
export const GET_CHATS = "/chats";
export const GET_GROUPS = "/groups";
export const GET_CONTACTS = "/contacts";
export const GET_MESSAGES = "/messages";
export const ADD_MESSAGE = "/add/messages";
export const DELETE_MESSAGE = "/delete/message";


//CUSTOMERS
export const GET_CUSTOMERS = "/customers";
export const ADD_NEW_CUSTOMER = "/add/customer";
export const UPDATE_CUSTOMER = "/update/customer";
export const DELETE_CUSTOMER = "/delete/customer"; 

// Template 
export const ADD_TEMPLATE = "/v1/template";
export const GET_TEMPLATES = "/v1/getApprovedTemplate"; 
export const GET_TEMPLATES_DETAIL = "/v1/template"; 
export const DELETE_TEMPLATES = "/v1/deleteTemplatebyid"; 
export const UPDATE_TEMPLATES = ""; 


// Broadcast 
export const ADD_BROADCAST = "/v1/broadcast";
export const GET_BROADCASTS = "/v1/broadcast"; 
export const GET_BROADCASTS_DETAIL = "/v1/template"; 
export const GET_BROADCAST_CATEGORY = "/v1/templatecategory";
export const DELETE_BROADCASTS = ""; 
export const UPDATE_BROADCASTS = ""; 

// Current User 
export const GET_CURRENT_USER = "/v1/getuserbyid";  

// export const GET_USERS = "/users";
export const GET_USERS = "/v1/contact"; 
export const GET_USER_PROFILE = "/user";
export const ADD_NEW_USER = "/add/user";
// export const UPDATE_USER = "/update/user"; 
export const UPDATE_USER = "/v1/updateContact";
export const DELETE_USER = "/v1/deleteContactbyid";

// Meta 
export const GET_METAS = "/v1/metaapi";  
export const UPADTE_METAS = "/v1/updateMeta";  

// plan 
export const GET_PLANS = "/v1/plan";  
export const GETBY_ID = "/v1/getPlanbyid";  
export const UPADTE_PLAN = "/v1/updatePlan";  
export const DELETE_PLAN = "/v1/deletePlanbyid";  

// Service 
export const GET_SERVICE = "/v1/services";  
// export const GETBY_ID = "/v1/getPlanbyid";
export const UPADTE_SERVICE = "/v1/updateServices";  
export const DELETE_SERVICE = "/v1/deleteServicesbyid";  

// TESTIMONIAL 
// export const GETBY_ID = "/v1/getPlanbyid"; 
export const GET_TESTIMONIAL ="/v1/testimonial";  
export const UPADTE_TESTIMONIAL = "/v1/updateTestimonial";  
export const DELETE_TESTIMONIAL = "/v1/deleteTestimonialbyid";  

// LIBRARY 
export const GET_LIBRARY ="/v1/testimonial";  
export const UPADTE_LIBRARY = "/v1/updateTestimonial";  
export const DELETE_LIBRARY = "/v1/deleteTestimonialbyid"; 

// CATEGORYL 
export const GET_CATEGORYL ="/v1/testimonial";  
export const UPADTE_CATEGORYL = "/v1/updateTestimonial";  
export const DELETE_CATEGORYL = "/v1/deleteTestimonialbyid"; 


// FAQ 
export const GET_FAQS = "/v1/faq";  
// export const GETBY_ID = "/v1/getPlanbyid";
export const UPADTE_FAQ = "/v1/updateFaq";  
export const DELETE_FAQ = "/v1/deleteFaqbyid";  

// Book Demo  
export const GET_DEMOS = "/v1/bookdemo";  
export const UPADTE_DEMO = "/v1/updateBookdemo";  

// Banner 
export const GET_BANNERS = "/v1/homebanner";  
export const DELETE_BANNER = "/v1/deleteHomebannerbyid";  

// Client 
export const GET_CLIENT = "/v1/clients";  
export const DELETE_CLIENT = "/v1/deleteClientsbyid";  

// agent 
export const GET_AGENT = "/v1/getagent";  
export const ADD_AGENT = "/v1/agentSave";  

// PHONE 
export const GET_PHONEBOOK = "/v1/phone"; 

//Blog
export const GET_VISITOR_DATA = "/visitor-data";

//dashboard charts data
export const TOP_SELLING_DATA = "/top-selling-data";
export const GET_DASHBOARD_EMAILCHART = "/dashboard/email-chart";


//dashboard 
export const ON_ADD_REPLY = "/comments-product-add-reply";
export const ON_ADD_COMMENT = "/comments-product-add-comment";
