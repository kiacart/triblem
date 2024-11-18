import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

import withRouter from "../../components/Common/withRouter";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

import avatar from "../../assets/images/users/avatar-1.jpg";
// actions
import { editProfile, resetProfileFlag, getCurrentuser } from "../../store/actions";

const UserProfile = (props) => {

  //meta title
  document.title = "Profile | Triblem - React Admin &Dashboard";  

  const dispatch = useDispatch();

  const [email, setemail] = useState("");
  const [name, setname] = useState("");
  const [mobile, setmobile] = useState("");
  const [idx, setidx] = useState(1);

  const LoginProperties = createSelector(
    (state) => state.Login,
    (login) => ({
      response: login
    })
  );

  const {
    response
  } = useSelector(LoginProperties);

  const ProfileProperties = createSelector(
    (state) => state.Profile,
    (profile) => ({
      error: profile.error,
      success: profile.success,
      userData: profile.user
    })
  );
  const {
    error,
    success,
    userData
  } = useSelector(ProfileProperties);

  console.log('userData', userData);


  useEffect(() => {
    dispatch(getCurrentuser(response?.data?.userID))
  }, [dispatch])

  useEffect(() => {
    // if (localStorage.getItem("authUser")) {
    //   const obj = JSON.parse(localStorage.getItem("authUser"));
    //   if (import.meta.env.VITE_APP_DEFAULTAUTH === "firebase") {
    //     setname(obj.displayName);
    //     setemail(obj.email);
    //     setidx(obj.uid);
    //   } else if (
    //     import.meta.env.VITE_APP_DEFAULTAUTH === "fake" ||
    //     import.meta.env.VITE_APP_DEFAULTAUTH === "jwt"
    //   ) {
    //     setname(obj.username);
    //     setemail(obj.email);
    //     setidx(obj.uid);
    //   }
    //   setTimeout(() => {
    //     dispatch(resetProfileFlag());
    //   }, 3000);
    // }

    if (userData) {
      setname(userData?.name);
      setemail(userData?.email);
      setidx(userData?.id);
      setmobile(userData?.mobile)
    }
  }, [dispatch, userData]);

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      username: name || '',
      idx: idx || '',
      mobile : mobile || ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your UserName"),
      mobile : Yup.string().required("Please Enter Your Mobile Number"),
    }),
    onSubmit: (values) => {
      dispatch(editProfile(values));
    }
  });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Triblem" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5>{name}</h5>
                        <p className="mb-1">{email}</p>
                        <p className="mb-0">Id no: #{idx}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <h4 className="card-title mb-4">Change User Name</h4>

          <Card>
            <CardBody>
              <Form
                className="form-horizontal"
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <Label className="form-label">User Name</Label>
                      <Input
                        name="username"
                        // value={name}
                        className="form-control"
                        placeholder="Enter User Name"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.username || ""}
                        invalid={
                          validation.touched.username && validation.errors.username ? true : false
                        }
                      />
                      {validation.touched.username && validation.errors.username ? (
                        <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
                      ) : null}
                      <Input name="idx" value={idx} type="hidden" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <Label className="form-label">Mobile Number</Label>
                      <Input
                        name="mobile"
                        // value={name}
                        className="form-control"
                        placeholder="Enter User Name"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.mobile || ""}
                        invalid={
                          validation.touched.mobile && validation.errors.mobile ? true : false
                        }
                      />
                      {validation.touched.mobile && validation.errors.mobile ? (
                        <FormFeedback type="invalid">{validation.errors.mobile}</FormFeedback>
                      ) : null}
                      <Input name="idx" value={idx} type="hidden" />
                    </div>
                  </div>
                  
                </div>
                <div className="text-center mt-4">
                  <Button type="submit" disabled color="danger">
                    Update User Name
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
