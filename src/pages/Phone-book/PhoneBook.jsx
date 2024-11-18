import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";
import TableContainer from "../../components/Common/TableContainer";
import Spinners from "../../components/Common/Spinner"
import { Card, CardBody, Col, Container, Row, Modal, ModalHeader, ModalBody, Label, FormFeedback, Input, Form, Button, UncontrolledTooltip, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, FormGroup, Badge, Nav, NavItem, NavLink, TabContent, TabPane, } from "reactstrap";
import * as Yup from "yup";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import DeleteModal from "../../components/Common/DeleteModal";
import {
  getUsers as onGetUsers,
  getPhoneBook as pnGetPhonebook,
  addNewUser as onAddNewUser,
  addNewPhone as onAddNewPhone,
  updateUser as onUpdateUser,
  deleteUser as onDeleteUser,
} from "../../store/contacts/actions";
// } from "/src/store/contacts/actions";
import { isEmpty } from "lodash";
//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";
import classnames from "classnames";
import Dropzone from "react-dropzone"
import moment from "moment";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import pdfImg from '../../assets/images/_pdf.png'
import csvImg from '../../assets/images/_csv.png'

const PhoneBook = () => {
  //meta title
  document.title = "Contact User | Triblem &Dashboard";

  const dispatch = useDispatch();
  const [contact, setContact] = useState();
  const [Data, setData] = useState([]);
  const [PhoneBook, setPhoneBook] = useState([]);
  const [sortPhone, setsortPhone] = useState('');
  const [activeTab1, setActiveTab1] = useState("1");
  const [selectedFiles, setselectedFiles] = useState([])
  const [selectphoneGrp, setselectphoneGrp] = useState('')
  const [Attributes, setAttributes] = useState([{ key: '', value: '' }]);


  const handleAdd = () => {
    setAttributes((p) => [...p, {
      key: '',
      value: ''
    }])
  }


  const LoginProperties = createSelector(
    (state) => state.Login,
    (login) => ({
      response: login
    })
  );

  const {
    response
  } = useSelector(LoginProperties);


  const handleRemove = (index) => {
    setAttributes((p) => p.filter((e, i) => i != index));
  }

  function handleAcceptedFiles(files) {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    )
    setselectedFiles(files)
  }

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }


  const toggle1 = (tab) => {
    if (activeTab1 !== tab) {
      setActiveTab1(tab);
    }
  };

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      name: (contact && contact.name) || "",
      email: (contact && contact.email) || "",
      phonebook: (contact && contact.phonebook) || "",
      source: (contact && contact.source) || "",
      date: (contact && contact.date) || "",
      phone: (contact && contact.phone) || "",
      attributes: (contact && contact.attributes) || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Please Enter Name"),
      phone: Yup.string(),
      source : Yup.string().required("Please Enter source"),
      designation: Yup.string(),
      tags: Yup.array(),
      phonebook: Yup.string(),
      email: Yup.string()
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please Enter Valid Email")
      ,
      projects: Yup.string(),
    }),
    onSubmit: (values) => {
      if (contact.id) {
        const updateUser = {
          user_id: response?.data?.userID,
          id: contact.id,
          name: values.name,
          phonebook_id: values.phonebook,
          source: values.source,
          mobile: values.phone,
          attributes: Attributes
        };
        // update user
        dispatch(onUpdateUser(updateUser));
        validation.resetForm();
        setIsEdit(false);
      } else {
        const jsonData = {
          name: values["name"],
          source: values["source"],
          mobile: values["phone"],
          phonebook_id: values["phonebook"],
          user_id: response?.data?.userID,
          fomdata: true
        };
        // save new user
        dispatch(onAddNewUser(jsonData));
        // setUsers()
        // validation.resetForm();
      }
      // toggle();
    },
  });

  const ContactsProperties = createSelector(
    (state) => state.contacts,
    (Contacts) => ({
      users: Contacts.users,
      loading: Contacts.loading,
      phone: Contacts.phone,
      btnLoad: Contacts.btnLoad
    })
  );
  const {
    users, loading, phone, btnLoad
  } = useSelector(ContactsProperties);

  const [isLoading, setLoading] = useState(loading);

  useEffect(() => {

    if (sortPhone) {
      setData(users?.filter(val => val?.phonebook_id == sortPhone))
    }

  }, [sortPhone])


  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isEdit1, setIsEdit1] = useState(false);
  const [moreTag, setMoreTag] = useState(3);

  useEffect(() => {
    if (users && !users.length) {
      dispatch(onGetUsers());
      setIsEdit(false);
    }
    setData(users)
  }, [dispatch, users]);

  // useEffect(() => {
  //   if (phone && !phone.length) {
  //     dispatch(pnGetPhonebook());
  //   }
  // }, [dispatch, phone]);

  useEffect(() => {
    setPhoneBook(phone);
  }, [phone])

  const handlephoneBook = (e) => {
    e.preventDefault();
    // console.log('users', response)
    const body = {
      name: selectphoneGrp,
      user_id: response?.data?.userID
    }
    dispatch(onAddNewPhone(body));
    toggle3();
  }

  useEffect(() => {
    setContact(users);
    setIsEdit(false);
  }, [users]);

  useEffect(() => {
    if (!isEmpty(users) && !!isEdit) {
      setContact(users);
      setIsEdit(false);
    }
  }, [users]);



  const toggle = () => {
    setModal(!modal);
  };

  const toggle3 = () => {
    setModal1(!modal1);
  };

  const handleUserClick = (arg) => {
    const user = arg;
    setContact({
      id: user.id,
      name: user.name,
      source: user.source,
      phone: user.mobile,
      attributes: user.attributes
    });
    setAttributes(user.attributes)
    setIsEdit(true);
    toggle();
  };

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (users) => {
    setContact(users);
    setDeleteModal(true);
  };

  const handleDeleteUser = () => {
    if (contact && contact.id) {
      dispatch(onDeleteUser(contact.id));
    }
    setContact("");
    setDeleteModal(false);
  };

  const handleUserClicks = () => {
    setContact({
      "name" : '',
      "email" : '',
      "phonebook" : '',
      "source" : '',
      "date" : '',
      "phone" : '91',
      "attributes" : '',
    });
    setIsEdit(false);
    toggle();
  };

  const handleUserClicks2 = () => {
    setContact("");
    setIsEdit1(false);
    toggle3();
  };


  // const PhoneBook = [
  //   "Vriksha", 
  //   "google",
  //   "Anand",
  //   "Mahe"
  // ]


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
              {/* <p className="text-muted mb-0">{phone?.find(e => e?.id == cell.row.original?.phonebook_id)?.name ?? ''}</p> */}
              {/* <p className="text-muted mb-0">{cell.row.original.phonebook}</p> */}
            </>
          )
        }
      },


      {
        header: 'Phone Number',
        accessorKey: 'mobile',
        enableColumnFilter: false,
        enableSorting: true,
      },


      {
        header: 'source',
        accessorKey: 'source',
        enableColumnFilter: false,
        enableSorting: true,
      },

      {
        header: 'Contact Attributes',
        accessorKey: 'attributes',
        enableColumnFilter: false,
        enableSorting: true,
        cell: (cell) => {
          return (
            <div>
              {
                cell.getValue()?.slice(0, moreTag)?.map((item, index) => (
                  <Link to="#1" className="badge badge-soft-primary font-size-11 m-1" key={index} >{item?.value ?? item} <i className="fs-6 text-danger mdi mdi-window-close"></i> </Link>
                ))
              } {cell.getValue()?.length > 3 ? <span className="badge badge-soft-warning font-size-11 m-1 morTag" onClick={() => setMoreTag(cell.getValue()?.length ?? 3)}>more <i className="fs-6 bx bx-right-arrow-alt"></i></span> : ''}
            </div>
          );
        },
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
      <button type="button" className="d-none" id="jkhjhsjdfjhvfs" onClick={() => setModal(false)} ></button>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />

      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Contacts" breadcrumbItem="Contact List" />
          {
            isLoading ? <Spinners setLoading={setLoading} />
              :
              <Row>
                <Col lg="12">
                  <Card>
                    <CardBody>
                      <TableContainer
                        columns={columns}
                        data={Data || []}
                        isGlobalFilter={true}
                        isPagination={true}
                        SearchPlaceholder="Search..."
                        isCustomPageSize={true}
                        phoneBook={PhoneBook}
                        setsortPhone={setsortPhone}
                        sortPhone={sortPhone}
                        isAddButton={true}
                        // isPhoneBtn={true}
                        importbtn={true}
                        exportbtn={true}
                        PhoneBtnName={"Add Phone Book"}
                        handleUserClick={handleUserClicks}
                        handlePhoneClick={handleUserClicks2}
                        buttonClass="btn btn-success btn-rounded waves-effect waves-light addContact-modal mb-2"
                        buttonName="New Contact"
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


          <Modal isOpen={modal} centered toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h4"> {contact?.id ? "Edit Contact" : "Add Contact"}</ModalHeader>
            <ModalBody>
              <div className="mb-3 d-none">
                <Label>Phonebook</Label>
                <Input
                  type="select"
                  name="phonebook"
                  className="form-select"
                  onChange={(e) => validation.setFieldValue('phonebook', e.target.value)}
                  // onBlur={validation.handleBlur} 
                  value={validation.values.phonebook || ''}
                  invalid={
                    validation.touched.phonebook && validation.errors.phonebook ? true : false}
                >
                  <option value="" selected disabled>Select Phone Book</option>
                  {
                    PhoneBook?.length > 0 ?
                      PhoneBook?.map((data, i) => (
                        <option value={data.id} key={i}>{data?.name}</option>
                      ))
                      : ''
                  }
                  {/* <option>Renold</option> */}
                </Input>

                {validation.touched.phonebook && validation.errors.phonebook ?
                  (
                    <FormFeedback type="invalid">  {validation.errors.phonebook} </FormFeedback>
                  ) : null}
              </div>
              <Nav pills className="navtab-bg nav-justified">
                <NavItem>
                  <NavLink style={{ cursor: "pointer" }} className={classnames({ active: activeTab1 === "1", })} onClick={() => { toggle1("1"); }}>
                    <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                    <span className="d-none d-sm-block">upload by pasting</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink style={{ cursor: "pointer" }} className={classnames({ active: activeTab1 === "2", })} onClick={() => { toggle1("2"); }}>
                    <span className="d-block d-sm-none"><i className="far fa-user"></i></span>
                    <span className="d-none d-sm-block">upload by CSV</span>
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab1} className="p-3">
                <TabPane tabId="1">
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
                          <Label>Phone Number</Label>

                          {/* <Input
                            name="phone"
                            label="phone"
                            type="text"
                            maxLength={10}
                            onChange={(e) => validation.setFieldValue('phone', e.target.value?.replace(/[^0-9]/g, ""))}
                            onBlur={validation.handleBlur}
                            value={validation.values.phone || ""}
                            invalid={
                              validation.touched.phone && validation.errors.phone ? true : false}
                            /> */}

                            <PhoneInput 
                              country={'in'}
                              onBlur={validation.handleBlur}
                              countryCodeEditable={false}
                              inputProps={{
                                id: "p_number",
                              }}
                              inputClass="form-control w-100"
                              value={validation.values.phone || ""}
                              onChange={(e) => { 
                                validation.setFieldValue('phone',e)
                              }}                            
                            />

                           {validation.touched.phone && validation.errors.phone ?
                            (
                              <FormFeedback type="invalid">   {validation.errors.phone} </FormFeedback>
                            ) : null}
                        </div>

                        <div className="mb-3">
                          <Label>Source</Label>
                          <Input
                            name="source"
                            label="source"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.source || ""}
                            invalid={
                              validation.touched.source && validation.errors.source ? true : false}
                          />
                          {validation.touched.source && validation.errors.source ?
                            (
                              <FormFeedback type="invalid"> {validation.errors.source}  </FormFeedback>
                            ) : null}
                        </div>

                        <div className="mb-3">
                          <Label>Attributes</Label>
                          {
                            Attributes?.map((data, i) => (
                              <div className="row " key={i}>
                                <div className="col-sm-5 mb-3">
                                  <Input
                                    name="key"
                                    label="key"
                                    type="text"
                                    value={data.key}
                                    placeholder="Attributes"
                                    onChange={(e) => {
                                      setAttributes((p) => {
                                        let value = [...p];
                                        value[i].key = e.target.value;
                                        return value
                                      })
                                    }}
                                  />
                                </div>
                                <div className="col-sm-5 mb-3">
                                  <Input
                                    name="value"
                                    label="value"
                                    type="text"
                                    value={data.value}
                                    onChange={(e) => {
                                      setAttributes((p) => {
                                        let value = [...p];
                                        value[i].value = e.target.value;
                                        return value
                                      })
                                    }}
                                    placeholder="Value"
                                  />
                                </div>
                                <div className="col-sm-2 mb-3 d-flex align-items-center">
                                  <i className="bx bx-trash-alt text-danger fs-3" onClick={() => handleRemove(i)}></i>
                                </div>
                              </div>
                            ))
                          }
                          <div className="text-start">
                            <Button type="button" color="success" onClick={() => handleAdd()} className="save-user"> Add Attributes</Button>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <div className="text-center mt-4">
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
                            </> : contact?.id ? "Edit Contact" : "Add Contact"
                        }
                      </button>
                    </div>
                  </Form>
                </TabPane>

                <TabPane tabId="2">
                  <Form>
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
                                  {
                                    f?.type?.includes('pdf') ?
                                    <img
                                    data-dz-thumbnail=""
                                    height="80"
                                    className="avatar-sm rounded bg-light"
                                    alt={f.name}
                                    src={pdfImg}
                                  />
                                    : f?.type?.includes('jpeg') || f?.type?.includes('png') ?
                                    <img
                                      data-dz-thumbnail=""
                                      height="80"
                                      className="avatar-sm rounded bg-light"
                                      alt={f.name}
                                      src={f.preview}
                                    /> : 
                                    <img
                                    data-dz-thumbnail=""
                                    height="80"
                                    className="avatar-sm rounded bg-light"
                                    alt={f.name}
                                    src={csvImg}
                                  />
                                  }
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
                                </Row>
                              </div>
                            </Card>
                          )
                        })}
                      </div>

                    <div className="text-center mt-4">
                      <button
                        type="button"
                        className="btn btn-success "
                      >
                        import CSV
                      </button>
                    </div>
                  </Form>
                </TabPane>  

              </TabContent>
            </ModalBody>
          </Modal>
          <Modal isOpen={modal1} centered toggle={toggle3}>
            <ModalHeader toggle={toggle3} tag="h4"> {!!isEdit1 ? "Edit Phone Book" : "Add Phone Book"}</ModalHeader>
            <ModalBody>
              <Form onSubmit={handlephoneBook}>
                <Row>
                  <Col xs={12}>
                    <div className="mb-3">
                      <Label>Phone Book</Label>
                      <Input
                        name="Phone"
                        type="text"
                        onChange={(e) => setselectphoneGrp(e.target.value)}
                        value={selectphoneGrp}
                      />
                    </div>
                  </Col>
                </Row>
                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-success "
                  >
                    Save Phone Book
                  </button>
                </div>
              </Form>
            </ModalBody>
          </Modal>
          
        </Container>
      </div>

      <ToastContainer />
    </React.Fragment>
  );
};


export default withRouter(PhoneBook);
