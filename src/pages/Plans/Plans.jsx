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

import { isEmpty } from "lodash";
import { getPlans as onGetPlans, addNewPlan as onAddNewPlan, updatePlan as onUpdatePlan, deletePlan as onDeletePlan } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import moment from "moment";

const Planslist = () => {
    //meta title
    document.title = "Plans | Triblem - Dashboard Plans";

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
            title: (contact && contact.title || ''),
            short_desc: (contact && contact.short_desc || ''),
            contact_limit: (contact && contact.contact_limit || ''),
            is_trial: (contact && contact.is_trial || ''),
            duration: (contact && contact.duration || ''),
            discount_price: (contact && contact.discount_price || ''),
            price: (contact && contact.price || ''),
            id: (contact && contact.id || ''),
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Please Enter Title"),
            short_desc: Yup.string().required("Please Enter Description"),
            contact_limit: Yup.string().required("Please Enter Limit"),
            is_trial: Yup.string(),
            duration: Yup.string().required("Please Enter Duration"),
            discount_price: Yup.string(),
            price: Yup.string().required("Please Enter Price"),
        }),
        onSubmit: (values) => {
            try {
                if (isEdit) {
                    const UpdatePlan = {
                        id: values.id,
                        title: values.title ?? '',
                        short_desc: values.short_desc ?? '',
                        contact_limit: values.contact_limit ?? '',
                        is_trial: 0,
                        // is_trial: values.is_trial ?? '',
                        duration: values.duration ?? '',
                        discount_price: values.discount_price ?? '',
                        price: values.price ?? '',
                        fomdata: true
                    };
                    // update user
                    dispatch(onUpdatePlan(UpdatePlan));
                    // validation.resetForm();
                    setIsEdit(false);
                } else {
                    const newPlan = {
                        title: values["title"],
                        short_desc: values["short_desc"],
                        contact_limit: values["contact_limit"],
                        // is_trial: values["is_trial"],
                        is_trial: 0,
                        duration: values["duration"],
                        discount_price: values["discount_price"],
                        price: values["price"],
                        fomdata: true
                    };

                    // save new user
                    dispatch(onAddNewPlan(newPlan));
                    // validation.resetForm();
                }
                // toggle();
            } catch (err) {
                console.log('err', err.message);

            }
        },
    });


    const planProp = createSelector(
        (state) => state.plan,
        (plans) => ({
            plans: plans.plans,
            loading: plans.loading,
            btnLoad :plans.btnLoad
        })
    );

    const {
        plans, loading, btnLoad
    } = useSelector(planProp);

    const [isLoading, setLoading] = useState(loading);

    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (plans && !plans.length) {
            dispatch(onGetPlans(response?.data?.userID));
            setIsEdit(false);
        }
    }, [dispatch, plans]);

    useEffect(() => {
        setContact(plans);
        setIsEdit(false);
    }, [plans]);

    useEffect(() => {
        if (!isEmpty(plans) && !!isEdit) {
            setContact(plans);
            setIsEdit(false);
        }
    }, [plans]);

    const toggle = () => {
        setModal(!modal);
    };

    const handlePlanClick = (arg) => {
        const plan = arg;
        setContact({
            title: plan.title ?? '',
            short_desc: plan.short_desc ?? '',
            contact_limit: plan.contact_limit ?? '',
            // is_trial: plan.is_trial ?? '',
            is_trial: 0,
            duration: plan.duration ?? '',
            discount_price: plan.discount_price ?? '',
            price: plan.price ?? '',
            id: plan.id ?? ''
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
            dispatch(onDeletePlan(contact.id));
        }
        setContact("");
        setDeleteModal(false);
    };

    const handlePlanClicks = () => {
        setContact({
            'title': '',
            'short_desc': '',
            'contact_limit': '',
            'is_trial': '0',
            'duration': '',
            'discount_price': '',
            'price': '',
        });
        setIsEdit(false);
        toggle();
    };

    const columns = useMemo(
        () => [
            {
                header: 'Title',
                accessorKey: 'title',
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
                header: 'Contact Limit ',
                accessorKey: 'contact_limit',
                enableColumnFilter: false,
                enableSorting: true,
            },

            {
                header: 'Price',
                accessorKey: 'price',
                enableColumnFilter: false,
                enableSorting: true,
            },

            {
                header: 'Duration',
                accessorKey: 'duration',
                enableColumnFilter: false,
                enableSorting: true,
                // cell: (cell) => {
                //     return <div>
                //         {moment(cell.getValue(), 'YYYY-MM-DD').format('DD-MM-YYYY')}
                //     </div>
                // }
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
                                    const planData = cellProps.row.original;
                                    handlePlanClick(planData);
                                }}
                            >
                                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                            </Link>
                            <Link
                                to="#"
                                className="text-danger"
                                onClick={() => {
                                    const planData = cellProps.row.original; onClickDelete(planData);
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
                onDeleteClick={handleDeletePlan}
                onCloseClick={() => setDeleteModal(false)}
            />
            <button type="button" className="d-none" id="closeModelsuccess" onClick={() => setModal(false)} ></button>

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Plans" breadcrumbItem="Plans List" />
                    {
                        isLoading ? <Spinners setLoading={setLoading} />
                            :
                            <Row>
                                <Col lg="12">
                                    <Card>
                                        <CardBody>
                                            <TableContainer
                                                columns={columns}
                                                data={plans || []}
                                                isGlobalFilter={true}
                                                isPagination={true}
                                                SearchPlaceholder="Search..."
                                                isCustomPageSize={true}
                                                isAddButton={true}
                                                handleUserClick={handlePlanClicks}
                                                buttonClass="btn btn-success btn-rounded waves-effect waves-light addContact-modal mb-2"
                                                buttonName="Add Plan"
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
                        <ModalHeader toggle={toggle} tag="h4"> {contact?.id ? "EDIT PLAN" : "ADD PLAN"}</ModalHeader>
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
                                            <Label>Title</Label>
                                            <Input
                                                name="title"
                                                type="text"
                                                placeholder="Enter Title"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.title || ""}
                                                invalid={
                                                    validation.touched.title && validation.errors.title ? true : false}
                                            />
                                            {validation.touched.title &&
                                                validation.errors.title ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.title}
                                                </FormFeedback>
                                            ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label>Short Decription</Label>
                                            <Input
                                                name="short_desc"
                                                label=""
                                                placeholder="Enter Email"
                                                type="textarea"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.short_desc || ""}
                                                invalid={
                                                    validation.touched.short_desc && validation.errors.short_desc ? true : false}
                                            />
                                            {validation.touched.short_desc && validation.errors.short_desc ?
                                                (
                                                    <FormFeedback type="invalid">   {validation.errors.short_desc} </FormFeedback>
                                                ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label>Contact Limit</Label>
                                            <Input
                                                name="contact_limit"
                                                placeholder="Enter Limit"
                                                label=""
                                                type="number"
                                                maxLength={10}
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.contact_limit || ""}
                                                invalid={
                                                    validation.touched.contact_limit && validation.errors.contact_limit ? true : false}
                                            />
                                            {validation.errors.contact_limit ?
                                                (
                                                    <FormFeedback type="invalid">   {validation.errors.contact_limit} </FormFeedback>
                                                ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label>Duration</Label>
                                            <Input
                                                name="duration"
                                                label="duration"
                                                placeholder="Enter Duration"
                                                type="number"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.duration || ""}
                                                invalid={
                                                    validation.touched.duration && validation.errors.duration ? true : false}
                                            />
                                            {validation.touched.duration && validation.errors.duration ?
                                                (
                                                    <FormFeedback type="invalid">   {validation.errors.duration} </FormFeedback>
                                                ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label>Discount Price</Label>
                                            <Input
                                                name="discount_price"
                                                label="discount_price"
                                                placeholder="Enter Price"
                                                type="number"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.discount_price || ""}
                                                invalid={
                                                    validation.touched.discount_price && validation.errors.discount_price ? true : false}
                                            />
                                            {validation.touched.discount_price && validation.errors.discount_price ?
                                                (
                                                    <FormFeedback type="invalid">   {validation.errors.discount_price} </FormFeedback>
                                                ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label>Price</Label>
                                            <Input
                                                name="price"
                                                label="price"
                                                placeholder="Enter Price"
                                                type="number"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.price || ""}
                                                invalid={
                                                    validation.touched.price && validation.errors.price ? true : false}
                                            />
                                            {validation.touched.price && validation.errors.price ?
                                                (
                                                    <FormFeedback type="invalid">   {validation.errors.price} </FormFeedback>
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

export default withRouter(Planslist);
