import React from "react"
import { Row, Col } from "reactstrap"

//Import Images
import logolight from "../../../assets/images/logo-light.png"

const FooterLink = () => {
  return (
    <React.Fragment>
      <Row>
        <Col lg="6" className="d-flex gap-3 align-items-center">
          <div className="mb-0">
            <img src={logolight} alt="" height="50" />
          </div>

          <p className="mb-0">
            {new Date().getFullYear()} © Triblem.  2024.Clare.ai Limited. All rights reserved.
            {/* Design & Develop by Themesbrand */}
          </p>

        </Col>
      </Row>
    </React.Fragment>
  )
}

export default FooterLink
