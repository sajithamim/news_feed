import React, { useEffect, useState } from "react";
import { Form, Input, Button, Radio, message } from "antd";
import { useDispatch } from "react-redux";
import { postGeneralAdvertisement, updateGeneralAdvertisment } from "../../actions/genAds";
import "./Drawer.css";

const DrawerContent = (props) => {
  const [state, setState] = useState(props.editData);

  const [errors, setErrors] = useState({ name: '' });

  const [image, setImage] = useState();

  const [formSubmit, setFormSubmit] = useState(false);

  const [imgData, setImgData] = useState(props.editData.image);


  const dispatch = useDispatch();

  useEffect(() => {
    setState(props.editData)
    setErrors({});
    if (props.editData.image && props.editData.image) {
      setImgData(props.editData.image);
    } else {
      setImgData("");
      setImage("");
    }
  }, [props.editData, props.editData.image])

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  };

  const handleFileChange = (info) => {
    setImage(info.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImgData(reader.result);
    });
    reader.readAsDataURL(info.target.files[0]);
  }

  const radioOnChange = (val, e) => {
    setState({ ...state, active: e.target.value })
  }

  const formValidation = () => {
    let fields = state;
    let errors = {};
    let formIsValid = true;
    if (!fields["title"]) {
      formIsValid = false;
      errors["title"] = "Title is required";
    }
    if (!fields["url"]) {
      formIsValid = false;
      errors["url"] = "URL is required";
    } else{
      var myUrl = fields.url;
            var res = myUrl.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
            if (res === null) {
              formIsValid = false;
              errors["url"] = "Enter a valid URL";
            }
    }
    if (props.drawerType === 'add' && image.name === undefined) {
      formIsValid = false;
      errors["image"] = "Image is required"
    }
    if (fields.active === undefined) {
      formIsValid = false;
      errors["status"] = "Status is required"
    }
    setErrors({ errors });
    return formIsValid;
  }

  const handleSubmit = (e) => {
    const id = state.id
    if (formValidation()) {
      let form_data = null;
      if (image && image.name) {
        form_data = new FormData();
        form_data.append('addimage', image, image.name);
      }
      if (props.drawerType === "add") {
        dispatch(postGeneralAdvertisement(state, form_data))
          .then(() => {
            message.success("Advertisement added successfully");
          })
      }else {
        const newData = state;
        delete newData["sl_no"]; 
        delete newData["image"];
        delete newData["id"];
        console.log("adverti edit" , state)
        dispatch(updateGeneralAdvertisment(id, newData, form_data ))
        .then(() => {
          message.success("Advertisement edit successfully")
        }
        )
      }
    }
  }

  return (
    <Form name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 10,
      }} onFinish={handleSubmit}>
      <div>
        <div className="modalStyle">
          <Form.Item label="Name">
            <Input id="title" name="title" onChange={handleChange} value={state.title} />
            <div className="errorMsg">{errors && errors.errors && errors.errors.title}</div>
          </Form.Item>
          <Form.Item label="URL">
            <Input id="url" name="url" onChange={handleChange} value={state.url} />
            <div className="errorMsg">{errors && errors.errors && errors.errors.url}</div>
          </Form.Item>
          <Form.Item label="Image">
            {imgData ? (<img className="playerProfilePic_home_tile" alt={imgData} src={imgData} />) : null}
            <Input type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg" onChange={handleFileChange} style={{ marginLeft: '50px' }} />
            <div className="errorMsg"   >{errors && errors.errors && errors.errors.image}</div>
          </Form.Item>

          <Form.Item label="Status" wrapperCol={{ offset: 2, span: 14 }}>
            <Radio.Group onChange={(e) => radioOnChange('status', e)} value={state.active}>
              <Radio value={true}>
                Enable
              </Radio>
              <Radio value={false}>
                Disable
              </Radio>
            </Radio.Group>
            <div className="errorMsg">{errors && errors.errors && errors.errors.status}</div>
          </Form.Item>
        </div>
      </div>
      <Form.Item
        wrapperCol={{
          offset: 7
        }}
      >
        <Button id="btn" type="primary" htmlType="submit" >
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DrawerContent;
