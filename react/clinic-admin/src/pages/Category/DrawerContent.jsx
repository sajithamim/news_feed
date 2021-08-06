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
  const [errors, setErrors] = useState({ title: '' });

  useEffect(() => {
    setState(props.editData)
    if(props.editData.image && props.editData.image){
      setImgData(props.editData.image);
    }
  }, [props.editData , props.editData.image])

  const [previewTitle, setPreviewTitle] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);

  const handleCancel = () => setPreviewVisible(false);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  };

  const handleFileChange = (info) => {
    setImage(info.target.files[0]);
    const imageFile = info.target.files[0];
    const newErrorsState = { ...errors };
    if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
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

    const handleSubmit = (e) => {
      if (formValidation()) {
        setErrors({});
        let newData = state;
        const id = state.id;
        let form_data = null;
        console.log('image.name', image.name)
        if (image && image.name) {
          form_data = new FormData();
          form_data.append('image', image, image.name);
        }
        
        if (props.drawerType === 'edit') {
          delete newData["sl_no"];
          delete newData["id"];
          delete newData["image"];
          
          dispatch(updateCategory(id, newData, form_data))
            .then(() => {
              message.success('Category edited successfully')
            });
        }
        else {
          console.log("hghhg");
          dispatch(postCategory(state, form_data))
          .then(() => {
            setState({});
            message.success('Category added successfully')
          });
        }
      }
    }

    const formValidation = () => {
      let entities = state;
      const newErrorsState = { ...errors };
      if (!entities["title"]) {
        newErrorsState.title = 'Name cannot be empty';
        setErrors(newErrorsState);
        return false;
      }
      setErrors({});
      return true;
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
              <div className="errorMsg">{errors.title}</div>
            </Form.Item>

            <Form.Item label="Image">
              {imgData ? (<img className="playerProfilePic_home_tile" width="128px" height="128px" alt={imgData} src={imgData} />) : null}
              <Input type="file"
                id="image"
                accept="image/png, image/jpeg" onChange={handleFileChange} />
              <div className="errorMsg">{errors.image}</div>
            </Form.Item>
          </div>
        </div>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" >
            Save
          </Button>
        </Form.Item>
      </Form>
    );
  };

  export default DrawerContent;
