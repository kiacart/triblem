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

import { getCategories as onGetCategory, addNewCategory as onAddNewCategory } from "../../store/actions";
import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import moment from "moment";

const Categories = () => {
    //meta title

    const dispatch = useDispatch();
    const [contact, setContact] = useState(); 

    document.title = "Categories | Triblem -  Dashboard Categories";


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
            name : (contact && contact.name ) || "",
            user_id: (contact && contact.app_id) || "",
        },
        validationSchema: Yup.object({
            name : Yup.string().required("Please Enter Name "),
        }),
        onSubmit: (values) => { 
            try{
            if (isEdit) {
                const updateUser = {
                    user_id: '',
                    name : values.name ,
                };
                // update user
                // dispatch(onUpdateUser(updateUser));
                validation.resetForm();
                setIsEdit(false);
            } else { 
                const newUser = {
                    user_id: response?.data?.userID,
                    name : values["name"],
                    formdata : true
                };
                // save new user
                dispatch(onAddNewCategory(newUser));
                validation.resetForm();
            }
            toggle();
        } catch(err) {
            console.log('err', err.message);
        }
        },
    });


    const categoriesProp = createSelector(
        (state) => state.calendar,
        (calendar) => ({
            categories: calendar.categories,
            loading: calendar.loading
        })
    );

    const {
        categories, loading
    } = useSelector(categoriesProp);


    const [isLoading, setLoading] = useState(loading);

    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (categories && !categories.length) {
            dispatch(onGetCategory());
            setIsEdit(false);
        }
    }, [dispatch, categories]);

    useEffect(() => {
        setContact(categories);
        setIsEdit(false);
    }, [categories]);

    useEffect(() => {
        if (!isEmpty(categories) && !!isEdit) {
            setContact(categories);
            setIsEdit(false);
        }
    }, [categories]);

    const toggle = () => {
        setModal(!modal);
    };

    const handleUserClick = (arg) => {
        const categories = arg;
        setContact({
            id: categories.id,
            name : categories.name ,
        });
        setIsEdit(true);
        toggle();
    };

    //delete customer
    const [deleteModal, setDeleteModal] = useState(false);

    const onClickDelete = (categories) => {
        setContact(categories);
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
                header: 'name',
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

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Category" breadcrumbItem="Categories" />
                    {
                        isLoading ? <Spinners setLoading={setLoading} />
                            :
                            <Row>
                                <Col lg="12">
                                    <Card>
                                        <CardBody>
                                            <TableContainer
                                                columns={columns}
                                                data={categories || []}
                                                isGlobalFilter={true}
                                                isPagination={true}
                                                SearchPlaceholder="Search..."
                                                isCustomPageSize={true}
                                                isAddButton={true}
                                                handleUserClick={handleUserClicks}
                                                buttonClass="btn btn-success btn-rounded waves-effect waves-light addContact-modal mb-2"
                                                buttonName="Add Category"
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
                        <ModalHeader toggle={toggle} tag="h4"> {contact?.id ? "Edit Category" : "Add Category"}</ModalHeader>
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
                                            <Label>Category Name</Label>
                                            <Input
                                                name="name"
                                                label="name"
                                                type="text"
                                                placeholder="Enter Category Name"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.name || ""}
                                                invalid={
                                                    validation.touched.name && validation.errors.name ? true : false}
                                            />
                                            {validation.touched.name && validation.errors.name ?
                                                (
                                                    <FormFeedback type="invalid"> {validation.errors.name}  </FormFeedback>
                                                ) : null}
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="text-end">
                                            <Button type="submit" color="success" className="save-user"> {!!isEdit ? "Update" : "Submit"}  </Button>
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

export default withRouter(Categories);
