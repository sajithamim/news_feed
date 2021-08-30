import React, { useEffect, useState } from "react";
import { Form, Input, Button, Radio, message } from "antd";
import { useDispatch } from "react-redux";
import { postGeneralAdvertisement } from "../../actions/genAds";
import "./Drawer.css";

const DrawerContent = (props) => {
  
  const [state, setState] = useState(props.editData);

  const [errors, setErrors] = useState({ name: '' });

  const [imgData, setImgData] = useState("");

  const [image, setImage] = useState("");

  const [formSubmit, setFormSubmit] = useState(false);
 
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    setState(props.editData)
    console.log("statattprops",props);
  }, [ props.editData ])

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  };

  const handleFileChange = (info) => {
    setImage(info.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setState({ ...state, image: reader.result })
    });
    reader.readAsDataURL(info.target.files[0]);
  }

  const radioOnChange = (status , e) => {
    status = e.target.value ; 
    setState({ ...state, active: status === '1' ? true : false })
  }

  const handleSubmit = (e) => {
    let form_data = null;
    if(image && image.name) {
      form_data = new FormData();
      form_data.append('addimage', image, image.name);
    }
    dispatch(postGeneralAdvertisement(state , form_data))
    .then(() => {
      message.success("Advertisement addedd successfully");
    })
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
            <Input id="title" name="title" onChange={handleChange} value= {state.title} />
            <div className="errorMsg">{errors.url}</div>
          </Form.Item>
          <Form.Item label="URL">
            <Input id="url" name="url" onChange={handleChange} />
            <div className="errorMsg">{errors.url}</div>
          </Form.Item>
          <Form.Item label="Image">
          <Input type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg" onChange={handleFileChange} style={{ marginLeft: '50px' }} />
          </Form.Item>
          <Form.Item label="Status" wrapperCol={{ offset: 2, span: 14 }}>
          <Radio.Group onChange={(e) => radioOnChange('status', e)} value="">
              <Radio value="1">
                Enable 
              </Radio>
              <Radio value="2">
                Disable
              </Radio>
            </Radio.Group>
          </Form.Item>
        </div>
      </div>
      <Form.Item
        wrapperCol={{
          offset: 7
        }}
      >
        <Button type="primary" htmlType="submit" style={{ marginLeft: '21px' }}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DrawerContent;
