import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import { SelectionState } from "draft-js";

const Reset = () => {
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ name: '' });


  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }


  const validate = () => {
    console.log("state" , state);
    let input = state;
    const newErrorsState = { ...errors };
    if (!input["password"]) {
      console.log("Password cannot be empty");
      newErrorsState.name = 'Password cannot be empty';
      setErrors(newErrorsState);
      return false;
    }
    if (!input["confirm_password"]) {
      console.log("confirmPassword cannot be empty");
      newErrorsState.name = "Confirm Password cannot be empty";
      setErrors(newErrorsState);
      return false;
    }
    
    if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {
      if (input["password"] != input["confirm_password"]) {
       console.log("Password didnt match")
      }
    }
    return true;
  };

  const handleSubmit = () => {
    console.log("handle submit");
    if (validate()) {
      setErrors({});
    }

  }

  return (
    <Form name="basic" onFinish={handleSubmit} layout="vertical" validateMessages={validate}>
      <div className="main">
        <div className="sign">Reset Password</div>
        <Form.Item label="Password" name="password" >
          <Input
            style={{ borderRadius: "8px" }}
            name="password"
            className="un"
            value={password}
            placeholder="Password"
            onChange={handleChange}
          />
          {/* <div className="errorMsg">{errors.name}</div> */}
        </Form.Item>

        <Form.Item label="Confirm Password" name="confirm_password">
          <Input
            style={{ borderRadius: "8px" }}
            name="confirm_password"
            className="un"
            value={confirmpassword}
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          {/* <div className="errorMsg">{errors.name}</div> */}
        </Form.Item>

        <div className="submit">
          <Button type="primary" htmlType="submit" >
            Submit
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default Reset;
