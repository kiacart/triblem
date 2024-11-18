import React, { useState } from "react"
import { Container, Row, Col,  Card, CardBody, CardFooter, UncontrolledTooltip  } from "reactstrap"
import { Link } from "react-router-dom"

//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from "swiper/modules";
// import "../../../../../node_modules/swiper/swiper.scss";
import "../../../../node_modules/swiper/swiper.scss";
import avatar1 from "../../../assets/images/users/avatar-1.jpg";
import avatar2 from "../../../assets/images/users/avatar-2.jpg";
import avatar3 from "../../../assets/images/users/avatar-3.jpg";
import avatar8 from "../../../assets/images/users/avatar-8.jpg";
import avatar5 from "../../../assets/images/users/avatar-5.jpg";

const Services = ({data}) => {
  const PUBLIC_URL = import.meta.env.VITE_APP_PUBLIC_URL ?? "";

  const icoLandingTeam = [
    {
      id: 1,
      img: avatar2,
      author: "Break engagement barriers",
      post: "Engage using WhatsApp and improve response rates over email, SMS and in-app messaging and campaigning.",
    },
    {
      id: 2,
      img: avatar3,
      author: "A better way to upscale",
      post: "Upscale with multiple users on one single number and get a better return on investment than alternative WhatsApp BSPs",
    },
    {
      id: 3,
      img: avatar8,
      author: "Communicate at scale efficiently",
      post: "Easily start and manage conversations with thousands of customers and prospects through automation, chatbots and custom workflows",
    },
    {
      id: 4,
      img: avatar5,
      author: "Multiple channels in one",
      post: "Nurture leads from Facebook and Instagram and increase ROI 10x by funneling your leads to WhatsApp",
    },
    {
      id: 6,
      img: avatar1,
      author: "A better way to upscale",
      post: "Engage using WhatsApp and improve response rates over email, SMS and in-app messaging and campaigning",
    },
  ];

  return (
    <React.Fragment>
      <section className="section bg-white ffdjfk" id="whyChooseUs">
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <div className="small-title">Use Triblem to engage your prospects through the WhatsApp Business API</div>
                <h4>Choose the Triblem advantage</h4>
              </div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col lg="12">
              <div className="hori-timeline">
                <Swiper
                  slidesPerView={1}
                  // spaceBetween={10}
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
                      slidesPerView: 4,
                    }
                  }}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  modules={[Pagination, Navigation, Autoplay]}
                  className="owl-carousel owl-theme events navs-carousel" id="timeline-carousel">
                  {
                    data?.map((item, key) => (
                      <SwiperSlide className="item event-list" key={key}>
                        <Card className="text-center team-box">
                          <CardBody>
                            <div>
                              <img src={`${PUBLIC_URL}${item?.image}`} alt="" className="rounded w-100" />
                            </div>

                            <div className="mt-3">
                              <h5>{item.title}</h5>
                              <p className="text-muted mb-0">{item.short_desc}</p>
                            </div>
                          </CardBody>
                          {/* <CardFooter className="bg-transparent border-top">
                            <div className="d-flex mb-0 team-social-links">
                              <div className="flex-fill">
                                <Link to="#" id="facebook">
                                  <i className="mdi mdi-facebook"></i>
                                </Link>
                              </div>
                              <UncontrolledTooltip placement="top" target="facebook">
                                Facebook
                              </UncontrolledTooltip>

                              <div className="flex-fill">
                                <Link to="#" id="linkedin">
                                  <i className="mdi mdi-linkedin"></i>
                                </Link>
                              </div>
                              <UncontrolledTooltip placement="top" target="linkedin">
                                Linkedin
                              </UncontrolledTooltip>

                              <div className="flex-fill">
                                <Link to="#" id="google">
                                  <i className="mdi mdi-google"></i>
                                </Link>
                              </div>
                              <UncontrolledTooltip placement="top" target="google">
                                Google
                              </UncontrolledTooltip>

                            </div>
                          </CardFooter> */}
                        </Card>
                      </SwiperSlide>
                    ))
                  }
                </Swiper>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default Services
