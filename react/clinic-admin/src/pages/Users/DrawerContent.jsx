import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { Form, Button, Input, Modal, message, DatePicker, Tabs, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import "./Users.css";
import Select from 'react-select';
import { getUserCategory, getUserSpecialization, getUserDetails, postUserProfile, getUserProfile, getQualifications, putProfilePic } from "../../actions/users";
import { postCategory } from "../../actions/category";
import { updateCategory } from "../../actions/category";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { TabPane } = Tabs;
const customStyles = {
    control: () => ({
        marginLeft: '50px',
        width: 200,
    }),
}
const DrawerContent = (props) => {

    // const { userCategory, userSpec, userDetails, qualifications } = useSelector(state => state.users);
    // const [otherQualification, setOtherQualification] = useState({ name: '' });
    const [activeInput, setActiveInput] = useState(false);

    const dispatch = useDispatch();

    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    const [image, setImage] = useState("");
    const [imgData, setImgData] = useState(props.editData.image);

    const [state, setState] = useState(props.editData);
    const [errors, setErrors] = useState({ title: '' });

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
      };

    const handleSubmit = () => {
        console.log(state);

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
                <Input name="publisher" className="form-control" type="text" onChange={handleChange}/>
            </Form.Item>
            <Form.Item label="Publication Date" >
                <Space direction="vertical" size={15} style={{ marginLeft: '50px' , width: '390px'}} >
                    <RangePicker onChange="" />
                </Space>
            </Form.Item>
            <Form.Item label="Publication URL">
                <Input name="publication URL" className="form-control" type="text" onChange={handleChange} />
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
