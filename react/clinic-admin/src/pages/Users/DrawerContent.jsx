import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { Form, Button, Input, Modal, message, DatePicker, Tabs, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import "./Users.css";
import Select from 'react-select';
import { postPublicationDetails, updatePublicationDetails } from "../../actions/users";
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
    console.log("props.editData.image", props.editData.image);
    const dispatch = useDispatch();

    const [state, setState] = useState(props.editData);
    const [errors, setErrors] = useState({});

    const [image, setImage] = useState("");
    const [imgData, setImgData] = useState(props.editData.image);

    const [formSubmit, setFormSubmit] = useState(false);
    
    useEffect(() => {
        setState(props.editData);
        if (props.editData.icon && props.editData.icon.startsWith("/media"))
          setImgData(`${process.env.REACT_APP_API_BASE_URL}${props.editData.icon}`);
        else
          setImgData(props.editData.icon);
      }, [props.editData])
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
    const handleFileChange = (info) => {
        setImage(info.target.files[0]);
        const imageFile = info.target.files[0];
        const newErrorsState = { ...errors };
        if (!imageFile.name.match(/\.(jpg|jpeg|png|gif|jfif|BMP|BAT|Exif)$/)) {
            newErrorsState.image = 'Please select valid image.';
            setErrors(newErrorsState);
            setFormSubmit(!formSubmit);
            return false;
        } else {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(info.target.files[0]);
            newErrorsState.image = '';
            setErrors({});
            // setFormSubmit(!formSubmit);
        }
    }

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
        if (props.drawerType === 'add' && image.name === undefined) {
            formIsValid = false;
            errors["image"] = "Image is required"
        }
        if (props.drawerType === 'edit' && props.editData.image === undefined) {
            formIsValid = false;
            errors["image"] = "Image is required"
        }
        setErrors({ errors });
        return formIsValid;
    }
    const handleSubmit = (e) => {
        console.log("props", props);
        const id = state.id
        if (formValidation()) {
            const pub_id = props.editData.id;
            // let newData = state;
            let form_data = null;
            const newErrorsState = { ...errors };
            if (image && image.name) {
                form_data = new FormData();
                form_data.append('image', image, image.name);
            }
            if (props.drawerType === 'add') {
                dispatch(postPublicationDetails(state, form_data))
                    .then((res) => {
                        message.success("Publication Details added succesfully");
                    })
            }
            else {
                const newData = state;
                delete newData["image"];
                delete newData["sl_no"];
                delete newData["id"];
                console.log("public edit", state)
                dispatch(updatePublicationDetails(pub_id, state, form_data))
                    .then(() => {
                        message.success("Publication Details edited succesfully");
                        setState({});
                    })
            }
        }
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
                <Input name="title" className="form-control" value={state.title} type="text" onChange={handleChange} />
                <div className="errorMsg">{errors && errors.errors && errors.errors.title}</div>
            </Form.Item>
            <Form.Item label="Publisher">
                <Input name="publisher" className="form-control" value={state.publisher} type="text" onChange={handleChange} />
                <div className="errorMsg">{errors && errors.errors && errors.errors.publisher}</div>
            </Form.Item>
            <Form.Item label="Author">
                <Input name="authors" className="form-control" value={state.authors} type="text" onChange={handleAuthorChange} />
            </Form.Item>
            <Form.Item label="Publication Date" >
                <Space direction="vertical" size={30} value={state.publicationdate} style={{ marginLeft: '50px', width: '450px' }} >
                    <DatePicker name="publicationdate" onChange={onDateChange} format={dateFormat} />
                </Space>

            </Form.Item>
            <Form.Item label="Image">
                {imgData ? (<img className="playerProfilePic_home_tile" style={{ marginLeft: '50px' }} width="128px" height="128px" alt={imgData} src={imgData} />) : null}
                <Input type="file" id="image" name="image" accept="image/png, image/jpeg" onChange={handleFileChange} style={{ marginLeft: '50px' }} />
                <div className="errorMsg">{errors && errors.errors && errors.errors.image}</div>
            </Form.Item>
            <Form.Item label="Publication URL">
                <Input name="publication_url" className="form-control" value={state.publication_url} type="text" onChange={handleChange} />
                <div className="errorMsg">{errors && errors.errors && errors.errors.publication_url}</div>
            </Form.Item>
            <Form.Item label="Description">
                <TextArea name="description" addonAfter="description" value={state.description} rows={4} wrapperCol={{ span: 7 }} onChange={handleChange} style={{ marginLeft: '47px' }} />
                <div className="errorMsg">{errors && errors.errors && errors.errors.description}</div>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
                <Button type="primary" htmlType="submit" >Save</Button>
            </Form.Item>
        </Form>
    );
};

export default DrawerContent;
