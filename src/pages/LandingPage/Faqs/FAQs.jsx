import React, { useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Nav,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap"

import { Collapse } from "reactstrap"
import { Link } from "react-router-dom"
import classnames from "classnames"

//Import Components
import Accordian from "./accordian"

const FAQs = ({ data }) => {
  const [activeTab, setactiveTab] = useState("1")
  const [activeTab2, setactiveTab2] = useState(null)
  const [slice, setslice] = useState(4)
  const [col1, setcol1] = useState(true)
  const [col2, setcol2] = useState(false)
  const [col3, setcol3] = useState(false)
  const [col4, setcol4] = useState(false)
  function t_col1() {
    setcol1(!col1)
    setcol2(false)
    setcol3(false)
    setcol4(false)
  }

  function t_col2() {
    setcol1(false)
    setcol2(!col2)
    setcol3(false)
    setcol4(false)
  }

  function t_col3() {
    setcol1(false)
    setcol2(false)
    setcol3(!col3)
    setcol4(false)
  }

  function t_col4() {
    setcol1(false)
    setcol2(false)
    setcol3(false)
    setcol4(!col4)
  }


  return (
    <React.Fragment>
      <section className="section" id="faqs">
        <Container>
          <Row>
            <Col lg="12">
              <div className="text-center mb-5">
                <div className="small-title">FAQs</div>
                <h4>Frequently asked questions</h4>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg="12">
              <div className="vertical-nav">
                <Row>
                  {/* <Col lg="2" sm="4">
                    <Nav pills className="flex-column">
                      <NavLink
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                          setactiveTab("1")
                        }}
                      >
                        <i className="bx bx-help-circle nav-icon d-block mb-2"/>
                        <p className="font-weight-bold mb-0">
                          General Questions
                        </p>
                      </NavLink>

                      <NavLink
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => {
                          setactiveTab("2")
                        }}
                      >
                        <i className="bx bx-receipt nav-icon d-block mb-2"/>
                        <p className="font-weight-bold mb-0">Token sale</p>
                      </NavLink>

                      <NavLink
                        className={classnames({ active: activeTab === "3" })}
                        onClick={() => {
                          setactiveTab("3")
                        }}
                      >
                        <i className="bx bx-timer d-block nav-icon mb-2"/>
                        <p className="font-weight-bold mb-0">Roadmap</p>
                      </NavLink>
                    </Nav>
                  </Col> */}
                  <Col lg="12" sm="12">
                    <Card>
                      <CardBody>
                        <TabContent activeTab={activeTab}>
                          <TabPane tabId="1" id="buy">
                            <h4 className="card-title mb-4">
                              General Questions
                            </h4>

                            <div>
                              <div id="gen-ques-accordion" className="accordion custom-accordion">
                                {
                                  data?.slice(0, slice).map((item, i) => (
                                    <div key={i} className="mb-3">
                                      <Link
                                        to="#"
                                        className="accordion-list"
                                        onClick={() => {
                                          setactiveTab2((p) => p == i ? null : i)
                                        }}
                                        style={{ cursor: "pointer" }}
                                      >
                                        <div>{item.question}</div>
                                        <i
                                          className={
                                            i == activeTab2
                                              ? "mdi mdi-minus accor-plus-icon"
                                              : "mdi mdi-plus accor-plus-icon"
                                          }
                                        />
                                      </Link>
                                      <Collapse isOpen={i == activeTab2}>
                                        <CardBody>
                                          <p className="mb-0">{item.answer}</p>
                                        </CardBody>
                                      </Collapse>
                                    </div>
                                  ))
                                }
                              </div>

                              <div className="d-flex flex-wrap gap-2">
                                {
                                  slice == data?.length ?
                                    <Link onClick={() => setslice(4)} className="btn btn-success">
                                      Show Less 
                                    </Link> :
                                    <Link onClick={() => setslice(data?.length)} className="btn btn-success">
                                      Show More
                                    </Link>
                                }
                              </div>
                            </div>

                            {/* accoridan */}
                            {/* <Accordian
                              question1="What is Lorem Ipsum ?"
                              answer1="Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words."
                              question2="Why do we use it ?"
                              answer2="If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages."
                              question3="Where does it come from ?"
                              answer3="It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental."
                              question4="Where can I get some ?"
                              answer4="To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth."
                            /> */}
                          </TabPane>
                          {/* 
                          <TabPane tabId="2">
                            <h4 className="card-title mb-4">Token sale</h4>

                            <Accordian
                              question1="Why do we use it ?"
                              answer1="If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages."
                              question2="What is Lorem Ipsum ?"
                              answer2="It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental."
                              question3="Where can I get some ?"
                              answer3="Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words."
                              question4="Where does it come from ?"
                              answer4="To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth."
                            />
                          </TabPane>

                          <TabPane tabId="3">
                            <h4 className="card-title mb-4">Roadmap</h4>

                            <Accordian
                              question1="Why do we use it ?"
                              answer1="Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words."
                              question2="What is Lorem Ipsum ?"
                              answer2="It will be as simple as Occidental; in fact, it will be Occidental. To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental."
                              question3="Where can I get some ?"
                              answer3="To an English person, it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental is. The European languages are members of the same family. Their separate existence is a myth."
                              question4="Where does it come from ?"
                              answer4="If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages. The new common language will be more simple and regular than the existing European languages."
                            />
                          </TabPane> */}
                        </TabContent>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  )
}

export default FAQs
