import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Link, useLocation } from "react-router-dom";
import Dropzone from "react-dropzone";
import { Button, Card, CardBody, Col, Modal, ModalHeader, ModalBody, Container, Form, FormFeedback, Input, Label, Row, UncontrolledTooltip, } from "reactstrap";
import { Editor } from '@tinymce/tinymce-react';

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

import * as Yup from "yup";
import { useFormik } from "formik";
import moment from "moment";
import SimpleBar from "simplebar-react";
import logo from "../../assets/images/logo.png";
import Noimg from "../../assets/images/noImg.jpg";
import Novid from "../../assets/images/noVideo.png";
import Nodocs from "../../assets/images/noDoc.png";
// Import Editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { getlanguageApi, getTemcategory } from "../../helpers/fakebackend_helper";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { addNewTemplate } from "../../store/templates/actions";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import withRouter from "../../components/Common/withRouter";
import { ToastContainer } from "react-toastify";
import { getTemplate as onGetTemplate, getLanguage as onGetLang, getCategories as onGetCategory, } from "../../store/actions";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'




const TemplatesCreate = (props) => {
  const dispatch = useDispatch(); 

  document.title = "Create-Template | Triblem - Dashboard"; 

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imgStore, setImgStore] = useState([]);
  const [dropList, setDropList] = useState(false);
  const [active, setActive] = useState(0)
  const [Temactive, setTemActive] = useState(1)
  const [modal, setModal] = useState(false);
  const [atri, setatri] = useState([]);
  const [file, setfile] = useState();
  const [prefile, setPrefile] = useState();
  const [threshHold, setThreshHold] = useState(0);
  const [threshHold1, setThreshHold1] = useState(0);
  const [disDefault, setDisDefault] = useState(0);
  const [disDefault1, setDisDefault1] = useState(0);
  const [category, setCategory] = useState([]);
  // const [language, setLanguage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState(); 
  const [body, setBody] = useState(''); 
  
  const { state } = useLocation(); 


  const LoginProperties = createSelector(
    (state) => state.Login,
    (login) => ({
      response: login
    })
  );

  const {
    response
  } = useSelector(LoginProperties);

  // useEffect(() => {
  //   dispatch(onGetTemplate(response?.data?.userID));
  // }, [dispatch]);

  const templateprop = createSelector(
    (state) => state.templates,
    (templates) => ({
      btnLoad: templates.btnLoad,
      templates: templates.templates
    })
  );

  const {
    btnLoad, templates
  } = useSelector(templateprop);

  const [broadTitle, setBroadTitle] = useState('text')

  const [dyButton, setDybuttons] = useState([])
  const [Buttons, setButtons] = useState([])
  const [SelectedBtn, setSelectedBtn] = useState('')

  const [showbtn, setShowBtn] = useState(false);
  const [morebtn, setMoreBtn] = useState(false);

  const VariableBtn1 = [
    // { label: 'Copy Offer Code', value: 'COPY_CODE' },
    { label: 'Phone Number', value: 'PHONE_NUMBER' },
    { label: 'Quick replies', value: 'QUICK_REPLY' },
    { label: 'Web site', value: 'URL' },
  ]
  const [VariableBtn, setVariableBtn] = useState(VariableBtn1)

  useEffect(() => {
    const isPhone = Buttons?.find(r => r?.type == 'PHONE_NUMBER')
    const isCopy = Buttons?.find(r => r?.type == 'COPY_CODE')
    if (isPhone) {
      setVariableBtn(VariableBtn?.filter(e => e?.value != 'PHONE_NUMBER'));
    } else if (isCopy) {
      setVariableBtn(VariableBtn?.filter(e => e?.value != 'COPY_CODE'));
    } else {
      setVariableBtn(VariableBtn1)
    }
  }, [Buttons])

  const handleButtons = () => {
    if (SelectedBtn == 'PHONE_NUMBER') {
      setButtons([...Buttons, { rid: (Buttons?.length + 1), type: 'PHONE_NUMBER', text: '', phone_number: '', label: 'Phone Number' }])
      setSelectedBtn('')
    } else if (SelectedBtn == 'QUICK_REPLY') {
      setButtons([...Buttons, { rid: (Buttons?.length + 1), type: 'QUICK_REPLY', text: '', label: 'Quick replies' }])
    } else if (SelectedBtn == 'COPY_CODE') {
      setButtons([...Buttons, { rid: (Buttons?.length + 1), type: 'COPY_CODE', example: '', label: 'Copy Offer Code' }])
      setSelectedBtn('')
    } else if (SelectedBtn == 'URL') {
      setButtons([...Buttons, { rid: (Buttons?.length + 1), type: 'URL', text: '', url: '', label: 'Web site' }])
    } else {
      return null
    }
  }
  
  useEffect(() => {
    if(state?.tempData) {
      setTemplate(state?.tempData) 
      let val = []; 
      setBody((state?.tempData && state?.tempData?.components?.find(g =>  g?.type == "BODY")?.text) || '')
      state?.tempData?.components?.find(r => r?.type == "BUTTONS" )?.buttons?.map((data, i) => (
        val.push({rid: i+1 , ...data})
      ))
      if(val?.length) {
        setShowBtn(true)
        setButtons(val)
      }
    }
  },[state?.tempData]) 

