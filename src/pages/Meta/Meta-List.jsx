import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";
import TableContainer from "../../components/Common/TableContainer";
import Spinners from "../../components/Common/Spinner"
import { Card, CardBody, Col, Container, Row, Modal, ModalHeader, ModalBody, Label, FormFeedback, Input, Form, Button, UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup, Badge } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";


//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import DeleteModal from "/src/components/Common/DeleteModal";

import {
    getUsers,
    addNewUser,
    updateUser as onUpdateUser,
    deleteUser as onDeleteUser,
} from "/src/store/contacts/actions";
import { getMetas as onGetUsers, addNewMeta as onAddNewUser, updateMeta as onUpdateMeta } from "../../store/actions";
import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import moment from "moment";

const Metalist = () => {
    //meta title
    document.title = "Meta | Triblem - Dashboard Meta";

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


    // validation
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            waba_id: (contact && contact.waba_id) || "",
            business_account_id: (contact && contact.business_account_id) || "",
            access_token: (contact && contact.access_token) || "",
            business_phone_number_id: (contact && contact.business_phone_number_id) || "",
            app_id: (contact && contact.app_id) || "",
            user_id: (contact && contact.app_id) || "",
            id: (contact && contact.id) || ""
        },
        validationSchema: Yup.object({
            waba_id: Yup.string().required("Please Enter  ID"),
            business_account_id: Yup.string().required("Please Enter  ID"),
            access_token: Yup.string().required("Please Enter token"),
            business_phone_number_id: Yup.string().required("Please Enter ID"),
            app_id: Yup.string().required("Please Enter ID"),
        }),
        onSubmit: (values) => {
            try {
                if (isEdit) {
                    const updateUser = {
                        user_id: response?.data?.userID,
                        waba_id: values.waba_id,
                        business_account_id: values.business_account_id,
                        access_token: values.access_token,
                        business_phone_number_id: values.business_phone_number_id,
                        app_id: values.app_id,
                        // id : values.id ?? '',
                        fomdata: true
                    };
                    
                    // update user
                    dispatch(onUpdateMeta(updateUser));
                    // validation.resetForm();
                    // setIsEdit(false);
                } else {
                    const newUser = {
                        user_id: response?.data?.userID,
                        waba_id: values["waba_id"],
                        business_account_id: values["business_account_id"],
                        access_token: values["access_token"],
                        business_phone_number_id: values["business_phone_number_id"],
                        app_id: values["app_id"],
                        fomdata: true
                    };
                    // save new user
                    dispatch(onAddNewUser(newUser));
                    // validation.resetForm();
                }
                // toggle();
            } catch (err) {
                console.log('err', err.message);
            }
        },
    });


    const metaProp = createSelector(
        (state) => state.Meta,
        (metas) => ({
            metas: metas.metas,
            loading: metas.loading,
            btnLoad: metas.btnLoad
        })
    );

    const {
        metas, loading, btnLoad
    } = useSelector(metaProp);

    const [isLoading, setLoading] = useState(loading);

    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (metas && !metas.length) {
            dispatch(onGetUsers(response?.data?.userID));
            setIsEdit(false);
        }
      
    }, [dispatch, metas]);

    useEffect(() => {
        setContact(metas);
        setIsEdit(false);
        if(metas?.length > 0) {
            setContact(metas[0])
        }
    }, [metas]);

    useEffect(() => {
        if (!isEmpty(metas) && !!isEdit) {
            setContact(metas);
            setIsEdit(false);
        }
    }, [metas]);

    const toggle = () => {
        setModal(!modal);
    };

    const handleUserClick = (arg) => {
        const meta = arg;
        setContact({
            id: meta.id,
            waba_id: meta.waba_id,
            business_account_id: meta.business_account_id,
            access_token: meta.access_token,
            business_phone_number_id: meta.business_phone_number_id,
            app_id: meta.app_id,
        });
        setIsEdit(true);
        // toggle();
    };

    //delete customer
    const [deleteModal, setDeleteModal] = useState(false);

    const onClickDelete = (metas) => {
        setContact(metas);
        setDeleteModal(true);
    };

    const handleDeleteUser = () => {
        if (contact && contact.id) {
            // dispatch(onDeleteUser(contact.id));
        }
        setContact("");
        setDeleteModal(false);
    };

    const handleUserClicks = () => {
        setContact("");
        setIsEdit(false);
        toggle();
    };

    const columns = useMemo(
        () => [
            {
                header: 'WhatsApp Business Account ID',
                accessorKey: 'waba_id',
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
                header: 'Business Account ID ',
                accessorKey: 'business_account_id',
                enableColumnFilter: false,
                enableSorting: true,
            },

            {
                header: 'App ID',
                accessorKey: 'app_id',
                enableColumnFilter: false,
                enableSorting: true,
            },

            {
                header: 'date',
                accessorKey: 'created_at',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cell) => {
                    return <div>
                        {moment(cell.getValue(), 'YYYY-MM-DD').format('DD-MM-YYYY')}
                    </div>
                }
            },

            {
                header: 'Action',
                cell: (cellProps) => {
                    return (
                        <div className="d-flex gap-3">
                            <Link
                                to="#"
                                className="text-success"
                                onClick={() => {
                                    const userData = cellProps.row.original;
                                    handleUserClick(userData);
                                }}
                            >
                                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                            </Link>

                            <Link
                                to="#"
                                className="text-danger"
                                onClick={() => {
                                    const userData = cellProps.row.original; onClickDelete(userData);
                                }}>
                                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
                            </Link>
                        </div>
                    );
                }
            },
        ],
        []
    );


    return (
        <React.Fragment>
            <DeleteModal
                show={deleteModal}
                onDeleteClick={handleDeleteUser}
                onCloseClick={() => setDeleteModal(false)}
            />

        
            {/* <button type="button" className="d-none" id="closeModelsuccess" onClick={() => setModal(false)} ></button> */}

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Meta" breadcrumbItem="Meta List" />
                    {
                        isLoading ? <Spinners setLoading={setLoading} /> :
                            <div className="card">
                                <div className="card-body">
                                    <Form
                                        onSubmit={e => {
                                            e.preventDefault();
                                            validation.handleSubmit();
                                            return false;
                                        }}
                                    >
                                        <Row>
                                            <Col xs={12} md={4}>
                                                <div className="mb-3">
                                                    <Label>WhatApp Business Account ID</Label>
                                                    <Input
                                                        name="waba_id"
                                                        type="text"
                                                        placeholder="WhatApp Business Account ID"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.waba_id || ""}
                                                        invalid={
                                                            validation.touched.waba_id && validation.errors.waba_id ? true : false}
                                                    />
                                                    {validation.touched.waba_id &&
                                                        validation.errors.waba_id ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.waba_id}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>
                                            </Col>

                                            <Col xs={12} md={4}>
                                                <div className="mb-3">
                                                    <Label>Business Account ID</Label>
                                                    <Input
                                                        name="business_account_id"
                                                        label="business_account_id"
                                                        type="text"
                                                        placeholder="Business Account ID"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.business_account_id || ""}
                                                        invalid={
                                                            validation.touched.business_account_id && validation.errors.business_account_id ? true : false}
                                                    />
                                                    {validation.touched.business_account_id && validation.errors.business_account_id ?
                                                        (
                                                            <FormFeedback type="invalid">   {validation.errors.business_account_id} </FormFeedback>
                                                        ) : null}
                                                </div>
                                            </Col>
                                            <Col xs={12} md={4}>
                                                <div className="mb-3">
                                                    <Label>Meta Access Key</Label>
                                                    <Input
                                                        name="access_token"
                                                        label="access_token"
                                                        type="text"
                                                        placeholder="Meta Access Key"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.access_token || ""}
                                                        invalid={
                                                            validation.touched.access_token && validation.errors.access_token ? true : false}
                                                    />
                                                    {validation.touched.access_token && validation.errors.access_token ?
                                                        (
                                                            <FormFeedback type="invalid">   {validation.errors.access_token} </FormFeedback>
                                                        ) : null}
                                                </div>
                                            </Col>
                                            <Col xs={12} md={4}>
                                                <div className="mb-3">
                                                    <Label>Business Phone ID</Label>
                                                    <Input
                                                        name="business_phone_number_id"
                                                        label="business_phone_number_id"
                                                        type="text"
                                                        placeholder="Business Phone ID"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.business_phone_number_id || ""}
                                                        invalid={
                                                            validation.touched.business_phone_number_id && validation.errors.business_phone_number_id ? true : false}
                                                    />
                                                    {validation.touched.business_phone_number_id && validation.errors.business_phone_number_id ?
                                                        (
                                                            <FormFeedback type="invalid">   {validation.errors.business_phone_number_id} </FormFeedback>
                                                        ) : null}
                                                </div>
                                            </Col>
                                            <Col xs={12} md={4}>
                                                <div className="mb-3">
                                                    <Label>App ID</Label>
                                                    <Input
                                                        name="app_id"
                                                        label="app_id"
                                                        type="text"
                                                        placeholder="App ID"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.app_id || ""}
                                                        invalid={
                                                            validation.touched.app_id && validation.errors.app_id ? true : false}
                                                    />
                                                    {validation.touched.app_id && validation.errors.app_id ?
                                                        (
                                                            <FormFeedback type="invalid"> {validation.errors.app_id}  </FormFeedback>
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
                                                                </> : contact?.id ? "Edit Meta" : "Add Meta"
                                                        }
                                                    </button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </div>
                    }
                    {/* {
                        isLoading ? <Spinners setLoading={setLoading} />
                            :
                            <Row >
                                <Col lg="12">
                                    <Card>
                                        <CardBody>
                                            <TableContainer
                                                columns={columns}
                                                data={metas || []}
                                                isGlobalFilter={true}
                                                isPagination={true}
                                                SearchPlaceholder="Search..."
                                                isCustomPageSize={true}
                                                isAddButton={metas.length > 0 ? false : true}
                                                handleUserClick={handleUserClicks}
                                                buttonClass="btn btn-success btn-rounded waves-effect waves-light addContact-modal mb-2"
                                                buttonName="Meta API keys"
                                                tableClass="align-middle table-nowrap table-hover dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
                                                theadClass="table-light"
                                                paginationWrapper="dataTables_paginate paging_simple_numbers pagination-rounded"
                                                pagination="pagination"
                                            />
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                    } */}
                    <Modal centered isOpen={modal} toggle={toggle}>
                        <ModalHeader toggle={toggle} tag="h4"> {contact?.id ? "Meta API key" : "Meta API key"}</ModalHeader>
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
                                            <Label>WhatApp Business Account ID</Label>
                                            <Input
                                                name="waba_id"
                                                type="text"
                                                placeholder="WhatApp Business Account ID"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.waba_id || ""}
                                                invalid={
                                                    validation.touched.waba_id && validation.errors.waba_id ? true : false}
                                            />
                                            {validation.touched.waba_id &&
                                                validation.errors.waba_id ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.waba_id}
                                                </FormFeedback>
                                            ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label>Business Account ID</Label>
                                            <Input
                                                name="business_account_id"
                                                label="business_account_id"
                                                type="text"
                                                placeholder="Business Account ID"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.business_account_id || ""}
                                                invalid={
                                                    validation.touched.business_account_id && validation.errors.business_account_id ? true : false}
                                            />
                                            {validation.touched.business_account_id && validation.errors.business_account_id ?
                                                (
                                                    <FormFeedback type="invalid">   {validation.errors.business_account_id} </FormFeedback>
                                                ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label>Meta Access Key</Label>
                                            <Input
                                                name="access_token"
                                                label="access_token"
                                                type="text"
                                                placeholder="Meta Access Key"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.access_token || ""}
                                                invalid={
                                                    validation.touched.access_token && validation.errors.access_token ? true : false}
                                            />
                                            {validation.touched.access_token && validation.errors.access_token ?
                                                (
                                                    <FormFeedback type="invalid">   {validation.errors.access_token} </FormFeedback>
                                                ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label>Business Phone ID</Label>
                                            <Input
                                                name="business_phone_number_id"
                                                label="business_phone_number_id"
                                                type="text"
                                                placeholder="Business Phone ID"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.business_phone_number_id || ""}
                                                invalid={
                                                    validation.touched.business_phone_number_id && validation.errors.business_phone_number_id ? true : false}
                                            />
                                            {validation.touched.business_phone_number_id && validation.errors.business_phone_number_id ?
                                                (
                                                    <FormFeedback type="invalid">   {validation.errors.business_phone_number_id} </FormFeedback>
                                                ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label>App ID</Label>
                                            <Input
                                                name="app_id"
                                                label="app_id"
                                                type="text"
                                                placeholder="App ID"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.app_id || ""}
                                                invalid={
                                                    validation.touched.app_id && validation.errors.app_id ? true : false}
                                            />
                                            {validation.touched.app_id && validation.errors.app_id ?
                                                (
                                                    <FormFeedback type="invalid"> {validation.errors.app_id}  </FormFeedback>
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
                                                        </> : contact?.id ? "Edit Meta" : "Add Meta"
                                                }
                                            </button>
                                        </div>
                                    </Col>
                                </Row>
                            </Form>
                        </ModalBody>
                    </Modal>
                </Container>
            <ToastContainer />
            </div>

        </React.Fragment>
    );
};

export default withRouter(Metalist);
