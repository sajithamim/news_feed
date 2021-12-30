import React, { useEffect, useState, useRef } from "react";
import { Form, Button, Input } from "antd";
import "./Drawer.css";

const DrawerContent = (props) => {
  const ref = React.useRef();
  const [form] = Form.useForm();
  const [image, setImage] = useState("");
  const [imgData, setImgData] = useState(props.editData.image);
  const [state, setState] = useState(props.editData);
  const [inputKey, setInputKey] = useState('');
  const [errors, setErrors] = useState({});
  const [formSubmit, setFormSubmit] = useState(false);

  useEffect(() => {
    setState(props.editData);
    setErrors({});
    if (props.drawerType === 'edit' && props.editData.image && props.editData.image) {
      setImgData(props.editData.image);
    }
    else {
      setImgData("");
      setImage("");
    }
  }, [props.editData, props.editData.image])

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
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
      setFormSubmit(!formSubmit);
      setInputKey(Date.now());
    }
  }

  const formValidation = () => {
    let fields = state;
    let errors = {};
    let formIsValid = true;
    if (!fields["title"]) {
      formIsValid = false;
      errors["title"] = "Title is required"
    }
    if (image.name === undefined && state.image === undefined) {
      formIsValid = false;
      errors["image"] = "Image is mandatory";
    }
    if (image.name && !image.name.match(/\.(jpg|jpeg|png|gif|jfif|PNG|BAT|Exif|BMP|TIFF)$/)) { 
      formIsValid = false;
      errors["image"] = "Please select valid image.";
    }
    setErrors({ errors });
    return formIsValid;
  }

  const handleSubmit = (e) => {
    if (formValidation()) {
      setErrors({});
      let newData = state;
      const id = state.id;
      let form_data = null;
      const newErrorsState = { ...errors };
      if (image && image.name) {
        form_data = new FormData();
        form_data.append('image', image, image.name);
      }
      else if (props.drawerType === 'add' && image.name === undefined) {
        newErrorsState.image = 'Image cannot be empty';
        setErrors(newErrorsState);
        return false;
      }
        delete newData["sl_no"];
        delete newData["id"];
        delete newData["image"];
        form.resetFields(["image"]);
        props.onFormSubmit(id, state, form_data);
    }
  }
 
 
  return (
    <Form form={form} name="basic" className="categoryForm" labelCol={{ span: 8 }} wrapperCol={{ span: 10 }} initialValues={{ remember: true }} onFinish={handleSubmit}>
      <div>
        <div className="modalStyle">
          <Form.Item label="Name">
            <Input name="title" onChange={handleChange} value={state.title} />
            <div className="errorMsg">{errors && errors.errors && errors.errors.title}</div>
          </Form.Item>
          <Form.Item label="Image">
            {imgData ? (<img className="playerProfilePic_home_tile" alt={imgData} src={imgData} />) : null}
            <Input type="file" name="image" id="uploadFile" accept="image/png, image/jpeg" key={inputKey} onChange={handleFileChange}  />
            <div className="errorMsg">{errors && errors.errors && errors.errors.image}</div>
            <div style={{ marginLeft: '50px',  width:'267px' }}>*Supported File extensions: jpg,jpeg,png </div>
          </Form.Item>
        </div>
      </div>
      <Form.Item wrapperCol={{ offset: 10, span: 3 }}>
        <Button type="primary" htmlType="submit" >
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DrawerContent;
