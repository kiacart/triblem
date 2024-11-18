import React from "react"
import PropTypes from 'prop-types'
import { Link, useNavigate } from "react-router-dom"
import { Row, Col, BreadcrumbItem } from "reactstrap"

const Breadcrumb = props => { 
  const router = useNavigate(); 

  return (
    <Row>
      <Col xs="12">
        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
          <h4 className="mb-0 font-size-18 align-items-center d-flex">{props.back ?  <i onClick={()=> router(-1)} className="fs-3 bx bx-left-arrow-alt morTag"></i> : ''} {props.breadcrumbItem}</h4>
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              <BreadcrumbItem> 
                <Link to="#">{props.title}</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active> {props.breadcrumbItem}</BreadcrumbItem>
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  )
}

Breadcrumb.propTypes = {
  breadcrumbItem: PropTypes.string,
  title: PropTypes.string
}

export default Breadcrumb
