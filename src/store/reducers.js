import { combineReducers } from "redux";

// Front
import Layout from "./layout/reducer";

// Authentication
import Login from "./auth/login/reducer";
import Account from "./auth/register/reducer";
import ForgetPassword from "./auth/forgetpwd/reducer";
import Profile from "./auth/profile/reducer";

//Calendar
import calendar from "./calendar/reducer";

//chat
import chat from "./chat/reducer";

//Tempates
import templates from "./templates/reducer";

//contacts
import contacts from "./contacts/reducer";

//mails
import mails from "./mails/reducer";

//Dashboard 
import Dashboard from "./dashboard/reducer";

// meta 
import Meta from "./meta/reducer" 

//Broadcast
import broadcast from "./broadcast/reducer";

//Agent
import agent from "./agent/reducer"; 

// Plans
import plan from "./plans/reducer"; 

// FAQ
import faq from "./faq/reducer"; 

// DEMO BOOK
import demo from "./book-demo/reducer"; 

//Language
import language from "./language/reducer";

//Banner
import banner from "./banners/reducer";

//testimonials
import testimonial from "./testimonials/reducer";

//Service
import service from "./service/reducer";

//Client
import client from "./client/reducer";

// Template Library
import library from './template-manage/reducer';

import { LOGOUT_USER } from "./auth/login/actionTypes";

const appReducer = combineReducers({
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  calendar,
  chat,
  mails,
  Meta,
  templates,
  broadcast,
  agent,
  plan,
  faq,
  demo,
  service,
  testimonial,
  banner,
  client,
  library,
  language,
  contacts,
  Dashboard,
});

const rootReducer = (state, action) => {
  if (action.type == LOGOUT_USER) {
    // Reset the state to the initial state when logout action is triggered
    state = undefined;
  }
  return appReducer(state, action);
};


export default rootReducer;
