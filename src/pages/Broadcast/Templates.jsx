import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';
import withRouter from "../../components/Common/withRouter";
import TableContainer from "../../components/Common/TableContainer";
import Spinners from "../../components/Common/Spinner"
import {
  Badge,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
  UncontrolledTooltip,
  Button,
  Card,
  CardBody,
} from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import DeleteModal from "../../components/Common/DeleteModal";
import companies01 from "../../assets/images/companies/img-1.png";
import Flatpickr from 'react-flatpickr';
import "flatpickr/dist/themes/material_blue.css";
import { getTemplate as onGetTemplate } from "../../store/actions"; 

import {
  deleteTemplate as onDeleteTemplate,
} from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";

const TemplateStatus = ({ status }) => {
  switch (status) {
    case "PENDING":
      return <Badge className="bg-warning"> {status} </Badge>;

    case "REJECTED":
      return <Badge className="bg-danger"> {status} </Badge>;

    case "APPROVED":
      return <Badge className="bg-success"> {status} </Badge>;

    default:
      return <Badge className="bg-info"> {status} </Badge>;
  }
};



const Templates = () => {

  //meta title
  document.title = "Template List | Triblem ";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ProjectsProjectProperties = createSelector(
    (state) => state.templates,
    (Projects) => ({
      templates: Projects.templates,
      loading: Projects.loading
    })
  );  

  const LoginProperties = createSelector(
    (state) => state.Login,
    (login) => ({
      response : login
    })
  );

  const {
    response
  } = useSelector(LoginProperties); 

  const templateprop = createSelector(
    (state) => state.templates,
    (templates) => ({
      btnLoad: templates.btnLoad,
      templates : templates.templates,
      loading : templates.loading
    })
  );

  const {
     templates , loading
  } = useSelector(templateprop); 


 
  const [isLoading, setLoading] = useState(loading)
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [filter, setFilter] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [template, setTemplate] = useState();
  const [templateData, settemplateData] = useState([]);

  
  const toggle = () => {
    if (modal) {
      setModal(false);
      setTemplate(null);
    } else {
      setModal(true);
    }
  };

  const toggle2 = () => {
    if (modal1) {
      setModal1(false);
    } else {
      setModal1(true);
    }
  };




  const handleProjectClick = useCallback((arg) => {
    const template = arg;
    setTemplate({
      id: template.id,
      img: template.img,
      name: template.name,
      description: template.description,
      status: template.status,
      color: template.color,
      dueDate: template.dueDate,
      team: template.team,
      category: template.category,
      language: template.language
    });

    setIsEdit(true);

    toggle();
  }, [toggle]);

  //delete order
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = useCallback((template) => {
    setTemplate(template);
    setDeleteModal(true);
  }, []);

  const handleDeleteOrder = () => {
    if (template && template.id) {
      dispatch(onDeleteTemplate(template.id));
    }
    setDeleteModal(false);
  };

  useEffect(() => {
    if (templates && !templates.length) {
      dispatch(onGetTemplate(response?.data?.userID));
    }
  }, [dispatch, templates]);

  useEffect(() => {
    settemplateData(templates ?? []);
  }, [templates]);

  useEffect(() => {
    if(filter.length > 0) {
      const value = templates ?? []; 
      settemplateData(value.filter(data => filter.includes(data?.status)) ?? [])

    }else {
      settemplateData(templates ?? []);
    }

  },[filter, templates])

  const [selectedImage, setSelectedImage] = useState();

  const handleImageChange = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      validation.setFieldValue("img", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleProjectClicks = () => {
    navigate("/create-templates")
  } 

  var merge = function(nums1, m, nums2, n) {
    const val = [...nums1, ...nums2]; 
    const value = val.filter(r => r != 0).sort(); 
    return value; 
};

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      id: (template && template.id) || "",
      img: (template && template.img) || "",
      name: (template && template.name) || "",
      description: (template && template.description) || "",
      status: (template && template.status) || "",
      color: (template && template.color) || "",
      dueDate: (template && template.dueDate) || "",
      team: (template && template.team) || "",
      language: (template && template.language) || "",
      category: (template && template.category) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Your Name"),
      description: Yup.string().required("Please Enter Your Description"),
      status: Yup.string().required("Please Enter Your Status"),
      color: Yup.string().required("Please Enter Your Color"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateProject = {
          id: template.id,
          img: values.img,
          name: values.name,
          description: values.description,
          status: values.status,
          color: values.color,
          dueDate: values.dueDate,
          team: values.team,
          category: values.category,
          language: values.language
        };
        // update template
        // dispatch(onUpdateProject(updateProject));
      }
      toggle();
    },
  });


  const columns = useMemo(
    () => [
      {
        header: "Templates Name",
        accessorKey: "name",
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cellProps) => {
          return (
            <>
              <h5 className="text-truncate font-size-14">
                {/* <Link to={`/templates-overview/${cellProps.row.original.id}`} className="text-dark">{cellProps.row.original.name} </Link> */}
                {cellProps.row.original.name} 
              </h5>
            </>
          );
        }
      },

      {
        header: "Category",
        accessorKey: "category",
        enableColumnFilter: false,
        enableSorting: true,
      },

      {
        header: "Status",
        accessorKey: "status",
        cell: (cellProps) => <TemplateStatus status={cellProps.row.original.status} />,
        enableColumnFilter: false,
        enableSorting: true,
      },

      {
        header: "Language",
        accessorKey: "language",
        enableColumnFilter: false,
        enableSorting: true,
      },

      {
        header: "Format",
        accessorKey: "parameter_format",
        cell: (cellProps) => <TemplateStatus status={cellProps.row.original.parameter_format} />,
        enableColumnFilter: false,
        enableSorting: true,
      },

      {
        header: "Action",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cellProps) => {
          return (<div className="d-flex gap-2 flex-wrap"> 
          <button  className="btn btn-outline-primary" type="button" onClick={()=> navigate('/create-broadcast', {state:{tempId : cellProps.row.original?.name } })}> <i className="bx bx-broadcast font-size-16  me-1" />Send BroadCast</button>
          <button  className="btn btn-outline-success" type="button" onClick={()=> navigate('/create-templates', {state:{tempData : cellProps.row.original } })}><i className="mdi mdi-content-copy font-size-16 me-1" /></button>
          <button  className="btn btn-outline-danger" type="button" onClick={() => onClickDelete(cellProps.row.original)}> <i className="mdi mdi-trash-can font-size-16 me-1" /></button>
            {/* <UncontrolledDropdown>
              <DropdownToggle tag="a" href="#" className="card-drop">
                <i className="mdi mdi-dots-horizontal font-size-18" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem href="#!" onClick={() => { }}>
                  <i className="bx bx-broadcast font-size-16 text-primary me-1" />Send BroadCast
                </DropdownItem>
                <DropdownItem href="#!" onClick={() => handleProjectClick(cellProps.row.original)}>
                <DropdownItem href="#!" onClick={() => { }}>
                  <i className="mdi mdi-pencil font-size-16 text-success me-1" />Edit
                  <i className="mdi mdi-content-copy font-size-16 text-success me-1" /> Copy
                </DropdownItem>
                <DropdownItem href="#!" onClick={() => onClickDelete(cellProps.row.original)}>
                  <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />Delete
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
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
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />

      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="BroadCast" breadcrumbItem="Templates" />

                {
                  isLoading ?
                    <Spinners setLoading={setLoading} />
                    :
                    <Row>
                      <Col lg={12}>
                        <Card>
                          <CardBody>
                            <TableContainer
                              columns={columns}
                              data={templateData}
                              isGlobalFilter={true}
                              isAddButton={true}
                              isPagination={true}
                              isCustomPageSize={true}
                              importbtn={true}
                              exportbtn={true}
                              filter={true}
                              setFilter={toggle2}
                              handleUserClick={handleProjectClicks}
                              SearchPlaceholder="Search..."
                              buttonClass="btn btn-success btn-rounded"
                              buttonName=" Add Templates"
                              tableClass="template-list-table align-middle table-nowrap dt-responsive nowrap w-100 table-borderless dataTable no-footer dtr-inline"
                              theadClass="table-light"
                              paginationWrapper="dataTables_paginate paging_simple_numbers pagination-rounded"
                              pagination="pagination"
                            />
                          </CardBody>
                        </Card>
                      </Col>
                    </Row>
                }

          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h4">
              {!!isEdit ? "Edit Project" : "Add Project"}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
                autoComplete="off">

                <Row>
                  <Col xs={12}>
                    <div className="text-center">
                      <div className="position-relative d-inline-block">
                        <div className="position-absolute bottom-0 end-0">
                          <Label htmlFor="customer-image-input" className="mb-0" id="tooltip">
                            <div className="avatar-xs cursor-pointer">
                              <div className="avatar-title bg-light border rounded-circle text-muted">
                                <i className="bx bx-images"></i>
                              </div>
                            </div>
                          </Label>
                          <UncontrolledTooltip placement="right" target="tooltip">
                            Select Image
                          </UncontrolledTooltip>
                          <Input name="picture" className="form-control d-none" value="" id="customer-image-input" type="file" accept="image/png, image/gif, image/jpeg" onChange={handleImageChange} />
                        </div>
                        <div className="avatar-lg p-1">
                          <div className="avatar-title bg-light rounded-circle">
                            <img src={selectedImage || companies01} alt="" id="customer-img" className="avatar-md rounded-circle object-cover" />
                          </div>
                        </div>
                      </div>
                      {validation.errors.picture && validation.touched.picture ? (
                        <FormFeedback type="invalid" className='d-block'> {validation.errors.picture} </FormFeedback>
                      ) : null}
                    </div>
                    <div className="mb-3">
                      <Label>Name</Label>
                      <Input
                        name="name"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.name || ""}
                        invalid={
                          validation.touched.name && validation.errors.name ? true : false
                        }
                      />
                      {validation.touched.name && validation.errors.name ? (
                        <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label>Description</Label>
                      <Input
                        name="description"
                        type="text"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.description || ""}
                        invalid={
                          validation.touched.description && validation.errors.description ? true : false
                        }
                      />
                      {validation.touched.description && validation.errors.description ? (
                        <FormFeedback type="invalid">{validation.errors.description}</FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label>Status</Label>
                      <Input
                        name="status"
                        id="status1"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.status || ""}
                        invalid={
                          validation.touched.status && validation.errors.status ? true : false
                        }
                      >
                        <option>Completed</option>
                        <option>Pending</option>
                        <option>Delay</option>
                      </Input>
                      {validation.touched.status && validation.errors.status ? (
                        <FormFeedback type="invalid">{validation.errors.status}</FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label>Color</Label>
                      <Input
                        name="color"
                        type="select"
                        className="form-select"
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.color || ""}
                        invalid={
                          validation.touched.color && validation.errors.color ? true : false
                        }
                      >
                        <option>success</option>
                        <option>warning</option>
                        <option>danger</option>
                      </Input>
                      {validation.touched.color && validation.errors.color ? (
                        <FormFeedback type="invalid">{validation.errors.color}</FormFeedback>
                      ) : null}
                    </div>

                    <div className="mb-3">
                      <Label>DueDate</Label>
                      <Flatpickr
                        type="date"
                        name="dueDate"
                        className="form-control"
                        value={validation.values.dueDate || ""}
                        onChange={(date) => validation.setFieldValue("dueDate", moment(date[0]).format('DD MMMM, YYYY'))}
                        options={{
                          mode: "single",
                          dateFormat: "d M, Y"
                        }}
                      />
                      {
                        validation.touched.dueDate && validation.errors.dueDate ? (
                          <span className="text-danger">{validation.errors.dueDate}</span>
                        ) : null
                      }
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className="text-end">
                      <Button type="submit" color="success" className="save-user">Save</Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>

          <Modal isOpen={modal1} centered toggle={toggle2}>
            <ModalHeader toggle={toggle2} tag="h4">
              Attributes
            </ModalHeader>
            <ModalBody>
              <div className="chekcad">
                <Label > Choose attributes to filter</Label>
                <div className="form-check mb-3" onClick={()=> setFilter((p) => p.includes('DRAFT') ? p.filter(r => r != 'DRAFT') :  [...p, 'DRAFT'])}>
                  <input className="form-check-input" checked={filter.includes('DRAFT')}  type="checkbox" value="" id="flexCheckChecked" />
                    <span className="form-check-label" for="flexCheckChecked">
                     DRAFT
                    </span>
                </div> 

                <div className="form-check mb-3" onClick={()=> setFilter((p) => p.includes('PENDING') ? p.filter(r => r != 'PENDING') :  [...p, 'PENDING'])}>
                  <input className="form-check-input" checked={filter.includes('PENDING')}  type="checkbox" value="" id="flexCheckChecked1" />
                    <span className="form-check-label " for="flexCheckChecked1">
                     PENDING
                    </span>
                </div>

                <div className="form-check mb-3" onClick={()=> setFilter((p) => p.includes('APPROVED') ? p.filter(r => r != 'APPROVED') :  [...p, 'APPROVED'])} >
                  <input className="form-check-input" checked={filter.includes('APPROVED')}  type="checkbox" value="" id="flexCheckChecked2" />
                    <span className="form-check-label " for="flexCheckChecked2">
                     APPROVED
                    </span>
                </div>

                <div className="form-check mb-3" onClick={()=> setFilter((p) => p.includes('REJECTED') ? p.filter(r => r != 'REJECTED') :  [...p, 'REJECTED'])}>
                  <input className="form-check-input" checked={filter.includes('REJECTED')}  type="checkbox" value="" id="flexCheckChecked3" />
                    <span className="form-check-label " for="flexCheckChecked3">
                     REJECTED
                    </span>
                </div>

                <div className="form-check mb-3" onClick={()=> setFilter((p) => p.includes('DELETED') ? p.filter(r => r != 'DELETED') :  [...p, 'DELETED'])}>
                  <input className="form-check-input" checked={filter.includes('DELETED')}  type="checkbox" value="" id="flexCheckChecked4" />
                    <span className="form-check-label " for="flexCheckChecked4">
                     DELETED
                    </span>
                </div>

                <div className="form-check mb-3" onClick={()=> setFilter((p) => p.includes('PAUSED') ? p.filter(r => r != 'PAUSED') :  [...p, 'PAUSED'])}>
                  <input className="form-check-input" checked={filter.includes('PAUSED')}  type="checkbox" value="" id="flexCheckChecked5" />
                    <span className="form-check-label " for="flexCheckChecked5">
                     PAUSED
                    </span>
                </div>


                <div className="d-flex justify-content-end ">
                  <button type="button" onClick={toggle2} className="btn btn-primary" >Close</button>
                </div>

              </div>


            </ModalBody>
          </Modal>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  )

}

export default withRouter(Templates);
