import React, { useEffect, useState } from "react";
import { Form, Input, Button, Radio, message } from "antd";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./Drawer.css";

const DrawerContent = (props) => {
  const [state, setState] = useState(props.editData);

  const [errors, setErrors] = useState({ name: '' });

  const [imgData, setImgData] = useState("");

  const [image, setImage] = useState("");

  const [formSubmit, setFormSubmit] = useState(false);
  
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  };

  const handleFileChange = () => {

  }

  const radioOnChange = (status , e) => {
    // const status;
    status = e.target.value ; 
    console.log("STATUS", status);
    setState({ ...state, active: status === '1' ? true : false })
  }
  const handleSubmit = () => {
    
    console.log("state", state);
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
            <Input id="spec_name" name="name" onChange={handleChange} value={state.name} />
            <div className="errorMsg">{errors.name}</div>
          </Form.Item>
          <Form.Item label="Name">
          <Input type="file"
              id="image"
              name="image"
              accept="image/png, image/jpeg" onChange={handleFileChange} style={{ marginLeft: '50px' }} />
          </Form.Item>
          <Form.Item label="Name" wrapperCol={{ offset: 2, span: 14 }}>
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
