import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { Form, Button, Input, Modal, message, DatePicker, Tabs, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import "./Users.css";
import Select from 'react-select';
import { postPublicationDetails , getUserCategory, getUserSpecialization, getUserDetails, postUserProfile, getUserProfile, getQualifications, putProfilePic } from "../../actions/users";
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

    const handleAuthorChange = (e) => {
        const items = [];
        if(e.target.name === 'authors'){
            items.push(e.target.value.split(",").toString())
        }
        setState({ ...state, authors: items})
       
    }
    const onDateChange = (value, dateString) => {
        setState({ ...state, publicationdate: dateString})
    }
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value , user: props.user_id })
    };

    const handleSubmit = () => {
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
            </Form.Item>
            <Form.Item label="Publisher">
                <Input name="publisher" className="form-control" type="text" onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Author">
                <Input name="authors" className="form-control" type="text" onChange={handleAuthorChange} />
            </Form.Item>
            <Form.Item label="Publication Date" >
                <Space direction="vertical" size={30} style={{ marginLeft: '50px', width: '450px' }} >
                    <DatePicker name="publicationdate" onChange={onDateChange} format={dateFormat} />
                </Space>
            </Form.Item>
            <Form.Item label="Publication URL">
                <Input name="publication_url" className="form-control" type="text" onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Description">
                <TextArea name="description" addonAfter="description" rows={4} wrapperCol={{ span: 7 }} onChange={handleChange} style={{ marginLeft: '47px' }} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
                <Button type="primary" htmlType="submit" >Save</Button>
            </Form.Item>
        </Form>
    );
};

export default DrawerContent;
