import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";

const Reset = () => {
  const [email , setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading , setLoading] =useState("");
  let history = useHistory();

  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth);
  
  const sendEmail = (e) => {
    setLoading(true);
    
  };


  
  const validateMessages = {
    required: "'${label}' is required!",
    types: {
      email: "'${label}' is not a valid email!",
    },
  };

  return (
    <>
    {error ? (<Alert type="error" message={error} banner closable />) : null}
    <Form onFinish={sendEmail} layout="vertical" validateMessages={validateMessages}>
      <div className="main">
      <div className="sign">Reset Password</div>
    
        <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            type: 'password',
          },
        ]}
      >
        <Input
          style={{ borderRadius: "8px" }}
          className="un"
          value={email}
          placeholder="password"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confrimpassword"
        rules={[
          {
            required: true,
            type: 'password',
          },
        ]}
      >
        <Input
          style={{ borderRadius: "8px" }}
          className="un"
          value={email}
          placeholder="Confirm Password"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>
           <div className="submit">
        <Button type="primary" htmlType="submit" disabled={loading}>
          Submit
        </Button>
      </div>
    </div>
    </Form>
    </>
  );
};

export default Reset;
