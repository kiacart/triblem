import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";
import TableContainer from "../../components/Common/TableContainer";
import Spinners from "../../components/Common/Spinner"
import {
    Row,
    Col,
    Card,
    CardBody,
    Form,
    Label,
    Input,
    Button,
    Container,
    FormFeedback,
  } from "reactstrap";
import * as Yup from "yup";
//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import DeleteModal from "/src/components/Common/DeleteModal";
import {
    getUsers as onGetUsers,
    addNewUser as onAddNewUser,
    updateUser as onUpdateUser,
    deleteUser as onDeleteUser,
  } from "/src/store/contacts/actions";
import { isEmpty } from "lodash";
//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import { useFormik } from "formik";


const PhoneBook =  () => { 

    const [rowData, setRowData] = useState([
        { id: 0, name: "Atlee", email: "atlee89@gmail.com", mobile: "8523697415", message: "No:798, T.V.K Nagar, Kodambakkam, Chennai-00023" }
    ])  

    const [editData, setEditData] = useState(null); 

  // Example
  const [formRows, setFormRows] = useState([
    
  ]);

  const onAddFormRow = () => {
    const newRow = { id: Math.floor(Math.random() * (30 - 20)) + 20, name: "", email: "", mobile: "", resume: "", message: "" };
    setFormRows([...formRows, newRow]);
  };

  const onDeleteFormRow = (id) => {
    const updatedRows = formRows.filter((row) => row.id !== id);
    setFormRows(updatedRows);
  };

  // Function to handle changes in input fields
  const handleInputChange = (id, name, value) => {
    const updatedRows = formRows.map(row => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setFormRows(updatedRows);
  }; 

  const handleUserClicks = () => {
    setFormRows([{ id: 1, name: "", email: "", mobile: "", resume: "", message: "" }])
  }; 

  const handleRowData = (e) => {
    e.preventDefault();
    setRowData((p) => [...p, ...formRows]); 
    setFormRows([])
    setEditData(null)
  }

  const handleRemove = (data) => {
    setRowData((p) => p?.filter(t => t.id != data?.id))
  } 

  const handleEditdata = (data) => {
    setEditData(data)
    setFormRows([data])
  }


  const columns = useMemo(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
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
        header: 'Mobile Number',
        accessorKey: 'mobile',
        enableColumnFilter: false,
        enableSorting: true,
      },

      {
        header: 'Address',
        accessorKey: 'message',
        enableColumnFilter: false,
        enableSorting: true,
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
                  handleEditdata(userData);
                }}
              >
                <i className="mdi mdi-pencil font-size-18" id="edittooltip" />
              </Link>
              <Link
                to="#"
                className="text-danger"
                onClick={() => {
                  const rowData = cellProps.row.original; 
                  handleRemove(rowData);
                }} 
                >
                <i className="mdi mdi-delete font-size-18" id="deletetooltip" />
              </Link>
            </div>
          );
        }
      },
    ],
    []
  );

    return(
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
         <Breadcrumbs title="" breadcrumbItem="Phone Book" />  
            <Row>
                <Col lg="12">
                  <Card>
                    <CardBody>
                      <TableContainer
                        columns={columns}
                        data={rowData || []}
                        isGlobalFilter={true}
                        isPagination={true}
                        SearchPlaceholder="Search..."
                        isCustomPageSize={true}
                        isAddButton={true}
                        handleUserClick={handleUserClicks}
                        buttonClass="btn btn-success btn-rounded waves-effect waves-light addContact-modal mb-2"
                        buttonName="Add New"
                        tableClass="align-middle table-nowrap table-hover dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
                        theadClass="table-light"
                        paginationWrapper="dataTables_paginate paging_simple_numbers pagination-rounded"
                        pagination="pagination"
                      />
                    </CardBody>
                  </Card>
                </Col>
              </Row> 
              {
                formRows?.length > 0 ?
                <Row>
                    <Col xs={12}>
                    <Card>
                        <CardBody>
                        <h6 className="mb-4 card-title">Phone Book</h6>
                        <Form className="repeater" onSubmit={handleRowData} encType="multipart/form-data" >
                            <div>
                            {(formRows || []).map((formRow, key) => (
                                <Row key={key}>
                                <Col lg={2} className="mb-3">
                                    <label htmlFor="name">Name</label>
                                    <input
                                    type="text"
                                    id="name"
                                    name={`name_${formRow.id}`}
                                    value={formRow.name}
                                    onChange={(e) => handleInputChange(formRow.id, 'name', e.target.value)}
                                    className="form-control"
                                    placeholder="Enter Your Name"
                                    />
                                </Col>

                                <Col lg={2} className="mb-3">
                                    <label htmlFor="email">Email</label>
                                    <input
                                    type="email"
                                    id="email"
                                    name={`email_${formRow.id}`}
                                    value={formRow.email}
                                    onChange={(e) => handleInputChange(formRow.id, 'email', e.target.value)}
                                    className="form-control"
                                    placeholder="Enter Your Email ID"
                                    />
                                </Col>

                                <Col lg={2} className="mb-3">
                                    <label htmlFor="mobile">Mobile</label>
                                    <input
                                    type="text"
                                    id="mobile"
                                    name={`mobile_${formRow.id}`}
                                    value={formRow.mobile}
                                    onChange={(e) => handleInputChange(formRow.id, 'mobile', e.target.value)}
                                    className="form-control"
                                    placeholder="Enter Your Mobile Number"
                                    />
                                </Col>

                                <Col lg={4} className="mb-3">
                                    <label htmlFor="mobile">Address</label>
                                    <input
                                    type="text"
                                    id="message"
                                    name={`message_${formRow.id}`}
                                    value={formRow.message}
                                    onChange={(e) => handleInputChange(formRow.id, 'message', e.target.value)}
                                    className="form-control"
                                    placeholder="Enter Your Address"
                                    />
                                </Col>

                                <Col lg={2} className="align-self-center">
                                    <div className="d-grid mt-2">
                                    <input
                                        type="button"
                                        className="btn btn-danger"
                                        value="Delete"
                                        onClick={() => onDeleteFormRow(formRow.id)}
                                    />
                                    </div>
                                </Col>
                                </Row>
                            ))}

                            </div>
                            <div className="d-flex gap-2">

                            {
                              editData ? '' :
                              <input
                              type="button"
                              className="btn btn-success mt-3 mt-lg-0"
                              value="Add Details"
                              onClick={() => onAddFormRow()}
                              />
                            }

                              <input
                                type="submit"
                                className="btn btn-primary mt-3 mt-lg-0"
                                value="Submit"
                                />
                            </div>
                        </Form>
                        </CardBody>
                    </Card>
                    </Col>
                </Row>  : ''
              }
        </Container>
       </div>
    </React.Fragment>
    )
}

export default withRouter(PhoneBook);
