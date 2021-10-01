import React, { useEffect, useState, useRef } from "react";
import { Form, Button, Input, Modal, message } from "antd";
import { useDispatch } from "react-redux";
import "./Drawer.css";
import { postCategory, updateCategory } from "../../actions/category";

const DrawerContent = (props) => {
  const ref = useRef();
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const [imgData, setImgData] = useState(props.editData.image);
  const [state, setState] = useState(props.editData);
  const [errors, setErrors] = useState({});
  const [formSubmit, setFormSubmit] = useState(false);

  useEffect(() => {
    setState(props.editData);
    setErrors({});
    if (props.drawerType === 'edit' && props.editData.image && props.editData.image) {
      setImgData(props.editData.image);
    }
    else {
      setState({});
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
    console.log("ref",ref);
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
        ref.current.props.name = "";
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
    <Form labelCol={{ span: 8 }} wrapperCol={{ span: 10 }} onFinish={handleSubmit}>
      <div>
        <div className="modalStyle">
          <Form.Item label="Name">
            <Input name="title" onChange={handleChange} value={state.title} />
            <div className="errorMsg">{errors && errors.errors && errors.errors.title}</div>
          </Form.Item>

          <Form.Item label="Image">
            {imgData ? (<img className="playerProfilePic_home_tile" alt={imgData} src={imgData} />) : null}
            <Input type="file" name="image" accept="image/png, image/jpeg" onChange={handleFileChange} ref={ref} />
            <div className="errorMsg">{errors && errors.errors && errors.errors.image}</div>
          </Form.Item>
        </div>
      </div>
      <Form.Item wrapperCol={{ offset: 10, span: 3 }}>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DrawerContent;
