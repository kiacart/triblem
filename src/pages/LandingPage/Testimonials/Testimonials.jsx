import React from "react"
import { Container, Row, Col } from "reactstrap"
import { Link } from "react-router-dom"

//Import Images
import blog1 from "../../../assets/images/crypto/blog/img-1.jpg"
import blog2 from "../../../assets/images/crypto/blog/img-2.jpg"
import blog3 from "../../../assets/images/crypto/blog/img-3.jpg"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from "swiper/modules";

const Testimonials = ({ data }) => {


  const blogs = [
    {
      imgUrl: blog1,
      tag: "Cryptocurrency",
      date: "04 Mar, 2020",
      title: "Highly customisable and friendly",
      post: 'Ravi chandren',
      author: 'Team Leader',
      desc:
        "We work in the hotel business, so keeping in touch with people travelling is very easy using WhatsApp. Wati help us to have multiple people answering guests. It also allows us to automate basic replies such as the address",
    },
    {
      imgUrl: blog2,
      tag: "s",
      date: "12 Feb, 2020",
      title: "Great product for early-stage startup",
      desc: "Wati is flexible, unlike a lot of other WhatsApp business solutions out there. As an early startup, we work on Google sheets and website forms. We do not have phone support. WhatsApp is our only support channel. Wati helps us manage customer interactions on WhatsApp seamlessly at a very reasonable cost",
      post: 'Ashok Selvan',
      author: 'Developer',
    },
    {
      imgUrl: blog3,
      tag: "Cryptocurrency",
      date: "06 Jan, 2020",
      title: "Highly customisable and friendly ",
      post: 'Dinesh kumar',
      author: 'Team Leader',
      desc:
        "We work in the hotel business, so keeping in touch with people travelling is very easy using WhatsApp. Wati help us to have multiple people answering guests. It also allows us to automate basic replies such as the address",
    },
    {
      imgUrl: blog3,
      tag: "Cryptocurrency",
      date: "06 Jan, 2020",
      title: "Highly customisable and friendly ",
      post: 'Dinesh kumar',
      author: 'Team Leader',
      desc:
        "We work in the hotel business, so keeping in touch with people travelling is very easy using WhatsApp. Wati help us to have multiple people answering guests. It also allows us to automate basic replies such as the address",
    },
  ]

  return (
    <React.Fragment>
      <section className="section bg-white" id="testimonial">
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <div className="small-title">What some of our 10,000+ customers across 160+ countries think of Triblem.</div>
                <h4>Over 10,000 customers</h4>
              </div>
            </Col>
          </Row>

          <Row>
            <Col xl="12" sm="12" >
              <Swiper
                slidesPerView={1}
                spaceBetween={20}
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
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                loop={true}
                modules={[Pagination, Navigation, Autoplay]}
                className="owl-carousel owl-theme events navs-carousel" id="timeline-carousel">
                {data.map((blog, key) => (
                  <SwiperSlide className="item event-list" key={key}>
                    <div className="blog-box   mb-4 mb-xl-0">
                      <div className="card  ddd shadow-sm">
                        <div className="card-body">
                          <div className="mt-4 text-muted">
                            {/* <h5 className="mb-3 one_line">{blog.title}</h5> */}
                            <p className="five_line">{blog.content}</p>
                          </div>
                          {/* <div className="mt-3">
                            <h5 className="mb-1">{blog.author}</h5>
                            <p className="text-muted mb-0">{blog.post}</p>
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}

export default Testimonials