// console.log('state?.tempData', state?.tempData);


  // const handleCategory = () => {
  //   getTemcategory().then(res => {
  //     setCategory(res)
  //   }).catch(err => console.log((err.message)))
  // }

  // const handleLanguage = () => {
  //   getlanguageApi().then(res => {
  //     setLanguage(res)
  //   }).catch(err => console.log((err.message)))
  // }

  const langProp = createSelector(
    (state) => state.language,
    (language) => ({
      language: language.language,
      loading_lang: language.loading
    })
  );

  const {
    language, loading_lang
  } = useSelector(langProp);

  const categoriesProp = createSelector(
    (state) => state.calendar,
    (calendar) => ({
      categories: calendar.categories,
      loading_cat: calendar.loading
    })
  );

  const {
    categories, loading_cat
  } = useSelector(categoriesProp);

  // console.log('categoriescategories', categories);  

  useEffect(() => {
    if (language && !language.length) {
      dispatch(onGetLang());
    }
  }, [dispatch, language]);

  useEffect(() => {
    if (categories && !categories.length) {
      dispatch(onGetCategory());
    }
  }, [dispatch, categories]);

  const handleAcceptedFiles = (files) => {
    const newImages = files?.map((file) => {
      return Object.assign(file, {
        priview: URL.createObjectURL(file),
      })
    })
    setSelectedFiles([...selectedFiles, ...newImages]);
  };

  const toggle = () => {
    setModal(!modal);
  };

  //  img upload
  const handleImageChange = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      validation.setFieldValue('projectImage', reader.result)
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!file?.name) {
      setPrefile(file)
    }
    if (file?.name) {
      let reader = new FileReader();
      let files = file;
      reader.onloadend = () => {
        setPrefile(reader.result);
      };
      reader.readAsDataURL(files);
    }
  }, [file])

  const handleClick = (item) => {
    const isItemInImgStore = imgStore.some((imgItem) => imgItem.id === item.id);
    setActive(item.id)
    if (!isItemInImgStore) {
      const newData = [...imgStore, item];
      setImgStore(newData);
      validation.setFieldValue('assignedto', newData)
    } else {
      const newData = imgStore.filter((imgItem) => imgItem.id !== item.id)
      setImgStore(newData);
      validation.setFieldValue('assignedto', newData)
    }
  }

  const threshHoldDefault = (event) => {
    const count = event.target.value.length;
    if (count > 0) {
      setDisDefault(true);
    } else {
      setDisDefault(false);
    }
    setThreshHold(event.target.value.length);
  }

  const threshHoldDefault1 = (event) => {
    const count = event.length;
    if (count > 0) {
      setDisDefault1(true);
    } else {
      setDisDefault1(false);
    }
    setThreshHold1(event.length);
  }

  // validation
  const validation = useFormik({
    initialValues: {
      templatename:  (state?.tempData && state?.tempData?.name) || '',
      category: (state?.tempData && state?.tempData?.category) || '',
      language: (state?.tempData && state?.tempData?.language) || '',
      projectdesc: (state?.tempData && state?.tempData?.components?.find(g =>  g?.type == "BODY")?.text) || '',
      assignedto: [],
      projectImage: '',
      header_text: (state?.tempData && state?.tempData?.components?.find(g =>  g?.type == "HEADER")?.text) || '',
      img: '',
      startdate: '',
      footer: (state?.tempData && state?.tempData?.components?.find(g =>  g?.type == "FOOTER")?.text) || '',
      content: ''
    },

    validationSchema: Yup.object({
      templatename: Yup.string().required("Please Enter Your Template Name"),
      projectdesc: Yup.string().required("Please Enter Your Template Desc"),
      footer: Yup.string().required("Please Enter Footer"),
      category: Yup.string().required("Please Select category"),
      language: Yup.string().required("Please Select language"),
      assignedto: Yup.array(),
      startdate: Yup.string(),
      projectImage: Yup.string(),
    }),
    onSubmit: (values) => {

      try {
        // const templates = {
        //   user_id: response?.data?.userID,
        //   name: values.templatename ?? '',
        //   category: values.category ?? '',
        //   language: values.language ?? '',
        //   allow_category_change: false,
        //   components: `{
        //     "header_format": "TEXT",
        //     "header_text": "${values.header_text ?? ''}",
        //     "body_text": "${values.projectdesc ?? ''}",
        //     "footer_text": "${values.footer ?? ''}",
        //     "button": [
        //       ${dyButton.map(p => {
        //         if (p.sec === '1') {
        //           return `{
        //             "type": "PHONE_NUMBER",
        //             "text": "${p.key ?? ''}",
        //             "phone_number": "+91${p.value ?? ''}"
        //           }`;
        //         } else if (p.sec === '2') {
        //           return `{
        //             "type": "QUICK_REPLY",
        //             "text": "${p.key ?? ''}"
        //           }`; 
        //         } else {
        //           return `{
        //             "type": "COPY_CODE",
        //             "text": "${p.key ?? ''}"
        //           }`; 
        //         }
        //       }).join(',')}
        //     ]
        //   }`, 
        //   fomdata: true
        // };

        // const templates = {
        //   user_id: response?.data?.userID,
        //   "name": values.templatename ?? '',
        //   "category": values.category ?? '',
        //   "language": values.language,
        //   "allow_category_change": false,
        //   "components": ` {
        //       "header_format": "TEXT",
        //       "header_text": "Our  is on!",
        //       "body_text": "Shop now through dd and use code ",
        //       "footer_text": "Use the buttons below to manage your marketing subscriptions",
        //       "button": [
        //           {
        //               "type": "PHONE_NUMBER",
        //               "text": "call",
        //               "phone_number": "+91909248471"
        //           },
        //           {
        //               "type": "QUICK_REPLY",
        //               "text": "OFFER"
        //           }
        //       ]
        //   }`,
        //   fomdata: true
        // }

        const templates = {
          user_id: response?.data?.userID,
          name: values.templatename ?? '',
          category: values.category ?? '',
          language: values.language ?? '',
          allow_category_change: false,
          // marketing_category :  Temactive ?? '',
          marketing_category :  values.category == 'MARKETING' ? 'Standard' :  '',
          components: `{
            "header_format": "TEXT",
            "header_text": "${values.header_text ?? ''}",
            "body_text": "${values.projectdesc?.replace(/<[^>]*>/g, '') ?? ''}",
            "footer_text": "${values.footer ?? ''}",
            "button": [
                  ${Buttons.map(p => {
            if (p.type == 'PHONE_NUMBER') {
              return `{
                        "type": "PHONE_NUMBER",
                        "text": "${p.text ?? ''}",
                        "phone_number": "${p.phone_number ?? ''}"
                      }`;
            } else if (p.type == 'QUICK_REPLY') {
              return `{
                        "type": "QUICK_REPLY",
                        "text": "${p.text ?? ''}"
                      }`;
            } else if (p.type == 'COPY_CODE') {
              return `{
                        "type": "COPY_CODE",
                        "example": "${p.example ?? ''}"
                      }`;
            } else if (p.type == 'URL') {
              return `{
                    "type": "URL",
                    "text": "${p.text ?? ''}",
                    "url": "${p.url ?? ''}"
                  }`;
            }
          }).join(',')}
                ]
          }`,
          fomdata: true
        };

        dispatch(addNewTemplate(templates, props.router.navigate));

      } catch (error) {
        console.log("errr", error.message)
        setSubmitting(false);
      }
    }
  });

  useEffect(() => {
    if (atri) {
      validation.setFieldValue('projectdesc', `${atri.join('')}`)
    }
  }, [atri])

  return (
    <React.Fragment>
      <button type="button" className="d-none" id="yyfytekjsddfhf" onClick={() => dispatch(onGetTemplate(response?.data?.userID))}></button>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Template" back={true} breadcrumbItem="New Template" />
          <Form id="createproject-form" onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}>
           
            <Row>
              <Col xl={8}>
                <Card>
                  <CardBody>
                    <input type="hidden" className="form-control" id="formAction" name="formAction" defaultValue="add" />
                    <input type="hidden" className="form-control" id="project-id-input" />
                    <div className="row">
                      <div className="mb-3 col-md-4">
                        <Label htmlFor="templatename-input">Template Name</Label>
                        <Input
                          id="templatename"
                          name="templatename"
                          type="text"
                          placeholder="Enter Template Name..."
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.templatename || ""}
                        />
                        {validation.touched.templatename && validation.errors.templatename ? (
                          <FormFeedback type="invalid" className="d-block">{validation.errors.templatename}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3 col-md-4">
                        <Label htmlFor="project-status-input">Category</Label>
                        <Select
                          getOptionLabel={(e) => e?.name}
                          getOptionValue={(e) => e?.id}
                          // isLoading={loading_cat}
                          value={categories.find(e => e?.name == validation.getFieldProps('category').value)}
                          onChange={(e) => {
                            validation.setFieldValue('category', e?.name)

                            if (e?.name == 'UTILITY') {
                              setVariableBtn(VariableBtn.filter(e => e.value != 'COPY_CODE'))
                            } else {
                              setVariableBtn(VariableBtn1)
                            }

                          }}
                          options={categories ?? []}
                          className="select2-selection"
                        />

                        {validation.touched.category && validation.errors.category ? (
                          <FormFeedback type="invalid" className="d-block">{validation.errors.category}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3 col-md-4">
                        <Label htmlFor="lang-input">Language</Label>
                        <Select
                          getOptionLabel={(e) => e?.lang}
                          getOptionValue={(e) => e?.id}
                          // isLoading={loading_lang}
                          value={language.find(e => e?.code == validation.getFieldProps('language').value)}
                          onChange={(e) => {
                            validation.setFieldValue('language', e?.code)
                          }}
                          options={language ?? []}
                          className="select2-selection"
                        />
                        {validation.touched.language && validation.errors.language ? (
                          <FormFeedback type="invalid" className="d-block">{validation.errors.language}</FormFeedback>
                        ) : null}
                      </div>
                    </div>

                    <div className="mb-3">
                      <Label htmlFor="temp">Select Marketing Template</Label>
                      <div className="gap-2 d-flex flex-wrap align-items-center">

                        <div onClick={() => setTemActive('Standard')} className={`morTag ${Temactive == 'Standard' && "border-primary"} border rounded p-2 px-3 d-flex align-items-center gap-2  justify-content-center`}>
                          <i className="bx bx-card"></i>
                          <span>Standard</span>
                        </div>

                        <div onClick={() => setTemActive('Catelog')} className={`morTag ${Temactive == 'Catelog' && "border-primary"} border rounded p-2 px-3 d-flex align-items-center gap-2  justify-content-center`}>
                          <i className="bx bx-card"></i>
                          <span>Catelog</span>
                        </div>

                        <div onClick={() => setTemActive('Carousel')} className={`morTag ${Temactive == 'Carousel' && "border-primary"} border rounded p-2 px-3 d-flex align-items-center gap-2  justify-content-center`}>
                          <i className="bx bx-carousel"></i>
                          <span>Carousel</span>
                        </div>

                        <div onClick={() => setTemActive('Offers')} className={`morTag ${Temactive == 'Offers' && "border-primary"} border rounded p-2 px-3 d-flex align-items-center gap-2  justify-content-center`}>
                          <i className="bx bxs-offer"></i>
                          <span>Limited Time Offers <small className="badge badge-soft-warning m-1"> <i className="bx bxl-gitlab"></i>  PRO</small></span>
                        </div>
                      </div>
                    </div>


                    <div className="mb-3">
                      <Label htmlFor="temp">BroadCast Title</Label>
                      <h6 className="text-muted">Highlight your band here, use images or videos to stand out</h6>

                      <div className="gap-4 d-flex flex-wrap align-items-center mt-3">
                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios1"
                            value="none"
                            onChange={(e) => setBroadTitle(e.target.value)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios1"
                          >
                            None
                          </label>
                        </div>

                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios2"
                            value="text"
                            onChange={(e) => setBroadTitle(e.target.value)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios2"
                          >
                            Text
                          </label>
                        </div>

                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios3"
                            value="image"
                            onChange={(e) => setBroadTitle(e.target.value)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios3"
                          >
                            Image
                          </label>
                        </div>

                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios4"
                            value="video"
                            onChange={(e) => setBroadTitle(e.target.value)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios4"
                          >
                            video
                          </label>
                        </div>

                        <div className="form-check mb-3">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios5"
                            value="docs"
                            onChange={(e) => setBroadTitle(e.target.value)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="exampleRadios5"
                          >
                            Document
                          </label>
                        </div>
                      </div>
                    </div>

                    {
                      broadTitle != "none" ?
                        <div className="row">
                          <div className="col-8 mb-3">
                            {/* <Label htmlFor="textk">Enter </Label> */}
                            <Input
                              id="textk"
                              name="header_text"
                              type="text"
                              placeholder="Enter Text or URL..."
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.header_text || ""}
                            />
                            {validation.touched.header_text && validation.errors.header_text ? (
                              <FormFeedback type="invalid" className="d-block">{validation.errors.header_text}</FormFeedback>
                            ) : null}
                          </div>
                          {
                            broadTitle == "text" ? '' :
                              <div className="col-4 mb-3 d-flex gap-3 align-items-center">
                                <div>
                                  (or)
                                </div>
                                <Input
                                  id="openFilepah"
                                  name=""
                                  type="file"
                                  onChange={(e) => setfile(e.target.files[0])
                                  }
                                  className="d-none"
                                  placeholder="Enter Text or URL..."
                                />
                                <button type="button" onClick={() => document.getElementById('openFilepah')?.click()} className="btn btn-primary">Upload</button>
                              </div>
                          }
                        </div>
                        : ''
                    }


                    <div className="mb-3">
                      <Label htmlFor="projectdesc-input">body</Label>
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <h6 className="text-muted fw">Make a message personal using variable line <span className="text-primary">{`{{name}}`}</span></h6>
                        <h6 className="text-primary morTag" onClick={() => toggle()}><i className="bx bx-plus " ></i> Add variable</h6>
                      </div>
                      {/* <Input type="textarea"
                              id="projectdesc"
                              rows={6}
                              name="projectdesc"
                              placeholder="Enter Text..."
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.projectdesc || ""}
                          /> */}
                          {/* <CKEditor
                              editor={ClassicEditor}
                              data={validation.getFieldProps('projectdesc').value}
                              onReady={editor => {
                                // You can store the "editor" and use when it is needed.
                                // console.log('Editor is ready to use!', editor);
                              }}
                              
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                validation.setFieldValue('projectdesc', data)
                              }}
                            /> */} 

                            <CKEditor
                              editor={ClassicEditor}
                              data={validation.getFieldProps('projectdesc').value}
                              onChange={(event, editor) => {
                                const data = editor.getData();
                                validation.setFieldValue('projectdesc', data);
                                setBody(data)
                                threshHoldDefault1(data?.replace(/<[^>]*>/g, ''));
                                // console.log("....", editor.getData()?.replace(/<[^>]*>/g, ''))
                              }}
                              config={{
                                toolbar: {
                                  items: ['undo', 'redo', '|', 'bold', 'italic'],
                                  maxWordCount: 10,
                                },
                                // plugins: [
                                //   Bold, Essentials, Italic, Mention, Paragraph, SlashCommand, Undo
                                // ],
                                // licenseKey: '<YOUR_LICENSE_KEY>',
                                mention: {
                                  // Mention configuration
                                },
                              }}
                            />

                        {disDefault1 ? (
                          <span className="badgecount badge bg-primary">
                            {threshHold1} / 1024{" "}
                          </span>
                        ) : null}

                      {validation.touched.projectdesc && validation.errors.projectdesc ? (
                        <FormFeedback type="invalid" className="d-block">{validation.errors.projectdesc}</FormFeedback>
                      ) : null}

                    </div>


                    <div className="mb-3 ">
                      <Label htmlFor="footer-input">Footer</Label><span className="fw text-muted">(Optional)</span>
                      <h6 className="text-muted fw">Footer are great to add any disclaimer or to add throughtfull PS</h6>

                      <Input
                        id="footer"
                        name="footer"
                        type="text"
                        onChange={(e) => { validation.handleChange(e); threshHoldDefault(e) }}
                        onBlur={validation.handleBlur}
                        value={validation.values.footer || ""}
                        maxLength={60}
                        placeholder="Enter Text..."
                      />

                      {disDefault ? (
                        <span className="badgecount badge bg-primary">
                          {threshHold} / 60{" "}
                        </span>
                      ) : null}

                      {validation.touched.footer && validation.errors.footer ? (
                        <FormFeedback type="invalid" className="d-block">{validation.errors.footer}</FormFeedback>
                      ) : null} 
                      
                    </div>

                    <div className="mb-3 ">
                      <Label htmlFor="footer-input">Buttons</Label><span className="fw text-muted">(Recommended)</span>  <span className="badge badge-soft-primary p-2 rounded-4">{Buttons?.length ?? 0}/7</span>
                      <div className="d-flex justify-content-between align-items-center">
                        <h6 className="text-muted fw">Insert Button to a Customer take action and engage with your message</h6>
                        <div
                          className="form-check form-switch form-switch-md mb-3"
                        >
                          <input
                            type="checkbox"
                            value={showbtn}
                            onChange={(e) => setShowBtn(e.target.checked)}
                            className="form-check-input"
                            id="customSwitchsizemd"
                          />
                        </div>
                      </div>

                      {
                        showbtn ?
                          <>
                            <div className="row ">
                              <div className="col-md-6 mb-3">
                                <Select
                                  getOptionLabel={(e) => e?.label}
                                  getOptionValue={(e) => e?.value}
                                  value={VariableBtn.find(e => e.value == SelectedBtn)}
                                  onChange={(e) => setSelectedBtn(e.value)}
                                  options={VariableBtn ?? []}
                                  className="select2-selection"
                                  isDisabled={!validation.getFieldProps('category')?.value}
                                />
                              </div>

                              <div className="col-md-3 mb-3">
                                <button type="button" disabled={Buttons?.length == 7} onClick={handleButtons} className="btn btn-primary">Add Button</button>
                              </div>
                            </div>

                            <div>
                              {
                                Buttons?.map((data, i) => (
                                  <div className="row align-items-center" key={i}>
                                    <h6>{data?.label}</h6>
                                    {
                                      Object.keys(data)?.filter(r => r != 'rid' && r != 'type' && r != 'label').map((val, k) => (
                                        <div className="col-md-3 mb-3" key={k}>
                                          {
                                            val == 'phone_number' ?
                                              <PhoneInput
                                                country={'in'}
                                                countryCodeEditable={false}
                                                inputProps={{
                                                  id: "p_number",
                                                }}
                                                inputClass="form-control w-100"
                                                value={data[val] || ""}
                                                onChange={(e) => {
                                                  setButtons((p) => {
                                                    const value = [...p];
                                                    value[i][val] = e;
                                                    return value;
                                                  })
                                                }}
                                              /> :
                                              <Input
                                                id={`btn${i}${k}`}
                                                name={val}
                                                type="text"
                                                value={data[val]}
                                                maxLength={data?.type == 'COPY_CODE' ? 15 : val == 'url' ? 2000 : 25}
                                                onChange={(e) => {
                                                  setButtons((p) => {
                                                    const value = [...p];
                                                    value[i][val] = val == 'phone_number' ? e.target.value?.replace(/[^0-9]/g, "") : e.target.value;
                                                    return value;
                                                  })
                                                }}
                                                placeholder={`Enter ${val}...`}
                                              />
                                          }
                                        </div>
                                      ))
                                    }
                                    <div onClick={() => { setButtons(Buttons.filter(r => r != data)) }} className="border rounded removeI col-2 mb-3">
                                      <i className="bx bx-trash-alt text-danger"></i>
                                    </div>
                                  </div>
                                ))
                              }
                            </div>
                          </> : ''
                      }




                      {/* {
                          showbtn ?
                            <div>
                              {
                                dyButton?.filter(e => e.sec == '1')?.length > 0 ?
                                  <div className="row mb-3">
                                    {
                                      dyButton?.filter(e => e.sec == '1').map((d, i) => (
                                        <div className="col-md-9 mb-2" key={i}>
                                          <div className="d-flex gap-2 flex-wrap align-items-center">
                                            <div className="select_si" key={i}>
                                              <select className="form-select pageSize" onChange={(e) => {
                                                setDybuttons((p) => {
                                                  const value = [...p];
                                                  const index = p.findIndex(o => o.tark == d.tark);
                                                  value[index].drop = e.target.value;
                                                  return value
                                                })
                                              }} id="lang-input">
                                                <option value="phone" disabled={i == dyButton?.findIndex(e => e?.drop == 'phone') ? false : true}>Phone</option>
                                                <option value="web">Website</option>
                                              </select>
                                            </div>

                                            <div>
                                              <Input
                                                id=""
                                                name="key"
                                                type="text"
                                                onChange={(e) => {
                                                  setDybuttons((p) => {
                                                    const value = [...p];
                                                    const index = p.findIndex(o => o.tark == d.tark);
                                                    value[index].key = e.target.value;
                                                    return value
                                                  })
                                                }}
                                                placeholder="Enter Button Text..."
                                              />
                                            </div>

                                            {
                                              d?.drop == "web" ?
                                                <div className="select_si" key={i}>
                                                  <select className="form-select pageSize" onChange={(e) => {
                                                    setDybuttons((p) => {
                                                      const value = [...p];
                                                      const index = p.findIndex(o => o.tark == d.tark);
                                                      value[index].type = e.target.value;
                                                      return value
                                                    })
                                                  }} id="lang-input">
                                                    <option value="static">static</option>
                                                    <option value="dynamic">dynamic</option>
                                                  </select>
                                                </div> : ''
                                            }

                                            <div>
                                              <Input
                                                id=""
                                                name=""
                                                minLength={10}
                                                maxLength={d?.drop == "phone" ? 10 : 50}
                                                type="text" onChange={(e) => {
                                                  setDybuttons((p) => {
                                                    const value = [...p];
                                                    const index = p.findIndex(o => o.tark == d.tark);
                                                    value[index].value = d?.drop == "phone" ? e.target.value?.replace(/[^0-9]/g, "") : e.target.value;
                                                    return value
                                                  })
                                                }}
                                                placeholder="Enter Button value..."
                                              />
                                            </div>

                                            <div onClick={() => setDybuttons(dyButton.filter(r => r != d))} className="border rounded removeI">
                                              <i className="bx bx-trash-alt"></i>
                                            </div>

                                          </div>
                                        </div>
                                      ))

                                    }

                                    {
                                      dyButton?.filter(e => e.sec == '1')?.length < 3 ?
                                        <div className="col-md-2">
                                          <button type="button" onClick={() => setDybuttons((p) => [...p, { drop: dyButton?.find(e => e?.drop == 'phone') ? 'web' : 'phone', key: '', value: '', type: '', sec: '1', tark: p.length }])} className="btn btn-primary">Add Button</button>
                                        </div> : ''
                                    }

                                  </div>
                                  :
                                  <div className="mb-3 d-flex gap-3 ">
                                    <div className="select_si">
                                      <select className="form-select pageSize" id="lang-input">
                                        <option value="web">Website</option>
                                        <option value="phone">Phone</option>
                                      </select>
                                    </div>
                                    {
                                      dyButton?.filter(e => e.sec == '1')?.length < 3 ?
                                        <div className="">
                                          <button type="button" onClick={() => setDybuttons((p) => [...p, { drop: 'phone', key: '', value: '', type: '', sec: '1', tark: p.length }])} className="btn btn-primary">Add Button</button>
                                        </div> : ''
                                    }
                                  </div>
                              }

                              {
                                dyButton?.filter(e => e.sec == '2')?.length > 0 ?
                                  <div className="row mb-3">
                                    {
                                      dyButton?.filter(e => e.sec == '2').map((d, i) => (
                                        <div className="col-md-9 mb-2" key={i}>
                                          <div className="d-flex gap-2 flex-wrap align-items-center">

                                            <div className="select_si">
                                              <Input
                                                id=""
                                                name=""
                                                type="text"
                                                value="Copy Offer Code"
                                                placeholder="Enter Text..."
                                                readOnly
                                              />
                                            </div>

                                            <div>
                                              <Input
                                                id=""
                                                name="key"
                                                type="text"
                                                onChange={(e) => {
                                                  setDybuttons((p) => {
                                                    const value = [...p];
                                                    const index = p.findIndex(o => o.tark == d.tark);
                                                    value[index].key = e.target.value;
                                                    return value
                                                  })
                                                }}
                                                placeholder="Enter Button Text..."
                                              />
                                            </div>

                                            <div>
                                              <Input
                                                id=""
                                                name="value"
                                                type="text" onChange={(e) => {
                                                  setDybuttons((p) => {
                                                    const value = [...p];
                                                    const index = p.findIndex(o => o.tark == d.tark);
                                                    value[index].value = e.target.value;
                                                    return value
                                                  })
                                                }}
                                                placeholder="Enter Copy Code value..."
                                              />
                                            </div>

                                            <div onClick={() => setDybuttons(dyButton.filter(r => r != d))} className="border rounded removeI">
                                              <i className="bx bx-trash-alt"></i>
                                            </div>

                                          </div>
                                        </div>
                                      ))
                                    }
                                    {
                                      dyButton?.filter(e => e.sec == '2')?.length < 1 ?
                                        <div className="col-md-2">
                                          <button type="button" onClick={() => setDybuttons((p) => [...p, { key: '', value: '', sec: '2', tark: p.length }])} className="btn btn-primary">Add Button</button>
                                        </div> : ''
                                    }
                                  </div>
                                  :
                                  <div className="mb-3 d-flex gap-3">
                                    <div className="select_si">
                                      <Input
                                        id=""
                                        name=""
                                        type="text"
                                        value="Copy Offer Code"
                                        placeholder="Enter Text..."
                                        readOnly
                                      />
                                    </div>
                                    {
                                      dyButton?.filter(e => e.sec == '2')?.length < 1 ?
                                        <div className="">
                                          <button type="button" onClick={() => setDybuttons((p) => [...p, { key: '', value: '', sec: '2', tark: p.length }])} className="btn btn-primary">Add Button</button>
                                        </div> : ''
                                    }
                                  </div>
                              }

                              {
                                dyButton?.filter(e => e.sec == '3')?.length > 0 ?
                                  <div className="row mb-3">
                                    {
                                      dyButton?.filter(e => e.sec == '3').map((d, i) => (
                                        <div className="col-md-9 mb-2" key={i}>
                                          <div className="d-flex gap-2 flex-wrap align-items-center">

                                            <div className="select_si">
                                              <Input
                                                id=""
                                                name=""
                                                type="text"
                                                value="Quick replies"
                                                placeholder="Enter Text..."
                                                readOnly
                                              />
                                            </div>

                                            <div>
                                              <Input
                                                id=""
                                                name="key"
                                                type="text"
                                                onChange={(e) => {
                                                  setDybuttons((p) => {
                                                    const value = [...p];
                                                    const index = p.findIndex(o => o.tark == d.tark);
                                                    value[index]['key'] = e.target.value;
                                                    return value
                                                  })
                                                }}
                                                placeholder="Enter Button Text..."
                                              />
                                            </div>

                                            <div>
                                              <Input
                                                id=""
                                                name="value"
                                                type="text"
                                                onChange={(e) => {
                                                  setDybuttons((p) => {
                                                    const value = [...p];
                                                    const index = p.findIndex(o => o.tark == d.tark);
                                                    value[index]['value'] = e.target.value;
                                                    return value
                                                  })
                                                }}
                                                placeholder="Enter Button value..."
                                              />
                                            </div>


                                            <div onClick={() => setDybuttons(dyButton.filter(r => r != d))} className="border rounded removeI">
                                              <i className="bx bx-trash-alt"></i>
                                            </div>

                                          </div>
                                        </div>
                                      ))
                                    }

                                    {
                                      dyButton?.filter(e => e.sec == '3')?.length < 3 ?
                                        <div className="col-md-2">
                                          <button type="button" onClick={() => setDybuttons((p) => [...p, { key: '', value: '', sec: '3', tark: p.length }])} className="btn btn-primary">Add Button</button>
                                        </div> : ''
                                    }

                                  </div>
                                  :
                                  <div className="mb-3 d-flex gap-3">
                                    <div className="select_si">
                                      <Input
                                        id=""
                                        name=""
                                        type="text"
                                        value="Quick replies"
                                        placeholder="Enter Text..."
                                        readOnly
                                      />
                                    </div>
                                    {
                                      dyButton?.filter(e => e.sec == '3')?.length < 3 ?
                                        <div className="">
                                          <button type="button" onClick={() => setDybuttons((p) => [...p, { key: '', value: '', sec: '3', tark: p.length }])} className="btn btn-primary">Add Button</button>
                                        </div> : ''
                                    }
                                  </div>
                              }
                            </div> : ''
                        } */}

                    </div>

                    {/* <div className="mb-3 ">
                        <Label htmlFor="footer-input">Sample Content</Label>
                        <h6 className="text-muted fw">Just enter sample content here (it doesn't need to be exact)</h6>
                        <Input
                          id="footer"
                          name="content"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.content || ""}
                          placeholder="Enter Text..."
                        />
                      </div> */}

                  </CardBody>
                </Card>


                <Modal isOpen={modal} size="lg" toggle={toggle}>
                  <ModalHeader toggle={toggle} tag="h4">Select Attribute</ModalHeader>
                  <ModalBody>
                    <h4>Contact</h4>
                    <div className="d-flex flex-wrap gap-3">
                      <div className="px-3 atrtBute text-primary " onClick={() => { setatri([...atri, '{{allow_boad}}']); toggle() }}>
                        allow broad
                      </div>
                      <div className="px-3 atrtBute text-primary " onClick={() => { setatri([...atri, '{{amount}}']); toggle() }}>
                        amount
                      </div>

                      <div className="px-3 atrtBute text-primary " onClick={() => { setatri([...atri, '{{broad}}']); toggle() }}>
                        broad
                      </div>

                      <div className="px-3 atrtBute text-primary " onClick={() => { setatri([...atri, '{{allow_boad}}']); toggle() }}>
                        allow broad
                      </div>
                      <div className="px-3 atrtBute text-primary " onClick={() => { setatri([...atri, '{{allow_boad}}']); toggle() }}>
                        allow broad
                      </div>
                      <div className="px-3 atrtBute text-primary " onClick={() => { setatri([...atri, '{{new}}']); toggle() }}>
                        new
                      </div>
                      <div className="px-3 atrtBute text-primary " onClick={() => { setatri([...atri, '{{allow_boad}}']); toggle() }}>
                        allow broad
                      </div>

                      <div className="px-3 atrtBute text-primary " onClick={() => { setatri([...atri, '{{terms}}']); toggle() }}>
                        terms
                      </div>

                      <div className="px-3 atrtBute text-primary " onClick={() => { setatri([...atri, '{{test}}']); toggle() }}>
                        test
                      </div>

                      <div className="px-3 atrtBute text-primary " onClick={() => { setatri([...atri, '{{phone}}']); toggle() }}>
                        phone
                      </div>
                    </div>
                  </ModalBody>
                </Modal>
              </Col>

              <Col lg={4} className="d-flex justify-content-center">

                <div className="page">
                  <div className="marvel-device nexus5">
                    <div className="top-bar"></div>
                    <div className="sleep"></div>
                    <div className="volume"></div>
                    <div className="camera"></div>
                    <div className="screen">
                      <div className="screen-container">
                        <div className="status-bar">
                          <div className="time">{'12:55 PM'}</div>
                          <div className="battery">
                            <i className="bx bxs-battery"></i>
                          </div>
                          <div className="network">
                            <i className="mdi mdi-network-strength-1"></i>
                          </div>
                          <div className="wifi">
                            <i className="mdi mdi-wifi"></i>
                          </div>
                          <div className="star">
                            <i className="zmdi zmdi-star"></i>
                          </div>
                        </div>
                        <div className="chat">
                          <div className="chat-container">
                            <div className="user-bar">
                              <div className="back">
                                <i className="zmdi zmdi-arrow-left"></i>
                              </div>
                              <div className="avatar">
                                <img src={logo} alt="Avatar" />
                              </div>
                              <div className="name">
                                <span>Triblem</span>
                                <span className="status">online</span>
                              </div>
                              <div className="actions more">
                                <i className="zmdi zmdi-more-vert"></i>
                              </div>
                              <div className="actions attachment">
                                <i className="zmdi zmdi-attachment-alt"></i>
                              </div>
                              <div className="actions">
                                <i className="zmdi zmdi-phone"></i>
                              </div>
                            </div>
                            <div className="conversation">
                              <div className="conversation-container" >

                                {/* <div className="message sent">
                                  No I wasn't.
                                  <span className="metadata">
                                      <span className="time"></span><span className="tick"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"/></svg></span>
                                  </span>
                                  </div> */}

                                <div className=" mt-2 mb-3 p-2 rounded-3 received bage badge-soft-info" >
                                  <span id="random"><i className="bx bxs-error-circle fs-5"></i> This Bussiness used Secure service from Meta to message this chat. Tap to learn more</span>
                                  <span className="metadata"><span className="time"></span></span>
                                </div>

                                <div className=" message received " >
                                  {/* <button type="button" onClick={()=> alert()}>click</button> */}

                                  {
                                    broadTitle != 'none' && broadTitle != 'text' ?
                                      <div className="mb-2">
                                        <img src={broadTitle == 'image' ? prefile ?? Noimg : broadTitle == 'video' ? Novid : Nodocs} onError={(e) => e.currentTarget.src = { Noimg }} className="buss_img" />
                                      </div> : ''
                                  }

                                  {
                                    validation.getFieldProps('header_text').value ?
                                      <div className="mb-2">
                                        <h6>{validation.getFieldProps('header_text').value}</h6>
                                      </div> : ''
                                  }

                                  <div className="mb-3">
                                    <span className="fw lh-base">{validation.getFieldProps('content').value} <span dangerouslySetInnerHTML={{ __html: body ?? validation.getFieldProps('projectdesc').value }}></span></span>
                                  </div>

                                  <div className="mb-3 d-flex flex-wrap justify-content-between align-items-center">
                                    <span className="lh-base text-muted text-wrap">{validation.getFieldProps('footer').value}</span>
                                    <span className="text-muted">{moment(new Date()).format('H:mm')}</span>
                                  </div>

                                  <div className="text-center" >
                                    {/* {
                                        dyButton.find(e => e.sec == '1')?.drop == 'web' ?
                                          <p className="text-primary"><i className="bx bx-link-external"></i> Visit us</p> : ''
                                      }
                                      {
                                        dyButton.find(e => e.sec == '1')?.drop == 'phone' ?
                                          <p className="text-primary"><i className="bx bx-phone"></i> {dyButton.find(e => e.sec == '1')?.key}</p> : ''
                                      }
                                      {
                                        dyButton.find(e => e.sec == '2') ?
                                          <p className="text-primary"> <i className="bx bx-copy"></i> Copy offer code</p> : ''
                                      } */}
                                    {
                                      Buttons?.slice(0, 2)?.map((data, i) =>
                                        data?.type == 'URL' ?
                                          (
                                            <p className="text-primary" key={i}><i className="bx bx-link-external"></i>{data?.text}</p>
                                          ) : data?.type == 'PHONE_NUMBER' ?
                                            (
                                              <p className="text-primary" key={i}><i className="bx bx-phone"></i> {data?.text}</p>
                                            ) : data?.type == 'QUICK_REPLY' ?
                                              (
                                                <p className="text-primary" key={i}> <i className="bx bxs-share"></i> Quick Reply</p>
                                              ) : data?.type == 'COPY_CODE' ? (
                                                <p className="text-primary" key={i}> <i className="bx bx-copy"></i> Copy offer code</p>
                                              ) : ''
                                      )
                                    }

                                    {/* {dyButton?.filter(e => e?.sec == '3')?.length > 2 ?
                                      <p className="text-primary"><i className="bx bx-list-ul"></i> View All Action</p> :
                                      dyButton.find(e => e.sec == '3') ?
                                        <p className="text-primary"><i className="bx bxs-share"></i> {dyButton.find(e => e.sec == '3')?.key}</p>
                                        : ''
                                    } */}
                                    {
                                      Buttons?.length > 2 ?
                                        <div role="button" onClick={() => setMoreBtn(true)} >
                                          <p className="text-primary cursor_pointer d-flex align-items-center gap-1" ><i className="bx bx-list-ul"></i> See all options</p>
                                        </div>
                                        : ''
                                    }
                                  </div>
                                </div>
                              </div>
                              {
                                morebtn ?
                                  <div className="logpop">
                                    <div className="d-flex justify-content-center w-100 mb-4">
                                      <span className="fff" onClick={() => setMoreBtn(false)}></span>
                                    </div>
                                    <div className="text-center d-flex justify-content-center mb-3">
                                      <h5 className="fs-5">All Options</h5>
                                    </div>

                                    <div>
                                      {
                                        Buttons?.map((data, i) =>
                                          data?.type == 'URL' ?
                                            (
                                              <p className="text-secondary d-flex align-items-center gap-1" key={i}><i className="bx bx-link-external"></i>{data?.text}</p>
                                            ) : data?.type == 'PHONE_NUMBER' ?
                                              (
                                                <p className="text-secondary d-flex align-items-center gap-1" key={i}><i className="bx bx-phone"></i> {data?.text}</p>
                                              ) : data?.type == 'QUICK_REPLY' ?
                                                (
                                                  <p className="text-secondary d-flex align-items-center gap-1" key={i}> <i className="bx bxs-share"></i> Quick Reply</p>
                                                ) : data?.type == 'COPY_CODE' ? (
                                                  <p className="text-secondary d-flex align-items-center gap-1" key={i}> <i className="bx bx-copy"></i> Copy offer code</p>
                                                ) : ''
                                        )
                                      }
                                      {/* <p className="text-secondary d-flex align-items-center gap-1" ><i className="bx bx-link-external"></i>{"CALL"}</p> */}
                                    </div>
                                  </div> : ''
                              }

                              <form className="conversation-compose">
                                <div className="emoji">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="smiley" x="3147" y="3209"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.153 11.603c.795 0 1.44-.88 1.44-1.962s-.645-1.96-1.44-1.96c-.795 0-1.44.88-1.44 1.96s.645 1.965 1.44 1.965zM5.95 12.965c-.027-.307-.132 5.218 6.062 5.55 6.066-.25 6.066-5.55 6.066-5.55-6.078 1.416-12.13 0-12.13 0zm11.362 1.108s-.67 1.96-5.05 1.96c-3.506 0-5.39-1.165-5.608-1.96 0 0 5.912 1.055 10.658 0zM11.804 1.01C5.61 1.01.978 6.034.978 12.23s4.826 10.76 11.02 10.76S23.02 18.424 23.02 12.23c0-6.197-5.02-11.22-11.216-11.22zM12 21.355c-5.273 0-9.38-3.886-9.38-9.16 0-5.272 3.94-9.547 9.214-9.547a9.548 9.548 0 0 1 9.548 9.548c0 5.272-4.11 9.16-9.382 9.16zm3.108-9.75c.795 0 1.44-.88 1.44-1.963s-.645-1.96-1.44-1.96c-.795 0-1.44.878-1.44 1.96s.645 1.963 1.44 1.963z" fill="#7d8489" /></svg>
                                </div>
                                <input className="input-msg" disabled name="input" placeholder="Type a message" autocomplete="off" autofocus></input>
                                <div className="photo">
                                  <i className="zmdi zmdi-camera"></i>
                                </div>
                                <button type="button" className="send">
                                  <div className="circle">
                                    <i className="bx bx-send"></i>
                                  </div>
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>

              <Col xl={8}>
                <div className="text-end mb-4 mt-3">
                  <Button type="submit" disabled={btnLoad} color="primary">
                    {
                      btnLoad ?
                        <>
                          <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>{" "}
                          Loading
                        </> : 'Create Template'
                    }
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

// export default TemplatesCreate;
export default withRouter(TemplatesCreate);

TemplatesCreate.propTypes = {
  history: PropTypes.object,
};
