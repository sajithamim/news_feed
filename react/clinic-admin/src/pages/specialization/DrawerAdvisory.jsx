import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, AutoComplete } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { getUsersList } from "../../actions/users"
import "./Drawer.css";

const DrawerAdvisory = (props) => {

    const [state, setState] = useState(props.editData);

    const { userList } = useSelector(state => state.users);
    const { specId } = useParams(); 

    useEffect(() => {
        dispatch(getUsersList())
    }, [])
    
    const list = []
    userList && userList.results && userList.results.map(item => {
        console.log("user item" , item);
        return list.push(
            { value: item.id, label: <div><div>{item.username}</div><div>{item.email}</div><div>{item.qualifications}</div></div> }
        )
    })
    
    const dispatch = useDispatch();

    const handleChange = (item) => {
        setState({ ...state, user_id: item , spec_id: specId});
    };

    const handleSubmit = () => {
        console.log("state" , state);
    }

    return (
        <Form name="basic" labelCol={{ span: 10 }} wrapperCol={{ span: 15 }} onFinish={handleSubmit}>
            <Form.Item label="Select Members" >
                  <Select 
                    id="users"
                    isMulti={true}
                    isSearchable={true}
                    value={state.user_id}
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
