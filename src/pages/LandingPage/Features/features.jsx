import React from "react";
import { Container, Row, Col } from "reactstrap";

//Import Components
import FeatureBox from "./feature-box";

//Import images
import feature1 from "../../../assets/images/crypto/features-img/img-1.png";
import feature2 from "../../../assets/images/crypto/features-img/img-2.png";

const Features = () => {
  const features1 = [
    { id: 1, desc: "Donec pede justo vel aliquet" },
    { id: 2, desc: "Aenean et nisl sagittis" },
  ];
  const features2 = [
    { id: 1, desc: "Donec pede justo vel aliquet" },
    { id: 2, desc: "Aenean et nisl sagittis" },
  ];

  return (
    <React.Fragment>
      <section className="section" id="features">
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <div className="small-title">Features</div>
                <h4>Smart tools for efficient and personalized communication</h4>
              </div>
            </Col>
          </Row>

          <Row className="align-items-center pt-4">
            <Col md="6" sm="8">
              <div>
                <img
                  src={feature1}
                  alt=""
                  className="img-fluid mx-auto d-block"
                />
              </div>
            </Col>
            <Col md="5" className="ms-auto">
              {/* featurebox */}
              <FeatureBox
                num="01"
                title="Broadcast"
                features={[]}
                desc="Push out your campaigns and engage with high response WhatsApp messages.
                Tag contacts, categorize and target them in groups using personalized communications.
                Build and nurture the relationships that generate future sales by engaging with your audiences regularly on WhatsApp"
              />
            </Col>
          </Row>

          <Row className="align-items-center mt-5 pt-md-5">
            <Col md="5">
              {/* featurebox */}
              <FeatureBox
                num="02"
                title="Chatbots"
                features={[]}
                desc="Create no-code chatbots to provide instant responses to common requests.
                       Simplify mass communication and personalized responses with automated tools.
                       Boost sales by directly converting more customer communications on WhatsApp."
              />
            </Col>

            <Col md="6" sm="8" className="ms-md-auto">
              <div className="mt-4 me-md-0">
                <img
                  src={feature2}
                  alt=""
                  className="img-fluid mx-auto d-block"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Features;
