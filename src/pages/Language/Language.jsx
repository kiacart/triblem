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
import { getLanguage as onGetLang, addNewLanguage as onAddNewLang } from "../../store/actions";
import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import moment from "moment";


const LangStatus = ({ status }) => {
    switch (status) {  
      case 0:
        return <Badge className="bg-danger"> {'REJECTED'} </Badge>;
  
      case 1:
        return <Badge className="bg-success"> {"APPROVED"} </Badge>;
  
      default:
        return <Badge className="bg-info"> {'PENDING'} </Badge>;
    }
  };
  

const Langauge = () => {
    //meta title

    const dispatch = useDispatch();
    const [contact, setContact] = useState();  

    document.title = "Language | Triblem -  Dashboard Language";

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
            lang: (contact && contact.lang) || "",
            code: (contact && contact.code) || "",
            user_id: (contact && contact.app_id) || "",
        },
        validationSchema: Yup.object({
            lang: Yup.string().required("Please Enter language"),
            code: Yup.string().required("Please Enter code"),
        }),
        onSubmit: (values) => { 
            try{
            if (isEdit) {
                const updateUser = {
                    user_id: '',
                    lang: values.lang,
                    code: values.code,
                };
                // update user
                // dispatch(onUpdateUser(updateUser));
                validation.resetForm();
                setIsEdit(false);
            } else { 
                const newUser = {
                    user_id: response?.data?.userID,
                    lang: values["lang"],
                    code: values["code"],
                    formdata : true
                };
                
                // save new user
                dispatch(onAddNewLang(newUser));
                validation.resetForm();
            }
            toggle();
        } catch(err) {
            console.log('err', err.message);
            
        }
        },
    });


    const langProp = createSelector(
        (state) => state.language,
        (language) => ({
            language: language.language,
            loading: language.loading
        })
    );

    const {
        language, loading
    } = useSelector(langProp); 



    const [isLoading, setLoading] = useState(loading);

    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (language && !language.length) {
            dispatch(onGetLang());
            setIsEdit(false);
        }
    }, [dispatch, language]);

    useEffect(() => {
        setContact(language);
        setIsEdit(false);
    }, [language]);

    useEffect(() => {
        if (!isEmpty(language) && !!isEdit) {
            setContact(language);
            setIsEdit(false);
        }
    }, [language]);

    const toggle = () => {
        setModal(!modal);
    };

    const handleUserClick = (arg) => {
        const lang = arg;
        setContact({
            id: lang.id,
            lang: lang.lang,
            code: lang.code,
        });
        setIsEdit(true);
        toggle();
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
                header: 'Langauge',
                accessorKey: 'lang',
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
                header: 'Code',
                accessorKey: 'code',
                enableColumnFilter: false,
                enableSorting: true,
            },

            {
                header: "Status",
                accessorKey: "status",
                cell: (cellProps) => <LangStatus status={cellProps.row.original.status} />,
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

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Language" breadcrumbItem="Language List" />
                    {
                        isLoading ? <Spinners setLoading={setLoading} />
                            :
                            <Row>
                                <Col lg="12">
                                    <Card>
                                        <CardBody>
                                            <TableContainer
                                                columns={columns}
                                                data={language || []}
                                                isGlobalFilter={true}
                                                isPagination={true}
                                                SearchPlaceholder="Search..."
                                                isCustomPageSize={true}
                                                isAddButton={true}
                                                handleUserClick={handleUserClicks}
                                                buttonClass="btn btn-success btn-rounded waves-effect waves-light addContact-modal mb-2"
                                                buttonName="Add Language"
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
                        <ModalHeader toggle={toggle} tag="h4"> {!!isEdit ? "Edit Language" : "Add Language"}</ModalHeader>
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
                                            <Label>Language</Label>
                                            <Input
                                                name="lang"
                                                type="text"
                                                placeholder="Enter Language"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.lang || ""}
                                                invalid={
                                                    validation.touched.lang && validation.errors.lang ? true : false}
                                            />
                                            {validation.touched.lang &&
                                                validation.errors.lang ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.lang}
                                                </FormFeedback>
                                            ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label>Code</Label>
                                            <Input
                                                name="code"
                                                label="code"
                                                type="text"
                                                placeholder="Enter Language Code"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.code || ""}
                                                invalid={
                                                    validation.touched.code && validation.errors.code ? true : false}
                                            />
                                            {validation.touched.code && validation.errors.code ?
                                                (
                                                    <FormFeedback type="invalid">   {validation.errors.code} </FormFeedback>
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

export default withRouter(Langauge);
