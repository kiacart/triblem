import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Collapse } from "reactstrap";
import { Link } from "react-router-dom";
import withRouter from "../Common/withRouter";
import classname from "classnames";
import { toggleLeftmenu } from "../../store/actions";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";

//i18n
import { withTranslation } from "react-i18next";

import { connect } from "react-redux";

const Navbar = (props) => {
  const [dashboard, setdashboard] = useState(false);
  const [broadcast, setbroadcast] = useState(false);
  const [pages, setpages] = useState(false);
  const [homeM, sethomeM] = useState(false);
  const [tempLib, settempLib] = useState(false);
  const [more, setmore] = useState(false);
  const [ui, setui] = useState(false);
  const [app, setapp] = useState(false);
  const [email, setemail] = useState(false);
  const [ecommerce, setecommerce] = useState(false);
  const [crypto, setcrypto] = useState(false);
  const [project, setproject] = useState(false);
  const [task, settask] = useState(false);
  const [contact, setcontact] = useState(false);
  const [blog, setBlog] = useState(false);
  const [job, setJob] = useState(false);
  const [candidate, setCandidate] = useState(false);
  const [component, setcomponent] = useState(false);
  const [form, setform] = useState(false);
  const [table, settable] = useState(false);
  const [chart, setchart] = useState(false);
  const [icon, seticon] = useState(false);
  const [map, setmap] = useState(false);
  const [role, setRole] = useState();
  const [extra, setextra] = useState(false);
  const [invoice, setinvoice] = useState(false);
  const [auth, setauth] = useState(false);
  const [utility, setutility] = useState(false);
  const [pageWidth, setPageSize] = useState(window.innerWidth)
  const targetRef = useRef(null);

  const handleClickOutside = (event) => {
    if (targetRef.current && !targetRef.current.contains(event.target)) {
      props.toggleLeftmenu(false);
    }
  };

  useEffect(() => {
    // Add event listener when component mounts
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener when component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleScroll = () => {
    setPageSize(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("resize", handleScroll);
    };
  }, [window.innerWidth])

  useEffect(() => {
    var matchingMenuItem = null;
    var ul = document.getElementById("navigation");
    var items = ul.getElementsByTagName("a");
    removeActivation(items);
    for (var i = 0; i < items.length; ++i) {
      if (window.location.pathname === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }

    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  });

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;
      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        if (parent.classList.contains("active")) {
          parent.classList.remove("active");
        }
      }
    }
  };

  function activateParentDropdown(item) {
    item.classList.add("active");
    const parent = item.parentElement;
    if (parent) {
      parent.classList.add("active"); // li
      const parent2 = parent.parentElement;
      parent2.classList.add("active"); // li
      const parent3 = parent2.parentElement;
      if (parent3) {
        parent3.classList.add("active"); // li
        const parent4 = parent3.parentElement;
        if (parent4) {
          parent4.classList.add("active"); // li
          const parent5 = parent4.parentElement;
          if (parent5) {
            parent5.classList.add("active"); // li
            const parent6 = parent5.parentElement;
            if (parent6) {
              parent6.classList.add("active"); // li
            }
          }
        }
      }
    }
    return false;
  }

  const LoginProperties = createSelector(
    (state) => state.Login,
    (login) => ({
      response: login
    })
  );

  const {
    response
  } = useSelector(LoginProperties);

  useEffect(() => {
    if (response?.data) {
      setRole(response?.data?.role ?? '3')
    }
  }, [response])



  return (
    <React.Fragment>
      <div className="topnav"  >
        <div className="container-fluid " >
          <nav
            className="navbar navbar-light navbar-expand-lg topnav-menu"
            id="navigation"
            ref={targetRef}
          >
            <Collapse
              isOpen={props.leftMenu}
              className="navbar-collapse"
              id="topnav-menu-content"
            >
              <ul className="navbar-nav">

                <li className="nav-item dropdown">
                  <Link
                    className="nav-link  arrow-none text-nowrap"
                    to="/dashboard"
                  >
                    <i className="bx bx-home-circle me-2"></i>
                    {props.t("Dashboard")} {props.menuOpen}
                    {/* <div className="arrow-down"></div> */}
                  </Link>
                </li>

                <li className="nav-item dropdown">
                  <Link
                    className="nav-link  arrow-none text-nowrap"
                    to="/chat"
                  >
                    <i className="bx bx-chat me-2"></i>
                    {props.t("Inbox")} {props.menuOpen}
                    {/* <div className="arrow-down"></div> */}
                  </Link>
                </li>

                <li className="nav-item dropdown ">
                  <Link to="/templates" onBlur={() => pageWidth > 992 ? setbroadcast(false) : {}} className="nav-link  arrow-none text-nowrap"
                    onClick={(e) => {
                      e.preventDefault();
                      setbroadcast(!broadcast);
                    }}
                  >
                    <i className="bx bx-broadcast me-2"></i>
                    {props.t("BroadCast")} {props.menuOpen}
                    <div className="arrow-down"></div>
                  </Link>
                  
                  <div className={classname("dropdown-menu", { show: broadcast })} >
                    <Link to="/templates" className="dropdown-item">
                      {props.t("Templates")}
                    </Link>
                    <Link to="/templates-vault" className="dropdown-item">
                      {props.t("Templates Vault")}
                    </Link>
                    <Link to="/broadcast-analytics" className="dropdown-item">
                      {props.t("BroadCast Intelligence")}
                    </Link>
                    <Link to="/broadcast-schedule" className="dropdown-item">
                      {props.t("Broadcast Planner")}
                    </Link>
                  </div>
                </li>

                <li className="nav-item dropdown">
                  <Link to="/contacts" className="nav-link  arrow-none text-nowrap">
                    <i className="bx bxs-user-detail me-2"></i>
                    <span>{props.t("Contacts")}</span>
                  </Link>
                </li>

                {/* <li className="nav-item dropdown">
                  <Link className="nav-link  arrow-none text-nowrap">
                    <i className="mdi mdi-home-automation me-2"></i>
                    <span>{props.t("Automation")}</span>
                  </Link>
                </li> */}

                {/* <li className="nav-item dropdown">
                  <Link className="nav-link  arrow-none text-nowrap">
                    <i className="bx bxs-analyse me-2"></i>
                    <span>{props.t("Analytics")}</span>
                  </Link>
                </li> */}

                {
                  role == 1 || role == 2 ?
                    <li className="nav-item dropdown">
                      <Link to={'/agent'} className="nav-link  arrow-none text-nowrap">
                        <i className="mdi mdi-face-agent me-2"></i>
                        <span>{props.t("Agent")}</span>
                      </Link>
                    </li> : ''
                }

                {
                  role == 1 ?
                    <li className="nav-item dropdown">
                      <Link to="/#" onBlur={() => pageWidth > 992 ? sethomeM(false) : {}}
                        onClick={(e) => {
                          e.preventDefault();
                          sethomeM(!homeM);
                        }}
                        className="nav-link  arrow-none text-nowrap">
                        <i className="mdi mdi-home-edit me-2"></i>
                        <span>{props.t("Home Manage")}</span>
                        <div className="arrow-down"></div>
                      </Link>
                      <div className={classname("dropdown-menu", { show: homeM })} >
                        <Link to="/home-manage/banner" className="dropdown-item">
                          {props.t("Banner")}
                        </Link>
                        <Link to="/home-manage/why-choose-us" className="dropdown-item">
                          {props.t("why choose us")}
                        </Link>
                        <Link to="/home-manage/testimonials" className="dropdown-item">
                          {props.t("Testimonials")}
                        </Link>
                        <Link to="/home-manage/client" className="dropdown-item">
                          {props.t("Client")}
                        </Link>
                      </div>
                    </li> : ''
                }

                {/* {
                  role == 1 ?
                    <li className="nav-item dropdown">
                      <Link to="/#" onBlur={() => pageWidth > 992 ? settempLib(false) : {}}
                        onClick={(e) => {
                          e.preventDefault();
                          settempLib(!tempLib);
                        }}
                        className="nav-link  arrow-none text-nowrap">
                         <i className="mdi mdi-android-messages me-2"></i>
                        <span>{props.t("Template Manage")}</span>
                        <div className="arrow-down"></div>
                      </Link>
                      <div className={classname("dropdown-menu", { show: tempLib })} >
                        <Link to="/template-category" className="dropdown-item">
                          {props.t("Library Categories")}
                        </Link>
                        <Link to="/template-library" className="dropdown-item">
                          {props.t("Template Library")}
                        </Link>
                      </div>
                    </li> : ''
                } */}

                {
                  role == 1 ?
                    <li className="nav-item dropdown">
                      <Link to="/#" onBlur={() => pageWidth > 992 ? setmore(false) : {}}
                        onClick={(e) => {
                          e.preventDefault();
                          setmore(!more);
                        }}
                        className="nav-link  arrow-none text-nowrap">
                        <i className="mdi mdi-circle-double me-2"></i>
                        <span>{props.t("More")}</span>
                        <div className="arrow-down"></div>
                      </Link>
                      <div className={classname("dropdown-menu", { show: more })} >
                        <Link to={'/category'} className="dropdown-item">
                          {props.t("Category")}
                        </Link>
                        <Link to={'/language'} className="dropdown-item">
                          {props.t("Language")}
                        </Link>
                        <Link to={'/plans'} className="dropdown-item">
                          {props.t("Plans")}
                        </Link>
                        <Link to={'/demo-book'} className="dropdown-item">
                          {props.t("Demo")}
                        </Link>
                        <Link to={'/faq'} className="dropdown-item">
                          {props.t("FAQ")}
                        </Link>
                      </div>
                    </li> : ''
                }

              </ul>
            </Collapse>
          </nav>
        </div>
      </div>
    </React.Fragment>
  );
};

Navbar.propTypes = {
  leftMenu: PropTypes.any,
  location: PropTypes.any,
  menuOpen: PropTypes.any,
  t: PropTypes.any,
  toggleLeftmenu: PropTypes.func,
};

const mapStatetoProps = (state) => {
  const { leftMenu } = state.Layout;
  return { leftMenu };
};

export default withRouter(
  connect(mapStatetoProps, {
    toggleLeftmenu
  })(withTranslation()(Navbar))
);
