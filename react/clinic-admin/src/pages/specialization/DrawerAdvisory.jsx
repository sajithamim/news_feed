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
    const [oldAdvisoryData, setOldAdvisoryData] = useState([]);
    const [newAdvisoryData, setNewAdvisoryData] = useState([]);
    const [errors, setErrors] = useState("");
    const { userList } = useSelector(state => state.users);
    const { specId } = useParams();
    const { advisoryMemberList } = useSelector(state => state.spec);

    useEffect(() => {
        dispatch(getUsersList())
        const advisoryData = [];
        advisoryMemberList.data && advisoryMemberList.data.map(item => {
            advisoryData.push({ spec_id: specId, user_id: item.user_id.id })
        })
        setOldAdvisoryData(advisoryData);
    }, []);

    const list = []
    userList && userList.results && userList.results.map(item => {
        console.log('test', item)
        return list.push(
            { value: item.id, label: <div><div><b>{item.username}</b><p className="advisoryPara">{item.qualifications}</p></div><div><img className="advisoryImg" src={`${process.env.REACT_APP_API_BASE_URL}${item.profilepic}`} /></div></div> }
        )
    })

    const dispatch = useDispatch();

    const handleValidation = () => {
        let errors = {};
        let formIsValid = true;
        if (newAdvisoryData.length <= 0) {
            formIsValid = false;
            errors["user_id"] = "User is Mandatory";
        }
        setErrors({ errors });
        return formIsValid;
    }

    const handleChange = (item) => {
        const selectedAdvisoryMemberList = []
        item && item.map(item => {
            selectedAdvisoryMemberList.push({ spec_id: specId, user_id: item.value })
        })
        setNewAdvisoryData(selectedAdvisoryMemberList);
    };

    const handleSubmit = () => {
        console.log("errors", errors);
        if (handleValidation()) {
            const data = oldAdvisoryData.length > 0 ? newAdvisoryData.concat(oldAdvisoryData) : newAdvisoryData
            dispatch(postAdvisoryMembersList(data))
                .then(() => {
                    message.success("Advisory Members added successfully")
                })
        }
    }

    return (
        <Form name="basic" labelCol={{ span: 6 }} wrapperCol={{ span: 10 }} onFinish={handleSubmit}>
            <Form.Item label="Select Members" >
                <Select
                    id="users"
                    isMulti={true}
                    isSearchable={true}
                    onChange={handleChange}
                    options={list}
                />
            </Form.Item>
            <div className="errorMsg">{errors && errors.errors && errors.errors.user_id}</div>
            <Form.Item wrapperCol={{ offset: 7 }}>
                <div className="advisorySaveBtn">
                    <Button id="advisory" type="primary" htmlType="submit" >
                        Save
                    </Button>
                </div>
            </Form.Item>
        </Form>
    );
};

export default DrawerAdvisory;
