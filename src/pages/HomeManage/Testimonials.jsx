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
import { getTestimonials as onGetTestimonials, addNewTestimonial as onAddNewTestimonial, updateTestimonial as onUpdateTestimonial, deleteTestimonial as onDeleteTestimonials } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import moment from "moment";


const TestimonialStatus = ({ status }) => {
    switch (status) {
        //   case "PENDING":
        //     return <Badge className="bg-warning"> {status} </Badge>;
        case 0:
            return <Badge className="bg-danger"> {'DISABLE'} </Badge>;
        case 1:
            return <Badge className="bg-success"> {'ACTIVE'} </Badge>;
        default:
            return <Badge className="bg-info"> {'PENDING'} </Badge>;
    }
};

const Testimonialslist = () => {
    //meta title
    document.title = "Testimonials | Triblem - Dashboard Testimonials";

    const dispatch = useDispatch();
    const [contact, setContact] = useState();
    const [check, setcheck] = useState();

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
            content: (contact && contact.content || ''),
            user_id: (contact && contact.user_id || ''),
            id: (contact && contact.id || ''),
        },
        validationSchema: Yup.object({
            content: Yup.string().required("Please Enter content"),
        }),
        onSubmit: (values) => {
            try {
                if (isEdit) {
                    const UpdaTesti = {
                        id: values.id,
                        content: values.content ?? '',
                        user_id: response?.data?.userID,
                        approved: 1,
                        fomdata: true
                    };
                    // update user
                    dispatch(onUpdateTestimonial(UpdaTesti));
                    validation.resetForm();
                    setIsEdit(false);
                } else {
                    const newTesti = {
                        content: values["content"],
                        user_id: response?.data?.userID,
                        fomdata: true
                    };
                    // save new user
                    dispatch(onAddNewTestimonial(newTesti));
                    // validation.resetForm();
                }
                // toggle();
            } catch (err) {
                console.log('err', err.message);

            }
        },
    });


    const testiProp = createSelector(
        (state) => state.testimonial,
        (testimonials) => ({
            testimonials: testimonials.testimonials,
            loading: testimonials.loading,
            btnLoad : testimonials.btnLoad
        })
    );

    const {
        testimonials, loading, btnLoad
    } = useSelector(testiProp);

    const [isLoading, setLoading] = useState(loading);

    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (testimonials && !testimonials.length) {
            dispatch(onGetTestimonials(response?.data?.userID));
            setIsEdit(false);
        }
    }, [dispatch, testimonials]);

    useEffect(() => {
        setContact(testimonials);
        setIsEdit(false);
    }, [testimonials]);

    useEffect(() => {
        if (!isEmpty(testimonials) && !!isEdit) {
            setContact(testimonials);
            setIsEdit(false);
        }
    }, [testimonials]);

    const toggle = () => {
        setModal(!modal);
    };

    const handlePlanClick = (arg) => {
        const testi = arg;
        setContact({
            user_id: testi.user_id ?? '',
            content: testi.content ?? '',
            id: testi.id ?? ''
        });
        setIsEdit(true);
        toggle();
    };
    
    //delete customer
    const [deleteModal, setDeleteModal] = useState(false);

    const onClickDelete = (testi) => {
        setContact(testi);
        setDeleteModal(true);
    };

    const handleDeletePlan = () => {
        if (contact && contact.id) {
            dispatch(onDeleteTestimonials(contact.id));
        }
        setContact("");
        setDeleteModal(false);
    };

    const handleTestiClicks = () => {
        setContact({
            'content': '',
            'user_id': '',
        });
        validation.resetForm(); 
        setIsEdit(false);
        toggle();
    };

    const handleChangeStatus = (val, arg) => {
        const testi = arg;
        const updateService = {
            user_id: testi.user_id ?? '',
            content: testi.content ?? '',
            id: testi.id ?? '',
            approved: val ? 1 : 0,
            fomdata: true
        };
        dispatch(onUpdateTestimonial(updateService));
    }

    const columns = useMemo(
        () => [
            {
                header: 'S.NO',
                accessorKey: 'id',
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
                header: 'Content',
                accessorKey: 'content',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cell) => {
                    return (
                        <>
                            <p className=' mb-1 text-wrap three_line' style={{width:'350px'}}>
                              {cell.getValue()}
                            </p>
                        </>
                    )
                }
            },

            {
                header: "Status",
                accessorKey: "status",
                cell: (cellProps) => <TestimonialStatus status={cellProps.row.original.status} />,
                enableColumnFilter: false,
                enableSorting: true,
            },

            // {
            //     header: 'Disable/Enable',
            //     accessorKey: "status",
            //     enableColumnFilter: false,
            //     cell: (cellProps) => {
            //         return <div>
            //             <div
            //                 className="form-check form-switch form-switch-md mb-3"
            //             >
            //                 <input
            //                     type="checkbox"
            //                     // checked={cellProps.row.original.status == 1}
            //                     className="form-check-input"
            //                     onChange={(e) => handleChangeStatus(e.target.checked ,cellProps.row.original)}
            //                     id="customSwitchsizemd"
            //                 />
            //             </div>
            //         </div>
            //     }
            // },

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
                                    const testOdata = cellProps.row.original;
                                    handlePlanClick(testOdata);
                                }}
                            >
                                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                            </Link>
                            <Link
                                to="#"
                                className="text-danger"
                                onClick={() => {
                                    const testOdata = cellProps.row.original; onClickDelete(testOdata);
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
                    <Breadcrumbs title="Home Manage" breadcrumbItem="Testimonials List" />
                    {
                        isLoading ? <Spinners setLoading={setLoading} />
                            :
                            <Row>
                                <Col lg="12">
                                    <Card>
                                        <CardBody>
                                            <TableContainer
                                                columns={columns}
                                                data={testimonials || []}
                                                isGlobalFilter={true}
                                                isPagination={true}
                                                SearchPlaceholder="Search..."
                                                isCustomPageSize={true}
                                                isAddButton={true}
                                                handleUserClick={handleTestiClicks}
                                                buttonClass="btn btn-success btn-rounded waves-effect waves-light addContact-modal mb-2"
                                                buttonName="Add Testimonials"
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
                        <ModalHeader toggle={toggle} tag="h4"> {contact?.id ? "EDIT TESTIMONIALS" : "ADD TESTIMONIALS"}</ModalHeader>
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
                                            <Label>Content</Label>
                                            <Input
                                                name="content"
                                                type="textarea"
                                                placeholder="Enter Content"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                rows={5}
                                                value={validation.values.content || ""}
                                                invalid={
                                                    validation.touched.content && validation.errors.content ? true : false}
                                            />
                                            {validation.touched.content &&
                                                validation.errors.content ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.content}
                                                </FormFeedback>
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

export default withRouter(Testimonialslist);
