import React, { useState } from "react";
import { Form, Input, Button } from "antd";
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

  const signin = (e) => {
    //console.log('test');
    //e.preventDefault();
    // const loginData = {
    //   email: email,
    //   password: password,
    // };
    setLoading(true);
    dispatch(login(email,password))
    .then(() => {
      history.push("/data");
      window.location.reload();
    })
    .catch(() => {
      setLoading(false);
    })
  };
  

  return (
    <Form onFinish={signin}>
      <div className="main">
      <div className="sign">Login</div>
      <div style={{ marginTop: "15px" }}>
        <p>Username</p>
        <Input
          style={{ borderRadius: "8px" }}
          className="un"
          value={email}
          placeholder="Username"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div style={{ marginTop: "15px" }}>
        <p>Password</p>
        <Input
          style={{ borderRadius: "8px" }}
          className="pass"
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
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
