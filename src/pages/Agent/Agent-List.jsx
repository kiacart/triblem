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

// import { getMetas as onGetAgents, addNewMeta as onAddNewUser } from "../../store/actions";
import { isEmpty } from "lodash";
import { getAgents as onGetAgents, addNewAgent as onAddNewAgent } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import moment from "moment";

const Agentlist = () => {
    //meta title
    document.title = "Agent | Triblem - Dashboard Agent";

    const dispatch = useDispatch();
    const [contact, setContact] = useState();

    //  Input: root1 = [3,5,1,6,2,9,8,null,null,7,4], 
    //  root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]  

    //   const testFun = () => {
    //    const root1 = [3,5,1,6,2,9,8,null,null,7,4]; 
    //    const root2 = [3,5,1,6,7,4,2,null,null,null,null,null,null,9,8]
    //    const value = root1.filter(h => h != null); 
    //    const value2 = root2.filter(h => h != null); 
    //    let cc = []; 
    //    for(let i = 0; i < value.length; i++) {
    //    }
    //    console.log('oooooooo', cc)
    //   }

    //   testFun();  



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
            name: (contact && contact.name || ''),
            email: (contact && contact.email || ''),
            mobile: (contact && contact.mobile || '91'),
            password: (contact && contact.password || ''),
            admin_id: (contact && contact.admin_id || ''),
            role: (contact && contact.role || ''),
            id : (contact && contact.id || '')
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter  Name"),
            email: Yup.string().required("Please Enter  Email").matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please Enter Valid Email"),
            mobile: Yup.string(),
            // .required("Please Enter Mobile"),
            password: Yup.string().required("Please Enter Password").min(6, "Password Minimum should be 6 character"),
        }),
        onSubmit: (values) => {
            try {
                if (isEdit) {
                    const updateUser = {
                        name: values.name ?? '',
                        email: values.email ?? '',
                        mobile: values.mobile ?? '',
                        password: values.password ?? '',
                        admin_id: response?.data?.userID ?? '',
                        role: '3',
                        id : values?.id
                    };
                    // update user
                    // dispatch(onUpdateUser(updateUser));
                    // validation.resetForm();
                    setIsEdit(false);
                } else {
                    const newUser = {
                        name: values["name"],
                        email: values["email"],
                        mobile: values["mobile"],
                        password: values["password"],
                        admin_id: response?.data?.userID,
                        role: '3',
                    };

                    // save new user
                    dispatch(onAddNewAgent(newUser));
                    validation.resetForm();
                }
                // toggle();
            } catch (err) {
                console.log('err', err.message);

            }
        },
    });


    const agentProp = createSelector(
        (state) => state.agent,
        (agents) => ({
            agents: agents.agents,
            loading: agents.loading,
            btnLoad: agents.btnLoad
        })
    );

    const {
        agents, loading, btnLoad
    } = useSelector(agentProp);

    const [isLoading, setLoading] = useState(loading);

    const [modal, setModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (agents && !agents.length) {
            dispatch(onGetAgents(response?.data?.userID));
            setIsEdit(false);
        }
    }, [dispatch, agents]);

    useEffect(() => {
        setContact(agents);
        setIsEdit(false);
    }, [agents]);

    useEffect(() => {
        if (!isEmpty(agents) && !!isEdit) {
            setContact(agents);
            setIsEdit(false);
        }
    }, [agents]);

    const toggle = () => {
        setModal(!modal);
    };

    const handleUserClick = (arg) => {
        const agent = arg;
        setContact({
            name: agent.name,
            email: agent.email,
            mobile: agent.mobile,
            password: agent.password,
            admin_id: agent.admin_id,
            role: agent.role,
            id : agent?.id
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
        setContact({
            'name': '',
            'email': '',
            'mobile':'91',
            'password': '',
            'admin_id': '',
            'role': '',
        });
        validation.resetForm(); 
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
                header: 'Mobile ',
                accessorKey: 'mobile',
                enableColumnFilter: false,
                enableSorting: true,
            },

            {
                header: 'Email',
                accessorKey: 'email',
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

            <button type="button" className="d-none" id="closeModelsuccess" onClick={() => setModal(false)} ></button>

            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Agent" breadcrumbItem="Agent List" />
                    {
                        isLoading ? <Spinners setLoading={setLoading} />
                            : 
                            <Row>
                                <Col lg="12">
                                    <Card>
                                        <CardBody>
                                            <TableContainer
                                                columns={columns}
                                                data={agents || []}
                                                isGlobalFilter={true}
                                                isPagination={true}
                                                SearchPlaceholder="Search..."
                                                isCustomPageSize={true}
                                                isAddButton={true}
                                                handleUserClick={handleUserClicks}
                                                buttonClass="btn btn-success btn-rounded waves-effect waves-light addContact-modal mb-2"
                                                buttonName="Add Agent"
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
                        <ModalHeader toggle={toggle} tag="h4"> {contact?.id ? "EDIT AGENT" : "ADD AGENT"}</ModalHeader>
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
                                                placeholder="Enter Name"
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
                                            <Label>Email</Label>
                                            <Input
                                                name="email"
                                                label="email"
                                                placeholder="Enter Email"
                                                type="text"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.email || ""}
                                                invalid={
                                                    validation.touched.email && validation.errors.email ? true : false}
                                            />
                                            {validation.touched.email && validation.errors.email ?
                                                (
                                                    <FormFeedback type="invalid">   {validation.errors.email} </FormFeedback>
                                                ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label>Mobile Number</Label>
                                            {/* <Input
                                                name="mobile"
                                                placeholder="Enter Mobile Number"
                                                label="mobile"
                                                type="text"
                                                maxLength={10}
                                                // onChange={validation.handleChange}
                                                onChange={(e) => validation.setFieldValue('mobile', e.target.value?.replace(/[^0-9]/g, ""))}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.mobile || ""}
                                                invalid={
                                                    validation.touched.mobile && validation.errors.mobile ? true : false}
                                            /> */}

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
                                                  // isValid={() => {
                                                  //     const phoneNum = validation.values.mobile.substring(2);
                                                  //     if(!phoneNum) {
                                                  //         return false
                                                  //     } else {
                                                  //         return true 
                                                  //     }
                                                  // }}                                                
                                            />

                                            {validation.errors.mobile ?
                                                (
                                                    <FormFeedback type="invalid">   {validation.errors.mobile} </FormFeedback>
                                                ) : null} 

                                        </div>

                                        <div className="mb-3">
                                            <Label>Password</Label>
                                            <Input
                                                name="password"
                                                label="password"
                                                placeholder="Enter Password"
                                                type="password"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.password || ""}
                                                invalid={
                                                    validation.touched.password && validation.errors.password ? true : false}
                                            />
                                            {validation.touched.password && validation.errors.password ?
                                                (
                                                    <FormFeedback type="invalid">   {validation.errors.password} </FormFeedback>
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

export default withRouter(Agentlist);
