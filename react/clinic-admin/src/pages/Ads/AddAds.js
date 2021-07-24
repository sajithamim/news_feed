import React, { useState, useEffect } from "react";
import { Form, Input, Tabs, Button, Typography, Checkbox, Space, Slider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import { Link } from 'react-router-dom';
import { Icon, IconButton } from "@material-ui/core";
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import Select from 'react-select';
import { getSpecialization } from "../../actions/spec";
import { getSpecUsers } from "../../actions/ads";

const AddAds = () => {
    const { TabPane } = Tabs;
    const { Title } = Typography;
    const dispatch = useDispatch();
    const [specSelectedOption, setSpecSelectedOption] = useState();
    const [userSelectedOption, setUserSelectedOption] = useState();
    const [state, setState] = useState({});
    const [size, setSize] = useState(8);
    useEffect(() => {
        dispatch(getSpecialization());
    }, [])
    const { specList } = useSelector(state => state.spec);
    const specialization = [];
    specList && specList.results && specList.results.map(item => {
        return specialization.push(
            { value: item.id, label: item.name }
        );

    })

    
   const { specUsers } =  useSelector(state => state.ads);
   const users = [];
   specUsers && specUsers.results && specUsers.results.map(item => {
       return users.push(
           { username : item.username }
       );
       
   })

    const handleChange = (e) => {
        setState({ ...state, [e.target.title]: e.target.value })
    }

    const handleSpecChange = (value) => {
        setSpecSelectedOption(value);
        let topic = [];
        value && value.map(item => {
            topic.push({ spec_id: item.value, spec_value: item.label })
        })
        setState({ ...state, add_specialization: topic })
    }

    const customStyles = {
        control: base => ({
            ...base,
            width: 300,
            minHeight: 40
        })
    };

    const onChange = () => {

    }

    const buttonClick = (id) => {
        dispatch(getSpecUsers(id));
    }
    const handleUserChange = (value) => {
        setUserSelectedOption(value);
        let userSelected = [];
        value && value.map(item => {
            userSelected.push({ spec_id: item.value, spec_id: item.label })
        })
    }
    const handleSubmit = () => {
    }
    return (
        <>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Add Ads" key="1" >
                    <Typography>
                        <Title level={2} style={{ textAlign: 'center' }}>Add Ads</Title>
                    </Typography>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={handleSubmit}
                    //onFinishFailed={onFinishFailed}
                    >

                        <Form.Item label="Name">
                            <Input name="name" onChange={handleChange} style={{ width: '300px' }} />
                            {/* <div className="errorMsg">{errors.name}</div> */}
                        </Form.Item>

                        <Form.Item label="Specialization">
                            <Select
                                isMulti={true}
                                value={specSelectedOption}
                                onChange={handleSpecChange}
                                options={specialization}
                                styles={customStyles}
                            />

                            {/* <div className="errorMsg">{errors.specialization}</div> */}
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                Next
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab="Add Users" key="2">
                    <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
                        <Checkbox onChange={onChange}>All Users</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
                        <Space size={[8, 16]} wrap>
                            {state.add_specialization && state.add_specialization.map(specItem =>
                            (
                                <Button type="primary" onClick ={() => {buttonClick(specItem.spec_id)}}>{specItem.spec_value}</Button>
                            ))}
                        </Space>
                    </Form.Item>

                    <Form.Item label="Select Users">
                        <Select
                            isMulti={true}
                            value={userSelectedOption}
                            onChange={handleUserChange}
                            options={users}
                        />

                        {/* <div className="errorMsg">{errors.specialization}</div> */}
                    </Form.Item>
                </TabPane>

            </Tabs>
        </>

    )
}

export default AddAds;