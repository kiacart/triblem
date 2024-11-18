import React from "react"
import { Container, Row, Col, Card, CardBody, CardFooter, UncontrolledTooltip } from "reactstrap"

//Import Images
import { Link } from "react-router-dom"
//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from "swiper/modules";
// import "../../../../../node_modules/swiper/swiper.scss";
import "../../../../node_modules/swiper/swiper.scss";
import CardPricing from "./PlansCard"

const OurTeam = ({data}) => {  



  return (
    <React.Fragment>
      <section className="section" id="plans">
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <div className="small-title">Price</div>
                <h4>Choose your Pricing plan</h4>
              </div>
            </Col>
          </Row>

          <Col lg={12}>
            <Swiper
              slidesPerView={1}
              spaceBetween={25}
              navigation
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                678: {
                  slidesPerView: 2,
                },
                992: {
                  slidesPerView: 3,
                },
                1400: {
                  slidesPerView: 3,
                }
              }}              
              loop={true}
              modules={[Pagination, Navigation]}
              className="owl-carousel owl-theme events navs-carousel" id="team-carousel" dir="ltr">
              {data.map((pricing, key) => (
                <SwiperSlide key={key} className="item">
                  <CardPricing pricing={pricing} key={"_pricing_" + key} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Col>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default OurTeam
