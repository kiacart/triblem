import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Spinners from "../../components/Common/Spinner"
import { Card, CardBody, Col, Container, Row, Modal, CardTitle, ModalHeader, ModalBody, Label, FormFeedback, Input, Form, Button, UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup, Badge, Nav, NavItem, NavLink, TabContent, TabPane, } from "reactstrap";
import * as Yup from "yup";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import DeleteModal from "../../components/Common/DeleteModal";
import { isEmpty } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import classnames from "classnames";
import Dropzone from "react-dropzone"
import moment from "moment";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TableContainer from "../../components/Common/TableContainer";
import { getClients as onGetClient, addNewClient as onAddNewClient, deleteClient as onDeleteClient, } from "../../store/actions"


const ClientStatus = ({ status }) => {
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

const Clients = () => {
    const dispatch = useDispatch();

    const PUBLIC_URL = import.meta.env.VITE_APP_PUBLIC_URL ?? "";


    const [Data, setData] = useState();
    const [AllData, setAllData] = useState([]);
    const [modal, setModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const toggle = () => {
        setModal(!modal);
    };

    const [selectedFiles, setselectedFiles] = useState([])

    function handleAcceptedFiles(files) {
        files.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
                formattedSize: formatBytes(file.size),
            })
        )
        setselectedFiles(files)
    }


    /**
 * Formats the size
 */

    const LoginProperties = createSelector(
        (state) => state.Login,
        (login) => ({
            response: login
        })
    );

    const {
        response
    } = useSelector(LoginProperties);

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return "0 Bytes"
        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
    }

    const handleUserClick = (arg) => {
        const data = arg;
        setData({
            sort: data.sort,
            brand: data.brand,
            image: data.image,
            user_id: data.user_id,
        });
        setIsEdit(true);
        toggle();
    };

    const clientProp = createSelector(
        (state) => state.client,
        (clients) => ({
            clients: clients.clients,
            loading: clients.loading,
            btnLoad: clients.btnLoad
        })
    );

    const {
        clients, loading, btnLoad
    } = useSelector(clientProp);

    const [isLoading, setLoading] = useState(loading);

    useEffect(() => {
        if (clients && !clients.length) {
            dispatch(onGetClient(response?.data?.userID));
            setIsEdit(false);
        }
    }, [dispatch, clients]);

    useEffect(() => {
        setData(clients);
        setIsEdit(false);
    }, [clients]);

    useEffect(() => {
        if (!isEmpty(clients) && !!isEdit) {
            setData(clients);
            setIsEdit(false);
        }
    }, [clients]);

    const onClickDelete = (data) => {
        setData(data);
        setDeleteModal(true);
    };

    const handleDeleteClient = () => {
        if (Data && Data.id) {
            dispatch(onDeleteClient(Data.id));
        }
        setData("");
        setDeleteModal(false);
    };

    const handleClientClicks = () => {
        setData({
            'sort': '',
            'brand': '',
            'image': '',
            'user_id': '',
        });
        setIsEdit(false);
        validation.resetForm(); 
        toggle();
        setselectedFiles([])
    };



    // validation
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            sort: (Data && Data.sort || ''),
            brand: (Data && Data.brand || ''),
            image: (Data && Data.image || ''),
            user_id: (Data && Data.user_id || ''),
        },
        validationSchema: Yup.object({
            brand: Yup.string().required("Please Enter brand"),
        }),
        onSubmit: (values, { setErrors }) => {
            try {
                if (selectedFiles?.length == 0) {
                    return setErrors({ image: 'Please Select Image' })
                }

                if (isEdit) {
                    const updateBanner = {
                        sort: values.sort ?? '',
                        brand: values.brand ?? '',
                        image: selectedFiles?.length > 0 ? selectedFiles[0] : '',
                        user_id: response?.data?.userID ?? '',
                        fomdata: true
                    };
                    // update user
                    // dispatch(onUpdateBanner(updateBanner));
                    validation.resetForm();
                    setIsEdit(false);
                } else {
                    const newClient = {
                        sort: 1,
                        brand: values["brand"],
                        image: selectedFiles?.length > 0 ? selectedFiles[0] : '',
                        user_id: response?.data?.userID ?? '',
                        fomdata: true
                    };
                    // save new user
                    dispatch(onAddNewClient(newClient));
                    // validation.resetForm();
                }
                // toggle();
            } catch (err) {
                console.log('err', err.message);
            }
        },
    });


    const columns = useMemo(
        () => [
            {
                header: "Image",
                accessorKey: "image",
                cell: (cell) => (
                    <>
                        {!cell.getValue() ? (
                            <div className="avatar-xs">
                                <span className="avatar-title rounded-circle">{cell.row.original.name.charAt(0)} </span>
                            </div>
                        ) : (
                            <div>
                                <img className="rounded banner_img" src={`${PUBLIC_URL}${cell.getValue()}`} alt="" />
                            </div>
                        )}
                    </>
                ),
                // cell: (cellProps) => (
                //     <div className="avatar-sm bg-light rounded p-2">
                //       <img src={`${PUBLIC_URL}${cellProps.row.original.image}`} alt="" className="img-fluid rounded-circle" />
                //     </div>
                //   ),
                enableColumnFilter: false,
                enableSorting: true,
            },

            {
                header: 'Brand',
                accessorKey: 'brand',
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
                header: "Status",
                accessorKey: "status",
                cell: (cellProps) => <ClientStatus status={cellProps.row.original.status} />,
                enableColumnFilter: false,
                enableSorting: true,
            },

            {
                header: 'Date',
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
                            {/* <Link
                                to="#"
                                className="text-success"
                                onClick={() => {
                                    const data = cellProps.row.original;
                                    handleUserClick(data);
                                }}
                            >
                                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                            </Link> */}
                            <Link
                                to="#"
                                className="text-danger"
                                onClick={() => {
                                    const data = cellProps.row.original; onClickDelete(data);
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
                onDeleteClick={handleDeleteClient}
                onCloseClick={() => setDeleteModal(false)}
            />
            <button type="button" className="d-none" id="closeModelsuccess" onClick={() => setModal(false)} ></button>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Home Manage" breadcrumbItem="Client" />
                    {
                        isLoading ? <Spinners setLoading={setLoading} /> :
                            <Row>
                                <Col lg="12">
                                    <Card>
                                        <CardBody>
                                            <TableContainer
                                                columns={columns}
                                                data={clients || []}
                                                isGlobalFilter={true}
                                                isPagination={true}
                                                SearchPlaceholder="Search..."
                                                isCustomPageSize={true}
                                                isAddButton={true}
                                                handleUserClick={handleClientClicks}
                                                buttonClass="btn btn-success btn-rounded waves-effect waves-light addContact-modal mb-2"
                                                buttonName="Add Client"
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
                        <ModalHeader toggle={toggle} tag="h4"> {Data?.id ? "EDIT CLIENT" : "ADD CLIENT"}</ModalHeader>
                        <ModalBody>
                            {validation?.errors?.image && (
                                <div className="alert alert-danger w-100" role="alert">
                                    <i className="fa fa-exclamation-triangle text-danger me-2" aria-hidden="true"></i>  {validation?.errors?.image}
                                </div>
                            )}
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
                                            <Label>Brand</Label>
                                            <Input
                                                name="brand"
                                                type="text"
                                                placeholder="Enter Brand"
                                                onChange={validation.handleChange}
                                                onBlur={validation.handleBlur}
                                                value={validation.values.brand || ""}
                                                invalid={
                                                    validation.touched.brand && validation.errors.brand ? true : false}
                                            />
                                            {validation.touched.brand &&
                                                validation.errors.brand ? (
                                                <FormFeedback type="invalid">
                                                    {validation.errors.brand}
                                                </FormFeedback>
                                            ) : null}
                                        </div>

                                        <div className="mb-3">
                                            <Label htmlFor="Image-input">Image</Label>
                                            <Dropzone
                                                onDrop={acceptedFiles => {
                                                    handleAcceptedFiles(acceptedFiles)
                                                }}
                                            >
                                                {({ getRootProps, getInputProps }) => (
                                                    <div className="dropzone">
                                                        <div
                                                            className="dz-message needsclick mt-2"
                                                            {...getRootProps()}
                                                        >
                                                            <input {...getInputProps()} />
                                                            <div className="mb-3">
                                                                <i className="display-4 text-muted bx bxs-cloud-upload" />
                                                            </div>
                                                            <h4>Drop files here or click to upload.</h4>
                                                        </div>
                                                    </div>
                                                )}
                                            </Dropzone>
                                            <div className="dropzone-previews mt-3" id="file-previews">
                                                {selectedFiles.map((f, i) => {
                                                    return (
                                                        <Card
                                                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                                            key={i + "-file"}
                                                        >
                                                            <div className="p-2">
                                                                <Row className="align-items-center">
                                                                    <Col className="col-auto">
                                                                        <img
                                                                            data-dz-thumbnail=""
                                                                            height="80"
                                                                            className="avatar-sm rounded bg-light"
                                                                            alt={f.name}
                                                                            src={f.preview}
                                                                        />
                                                                    </Col>
                                                                    <Col>
                                                                        <Link
                                                                            to="#"
                                                                            className="text-muted font-weight-bold"
                                                                        >
                                                                            {f.name}
                                                                        </Link>
                                                                        <p className="mb-0">
                                                                            <strong>{f.formattedSize}</strong>
                                                                        </p>
                                                                    </Col>
                                                                    <Col className="text-end"><Link onClick={() => setselectedFiles(selectedFiles.filter(u => u != f))} className="text-danger">Remove</Link></Col>
                                                                </Row>
                                                            </div>
                                                        </Card>
                                                    )
                                                })}
                                            </div>
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
                                                        </> : Data?.id ? "Edit Client" : "Add Client"
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
    )
}


export default Clients