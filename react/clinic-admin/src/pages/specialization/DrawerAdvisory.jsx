import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, AutoComplete } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { postAdvisoryMembersList } from "../../actions/spec";
import Select from 'react-select';
import { getUsersList } from "../../actions/users"
import "./Drawer.css";

const DrawerAdvisory = (props) => {

    const [state, setState] = useState(props.editData);
    const [ advisoryData , setAdvisoryData] = useState([]);
    const { userList } = useSelector(state => state.users);
    const { specId } = useParams(); 

    useEffect(() => {
        dispatch(getUsersList())
    }, [])
    
    const list = []
    userList && userList.results && userList.results.map(item => {
        return list.push(
            { value: item.id, label: <div><div>{item.username}</div><div>{item.email}</div><div>{item.qualifications}</div></div> }
        )
    })
    
    const dispatch = useDispatch();

    const handleChange = (item) => {
        const selectedAdvisoryMemberList = []
        item && item.map(item  => {
            console.log("item handlechange" , selectedAdvisoryMemberList);
             selectedAdvisoryMemberList.push( {spec_id: specId, user_id : item.value })
        })
        setAdvisoryData(selectedAdvisoryMemberList);
    };

    const handleSubmit = () => {
        dispatch(postAdvisoryMembersList(advisoryData))
    }

    return (
        <Form name="basic" labelCol={{ span: 10 }} wrapperCol={{ span: 15 }} onFinish={handleSubmit}>
            <Form.Item label="Select Members" >
                  <Select 
                    id="users"
                    isMulti={true}
                    isSearchable={true}
                    onChange={handleChange}
                    options={list}
                  />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 7 }}>
                <Button id="advisory" type="primary" htmlType="submit" >
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export default DrawerAdvisory;
