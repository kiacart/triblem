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
import { getfaqs as onGetFaqs, addNewFaq as onAddNewFaq, updateFaq as onUpdateFaq, deleteFaq as onDeletefaq } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import moment from "moment";

const FaqlStatus = ({ status }) => {
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

const FaqList = () => {
    //meta title
    document.title = "FAQ | Triblem - Dashboard FAQ";

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
            question: (contact && contact.question || ''),
            answer: (contact && contact.answer || ''),
            id: (contact && contact.id || ''),
        },
        validationSchema: Yup.object({
            question: Yup.string().required("Please Enter Question"),
            answer: Yup.string().required("Please Enter Answer"),
        }),
        onSubmit: (values) => {
            try {
                if (isEdit) {
                    const UpdatePlan = {
                        id: values.id,
                        question: values.question ?? '',
                        answer: values.answer ?? '',
                        user_id: response?.data?.userID,
                        fomdata: true
                    };
                    // update user
                    dispatch(onUpdateFaq(UpdatePlan));
                    // validation.resetForm();
                    setIsEdit(false);
                } else {
                    const newFaq = {
                        question: values["question"],
                        answer: values["answer"],
                        user_id: response?.data?.userID,
                        fomdata: true
                    };

                    // save new user
                    dispatch(onAddNewFaq(newFaq));
                    // validation.resetForm();
                }
                // toggle();
            } catch (err) {
                console.log('err', err.message);

            }
        },
    });


    const faqProp = createSelector(
        (state) => state.faq,
        (faqs) => ({
            faqs: faqs.faqs,
            loading: faqs.loading,
            btnLoad : faqs.btnLoad
        })
    );

    const {
        faqs, loading,btnLoad
    } = useSelector(faqProp);

    const [isLoading, setLoading] = useState(loading);

    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (faqs && !faqs.length) {
            dispatch(onGetFaqs(response?.data?.userID));
            setIsEdit(false);
        }
    }, [dispatch, faqs]);

    useEffect(() => {
        setContact(faqs);
        setIsEdit(false);
    }, [faqs]);

    useEffect(() => {
        if (!isEmpty(faqs) && !!isEdit) {
            setContact(faqs);
            setIsEdit(false);
        }
    }, [faqs]);

    const toggle = () => {
        setModal(!modal);
    };

    const handlePlanClick = (arg) => {
        const faq = arg;
        setContact({
            question: faq.question ?? '',
            answer: faq.answer ?? '',
            id: faq.id ?? ''
        });
        setIsEdit(true);
        toggle();
    };

    //delete customer
    const [deleteModal, setDeleteModal] = useState(false);

    const onClickDelete = (faq) => {
        setContact(faq);
        setDeleteModal(true);
    };

    const handleDeletePlan = () => {
        if (contact && contact.id) {
            dispatch(onDeletefaq(contact.id));
        }
        setContact("");
        setDeleteModal(false);
    };

    const handlePlanClicks = () => {
        setContact({
            'question': '',
            'answer': '',
        });
        validation.resetForm(); 
        setIsEdit(false);
        toggle();
    };

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
                header: 'Question ',
                accessorKey: 'question',
                enableColumnFilter: false,
                enableSorting: true,
                cell: (cell) => {
                    return (
                        <>
                            <p className=' mb-1 text-wrap three_line' style={{width:'200px'}}>
                              {cell.getValue()}
                            </p>
                        </>
                    )
                }
            },


            {
                header: 'Answer',
                accessorKey: 'answer',
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
                // cell: (cell) => {
                //     return <div>
                //         {moment(cell.getValue(), 'YYYY-MM-DD').format('DD-MM-YYYY')}
                //     </div>
                // }
            },

            {
                header: "Status",
                accessorKey: "status",
                cell: (cellProps) => <FaqlStatus status={cellProps.row.original.status} />,
                enableColumnFilter: false,
                enableSorting: true,
            },

            // {
            //     header: 'Date',
            //     accessorKey: 'created_at',
            //     enableColumnFilter: false,
            //     enableSorting: true,
            //     cell: (cell) => {
            //         return <div>
            //             {moment(cell.getValue(), 'YYYY-MM-DD').format('DD-MM-YYYY')}
            //         </div>
            //     }
            // },

            {
                header: 'Action',
                cell: (cellProps) => {
                    return (
                        <div className="d-flex gap-3">
                            <Link
                                to="#"
                                className="text-success"
                                onClick={() => {
                                    const faqData = cellProps.row.original;
                                    handlePlanClick(faqData);
                                }}
                            >
                                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                            </Link>
                            <Link
                                to="#"
                                className="text-danger"
                                onClick={() => {
                                    const faqData = cellProps.row.original; onClickDelete(faqData);
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
                    <Breadcrumbs title="FAQ" breadcrumbItem="FAQ List" />
                    {
                        isLoading ? <Spinners setLoading={setLoading} />
                            :
                            <Row>
                                <Col lg="12">
                                    <Card>
                                        <CardBody>
                                            <TableContainer
                                                columns={columns}
                                                data={faqs || []}
                                                isGlobalFilter={true}
                                                isPagination={true}
                                                SearchPlaceholder="Search..."
                                                isCustomPageSize={true}
                                                isAddButton={true}
                                                handleUserClick={handlePlanClicks}
                                                buttonClass="btn btn-success btn-rounded waves-effect waves-light addContact-modal mb-2"
                                                buttonName="ADD FAQ"
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
                        <ModalHeader toggle={toggle} tag="h4"> {contact?.id ? "EDIT FAQ" : "ADD FAQ"}</ModalHeader>
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
                                            <Label>Question</Label>
                                            <Input
                                                name="question"
                                                type="text"
                                                placeholder="Enter question"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.question || ""}
                                                invalid={
                                                    validation.touched.question && validation.errors.question ? true : false}
                                            />
                                            {validation.touched.question &&
                                                validation.errors.question ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.question}
                                                </FormFeedback>
                                            ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label>Answer</Label>
                                            <Input
                                                name="answer"
                                                label=""
                                                placeholder="Enter answer"
                                                type="textarea"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.answer || ""}
                                                invalid={
                                                    validation.touched.answer && validation.errors.answer ? true : false}
                                            />
                                            {validation.touched.answer && validation.errors.answer ?
                                                (
                                                    <FormFeedback type="invalid">   {validation.errors.answer} </FormFeedback>
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
                                                        </> : contact?.id ? "Edit FAQ" : "Add FAQ"
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

export default withRouter(FaqList);
