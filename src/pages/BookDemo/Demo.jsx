import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";
import TableContainer from "../../components/Common/TableContainer";
import Spinners from "../../components/Common/Spinner"
import { Card, CardBody, Col, Container, Row, Modal, ModalHeader, ModalBody, Label, FormFeedback, Input, Form, Button, UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup, Badge } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import DeleteModal from "/src/components/Common/DeleteModal";

import { isEmpty } from "lodash";
import { getDemos as onGetDemo, addNewDemo as onAddNewDemo, updateDemo as onUpdateDemo } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import moment from "moment";

const Bookinglist = () => {
    //meta title
    document.title = "Demo-book | Triblem";

    const dispatch = useDispatch();
    const [contact, setContact] = useState();

    const LoginProperties = createSelector(
        (state) => state.Login,
        (login) => ({
            response: login
        })
    );

    const {
        response
    } = useSelector(LoginProperties);



    // name=kavin
    // email=kavin@gmail.com
    // purpose=business
    // mobile=9898909898

    // validation
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: (contact && contact.name || ''),
            email: (contact && contact.email || ''),
            purpose: (contact && contact.purpose || ''),
            demodate: (contact && contact.demodate || ''),
            mobile: (contact && contact.mobile || ''),
            id: (contact && contact.id || ''),
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Name"),
            email: Yup.string().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please Enter Valid Email").required("Please Enter Email"),
            purpose: Yup.string().required("Please Enter Purpose"),
            mobile: Yup.string(),
        }),
        onSubmit: (values) => {
            try {
                if (isEdit) {
                    const UpdateDemo = {
                        id: values.id,
                        name: values.name ?? '',
                        email: values.email ?? '',
                        purpose: values.purpose ?? '',
                        demodate: values.demodate ?? '',
                        mobile: values.mobile ?? '',
                        fomdata: true
                    };
                    // update user
                    dispatch(onUpdateDemo(UpdateDemo));
                    // validation.resetForm();
                    setIsEdit(false);
                } else {
                    const newDemo = {
                        name: values["name"],
                        email: values["email"],
                        purpose: values["purpose"],
                        demodate: values['demodate'],
                        mobile: values["mobile"],
                        fomdata: true
                    };

                    // save new user
                    dispatch(onAddNewDemo(newDemo));
                    // validation.resetForm();
                }
                // toggle();
            } catch (err) {
                console.log('err', err.message);

            }
        },
    });


    const demoProp = createSelector(
        (state) => state.demo,
        (demos) => ({
            demos: demos.demos,
            loading: demos.loading,
            btnLoad: demos.btnLoad
        })
    );

    const {
        demos, loading, btnLoad
    } = useSelector(demoProp);

    const [isLoading, setLoading] = useState(loading);

    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (demos && !demos.length) {
            dispatch(onGetDemo(response?.data?.userID));
            setIsEdit(false);
        }
    }, [dispatch, demos]);

    useEffect(() => {
        setContact(demos);
        setIsEdit(false);
    }, [demos]);

    useEffect(() => {
        if (!isEmpty(demos) && !!isEdit) {
            setContact(demos);
            setIsEdit(false);
        }
    }, [demos]);

    const toggle = () => {
        setModal(!modal);
    };

    const handlePlanClick = (arg) => {
        const Data = arg;
        setContact({
            name: Data.name ?? '',
            email: Data.email ?? '',
            purpose: Data.purpose ?? '',
            demodate: Data.demodate ?? '',
            mobile: Data.mobile ?? '',
            id: Data.id ?? ''
        });
        setIsEdit(true);
        toggle();
    };

    //delete customer
    const [deleteModal, setDeleteModal] = useState(false);

    const onClickDelete = (plan) => {
        setContact(plan);
        setDeleteModal(true);
    };

    const handleDeletePlan = () => {
        if (contact && contact.id) {
            // dispatch(onDeletePlan(contact.id));
        }
        setContact("");
        setDeleteModal(false);
    };

    const handleDemoClicks = () => {
        setContact({
            'name': '',
            'email': '',
            'purpose': '',
            'demodate': '',
            'mobile': '91',
        });
        setIsEdit(false);
        toggle();
    };

    const columns = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cell) => {
                    return (
                        <>
                            <h5 className='font-size-14 mb-1'>
                                <Link to='#' className='text-dark'>{cell.getValue()}</Link>
                            </h5>
                        </>
                    )
                }
            },
            {
                header: 'Email ',
                accessorKey: 'email',
                enableColumnFilter: false,
                enableSorting: true,
            },

            {
                header: 'Mobile ',
                accessorKey: 'mobile',
                enableColumnFilter: false,
                enableSorting: true,
            },

            {
                header: 'Purpose',
                accessorKey: 'purpose',
                enableColumnFilter: false,
                enableSorting: true,
            },

            {
                header: 'Demo Date',
                accessorKey: 'demodate',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cell) => {
                    return <div>
                        {moment(cell.getValue(), 'YYYY-MM-DD').format('DD-MM-YYYY') ?? '-'}
                    </div>
                }
            },


            {
                header: 'Action',
                cell: (cellProps) => {
                    return (
                        <div className="d-flex  gap-3">
                            <Link
                                to="#"
                                className="text-success"
                                onClick={() => {
                                    const demoData = cellProps.row.original;
                                    handlePlanClick(demoData);
                                }}
                            >
                                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                            </Link>
                            {/* <Link
                                to="#"
                                className="text-danger"
                                onClick={() => {
                                    const demoData = cellProps.row.original; onClickDelete(demoData);
                                }}>
                                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                            </Link> */}
                        </div>
                    );
                }
            },
        ],
        []
    );

    return (
        <React.Fragment>
            {/* <DeleteModal
                show={deleteModal}
                onDeleteClick={handleDeletePlan}
                onCloseClick={() => setDeleteModal(false)}
            /> */}
            <button type="button" className="d-none" id="closeModelsuccess" onClick={() => setModal(false)} ></button>

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="" breadcrumbItem="Demo Booking List" />
                    {
                        isLoading ? <Spinners setLoading={setLoading} />
                            :
                            <Row>
                                <Col lg="12">
                                    <Card>
                                        <CardBody>
                                            <TableContainer
                                                columns={columns}
                                                data={demos || []}
                                                isGlobalFilter={true}
                                                isPagination={true}
                                                SearchPlaceholder="Search..."
                                                isCustomPageSize={true}
                                                isAddButton={true}
                                                handleUserClick={handleDemoClicks}
                                                buttonClass="btn btn-success btn-rounded waves-effect waves-light addContact-modal mb-2"
                                                buttonName="Add booking"
                                                tableClass="align-middle table-nowrap table-hover dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
                                                theadClass="table-light"
                                                paginationWrapper="dataTables_paginate paging_simple_numbers pagination-rounded"
                                                pagination="pagination"
                                            />
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                    }

                    <Modal centered isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle} tag="h4"> {!!isEdit ? "EDIT DEMO" : "ADD DEMO"}</ModalHeader>
                        <ModalBody>
                            <Form
                                onSubmit={e => {
                                    e.preventDefault();
                                    validation.handleSubmit();
                                    return false;
                                }}
                            >
                                <Row>
                                    <Col xs={12}>
                                        <div className="mb-3">
                                            <Label>Name</Label>
                                            <Input
                                                name="name"
                                                type="text"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.name || ""}
                                                invalid={
                                                    validation.touched.name && validation.errors.name ? true : false}
                                            />
                                            {validation.touched.name &&
                                                validation.errors.name ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.name}
                                                </FormFeedback>
                                            ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label>Phone Number</Label>

                                            <PhoneInput
                                                country={'in'}
                                                onBlur={validation.handleBlur}
                                                countryCodeEditable={false}
                                                inputProps={{
                                                    id: "p_number",
                                                }}
                                                inputClass="form-control w-100"
                                                value={validation.values.mobile || ""}
                                                onChange={(e) => {
                                                    validation.setFieldValue('mobile', e)
                                                }}
                                            />

                                            {validation.touched.mobile && validation.errors.mobile ?
                                                (
                                                    <FormFeedback type="invalid">   {validation.errors.mobile} </FormFeedback>
                                                ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label>Email</Label>
                                            <Input
                                                name="email"
                                                placeholder="Enter Emal"
                                                label=""
                                                type="text"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.email || ""}
                                                invalid={
                                                    validation.touched.email && validation.errors.email ? true : false}
                                            />
                                            {validation.errors.email ?
                                                (
                                                    <FormFeedback type="invalid">   {validation.errors.email} </FormFeedback>
                                                ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label>Purpose</Label>
                                            <Input
                                                name="purpose"
                                                label="purpose"
                                                placeholder="Enter Purpose"
                                                type="text"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.purpose || ""}
                                                invalid={
                                                    validation.touched.purpose && validation.errors.purpose ? true : false}
                                            />
                                            {validation.touched.purpose && validation.errors.purpose ?
                                                (
                                                    <FormFeedback type="invalid">   {validation.errors.purpose} </FormFeedback>
                                                ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label>Demo Date</Label>
                                            <Input
                                                name="demodate"
                                                label="demodate"
                                                placeholder="Enter Demodate"
                                                type="date"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.demodate || ""}
                                                invalid={
                                                    validation.touched.demodate && validation.errors.demodate ? true : false}
                                            />
                                            {validation.touched.demodate && validation.errors.demodate ?
                                                (
                                                    <FormFeedback type="invalid">   {validation.errors.demodate} </FormFeedback>
                                                ) : null}
                                        </div>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="text-end">
                                            <button
                                                type="submit"
                                                disabled={btnLoad}
                                                className="btn btn-success "
                                            >
                                                {
                                                    btnLoad ?
                                                        <>
                                                            <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>{" "}
                                                            Loading
                                                        </> : contact?.id ? "Update" : "Submit"
                                                }
                                            </button>
                                            {/* <Button type="submit" color="success" className="save-user"> {!!isEdit ? "Update" : "Submit"}  </Button> */}
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </ModalBody>
                    </Modal>
                </Container>
            </div>

            <ToastContainer />
        </React.Fragment>
    );
};

export default withRouter(Bookinglist);
