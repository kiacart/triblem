import React, { useCallback, useEffect, useMemo, useState,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Breadcrumbs from "../../components/Common/Breadcrumb";
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
    FormGroup, 
    InputGroup
} from "reactstrap";
//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import classnames from "classnames";
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import TableContainer from "../../components/Common/TableContainer";
import {getBroadcast} from '../../store/actions'



const BroadcastAnalytics = () => { 
  const dispatch = useDispatch();
  document.title = "BroadCast-Analytics | Triblem -  Dashboard Analytics";

    const [broadcastData, setbroadcastData] = useState([]);
    const router = useNavigate(); 
    const [pick_date, setPickDate] = useState([]);
    const [priod, setPriod] = useState('');
    const flatpickrRef = useRef(null);

    const picks = () => {
        setPickDate(new Date());
    };

    const resentValue = () => {
        setPickDate(" ");
    };

    const handleBroadCastClicks = () => {
     router('/create-broadcast')
    } 


    useEffect(() => {
        dispatch(getBroadcast());
    }, [dispatch]);

    const columns = useMemo(
        () => [
          {
            header: "Broadcast name",
            accessorKey: "broadcast",
            enableColumnFilter: false,
            enableSorting: true,
          },

          {
            header: "Recipients",
            accessorKey: "recipients",
            enableColumnFilter: false,
            enableSorting: true,
          },
    
          {
            header: "Successfull",
            accessorKey: "success",
            enableColumnFilter: false,
            enableSorting: true,
          },
    
          {
            header: "Read",
            accessorKey: "read",
            enableColumnFilter: false,
            enableSorting: true,
          },

          {
            header: "Replied",
            accessorKey: "replied",
            enableColumnFilter: false,
            enableSorting: true,
          },

          {
            header: "Satus",
            accessorKey: "status",
            enableColumnFilter: false,
            enableSorting: true,
          },
    
          {
            header: "Action",
            enableColumnFilter: false,
            enableSorting: false,
            cell: (cellProps) => {
              return (
                <UncontrolledDropdown>
                  <DropdownToggle tag="a" href="#" className="card-drop">
                    <i className="mdi mdi-dots-horizontal font-size-18" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-end">
                  <DropdownItem href="#!" onClick={() => {}}>
                      <i className="bx bx-broadcast font-size-16 text-primary me-1" />Send BroadCast
                    </DropdownItem>
                    <DropdownItem href="#!" >
                      <i className="mdi mdi-pencil font-size-16 text-success me-1" />Edit
                    </DropdownItem>
                    <DropdownItem href="#!" >
                      <i className="mdi mdi-trash-can font-size-16 text-danger me-1" />Delete
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              );
            }
          },
        ],
        []
      );
    

    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    <Breadcrumbs title="BroadCast" breadcrumbItem="Broadcast Analytics" />

                    <div className="d-flex flex-wrap gap-3 mb-3">
                        <div className="col-md-3">
                            <FormGroup className="mb-4">
                                <Label>Date Range Filter</Label>
                                <InputGroup>
                                    <Flatpickr
                                        className="form-control d-block"
                                        placeholder="dd M,yyyy"
                                        // ref={flatpickrRef}
                                        id="DataPicker"
                                        value={pick_date}
                                        onChange={(e) => {
                                            setPickDate(e)
                                            setPriod('c')
                                        }}

                                        options={{
                                            mode: "range",
                                            dateFormat: "Y-m-d",
                                        }}
                                    />
                                </InputGroup>
                            </FormGroup>
                        </div>

                        <div className=" col-md-2">
                          <Label htmlFor="project-status-input">Period</Label>
                            <select className="form-select pageSize" value={priod} onChange={(e) => {setPriod(e.target.value);  
                                 if(e.target.value != 'c') {
                                    resentValue()
                                 }
                                }} id="project-status-input">
                                <option value="c">Custom Range</option>
                                <option value="today">Today</option>
                                <option value="7_days">Last 7 Days</option>
                                <option value="15_days">Last 15 Days</option>
                                <option value="30_days">Last 30 Days</option>
                            </select>
                        </div> 

                        <div className="mb-4 mt-4 ">
                            <button type="button" className="btn btn-primary">Appy now</button>
                        </div>
                        <div className="mt-4">
                            <button type="button" className="btn btn-primary"><i className="bx bx-export"></i> Export</button>
                        </div>
                    </div>  

                    <div className="mb-4 d-flex justify-content-center  justify-content-sm-start align-items-center gap-3 flex-wrap">
                        <div className="anaLisCard">
                            <div>
                                <h3>0</h3>
                                <p className="mb-0">Sent <i className="mdi mdi-progress-question"></i></p>
                            </div>
                            <div className="check d-flex align-items-center justify-content-center">
                                <i className="mdi mdi-check fs-3 text-primary"></i>
                            </div>
                        </div>

                        <div className="anaLisCard">
                            <div>
                                <h3>0</h3>
                                <p className="mb-0">Delivered <i className="mdi mdi-progress-question"></i></p>
                            </div>
                            <div className="check d-flex align-items-center justify-content-center">
                                <i className="mdi mdi-check-all fs-3 text-primary"></i>
                            </div>
                        </div>

                        <div className="anaLisCard">
                            <div>
                                <h3>0</h3>
                                <p className="mb-0">Read <i className="mdi mdi-progress-question"></i></p>
                            </div>
                            <div className="check d-flex align-items-center justify-content-center">
                                <i className="mdi mdi-eye-outline fs-3 text-primary"></i>
                            </div>
                        </div>

                        <div className="anaLisCard">
                            <div>
                                <h3>0</h3>
                                <p className="mb-0">Replied <i className="mdi mdi-progress-question"></i></p>
                            </div>
                            <div className="check d-flex align-items-center justify-content-center">
                                <i className="mdi mdi-share-all fs-3 text-primary"></i>
                            </div>
                        </div>

                        <div className="anaLisCard">
                            <div>
                                <h3>0</h3>
                                <p className="mb-0">Sending <i className="mdi mdi-progress-question"></i></p>
                            </div>
                            <div className="check d-flex align-items-center justify-content-center">
                                <i className="bx bx-send fs-3 text-primary"></i>
                            </div>
                        </div>

                        <div className="anaLisCard">
                            <div>
                                <h3>0</h3>
                                <p className="mb-0">Failed <i className="mdi mdi-progress-question"></i></p>
                            </div>
                            <div className="check d-flex align-items-center justify-content-center">
                                <i className="mdi mdi-chat-remove fs-3 text-primary"></i>
                            </div>
                        </div>

                        <div className="anaLisCard">
                            <div>
                                <h3>0</h3>
                                <p className="mb-0">Processing <i className="mdi mdi-progress-question"></i></p>
                            </div>
                            <div className="check d-flex align-items-center justify-content-center">
                                <i className="mdi mdi-chat-processing-outline fs-3 text-primary"></i>
                            </div>
                        </div>

                        <div className="anaLisCard">
                            <div>
                                <h3>0</h3>
                                <p className="mb-0">Queued <i className="mdi mdi-progress-question"></i></p>
                            </div>
                            <div className="check d-flex align-items-center justify-content-center">
                                <i className="bx bx-git-pull-request fs-3 text-primary"></i>
                            </div>
                        </div>



                    </div>


                    <Row>
                      <Col lg={12}>
                        <Card>
                          <CardBody>
                            <TableContainer
                              columns={columns}
                              data={broadcastData}
                              isGlobalFilter={true}
                              isAddButton={true}
                              isPagination={true}
                              isCustomPageSize={true}
                              handleUserClick={handleBroadCastClicks}
                              SearchPlaceholder="search..."
                              buttonClass="btn btn-success btn-rounded"
                              buttonName="New Broadcast"
                              tableClass="project-list-table align-middle table-nowrap dt-responsive nowrap w-100 table-borderless dataTable no-footer dtr-inline"
                              theadClass="table-light"
                              paginationWrapper="dataTables_paginate paging_simple_numbers pagination-rounded"
                              pagination="pagination"
                            />
                          </CardBody>
                        </Card>
                      </Col>  
                    </Row>

                </Container>
            </div>
            <ToastContainer />
        </React.Fragment>
    )
}


export default BroadcastAnalytics; 