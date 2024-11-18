import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
    Badge,
    Col,
    Container,
    Row,
    Modal,
    ModalHeader,
    ModalBody,
    Button,
    Card,
    CardBody,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
} from "reactstrap";
//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import classnames from "classnames";



const TemplateLibrary = () => {
    const [customActiveTab, setCustomActiveTab] = useState("1");
  document.title = "Template-Library | Triblem -  Dashboard Library";
    

    const toggleCustom = (tab) => {
        if (customActiveTab !== tab) {
            setCustomActiveTab(tab);
        }
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="BroadCast" breadcrumbItem="Template Library" />
                    <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                        <p className="mb-2 card-title-desc">Select or create your template and submit it for Whatsapp approval. All template must adhere to <Link>Whatapp's guidelines</Link></p>
                        <Link to={'/create-templates'} className="mb-2">
                          <button className="btn btn-primary">Add New Template</button>
                        </Link>
                    </div>
                    
                    <div>
                        <div className="row">
                            <div className="col-md-9 mb-3">
                                <Nav tabs className="nav-tabs-custom nav-justified ">
                                    <NavItem>
                                        <NavLink style={{ cursor: "pointer" }} className={classnames({ active: customActiveTab === "1", })} onClick={() => { toggleCustom("1"); }}>
                                            <span className="d-block d-sm-none">
                                                <i className="bx bx-analyse"></i>
                                            </span>
                                            <span className="d-none d-sm-block text-nowrap">All <span className={`ms-1 badge ${customActiveTab === "1" ? 'badge-soft-primary' : 'badge-soft-secondary'}  p-1 rounded-circle`}>17 </span></span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink style={{ cursor: "pointer" }} className={classnames({ active: customActiveTab === "2", })} onClick={() => { toggleCustom("2"); }}>
                                            <span className="d-block d-sm-none">
                                                <i className="bx bx-wind"></i>
                                            </span>
                                            <span className="d-none d-sm-block text-nowrap">Festival <span className={`ms-1 badge ${customActiveTab === "2" ? 'badge-soft-primary' : 'badge-soft-secondary'}  p-1 rounded-circle`}>13 </span></span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink style={{ cursor: "pointer" }} className={classnames({ active: customActiveTab === "3", })} onClick={() => { toggleCustom("3"); }}>
                                            <span className="d-block d-sm-none">
                                                <i className="mdi mdi-book-education"></i>
                                            </span>
                                            <span className="d-none d-sm-block text-nowrap">Education <span className={`ms-1 badge ${customActiveTab === "3" ? 'badge-soft-primary' : 'badge-soft-secondary'}  p-1 rounded-circle`}>10 </span></span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink style={{ cursor: "pointer" }} className={classnames({ active: customActiveTab === "4", })} onClick={() => { toggleCustom("4"); }}>
                                            <span className="d-block d-sm-none">
                                                <i className="bx bx-health"></i>
                                            </span>
                                            <span className="d-none d-sm-block text-nowrap">Healthcare <span className={`ms-1 badge ${customActiveTab === "4" ? 'badge-soft-primary' : 'badge-soft-secondary'}  p-1 rounded-circle`}>28</span></span>
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink style={{ cursor: "pointer" }} className={classnames({ active: customActiveTab === "5", })} onClick={() => { toggleCustom("5"); }}>
                                            <span className="d-block d-sm-none">
                                                <i className="mdi mdi-arrow-decision"></i>
                                            </span>
                                            <span className="d-none d-sm-block text-nowrap">Others <span className={`ms-1 badge ${customActiveTab === "5" ? 'badge-soft-primary' : 'badge-soft-secondary'}  p-1 rounded-circle`}>17</span></span>
                                        </NavLink>
                                    </NavItem>
                                </Nav>

                            </div>
                            <div className="col-md-3 mb-3">
                                <input
                                    className="form-control"
                                    type="search"
                                    placeholder="Search..."
                                />
                            </div>
                        </div>

                        <TabContent
                            activeTab={customActiveTab}
                            className="p-3 text-muted festival"
                        >
                            <TabPane tabId="1">
                                <Row>
                                    <Col xl="3" lg='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col xl="3" lg='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col xl="3" lg='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col xl="3" lg='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col xl="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>

                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>  

                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>

                            <TabPane tabId="2">
                            <Row>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>

                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>  

                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>

                            <TabPane tabId="3">
                            <Row>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>

                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>  

                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>

                            <TabPane tabId="4">
                            <Row>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>

                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>  

                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col lg="3" md='4' sm='6'>
                                        <Card className="border rounded-3 ">
                                            <CardBody>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                                                    <h6 className="card-title">republic_day_discunt</h6>
                                                    
                                                    <span className={`ms-1 badge  badge-soft-primary p-1`}>Festival</span>
                                                </div>

                                                <p className="card-text mb-3">In Hppy Republic  Day {`{{name}}`} IN</p>

                                                <p className="card-text mb-3">Celeberte the pride of our nation with as special Republic Day offer! use Code REPUBIC123 &#129309; to enjoy a 20% discount on your purchase</p>
                                                <p className="card-text mb-3">
                                                    Shop now and embarance the sprit of freedom and saving. this offer valid untill, &#128092; [expire date]
                                                </p>
                                                <p className="card-text mb-3">
                                                    Wishing you a joufull republic day filled with patrotism and properity! &#127873;
                                                </p>
                                                <p className="card-text">
                                                    Jai Hind!
                                                </p>
                                                <p className="card-text">[Your Shop Name]</p>
                                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>

                                                <div className="d-flex justify-content-center ">
                                                    <button type="button" className="btn btn-primary">use sample</button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </div>

                </Container>
            </div>
        </React.Fragment>
    )

}


export default TemplateLibrary; 