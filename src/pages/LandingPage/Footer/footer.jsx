import React from "react"
import { Container, Row, Col , NavLink} from "reactstrap"
import { Link } from "react-router-dom"
import fb from '../../../assets/images/facebook.png';
import insta from '../../../assets/images/instagram.png';
import yotb from '../../../assets/images/youtube.png';
import twitter from '../../../assets/images/twitter.png';
import linked from '../../../assets/images/linkedin.png';
import playSt from '../../../assets/images/playStore.png';
import aplstr from '../../../assets/images/appStore.png';

//Import Components
import FooterLink from "./footer-link"

const Features = () => {
  const footerLinks = [
    {
      title: "Company",
      links: [
        { title: "About Us", link: "#about" },
        { title: "Testimonial", link: "#testimonial" },
        { title: "FAQs", link: "#faqs" },
      ],
    },
    {
      title: "Resources",
      links: [
        { title: "Plans", link: "#plans" },
        { title: "Features", link: "#features" },
        { title: "why Choose Us", link: "#whyChooseUs" },
      ],
    },
    {
      title: "Contact us",
      links: [
        { title: "Customer care - 7449224400", link: "#" },
        { title: "Email - support@triblem.com", link: "#" },
      ],
    },
  ]

  return (
    <React.Fragment>
      <footer className="landing-footer">
        <Container>
          <Row>
            {footerLinks.map((footerLink, key) => (
              <Col lg="3" sm="6" key={key}>
                <div className="mb-4 mb-lg-0">
                  <h5 className="mb-3 footer-list-title">{footerLink.title}</h5>
                  <ul className="list-unstyled footer-list-menu">
                    {footerLink.links.map((Flink, key) => (
                      <li key={key}>
                        <NavLink href={Flink.link}>{Flink.title}</NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
            ))}

            <Col lg="3" sm="6">
              <div className="mb-4 mb-lg-0">
                <h5 className="mb-3 footer-list-title">Download Apps</h5>
                <div className="blog-post">
                  <div className="row mb-4">
                    <div className="col-6">
                      <img src={playSt} alt="playstor" height={40} className="w-100 rounded" />
                    </div>
                    <div className="col-6">
                    <img src={aplstr} alt="playstor" height={40} className="w-100 rounded" />
                    </div>
                  </div>
                  <Link to="#" className="post">
                    <h5 className="post-title">KEEP IN TOUCH</h5>
                  </Link>
                  <div className="d-flex align-items-center gap-2">
                    <a
                      href={'#'}
                      className="social_img"
                      target="_blank"
                    >
                      <img src={fb} alt="" />
                    </a>

                    <a
                      href={'#'}
                      className="social_img"
                      target="_blank"
                    >
                      <img src={insta} alt="" />
                    </a>

                    <a
                      href={'#'}
                      className="social_img"
                      target="_blank"
                    >
                      <img src={linked} alt="" />
                    </a>

                    <a
                      href={'#'}
                      className="social_img"
                      target="_blank"
                    >
                      <img src={yotb} alt="" />
                    </a>

                    <a
                      href={'#'}
                      className="social_img"
                      target="_blank"
                    >
                      <img src={twitter} alt="" />
                    </a>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <hr className="footer-border my-5" />

          <FooterLink />
        </Container>
      </footer>
    </React.Fragment>
  )
}

export default Features
