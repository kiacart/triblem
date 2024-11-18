import React from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
// import "../../../../../node_modules/swiper/swiper.scss";
import "../../../../node_modules/swiper/swiper.scss";

//Images
import client1 from "../../../assets/images/clients/1.png";
import client2 from "../../../assets/images/clients/2.png";
import client3 from "../../../assets/images/clients/3.png";
import client4 from "../../../assets/images/clients/4.png";
import client5 from "../../../assets/images/clients/5.png";
import client6 from "../../../assets/images/clients/6.png";
import img from "../../../assets/images/bus.webp";

const AboutUs = ({clients}) => {

  const PUBLIC_URL = import.meta.env.VITE_APP_PUBLIC_URL ?? "";


  return (
    <React.Fragment>
      <section className="section pt-4 bg-white" id="about">
        <Container>
          {/* <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <div className="small-title">About us</div>
                <h4>What is Triblem?</h4>
              </div>
            </Col>
          </Row> */}
          <Row className="align-items-center ">
            <Col lg="6" className="">
              <h4 className="">About Us</h4>
              <div className="text-muted">
                <h4>Grow your business
                  on WhatsApp</h4>
                <p>
                Our vision is to enable small to medium companies to grow business smarter. Wati is a strategic solution that helps businesses meet their customers where they are - on the messaging platform with incredible market penetration - WhatsApp. Its big presence means many customers and prospects are accessible and ready to engage in real-time
                </p>

                <p className="mb-4">
                  Personalize communication and sell more with the
                  WhatsApp Business API platform that automates
                  marketing, sales, service and support.
                </p>

                <div className="d-flex flex-wrap gap-2">
                  <Link to="#" className="btn btn-success">
                    Read More
                  </Link>
                  {/* <Link to="#" className="btn btn-outline-primary">
                    How It work
                  </Link> */}
                </div>
              </div>
            </Col>
            <Col lg="6" className="">
            <img src={img} className="w-100" />
            </Col>

            {/* <Col lg="6" className="ms-auto">
              <div className="mt-4 mt-lg-0">
                <Row>
                  <Col sm="6">
                    <Card className="border">
                      <CardBody>
                        <div className="mb-3">
                          <i className="mdi mdi-bitcoin h2 text-success" />
                        </div>
                        <h5>Lending</h5>
                        <p className="text-muted mb-0">
                          At vero eos et accusamus et iusto blanditiis
                        </p>
                      </CardBody>
                      <div className="card-footer bg-transparent border-top text-center">
                        <Link to="#" className="text-primary">
                          Learn more
                        </Link>
                      </div>
                    </Card>
                  </Col>
                  <Col sm="6">
                    <Card className="border mt-lg-5">
                      <CardBody>
                        <div className="mb-3">
                          <i className="mdi mdi-wallet-outline h2 text-success" />
                        </div>
                        <h5>Wallet</h5>
                        <p className="text-muted mb-0">
                          Quis autem vel eum iure reprehenderit
                        </p>
                      </CardBody>
                      <div className="card-footer bg-transparent border-top text-center">
                        <Link to="#" className="text-primary">
                          Learn more
                        </Link>
                      </div>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col> */}
          </Row>

          <hr className="my-5" />

          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <h4>Trusted by the <span className="text-primary">fastest growing brands</span> in rapidly developing economies</h4>
              </div>
            </Col>
            <Col lg="12">
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
                    className="owl-carousel owl-theme clients-carousel" id="clients-carousel" dir="ltr">
                      {
                        clients?.map((item, i) => (
                        <SwiperSlide className="item" key={i}>
                          <div className="client-images">
                            <img src={`${PUBLIC_URL}${item?.image}`} alt="client-img" className="mx-auto img-fluid d-block" />
                          </div>
                        </SwiperSlide>
                        ))
                      }
                    {/* <SwiperSlide className="item">
                      <div className="client-images">
                        <img src={client2} alt="client-img" className="mx-auto img-fluid d-block" />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="item">
                      <div className="client-images">
                        <img src={client3} alt="client-img" className="mx-auto img-fluid d-block" />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="item">
                      <div className="client-images">
                        <img src={client4} alt="client-img" className="mx-auto img-fluid d-block" />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="item">
                      <div className="client-images">
                        <img src={client5} alt="client-img" className="mx-auto img-fluid d-block" />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide className="item">
                      <div className="client-images">
                        <img src={client6} alt="client-img" className="mx-auto img-fluid d-block" />
                      </div>
                    </SwiperSlide> */}
                  </Swiper>
                </div>
              </Col>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default AboutUs;
