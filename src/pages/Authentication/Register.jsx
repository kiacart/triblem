import React, { useEffect, useState } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { registerUser, apiError } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

import { Link, useNavigate } from "react-router-dom";

// import images
import profileImg from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.png";
import lightlogo from "../../assets/images/logo-light.svg";
import log1 from "../../assets/images/companies/amazon.svg";
import log2 from "../../assets/images/companies/img-2.png";
import log3 from "../../assets/images/companies/img-3.png";
import log4 from "../../assets/images/companies/img-4.png";

const Register = () => {
  document.title = "Register | Triblem &Dashboard";

  const dispatch = useDispatch();

  const navigate = useNavigate()

  const [terms, setTerms] = useState(false);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      email: '',
      name: '',
      password: '',
      mobile: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please Enter Valid Email"),
      mobile: Yup.string().required("Please Enter Your Mobile Number"),
      name: Yup.string().required("Please Enter Your name"),
      password: Yup.string().required("Please Enter Your Password").min(6, "Password Minimum should be 6 character"),
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values));
    }
  });

  const AccountProperties = createSelector(
    (state) => state.Account,
    (account) => ({
      user: account.user,
      registrationError: account.registrationError,
      loading: account.loading,
    })
  );

  const {
    user,
    registrationError,
    loading
  } = useSelector(AccountProperties);

  useEffect(() => {
    dispatch(apiError(""));
  }, []);  


  useEffect(() => {
    if(user) {
      navigate('/login')
    }
  },[user])


  return (
    <React.Fragment>

      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center align-items-center">
            <Col xl={7} lg={6} className="d-lg-block d-none">
              <div>

                <h1 className="">Everything you need to grow your business on <span className="text-primary">WhatsApp</span></h1>

                <div className="mt-5 mb-5">
                  <p className="text-primary fs-6"><i className="bx bx-check me-2"></i> Targeted Campaigns to deliver personalized offers</p>
                  <p className="text-primary fs-6"><i className="bx bx-check me-2"></i>  Pre-built templates to send updates & reminders</p>
                  <p className="text-primary fs-6"><i className="bx bx-check me-2"></i>  24x7 instant engagement with no-code chatbots</p>
                  <p className="text-primary fs-6"><i className="bx bx-check me-2"></i>  Powerful automations to resolve issues faster</p>
                  <p className="text-primary fs-6"><i className="bx bx-check me-2"></i>  Integrations to bring in context from Zoho, Shopify, etc.</p>
                </div>

                <h4 className="fw-bold mb-3">Trusted by 8000+ customers across 52 countries</h4>

                <div className="d-flex gap-3 ">
                  <img src={log1} className="log_ico" />
                  <img src={log2} className="log_ico" />
                  <img src={log3} className="log_ico" />
                  <img src={log4} className="log_ico" />
                </div>
              </div>
            </Col>
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary-subtle">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Free Register</h5>
                        <p>Get your free Triblem account now.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="auth-logo">
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={lightlogo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                    <Link to="/" className="auth-logo-dark">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {user && user ? (
                        <Alert color="success">
                          Register User Successfully
                        </Alert>
                      ) : null}

                      {registrationError && registrationError ? (
                        <Alert color="danger">{registrationError}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <Label className="form-label">Name</Label>
                        <Input
                          name="name"
                          type="text"
                          placeholder="Enter Name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.name || ""}
                          invalid={
                            validation.touched.name && validation.errors.name ? true : false
                          }
                        />
                        {validation.touched.name && validation.errors.name ? (
                          <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email ? true : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Mobile</Label>
                        <Input
                          id="mobile"
                          name="mobile"
                          className="form-control"
                          placeholder="Enter Mobile"
                          type="text"
                          maxLength={10}
                          // onChange={validation.handleChange}
                          onChange={(e) => validation.setFieldValue('mobile', e.target.value?.replace(/[^0-9]/g, ""))}
                          onBlur={validation.handleBlur}
                          value={validation.values.mobile || ""}
                          invalid={
                            validation.touched.mobile && validation.errors.mobile ? true : false
                          }
                        />
                        {validation.touched.mobile && validation.errors.mobile ? (
                          <FormFeedback type="invalid">{validation.errors.mobile}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                          value={terms}
                          onChange={(e) => setTerms(e.target.checked)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          <span> I Accept the </span>
                          <Link to="/terms-condition" className="text-primary">
                            Terms and Condition
                          </Link>
                        </label>
                      </div>
                      {
                        loading ?
                          <div className="mt-4">
                            <button
                              className="btn btn-primary btn-block "
                              type="submit"
                              disabled={loading}
                            >
                              <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>{" "}
                              Loading
                            </button>
                          </div> :
                          <div className="mt-4">
                            <button
                              className="btn btn-primary btn-block "
                              type="submit"
                              disabled={!terms}
                            >
                              Register
                            </button>
                          </div>
                      }

                      {/* <div className="mt-4 text-center">
                        <p className="mb-0">
                          By registering you agree to the Triblem{" "}
                          <Link to="#" className="text-primary">
                            Terms of Use
                          </Link>
                        </p>
                      </div> */}
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Triblem.
                  {/* Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Themesbrand */}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Register;
