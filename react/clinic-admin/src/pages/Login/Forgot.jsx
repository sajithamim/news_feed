import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postRequestEmail } from "../../actions/auth.js"
import "./Login.css";
import { SelectionState } from "draft-js";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState({});
  const [loading, setLoading] = useState("");

  const dispatch = useDispatch();
  const { error } = useSelector(state => state.auth);

  const onChange = (e) => {
    // setState({ ...state, email: e.target.value, redirect_url: `${process.env.REACT_APP_API_BASE_URL}/reset_password` })
    setState({ ...state, email: e.target.value, redirect_url: `http://localhost:3000/reset_password/?token_valid=True&message=Credentials%20Valid&uidb64=MjA&token=ar4dcq-c5ef869aa3b81071cf6e8e9767d136f0` })
  };

  const sendEmail = () => {
    setLoading(true);
    dispatch(postRequestEmail(state))
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
          <div className="sign">Forgot Password</div>

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
              onChange={onChange}
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

export default Forgot;
