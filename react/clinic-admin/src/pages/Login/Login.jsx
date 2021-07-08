import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth.js"
import "./Login.css";

const Login = () => {
  const [email , setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading , setLoading] =useState("");
  let history = useHistory();
  const dispatch = useDispatch();
  const { user, userErr } = useSelector(state => state.auth);
 // console.log('userrr', userErr);
  const signin = (e) => {
    setLoading(true);
    dispatch(login(email,password))
    .then((res) => {
      res && res.success && res.success == "True" ? history.push("/data") : message.error(res);
      setLoading(false);
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  };

  return (
    <Form onFinish={signin} layout="vertical" validateMessages={validateMessages}>
      <div className="main">
      <div className="sign">Login</div>
      {/* <div style={{ marginTop: "15px" }}>
        <p>Username</p> */}
        <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            type: 'email',
          },
        ]}
      >
        <Input
          style={{ borderRadius: "8px" }}
          className="un"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input
          style={{ borderRadius: "8px" }}
          className="pass"
          value={password}
          type="password"
          placeholder="Password"
          rules={[{ required: true, message: 'Please input your password' }]}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <div className="submit">
        <Button type="primary" htmlType="submit" disabled={loading}>
          Login
        </Button>
      </div>
    </div>
    </Form>
  );
};

export default Login;
