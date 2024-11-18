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
import { getServices as onGetService, addNewService as onAddNewService, updateService as onUpdateService, deleteService as onDeleteService, } from "../../store/actions"

const ServiceStatus = ({ status }) => {
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

const WhyChooseUs = () => {

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

    const LoginProperties = createSelector(
        (state) => state.Login,
        (login) => ({
            response: login
        })
    );

    const {
        response
    } = useSelector(LoginProperties);


    const serviceProp = createSelector(
        (state) => state.service,
        (service) => ({
            services: service.services,
            loading: service.loading,
            btnLoad: service.btnLoad
        })
    );

    const {
        services, loading, btnLoad
    } = useSelector(serviceProp);

    const [isLoading, setLoading] = useState(loading);



    useEffect(() => {
        if (services && !services.length) {
            dispatch(onGetService(response?.data?.userID));
            setIsEdit(false);
        }
    }, [dispatch, services]);

    useEffect(() => {
        setData(services);
        setIsEdit(false);
    }, [services]);

    useEffect(() => {
        if (!isEmpty(services) && !!isEdit) {
            setData(services);
            setIsEdit(false);
        }
    }, [services]);


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
            image: data.image,
            title: data.title,
            short_desc: data.short_desc,
            user_id: data.user_id,
            id: data?.id
        });
        setselectedFiles([{ preview: `${PUBLIC_URL}${data.image}`, formattedSize: '' }])
        setIsEdit(true);
        toggle();
    };

    const onClickDelete = (data) => {
        setData(data);
        setDeleteModal(true);
    };

    const handleDeleteService = () => {
        if (Data && Data.id) {
            dispatch(onDeleteService(Data.id));
        }
        setData("");
        setDeleteModal(false);
    };

    const handleServiceClicks = () => {
        setData({
            'image': '',
            'title': '',
            'short_desc': '',
            'user_id': '',
        });
        validation.resetForm(); 
        setIsEdit(false);
        setselectedFiles([])
        toggle();
    };

    const handleChangeStatus = () => {
        const data = arg;
        const updateService = {
            id: data.id ?? '',
            image: selectedFiles?.length > 0 ? selectedFiles[0] : '',
            title: data.title ?? '',
            short_desc: data.short_desc ?? '',
            user_id: response?.data?.userID ?? '',
            fomdata: true
        };
    }

    console.log('DataData', Data);
    
    // validation
    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            image: (Data && Data.image || ''),
            title: (Data && Data.title || ''),
            short_desc: (Data && Data.short_desc || ''),
            user_id: (Data && Data.user_id || ''),
            id: (Data && Data.id || ''),
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Please Enter  title"),
            short_desc: Yup.string().required("Please Enter  Desription"),
        }),
        onSubmit: (values, { setErrors }) => {
            try {
                if (selectedFiles?.length == 0) {
                    return setErrors({ image: 'Please Select Image' })
                }
                if (isEdit) {
                    const updateService = {
                        id: values.id ?? '',
                        image: selectedFiles?.length > 0 ? selectedFiles[0] : '',
                        title: values.title ?? '',
                        short_desc: values.short_desc ?? '',
                        user_id: response?.data?.userID ?? '',
                        fomdata: true
                    };
                    dispatch(onUpdateService(updateService));
                    validation.resetForm();
                    setIsEdit(false);
                } else {
                    const newService = {
                        image: selectedFiles?.length > 0 ? selectedFiles[0] : '',
                        title: values["title"],
                        short_desc: values["short_desc"],
                        user_id: response?.data?.userID,
                        fomdata: true
                    };

                    dispatch(onAddNewService(newService));
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
                                <img className="rounded service_img" src={`${PUBLIC_URL}${cell.getValue()}`} alt="" />
                            </div>
                        )}
                    </>
                ),
                enableColumnFilter: false,
                enableSorting: true,
            },
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
                header: 'Desription ',
                accessorKey: 'short_desc',
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
                header: "Status",
                accessorKey: "status",
                cell: (cellProps) => <ServiceStatus status={cellProps.row.original.status} />,
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
            //                     checked={cellProps.row.original.status == 1}
            //                     className="form-check-input"
            //                     onChange={() => handleChangeStatus(cellProps.row.original)}
            //                     id="customSwitchsizemd"
            //                 />
            //             </div>
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
                                    const data = cellProps.row.original;
                                    handleUserClick(data);
                                }}
                            >
                                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
                            </Link>
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
                onDeleteClick={handleDeleteService}
                onCloseClick={() => setDeleteModal(false)}
            />
            <button type="button" className="d-none" id="closeModelsuccess" onClick={() => setModal(false)} ></button>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="Home Manage" breadcrumbItem="Why Choose Us" />
                    {
                        isLoading ? <Spinners setLoading={setLoading} /> :
                            <Row>
                                <Col lg="12">
                                    <Card>
                                        <CardBody>
                                            <TableContainer
                                                columns={columns}
                                                data={services || []}
                                                isGlobalFilter={true}
                                                isPagination={true}
                                                SearchPlaceholder="Search..."
                                                isCustomPageSize={true}
                                                isAddButton={true}
                                                handleUserClick={handleServiceClicks}
                                                buttonClass="btn btn-success btn-rounded waves-effect waves-light addContact-modal mb-2"
                                                buttonName="Add Service"
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
                        <ModalHeader toggle={toggle} tag="h4"> {Data?.id ? "EDIT SERVICE" : "ADD SERVICE"}</ModalHeader>
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
                                            <Label>Description</Label>
                                            <Input
                                                name="short_desc"
                                                label="short_desc"
                                                placeholder="Enter Description"
                                                type="textarea"
                                                rows={5}
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
                                                        </> : Data?.id ? "Update" : "Submit"
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


export default WhyChooseUs