import React, {useEffect, useState} from "react";

//Import Components
import Navbar from "./Navbar/Navbar"
import Section from "./HeroSection/Section"
import CardsMini from "./HeroSection/cards-mini"
import AboutUs from "./AboutUs/about-us"
import Features from "./Features/features"
import RoadMap from "./services/services"
import OurTeam from "./subPlans/plans"
import Blog from "./Testimonials/Testimonials"
import FAQs from "./Faqs/FAQs"
import PropTypes from "prop-types";
import Footer from "./Footer/footer"
import { connect } from "react-redux";
import { changePreloader } from "../../store/actions";
import { getBanners as onGetBanner, getServices as onGetService, getTestimonials as onGetTestimonials, getfaqs as onGetFaqs, getPlans as onGetPlans, getClients as onGetClient, } from "../../store/actions"
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";




const TriblenLanding = (props) => {

  const dispatch = useDispatch();

  //meta title
  document.title = "Tribelm Landing | Triblem - & Dashboard Tribelm";

  const LoginProperties = createSelector(
    (state) => state.Login,
    (login) => ({
      response: login
    })
  );

  const {
    response
  } = useSelector(LoginProperties);

  const bannerProp = createSelector(
    (state) => state.banner,
    (banners) => ({
      banners: banners.banners,
      loading1: banners.loading,
    })
  );

  const {
    banners, loading1
  } = useSelector(bannerProp);

  const serviceProp = createSelector(
    (state) => state.service,
    (service) => ({
      services: service.services,
      loading2: service.loading,
    })
  );

  const {
    services, loading2
  } = useSelector(serviceProp);

  const testiProp = createSelector(
    (state) => state.testimonial,
    (testimonials) => ({
      testimonials: testimonials.testimonials,
      loading3: testimonials.loading,
    })
  );

  const {
    testimonials, loading3,
  } = useSelector(testiProp);


  const faqProp = createSelector(
    (state) => state.faq,
    (faqs) => ({
      faqs: faqs.faqs,
      loading4: faqs.loading,
    })
  );

  const {
    faqs, loading4
  } = useSelector(faqProp);

  const planProp = createSelector(
    (state) => state.plan,
    (plans) => ({
      plans: plans.plans,
      loading5: plans.loading,
    })
  );

  const {
    plans, loading5
  } = useSelector(planProp);

  const clientProp = createSelector(
    (state) => state.client,
    (clients) => ({
      clients: clients.clients,
      loading6: clients.loading,
    })
  );

  const {
    clients, loading6
  } = useSelector(clientProp); 


  useEffect(() => {
    if (faqs && !faqs.length) {
      dispatch(onGetFaqs(response?.data?.userID));
    }
  }, [dispatch, faqs]);

  useEffect(() => {
    if (testimonials && !testimonials.length) {
      dispatch(onGetTestimonials(response?.data?.userID));
    }
  }, [dispatch, testimonials]);
  useEffect(() => {
    if (banners && !banners.length) {
      dispatch(onGetBanner(response?.data?.userID));
    }
  }, [dispatch, banners]);
  useEffect(() => {
    if (services && !services.length) {
      dispatch(onGetService(response?.data?.userID));
    }
  }, [dispatch, services]);

  useEffect(() => {
    if (plans && !plans.length) {
      dispatch(onGetPlans(response?.data?.userID));
    }
  }, [dispatch, plans]);

  useEffect(() => {
    if (clients && !clients.length) {
      dispatch(onGetClient(response?.data?.userID));
    }
  }, [dispatch, clients]); 






  return (
    <React.Fragment> 
      {
        loading1 && loading2 && loading3 && loading4 && loading5 && loading6 ? 
        <div id="preloader">
        <div id="status">
          <div className="spinner-chase" >
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
            <div className="chase-dot" />
          </div>
        </div>
      </div> : 
        <>
          {/* import navbar */}
          <Navbar />

          {/* Hero section */}
          <Section data={banners}   />

          {/* mini cards */}
          {/* <CardsMini /> */}

          {/* aboutUs */}
          <AboutUs clients={clients} />


          {/* features */}
          <Features />

          {/* Services */}
          <RoadMap data={services} />

          {/* Choose your Pricing plan */}
          <OurTeam data={plans}  />

          {/* Testimonials */}
          <Blog  data={testimonials}  />

          {/* faqs */}
          <FAQs data={faqs} />

          {/* footer */}
          <Footer />
        </>
      }

    </React.Fragment>
  )
}

TriblenLanding.propTypes = {
  changePreloader: PropTypes.func,
  isPreloader: PropTypes.any,
}

// export default TriblenLanding

const mapStateToProps = state => {
  return { ...state.Layout };
};

export default connect(mapStateToProps, {
  changePreloader,
})(TriblenLanding);
