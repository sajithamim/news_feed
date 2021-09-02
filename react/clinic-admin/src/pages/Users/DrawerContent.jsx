import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { Form, Button, Input, Modal, message, DatePicker, Tabs, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import "./Users.css";
import Select from 'react-select';
import { postPublicationDetails, getUserCategory, getUserSpecialization, getUserDetails, postUserProfile, getUserProfile, getQualifications, putProfilePic } from "../../actions/users";
import { postCategory } from "../../actions/category";
import { updateCategory } from "../../actions/category";
import moment from 'moment';
const publisher = [];


const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const { TextArea } = Input;
const { TabPane } = Tabs;
const customStyles = {
    control: () => ({
        marginLeft: '50px',
        width: 200,
    }),
}
const DrawerContent = (props) => {

    const dispatch = useDispatch();

    const [state, setState] = useState();
    const [errors, setErrors] = useState({});

    const handleAuthorChange = (e) => {
        const items = [];
        if (e.target.name === 'authors') {
            items.push(e.target.value.split(",").toString())
        }
        setState({ ...state, authors: items })

    }
    const onDateChange = (value, dateString) => {
        setState({ ...state, publicationdate: dateString })
    }
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value, user: props.user_id })
    };

    const formValidation = () => {
        let fields = state;
        let errors = {};
        let formIsValid = true;
        if (!fields["title"]) {
            formIsValid = false;
            errors["title"] = "Title is required";
        }
        if (!fields["publisher"]) {
            formIsValid = false;
            errors["publisher"] = "Publisher is required";
        }

        if (!fields["publication_url"]) {
            formIsValid = false;
            errors["publication_url"] = "Publisher url is required";
        }
        if (!fields["description"]) {
            formIsValid = false;
            errors["description"] = "Description is required";
        }
        setErrors({ errors });
    return formIsValid;
    }
    const handleSubmit = () => {
        if (formValidation()) {
            setErrors({});
            let form_data = null;
        }
        dispatch(postPublicationDetails(state))
        .then((res) => {
            message.success("Publication Details added succesfully");
        })
    }

    return (
        <Form name="basic"
            labelCol={{
                span: 5,
            }}
            wrapperCol={{
                span: 10,
            }} onFinish={handleSubmit}>

            <Form.Item label="Title">
                <Input name="title" className="form-control" type="text" onChange={handleChange} />
                <div className="errorMsg">{errors && errors.errors && errors.errors.title}</div>
            </Form.Item>
            <Form.Item label="Publisher">
                <Input name="publisher" className="form-control" type="text" onChange={handleChange} />
                <div className="errorMsg">{errors && errors.errors && errors.errors.publisher}</div>
            </Form.Item>
            <Form.Item label="Author">
                <Input name="authors" className="form-control" type="text" onChange={handleAuthorChange} />
            </Form.Item>
            <Form.Item label="Publication Date" >
                <Space direction="vertical" size={30} style={{ marginLeft: '50px', width: '450px' }} >
                    <DatePicker name="publicationdate" onChange={onDateChange} format={dateFormat} />
                </Space>
                
            </Form.Item>
            <Form.Item label="Image">
                {/* {imgData ? (<img className="playerProfilePic_home_tile" style={{ marginLeft: '50px' }} width="128px" height="128px" alt={imgData} src={imgData} />) : null} */}
                <Input type="file"
                    id="image"
                    name="image"
                    accept="image/png, image/jpeg" onChange="" style={{ marginLeft: '50px' }} />
            </Form.Item>
            <Form.Item label="Publication URL">
                <Input name="publication_url" className="form-control" type="text" onChange={handleChange} />
                <div className="errorMsg">{errors && errors.errors && errors.errors.publication_url}</div>
            </Form.Item>
            <Form.Item label="Description">
                <TextArea name="description" addonAfter="description" rows={4} wrapperCol={{ span: 7 }} onChange={handleChange} style={{ marginLeft: '47px' }} />
                <div className="errorMsg">{errors && errors.errors && errors.errors.description}</div>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
                <Button type="primary" htmlType="submit" >Save</Button>
            </Form.Item>
        </Form>
    );
};

export default DrawerContent;
