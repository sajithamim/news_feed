import React, { useEffect, useState } from "react";
import "./Configuration.css";
import { Form, Button, Input, Modal, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getConfiguration, postConfiguration } from "../../actions/Config";
import { getContrastRatio } from "@material-ui/core";

const Configuration = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState("");
  const { getConfigData } = useSelector(state => state.Config);
  console.log("getdata", getConfigData);

  useEffect(() => {
    dispatch(getConfiguration)()
  }, [])
  
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
  const handleChange = (e) => {
    setState({ ...state,  [e.target.name]: e.target.value })
  };
  // const handleSubmit = (name) => {
  //   // if (formValidation()) {
  //     console.log("name", name);
  //     // setErrors({});
  //     // dispatch(postConfiguration(name))
  //       // .then((res) => {
  //       //   setState({});
  //       //   message.success("Configuration added succesfully");
  //       // })

  //   // }
  // }
  
  const handleSubmit = (e) => {
   console.log("state" , state);
   dispatch(postConfiguration(state)) 
  }

  return (
    <Form labelCol={{ span: 3 }} wrapperCol={{ span: 6 }} onFinish={handleSubmit}>
      <div>
        <div className="modalStyle">
          <div className="configStyle">
            <Form.Item label="Ads showing interval">
              <Input name="addaftertopic" onChange={handleChange} value={state.addaftertopic} />
              {/* <div className="errorMsg">{errors.name}</div> */}
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