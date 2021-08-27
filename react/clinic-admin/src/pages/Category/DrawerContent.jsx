import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { Form, Button, Input, Modal, message } from "antd";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./Drawer.css";
import { postCategory } from "../../actions/category";
import { updateCategory } from "../../actions/category";



const DrawerContent = (props) => {
  const dispatch = useDispatch();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [image, setImage] = useState("");
  const [imgData, setImgData] = useState(props.editData.image);

  const [state, setState] = useState(props.editData);
  const [errors, setErrors] = useState({});
  const [previewTitle, setPreviewTitle] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);


  useEffect(() => {
    setState(props.editData)
    setErrors({});
    if (props.editData.image && props.editData.image) {
      setImgData(props.editData.image);
    }
    else {
      setImgData("");
      setImage("");
    }
  }, [props.editData, props.editData.image])


  const handleCancel = () => setPreviewVisible(false);

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
    }
  }


  const formValidation = () => {
    let fields = state;
    let errors = {};
    let formIsValid = true;
    let entities = state;
    if (!fields["title"]) {
      formIsValid = false;
      errors["title"] = "Title is required"
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
    console.log("State", image.name);
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
      if (props.drawerType === 'edit') {
        delete newData["sl_no"];
        delete newData["id"];
        delete newData["image"];
        dispatch(updateCategory(id, newData, form_data))
          .then((res) => {
            setState({});
            res != undefined ? (message.success('Category edited successfully')) : (message.error("Category already exists with this name"));
          });
      }
      else {
        dispatch(postCategory(state, form_data))
          .then((res) => {
            setState({});
            res != undefined ? (message.success('Category added successfully')) : (message.error("Category already exists with this name"));
          });
      }
    }
  }


  return (
    <Form name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 10,
      }} onFinish={handleSubmit}>
      <div>
        <div className="modalStyle">
          <Form.Item label="Name">
            <Input name="title" onChange={handleChange} value={state.title} />
            <div className="errorMsg">{errors && errors.errors && errors.errors.title}</div>
          </Form.Item>

          <Form.Item label="Image">
            {imgData ? (<img className="playerProfilePic_home_tile" style={{ marginLeft: '50px' }} width="128px" height="128px" alt={imgData} src={imgData} />) : null}
            <Input type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg" onChange={handleFileChange} style={{ marginLeft: '50px' }} />
            <div className="errorMsg">{errors && errors.errors && errors.errors.image}</div>
          </Form.Item>
        </div>
      </div>
      <Form.Item
        wrapperCol={{
          offset: 10,
          span: 2,
        }}
      >
        <Button type="primary" htmlType="submit" style={{ marginLeft: '-6px' }} >
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DrawerContent;
