import React, { useEffect, useState } from "react";
import "./Configuration.css";
import { Form, Button, Input, Modal, message } from "antd";

const Configuration =(props) =>{
    const [state, setState] = useState(props);
    return (
        <Form onFinish="">
        <div>
          <div className="modalStyle">
           <div className="inputStyle">
           <Form.Item label="Name">
              <Input name="title" onChange="" value={state.title} />
            </Form.Item>
           </div> 
           <div className="inputStyle">
           <Form.Item label="Name">
              <Input name="name" onChange="" value={state.title} />
            </Form.Item>
           </div>
          </div>
        </div>
        <Form.Item wrapperCol={{ offset: 12, span:8}}>
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