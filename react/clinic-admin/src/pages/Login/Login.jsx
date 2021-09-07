import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth.js"
import { Link } from 'react-router-dom';
import "./Login.css";

const Login = () => {
  const [email , setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading , setLoading] =useState("");
  let history = useHistory();

  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth);
  const accessToken = localStorage.getItem("accessToken");
  const signin = (e) => {
    setLoading(true);
    dispatch(login(email,password))
  };

  if(window.navigator.onLine == true){
    if (accessToken && accessToken !== undefined) {
      history.push("/data");
    }
  }
  else 
   history.push("/noconnection");
  

  const validateMessages = {
    required: "'${label}' is required!",
    types: {
      email: "'${label}' is not a valid email!",
    },
  };

  return (
    <>
    {error ? (<Alert type="error" message={error} banner closable />) : null}
    <Form onFinish={signin} layout="vertical" validateMessages={validateMessages}>
      <div className="main">
      <div className="sign">Login</div>
    
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
          style={{ borderRadius: "8px" , marginLeft: '2px'}}
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
      <Form.Item wrapperCol={{ offset:8, span: 10 }}><Link to={"/forgot_password"} style={{ alignItems: "center" }}>Forgot Password</Link></Form.Item>
    </div>
    </Form>
    </>
  );
};

export default Login;
