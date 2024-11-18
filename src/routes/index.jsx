import React from "react";
import { Navigate } from "react-router-dom";

// Pages Component
import Chat from "../pages/Chat/Chat";

// // Profile
import UserProfile from "../pages/Authentication/user-profile";

// // Authentication related pages
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import ForgetPwd from "../pages/Authentication/ForgetPassword";

// // Dashboard
import Dashboard from "../pages/Dashboard/index";

// // Pages
import PagesStarter from "../pages/Utility/pages-starter";
import PagesMaintenance from "../pages/Utility/pages-maintenance";
import PagesComingsoon from "../pages/Utility/pages-comingsoon";
import PagesTimeline from "../pages/Utility/pages-timeline";
import PagesFaqs from "../pages/Utility/pages-faqs";
import PagesPricing from "../pages/Utility/pages-pricing";
import Pages404 from "../pages/Utility/pages-404";
import Pages500 from "../pages/Utility/pages-500";

// // Contacts
import ContactsGrid from "../pages/Contacts/contacts-grid";
import ContactsList from "../pages/Contacts/ContactList/contacts-list";
import ContactsProfile from "../pages/Contacts/ContactsProfile/index";

// Phone Book
import PhoneBook from "../pages/Phone-book/PhoneForm"; 
import ContactLi from "../pages/Phone-book/PhoneBook"; 

// Broad cast
import Broadcast from "../pages/Broadcast/Templates"; 
import Createtemplates from '../pages/Broadcast/Create-Template'
import Library from '../pages/Broadcast/Template-library'
import Analytics from '../pages/Broadcast/Analytics'
import Scheduled from '../pages/Broadcast/Scheduled'
import AddBroadcast from '../pages/Broadcast/Create-Broadcast' 
import TemplateCategory from "../pages/TemplateManage/TemplateCategory";
import TemplateLibrary from "../pages/TemplateManage/TemplateLibrary";

// meta 
import MetaList from '../pages/Meta/Meta-List'; 

// agent 
import AgentList from '../pages/Agent/Agent-List'; 

import Language from '../pages/Language/Language'; 
import Category from '../pages/Categories/Categories'; 
import TermsCondition from '../pages/TermsCondition/TermsCondition'; 
import HomeBanner from "../pages/HomeManage/banners";
import Companies from "../pages/HomeManage/Companies";
import WhyChooseUs from "../pages/HomeManage/whyChooseUs";
import Plans from '../pages/Plans/Plans'
import Faq from "../pages/FAQ/Faq";
import BookDemo from "../pages/BookDemo/Demo";
import Testimonials from "../pages/HomeManage/Testimonials";
import Home from '../pages/LandingPage/Index'; 


const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },

  // menu
  {path:'/phone-book', component:<PhoneBook />},
  {path:"/contacts", component:<ContactLi />},
  {path:'/templates', component:<Broadcast />},
  {path:'/create-templates', component:<Createtemplates />},
  {path:'/templates-vault', component:<Library />},
  {path:'/broadcast-analytics', component:<Analytics />},
  {path:'/broadcast-schedule', component:<Scheduled />},
  {path:'/create-broadcast', component:<AddBroadcast />},
  {path:'/meta', component:<MetaList />},
  {path:'/agent', component:<AgentList />},
  {path:'/language', component:<Language />},
  {path:'/template-library', component:<TemplateLibrary />},
  {path:'/template-category', component:<TemplateCategory />},

  {path:'/category', component:<Category />},
  {path:'/home-manage/banner', component:<HomeBanner />},
  {path:'/home-manage/client', component:<Companies />},
  {path:'/home-manage/why-choose-us', component:<WhyChooseUs />},
  {path:'/plans', component:<Plans />},
  {path:'/faq', component:<Faq />},
  {path:'/demo-book', component:<BookDemo />},
  {path:'/home-manage/testimonials', component:<Testimonials />},

  // chat
  { path: "/chat", component: <Chat /> },

  //   // // profile
  { path: "/profile", component: <UserProfile /> },

  // Contacts
  { path: "/contacts-grid", component: <ContactsGrid /> },
  { path: "/contacts-list", component: <ContactsList /> },
  { path: "/contacts-profile", component: <ContactsProfile /> },



  //  // Utility
  { path: "/pages-starter", component: <PagesStarter /> },
  { path: "/pages-timeline", component: <PagesTimeline /> },
  { path: "/pages-faqs", component: <PagesFaqs /> },
  { path: "/pages-pricing", component: <PagesPricing /> },
  { path: "/logout", component: <Logout /> },
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  // { path: "/logout", component: <Logout /> },
  {path:'/home', component:<Home />},
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },
  {path: '/terms-condition', component: <TermsCondition />},

  { path: "/pages-maintenance", component: <PagesMaintenance /> },
  { path: "/pages-comingsoon", component: <PagesComingsoon /> },
  { path: "/pages-404", component: <Pages404 /> },
  { path: "*", component: <Pages404 /> },
  { path: "/pages-500", component: <Pages500 /> },
];

export { authProtectedRoutes, publicRoutes }
