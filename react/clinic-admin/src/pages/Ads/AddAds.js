import React, { useState, useEffect } from "react";
import { Form, Input, Tabs, Button, Typography ,Checkbox } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import { Link } from 'react-router-dom';
import { Icon, IconButton } from "@material-ui/core";
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';
import Select from 'react-select';
import { getSpecialization } from "../../actions/spec";

const AddAds = () => {
    const { TabPane } = Tabs;
    const { Title } = Typography;
    const dispatch = useDispatch();
    const [specSelectedOption, setSpecSelectedOption] = useState();
    const [state, setState] = useState({});
    useEffect(() => {
        dispatch(getSpecialization());
    })
    const { specList } = useSelector(state => state.spec);

    const specialization = [];
    specList && specList.results && specList.results.map(item => {
        return specialization.push(
            { value: item.id, label: item.name }
        );

    })

    const handleChange = (e) => {
        setState({ ...state, [e.target.title]: e.target.value })
    }

    const handleSpecChange = (value) => {
        setSpecSelectedOption(value);
        let topic = [];
        value && value.map(item => {
            console.log("itemname",item);
            topic.push({ spec_id: item.value , spec_id:item.label })
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

    const handleSubmit = () => {
        console.log("satet", state)
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
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox onChange={onChange}>All Users</Checkbox>
                </Form.Item> 
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        {state.add_specialization && state.add_specialization.map(specItem =>
                                (<Button type="primary">{specItem.spec_id}</Button>) 
                        )}

                    </Form.Item>
                </TabPane>

            </Tabs>
        </>

    )
}

export default AddAds;