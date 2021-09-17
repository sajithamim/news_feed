import React, { useEffect, useState }from "react";
import { Form } from "antd";
import {  useLocation } from "react-router-dom";
import { Link } from 'react-router-dom';
// import "./Verification.css";


const Verify = () => {
    const [urlmessage , setUrlMessage] = useState("");
    const search = useLocation().search;
    useEffect(() => {
        setUrlMessage(new URLSearchParams(search).get('message'));
    })
    
    return (
        <>
                <div className="main" style={{height: '150px'}}>
                    <div className="sign" >{urlmessage}</div>
                </div>
        </>
    );
};
export default Verify