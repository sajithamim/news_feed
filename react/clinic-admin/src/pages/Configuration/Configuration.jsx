import React, { useEffect, useState } from "react";
import "./Configuration.css";
import { Form, Button, Input, Modal, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { postConfiguration } from "../../actions/Config";

const Configuration = (props) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({ name: '' });

  // const formValidation = () => {
  //   let entities = state;
  //   const newErrorsState = { ...errors };
  //   if (!entities["name"]) {
  //     newErrorsState.name = 'Name cannot be empty';
  //     setErrors(newErrorsState);
  //     return false;
  //   }
  //   return true;
  // }
  const handleSubmit = (name) => {
    // if (formValidation()) {
      console.log("name", name);
      // setErrors({});
      dispatch(postConfiguration(name))
        // .then((res) => {
        //   setState({});
        //   message.success("Configuration added succesfully");
        // })

    // }
  }
  const handleChange = (e) => {
    console.log("e.target.value",e.target.value);
    setName(e.target.value)
  };
  return (
    <Form labelCol={{ span: 3 }} wrapperCol={{ span: 6 }} onFinish={handleSubmit}>
      <div>
        <div className="modalStyle">
          <div className="configStyle">
            <Form.Item label="Ads showing interval">
              <Input name="name" onChange={handleChange} value={name} />
              <div className="errorMsg">{errors.name}</div>
            </Form.Item>
          </div>
        </div>
      </div>
      <Form.Item wrapperCol={{ offset: 4, span: 3 }} >
        <div className="configSaveBtn">
          <Button type="primary" htmlType="submit" >
            Save
          </Button>
        </div>

      </Form.Item>
    </Form>
  );
};
export default Configuration