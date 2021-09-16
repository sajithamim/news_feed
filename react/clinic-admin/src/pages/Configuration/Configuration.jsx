import React, { useEffect, useState } from "react";
import "./Configuration.css";
import { Form, Button, Input, Modal, message } from "antd";

const Configuration =(props) =>{
    const [state, setState] = useState(props);
    return (
        <Form labelCol={{ span: 15 }} wrapperCol={{ span:10 }} onFinish="">
        <div>
          <div className="modalStyle">
           <div className="configStyle">
           <Form.Item label="Ads showing interval">
              <Input name="name" onChange="" value={state.title} />
            </Form.Item>
           </div> 
          </div>
        </div>
        <Form.Item wrapperCol={{ offset:7 , span:8}}>
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