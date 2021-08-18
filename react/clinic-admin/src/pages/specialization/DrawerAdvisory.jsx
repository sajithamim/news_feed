import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, AutoComplete } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUsersList } from "../../actions/users"
import "./Drawer.css";

const DrawerAdvisory = (props) => {

    const [state, setState] = useState(props.editData);

    const { userList } = useSelector(state => state.users);
    console.log("userlist", userList);

    useEffect(() => {
        dispatch(getUsersList())
        
    }, [])
    
    const USERS = [];
        userList && userList.results && userList.results.map((item) => {
            console.log("list" , USERS);
            USERS.push({ name: item.username })
        });

    const [name, setName] = useState('');
    
    const [foundUsers, setFoundUsers] = useState(USERS);


    const dispatch = useDispatch();


    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    };

    const handleSubmit = () => {

    }
    const filter = (e) => {
        const keyword = e.target.value;
        if (keyword !== '') {
            const results = USERS.filter((user) => {
                return user.name.toLowerCase().startsWith(keyword.toLowerCase());
                // Use the toLowerCase() method to make it case-insensitive
            });
            setFoundUsers(results);
        } else {
            setFoundUsers(USERS);
            // If the text field is empty, show all users
        }

        setName(keyword);
    };

    return (
        <Form name="basic" labelCol={{ span: 10 }} wrapperCol={{ span: 15 }} onFinish={handleSubmit}>
            <Input
                type="search"
                value={name}
                onChange={filter}
                className="input"
                placeholder="Filter"
            />
            <div className="user-list">
                {foundUsers && foundUsers.length > 0 ? (
                    foundUsers.map((user) => (
                        <li key={user.id} className="user">
                            <span className="user-name">{user.name}</span>
                        </li>
                    ))
                ) : (
                    <h1>No results found!</h1>
                )}
            </div>
            <Form.Item wrapperCol={{ offset: 7 }}>
                <Button id="advisory" type="primary" htmlType="submit" >
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export default DrawerAdvisory;
