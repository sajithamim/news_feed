import React from "react";
import { Form, Button } from "antd";
import { Link } from 'react-router-dom';
// import "./Verification.css";


const Verify = () => {
    return (
        <>
            <Form layout="vertical" >
                <div className="main" style={{height: '150px'}}>
                    <div className="sign" >Your account has been verified</div>
                </div>
            </Form>
        </>
    );
};
export default Verify