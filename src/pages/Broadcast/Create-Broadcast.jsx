import React, { useEffect, useState, useRef, forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Dropzone from "react-dropzone";
import { Button, Table, Card, CardBody, Col, Modal, ModalHeader, ModalBody, Container, Form, FormFeedback, Input, Label, InputGroup, Row, UncontrolledTooltip, FormGroup, Collapse, UncontrolledCollapse, UncontrolledAlert, Alert } from "reactstrap";
import { Editor } from '@tinymce/tinymce-react';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

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
import Select from "react-select";
import { addNewBroadcast } from "../../store/actions";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import withRouter from "../../components/Common/withRouter";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { getTemplate as onGetTemplate, getUsers as onGetUsers } from "../../store/actions";






const BroadcastCreate = (props) => {

    document.title = "Add BroadCast | Triblem -  Dashboard BroadCast";
    const dispatch = useDispatch();

    const { state } = useLocation()


    const CustomDateinput = forwardRef(({ disable, ids, date, value, onClick }, ref) => {
        return <div className="input-container  w-100" onClick={onClick} ref={ref}>
            <Input type="text" value={value} readOnly={true} className="form-control" disabled={disable} id={ids} placeholder="Select Date" required="" />
            <div className="input-group-append" role="button" onClick={onClick}>
                <span className="input-group-text">
                    <i className="mdi mdi-calendar-month-outline" />
                </span>
            </div>
        </div>
    })



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
    const flatpickrRef = useRef(null);
    const [pick_date, setPickDate] = useState(new Date());
    const [send, setSend] = useState("");
    const [col5, setCol5] = useState(false);
    const [templateData, setTemplateData] = useState([]);
    const [contactData, setcontactData] = useState([]);
    const [selectContact, setSelectContact] = useState([])
    const [mesageTemp, setMsgTemp] = useState({})
    const [morebtn, setMoreBtn] = useState(false);
    const [btnLoader, setBtnLoader] = useState(false);


    // console.log('selectContact',selectContact)


    const handleSeacrhCon = (val) => {
        if (val) {
            const text = val?.toLowerCase();
            setcontactData(users?.filter(g => g?.name?.toLowerCase()?.includes(text)));
        } else {
            setcontactData(users)
        }
    }


    const LoginProperties = createSelector(
        (state) => state.Login,
        (login) => ({
            response: login
        })
    );

    const {
        response
    } = useSelector(LoginProperties);

    const templateprop = createSelector(
        (state) => state.templates,
        (templates) => ({
            templates: templates.templates,
            loading: templates.loading
        })
    );

    const {
        templates, loading
    } = useSelector(templateprop);


    const broadcastprop = createSelector(
        (state) => state.broadcast,
        (broadcast) => ({
            btnLoad: broadcast.btnLoad,
            broadcast: broadcast.boradcast,
        })
    );

    const {
        broadcast, btnLoad
    } = useSelector(broadcastprop);


    useEffect(() => {
        if (templates && !templates.length) {
            dispatch(onGetTemplate(response?.data?.userID));
        }
    }, [dispatch, templates]);

    const ContactsProperties = createSelector(
        (state) => state.contacts,
        (Contacts) => ({
            users: Contacts.users,
            loading2: Contacts.loading,
        })
    );
    const {
        users, loading2,
    } = useSelector(ContactsProperties);

    useEffect(() => {
        if (users && !users.length) {
            dispatch(onGetUsers());
        }
        setcontactData(users)
    }, [dispatch, users]);


    useEffect(() => {
        setTemplateData(templates ?? []);
    }, [templates]);

    const t_col5 = () => {
        setCol5(!col5);
    };

    const picks = () => {
        // setPickDate(new Date());
    };

    const resentValue = () => {
        setPickDate(" ");
    };

    const [broadTitle, setBroadTitle] = useState('none')

    const [dyButton, setDybuttons] = useState([])

    const [showbtn, setShowBtn] = useState(false)

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
        // if(file?.startsWith('https://')) {
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


    useEffect(() => {
        if (state?.tempId) {
            setMsgTemp(templates?.find(e => e?.name == state?.tempId))
        }
    }, [state?.tempId])

    // validation
    const validation = useFormik({
        initialValues: {
            broadcastname: '',
            projectdesc: '',
            template: state?.tempId ?? '',
            phone: '',
            assignedto: [],
            projectImage: '',
            img: '',
            startdate: '',
            footer: '',
            content: ''
            // enddate: ''
        },
        validationSchema: Yup.object({
            broadcastname: Yup.string().required("Please Enter Your Broadcats Name"),
            projectdesc: Yup.string(),
            assignedto: Yup.array(),
            startdate: Yup.string(),
            projectImage: Yup.string(),
        }),

        onSubmit: (values) => {
            // console.log(values); 
            setBtnLoader(true)
            const body = {
                "user_id": response?.data?.userID,
                "broadcast_id": 0,
                "title": values.broadcastname,
                // "phone":`91${values.phone}`,
                'phone': selectContact?.join(',') ?? '',
                "schedule":  send == 'time' ? moment(pick_date).format('YYYY-MM-DD HH:mm:ss') : '',
                "template": `${values.template}`
            }

            dispatch(addNewBroadcast(body, props.router.navigate));
        }
    });

    useEffect(() => {
        if (atri) {
            validation.setFieldValue('projectdesc', `${atri.join('')}`)
        }
    }, [atri])

    return (
        <React.Fragment>
            <button type="button" className="d-none" id="btnLoadreoff" onClick={()=> setBtnLoader(false)} />
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Broadcast" back={true} breadcrumbItem="New BroadCast" />

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

                                        <div className="">
                                            <Label htmlFor="ddd">What Message do you want to send to it?</Label>
                                            <p>Add Broadcast name and template below</p>
                                        </div>

                                        <div className="card rounded-3 card_bg">
                                            <div className="card-body">
                                                <div className="mb-3 ">
                                                    <Label htmlFor="broadcastname-input">Broadcast Name</Label>
                                                    <Input
                                                        id="broadcastname"
                                                        name="broadcastname"
                                                        type="text"
                                                        placeholder="Enter Broadcast Name..."
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.broadcastname || ""}
                                                    />
                                                    {validation.touched.broadcastname && validation.errors.broadcastname ? (
                                                        <FormFeedback type="invalid" className="d-block">{validation.errors.broadcastname}</FormFeedback>
                                                    ) : null}
                                                </div>

                                                {/* <div className="mb-3 ">
                                                    <Label htmlFor="phone-input">Phone</Label>
                                                    <Input
                                                        id="phone"
                                                        name="phone"
                                                        type="text"
                                                        placeholder="Enter Phone Number..."
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.phone || ""}
                                                    />
                                                    {validation.touched.phone && validation.errors.phone ? (
                                                        <FormFeedback type="invalid" className="d-block">{validation.errors.phone}</FormFeedback>
                                                    ) : null}
                                                </div> */}


                                                <div className="mb-3 ">
                                                    <div className="d-flex justify-content-between align-tems-center">
                                                        <Label htmlFor="project-status-input">Select Message Template</Label>
                                                        <Link to={'/create-templates'}>+ Add New template</Link>
                                                    </div>
                                                    <Select
                                                        isLoading={loading}
                                                        getOptionLabel={(e) => e?.name}
                                                        getOptionValue={(e) => e?.id}
                                                        value={templateData.find(e => e?.name == validation.getFieldProps('template').value)}
                                                        onChange={(e) => {
                                                            validation.setFieldValue('template', e?.name);
                                                            setMsgTemp(e);
                                                        }}
                                                        options={templateData?.filter(o => o?.status == "APPROVED") ?? []}
                                                        className="select2-selection"
                                                    />
                                                    <div className="form-check mt-1">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                                        <label className="form-check-label" for="flexCheckChecked">
                                                            Add a different header
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="">
                                                <Label htmlFor="ddd">What Message do you want to send</Label>
                                                <p>Select Contact below or <a href="#">Download sample format for conatct upload</a></p>
                                            </div>
                                            <div>
                                                <input type="file" className="d-none" id="openFileUpload" />
                                                <button type="button" className="btn btn-outline-primary" onClick={() => document.getElementById('openFileUpload')?.click()}>Import Contact</button>
                                            </div>
                                        </div>

                                        <div className="card rounded-3 card_bg mb-3">
                                            <div className="card-body">
                                                {/* <button
                                                    onClick={t_col5}
                                                    className="btn btn-primary mo-mb-2 mb-3"
                                                    type="button"
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    Button with data-target
                                                </button> */}
                                                <div className=" d-flex justify-content-between align-items-center">
                                                    <h6>Exclude invalid Contacts</h6>
                                                    <div onClick={t_col5}>
                                                        {col5 ?
                                                            <i className="bx fs-4 bx-chevron-up"></i> :
                                                            <i className="bx fs-4 bx-chevron-down"></i>
                                                        }
                                                    </div>
                                                </div>

                                                <Collapse isOpen={col5} className="">
                                                    <div className=" mt-2 message-list">
                                                        <div class="form-check mb-2">
                                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault12" />
                                                            <label class="form-check-label" for="flexCheckDefault12">
                                                                Exclud 10 Invalid Contacts from this broadcast
                                                            </label>
                                                        </div>

                                                        <div class="form-check">
                                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked13" />
                                                            <label class="form-check-label" for="flexCheckChecked13">
                                                                Always exclude invalid contacts from broadcast
                                                            </label>
                                                        </div>
                                                    </div>

                                                    {/* <div className="alert alert-warning mt-3" role="alert">
                                                        <div className="text-center">
                                                            would you like to delete 10 invalid contact from yor list?
                                                        </div>
                                                    </div> */}

                                                    <Alert
                                                        color="warning"
                                                        className="alert fade show mt-3 "
                                                        role="alert"
                                                    >
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <i className="mdi mdi-alert-outline me-2"></i>
                                                            would you like to delete 10 invalid contact from your list?
                                                            <button type="button" className="btn btn-outline-primary ms-3">Yes Delete</button>
                                                        </div>
                                                    </Alert>
                                                </Collapse>
                                            </div>
                                        </div>

                                        <div className="card rounded-3 card_bg">
                                            <div className="card-body">
                                                <div className="col-6 mb-3">
                                                    <div className="d-flex gap-2 align-items-center">
                                                        <Input
                                                            id="search"
                                                            name="search"
                                                            type="search"
                                                            placeholder="search..."
                                                            onChange={(e) => handleSeacrhCon(e.target.value)}
                                                        />
                                                        <button type="button" className="btn btn-outline-primary ms-1  ">
                                                            <i className="fs-5 bx bx-filter-alt"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="broad_cardTable">
                                                    <div className="table-responsive rounded" style={{ maxHeight: '267px' }}>
                                                        <Table className="table table-borderless mb-0">
                                                            <thead className="border-bottom">
                                                                <tr>
                                                                    <th onClick={() => contactData?.filter(e => selectContact.includes(e?.mobile))?.length == contactData?.length ? setSelectContact([]) : setSelectContact(contactData?.map(e => e?.mobile))}><input type="checkbox" checked={contactData?.filter(e => selectContact.includes(e?.mobile))?.length == contactData?.length} className="form-check-input me-1 " style={{ cursor: 'pointer' }} /> Name</th>
                                                                    <th className="text-center">Phone</th>
                                                                    <th className="text-center">Allow broadcast</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {contactData?.length > 0 ?
                                                                    contactData?.map((data, i) => (
                                                                        <tr key={i}>
                                                                            <td onClick={() => setSelectContact((p) => p?.includes(data?.mobile) ? p?.filter(e => e != data?.mobile) : [...p, data?.mobile])}><input type="checkbox" checked={selectContact?.includes(data?.mobile)} className="form-check-input me-1" />{data?.name}</td>
                                                                            <td className="text-center">{data?.mobile}</td>
                                                                            <td className="text-center"><span className="text-success">TRUE <i className="mdi mdi-check"></i></span></td>
                                                                        </tr>
                                                                    ))
                                                                    : <div></div>
                                                                }
                                                            </tbody>
                                                        </Table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="">
                                            <Label htmlFor="ddd">What Message do you want to send it?</Label>
                                        </div>
                                        <div className="card rounded-3 card_bg">
                                            <div className="card-body">

                                                <div className="form-check form-radio-outline form-radio-primary mb-3">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="exampleRadios"
                                                        id="exampleRadios1"
                                                        value="Send"
                                                        defaultChecked
                                                        onChange={(e) => setSend(e.target.value)}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="exampleRadios1"
                                                    >
                                                        Send now
                                                    </label>
                                                </div>

                                                <div className="form-check form-radio-outline form-radio-primary mb-3">
                                                    <input
                                                        className="form-check-input"
                                                        type="radio"
                                                        name="exampleRadios"
                                                        id="exampleRadios2"
                                                        value="time"
                                                        onChange={(e) => setSend(e.target.value)}
                                                    />
                                                    <label
                                                        className="form-check-label"
                                                        htmlFor="exampleRadios2"
                                                    >
                                                        Schedule for a specific time
                                                    </label>
                                                </div>

                                                {
                                                    send == 'time' ?
                                                        <div className="col-sm-6">
                                                            <div className="docs-datepicker">
                                                                <FormGroup className="mb-3">
                                                                    <Label htmlFor="">Date</Label>
                                                                    <InputGroup>
                                                                        {/* <Flatpickr
                                                                            ref={flatpickrRef}
                                                                            // id="DataPicker"
                                                                            value={pick_date}
                                                                            send="form-control d-block"
                                                                            placeholder="Pick a date"
                                                                            options={{
                                                                                altInput: true,
                                                                                allowInput: true,
                                                                                enableTime: true,
                                                                                minTime: '01:00',
                                                                                dateFormat: "Y-m-d H:i K",
                                                                            }}
                                                                            
                                                                            // onChange={(p) => {
                                                                            //     console.log('kkkkkkk', p);
                                                                            // }}
                                                                        /> */}
                                                                        <DatePicker
                                                                            selected={pick_date}
                                                                            onChange={(date) => setPickDate(date)}
                                                                            timeInputLabel="Time:"
                                                                            dateFormat="MM/dd/yyyy h:mm aa"
                                                                            showTimeInput
                                                                            className="form-control d-block p-2  w-100" 
                                                                            // customInput={<CustomDateinput  ids={'t_date'} />}
                                                                            isClearable={true}
                                                                            minDate={new Date}
                                                                            placeholder='Pick a date'
                                                                        />
                                                                        {/* <div className="input-group-append" role="button" onClick={() => picks()}>
                                                                            <span className="input-group-text">
                                                                                <i className="mdi mdi-calendar-month-outline" />
                                                                            </span>
                                                                        </div> */}
                                                                    </InputGroup>
                                                                </FormGroup>
                                                            </div>

                                                            {/* <div>
                                                                <FormGroup className="mb-3">
                                                                    <Label>Time (GMT +5:30)</Label>
                                                                    <InputGroup>
                                                                        <Flatpickr
                                                                            className="form-control d-block"
                                                                            placeholder="Select time"
                                                                            options={{
                                                                                enableTime: true,
                                                                                noCalendar: true,
                                                                                dateFormat: "H:i",
                                                                            }}
                                                                        />
                                                                        <div className="input-group-append">
                                                                            <span className="input-group-text">
                                                                                <i className="mdi mdi-clock-outline" />
                                                                            </span>
                                                                        </div>
                                                                    </InputGroup>
                                                                </FormGroup>
                                                            </div> */}
                                                        </div> : ''
                                                }
                                            </div>
                                        </div>
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

                            <Col xl={4} className="d-flex justify-content-center">
                                <div className="page">
                                    <div className="marvel-device nexus5">
                                        <div className="top-bar"></div>
                                        <div className="sleep"></div>
                                        <div className="volume"></div>
                                        <div className="camera"></div>
                                        <div className="screen">
                                            <div className="screen-container">
                                                <div className="status-bar">
                                                    <div className="time">{moment(new Date()).format('H:mm a')}</div>
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
                                                            <div className="conversation-container">

                                                                <div className=" mt-2 mb-3 p-2 rounded-3 received bage badge-soft-info">
                                                                    <span id="random"><i className="bx bxs-error-circle fs-5"></i> This Bussiness used Secure service from Meta to message this chat. Tap to learn more</span>
                                                                    <span className="metadata"><span className="time"></span></span>
                                                                </div>

                                                                <div className=" message received ">
                                                                    {
                                                                        broadTitle != 'none' && broadTitle != 'text' ?
                                                                            <div className="mb-2">
                                                                                <img src={broadTitle == 'image' ? prefile ?? Noimg : broadTitle == 'video' ? Novid : Nodocs} onError={(e) => e.currentTarget.src = { Noimg }} className="buss_img" />
                                                                            </div> : ''
                                                                    }


                                                                    {
                                                                        mesageTemp?.components?.length ?
                                                                            mesageTemp?.components?.map((data, i) =>
                                                                                data?.type == "HEADER" ? (
                                                                                    <div className="mb-2" key={i}>
                                                                                        <h6>{data?.text}</h6>
                                                                                    </div>
                                                                                ) : data?.type == "BODY" ?
                                                                                    <div className="mb-3" key={i}>
                                                                                        <span className="fw lh-base">{data?.text}</span>
                                                                                    </div> : data?.type == "FOOTER" ?
                                                                                        <div className="mb-3 d-flex flex-wrap justify-content-between align-items-center" key={i}>
                                                                                            <span className="lh-base text-muted text-wrap">{data?.text}</span>
                                                                                            <span className="text-muted">{moment(new Date()).format('H:mm')}</span>
                                                                                        </div> : data?.type == "BUTTONS" ?
                                                                                            data?.buttons?.map((val, k) => (
                                                                                                <div className="text-center" key={k}>
                                                                                                    {
                                                                                                        val?.type == "PHONE_NUMBER" ?
                                                                                                            <p className="text-primary"><i className="bx bx-phone"></i> {val?.text}</p> : ''
                                                                                                    }
                                                                                                    {
                                                                                                        val?.type == "QUICK_REPLY" ?
                                                                                                            <p className="text-primary"> <i className="bx bx-copy"></i> {val?.text}</p> : ''
                                                                                                    }

                                                                                                    {
                                                                                                        val?.type == "COPY_CODE" ?
                                                                                                            <p className="text-primary"> <i className="bx bx-copy"></i>Copy offer code</p> : ''
                                                                                                    }

                                                                                                    {
                                                                                                        val?.type == "URL" ?
                                                                                                            <p className="text-primary"> <i className="bx bx-link-external"></i> {val?.text}</p> : ''
                                                                                                    }

                                                                                                </div>
                                                                                            ))

                                                                                            : ''
                                                                            )
                                                                            : ''
                                                                    }

                                                                    {/* {
                                                                        mesageTemp?.components?.length > 2 ?
                                                                            <div role="button" onClick={() => setMoreBtn(true)} >
                                                                                <p className="text-primary cursor_pointer d-flex align-items-center gap-1" ><i className="bx bx-list-ul"></i> See all options</p>
                                                                            </div>
                                                                            : ''
                                                                    } */}

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
                                                                                mesageTemp?.components?.map((data, i) =>
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

                            <Col lg={8}>
                                <div className="text-end mb-4">
                                    <Button type="submit" disabled={btnLoader} color="primary" >
                                        {
                                            btnLoader ?
                                                <>
                                                    <i className="bx bx-loader bx-spin font-size-16 align-middle me-2"></i>{" "}
                                                    Loading
                                                </> : 'Add BroadCast'
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

// export default BroadcastCreate;
export default withRouter(BroadcastCreate);

BroadcastCreate.propTypes = {
    history: PropTypes.object,
};
