import React, { useEffect, useState } from "react";
import "./Configuration.css";
import { Form, Button, Input, Modal, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getConfiguration, postConfiguration, updateConfiguration } from "../../actions/Config";
import { getContrastRatio } from "@material-ui/core";

const Configuration = () => {
  const dispatch = useDispatch();
  const [state, setState] = useState("");
  const [errors, setErrors] = useState({ name: '' });
  const { configData, getConfigData, addConfigData } = useSelector(state => state.Config);
  console.log("getConfigDataList", configData);

  useEffect(() => {
    dispatch(getConfiguration())
  }, [getConfigData, addConfigData])
  
  const formValidation = () => {
    let entities = state;
    const newErrorsState = { ...errors };
    if (!entities["addaftertopic"]) {
      newErrorsState.addaftertopic = 'Field cannot be empty';
      setErrors(newErrorsState);
      return false;
    }
    return true;
  }

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  };

  const configGenerator = () => {
    const items = [];
    configData && configData.results && configData.results.map((item, key) => {
      return items.push({
        id: item.id,
        name: item.addaftertopic,
      })
      
    })
   
    return items;
  }
  
  // const handleSubmit = (name) => {
    // if (formValidation()) {
      // console.log("name", name);
      // setErrors({});
      // dispatch(postConfiguration(name))
      //   .then((res) => {
      //     setState({});
      //   message.success('Configuration added succesfully');
      //   })
    // }
  // }
  
  const handleSubmit = (e) => {
    if (formValidation()) {
      console.log("state" , state);
      dispatch(postConfiguration(state)) 
      .then((res) => {
         message.success('Configuration added succesfully');
         })
     }
    }

  return (
    <Form labelCol={{ span: 3 }} wrapperCol={{ span: 6 }} onFinish={handleSubmit}>
      <div>
        <div className="modalStyle">
          <div className="configStyle">
            <Form.Item label="Ads showing interval">
              <Input type="number" name="addaftertopic" onChange={handleChange} value={state.addaftertopic} />
              <div className="errorMsg">{errors.addaftertopic}</div>
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
          <Form dataSource={configGenerator()} />
      </Form.Item>
    </Form>
  );
};
export default Configuration