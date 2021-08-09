import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { Redirect, useLocation } from "react-router-dom";
import { passwordReset } from '../../actions/auth';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import "./Login.css";

const Reset = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState("");

  const [errors, setErrors] = useState({ name: '' });

  const search = useLocation().search;
  const token = new URLSearchParams(search).get('token');
  const uidb64 = new URLSearchParams(search).get('uidb64');
  
  const history = useHistory();

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const validate = () => {
    let input = state;
    let formIsValid = true;
    let errors = {};
    if (!input["password"]) {
      formIsValid = false;
      errors["password"] = "Password cannot be empty"
    }
    if (!input["confirm_password"]) {
      formIsValid = false;
      errors["confirm_password"] = "Confirm Password cannot be empty";
    }

    if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {
      if (input["password"] !== input["confirm_password"]) {
        formIsValid = false;
        errors["confirm_password"] = "Password doesn't match"
      }
    }
    setErrors({ errors });
    return formIsValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      let newData = state;
      newData["token"] = token;
      newData["uidb64"] = uidb64;
      delete newData["confirm_password"];
      dispatch(passwordReset(state))
      .then(() => {
        message.success('Password reset Successfully')
        history.push("/login");
      });
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
            type="password"
            className="un"
            value={state.password}
            placeholder="Password"
            onChange={handleChange}
          />
          <div className="errorMsg">{errors && errors.errors && errors.errors.password}</div>
        </Form.Item>

        <Form.Item label="Confirm Password" name="confirm_password">
          <Input
            style={{ borderRadius: "8px" }}
            name="confirm_password"
            type="password"
            className="un"
            value={state.confirm_password}
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          <div className="errorMsg">{errors && errors.errors && errors.errors.confirm_password}</div>
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
