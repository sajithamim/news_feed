import React, { useState } from "react";
import { Input, Button } from "antd";
import { useHistory } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const signin = (e) => {
    const loginData = {
      email: username,
      password: password,
    };
    if (loginData.email && loginData.password) {
      history.push("/data");
    }
  };

  return (
    <div className="main">
      <div className="sign">Login</div>
      <div style={{ marginTop: "15px" }}>
        <p>Username</p>
        <Input
          style={{ borderRadius: "8px" }}
          className="un"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
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
        <Button type="primary" onClick={signin}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
