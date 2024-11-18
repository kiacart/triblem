import PropTypes from 'prop-types'
import React from "react"
import { Link } from "react-router-dom"
import { Card, CardBody, Col } from "reactstrap"

const CardPricing = props => {
  return (
    <React.Fragment>
      <Col xl="12" md="12">
        <Card className="plan-box">
          <CardBody className="p-4">
            <div className="d-flex">
              <div className="flex-grow-1">
                <h5>{props.pricing.title}</h5>
                <p className="text-muted">{props.pricing.short_desc}</p>
              </div>
              <div className="ms-3">
                <i
                  // className={"bx " + props.pricing.icon + " h1 text-primary"} style={{lineHeight:1}}
                  className={"bx " + 'bx-walk' + " h1 text-primary"} style={{ lineHeight: 1 }}
                />
              </div>
            </div>
            <div className="py-4">
              <h2>
                <sup>
                  <small>₹</small>
                </sup>{" "}
                {props.pricing.price}/{" "}
                <span className="font-size-13">{props.pricing.duration} month</span>
              </h2>
            </div>
            <div className="text-center">
              <Link
                to={props.pricing.link}
                className="btn btn-primary btn-sm "
              >
               Buy Now
              </Link>
            </div>

            <div className="plan-features mt-4">
              {/* {props.pricing.features.map((feature, key) => (
                <p key={"_feature_" + key}>
                  <i className="bx bx-checkbox-square text-primary me-2" />{" "}
                  {feature.title}
                </p>
              ))} */}
              <p key={"_feature_"}>
                <i className="bx bx-checkbox-square text-primary me-2" />{" "}
                Contact Limit : {props.pricing?.contact_limit}
              </p>
              <p key={"_feature_"}>
                <i className="bx bx-checkbox-square text-primary me-2" />{" "}
                Discount Price : {props.pricing?.discount_price}
              </p>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

CardPricing.propTypes = {
  pricing: PropTypes.object
}

export default CardPricing
