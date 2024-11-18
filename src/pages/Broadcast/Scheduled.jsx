import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import DeleteModal from "../../components/Common/DeleteModal";
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
  import TableContainer from "../../components/Common/TableContainer";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { ToastContainer } from "react-toastify";
import classnames from "classnames";

const BroadcastScheduled = () => { 
  const [broadcastData, setbroadcastData] = useState([]);
  document.title = "Template-Schedule | Triblem -  Dashboard Schedule";
  const router = useNavigate(); 

  const handleClicks = () => {
    router('/create-broadcast') 
  }


    const columns = useMemo(
        () => [
          {
            header: "Broadcast name",
            accessorKey: "broadcast",
            enableColumnFilter: false,
            enableSorting: true,
          },
    
          {
            header: "Scheduled",
            accessorKey: "scheduled",
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
    
    return(
        <React.Fragment>
             <div className="page-content">
               <Container fluid>
                 <Breadcrumbs title="BroadCast" breadcrumbItem="Scheduled Broadcast" />

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
                              importbtn={true}
                              exportbtn={true}
                              handleUserClick={handleClicks}
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
        </React.Fragment>
    )
}


export default BroadcastScheduled; 