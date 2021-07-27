import React, { useState, useEffect } from "react";
import { Form, Input, Tabs, Button, Typography, Checkbox, Space, Slider, Card } from "antd";
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
    const [toggle, setToggle] = useState(false);
    const [errors, setErrors] = useState({});
    const [fields, setFields] = useState({});
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
   specUsers && specUsers.results && specUsers.results.map(item=> {
       console.log("userlist item", item);
       return users.push(
           { value: item.username , label: item.username}
       );
       
   })

    const handleSpecChange = (value , field) => {
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
    }

    const handleValidation = () => {
        let errors = {};
        let formIsValid = true;
        if(!fields["title"]){
            formIsValid = false;
            errors["title"] = "Cannot be empty";
         }

        // if(!fields["selectSpec"]){
        //     formIsValid = false;
        //     errors["selectSpec"] = "Required";
        //  }
        setErrors({errors});
        return formIsValid;
    }
    
    const handleSubmit = (e) => {
        if(handleValidation()){
            alert("Form submitted");
         }else{
            console.log("getting", errors);
         }
    }

    const handleChange = (e , field) => {
        // let fields = fields;
        fields[field] = e.target.value;
        setFields({fields});
        setState({ ...state, [e.target.title]: e.target.value })
    }

   const handleScreen = () => {
    setToggle(!toggle);
   }
   
    return (
        <div style={{ margin: "10px" }}>
        <Card
            title="Add Ads"
            style={{ width: "100%", display: toggle ? "none" : "block" }} >
            <Form
                name="basic"
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 7 }}
                initialValues={{ remember: true }}
                onFinish={handleSubmit}
                style={{marginTop: '25px'}}
            >
            <Form.Item label="Name">
                <Input name="title" onChange={(e) => {handleChange(e, "title")}} />
                <div className="errorMsg">{errors && errors.errors && errors.errors.title}</div>
            </Form.Item>
            <Form.Item label="Specialization">
                <Select
                    name="selectSpec"
                    isMulti={true}
                    value={specSelectedOption}
                    onChange={(e) => handleSpecChange(e, "selectSpec")}
                    options={specialization}
                    styles={customStyles}
                    required
                />

                {/* <div className="errorMsg">{errors["selectSpec"]}</div> */}
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                <Button type="primary" htmlType="submit" onClick={handleScreen}>
                    Next
                </Button>
            </Form.Item>
        </Form>
        </Card>
        <Card
            title="Add Visibility"
            style={{ width: "100%", display: toggle ? "block" : "none" }} >
            <Form.Item wrapperCol={{ offset: 10, span: 10 }}>
                <Checkbox onChange={onChange}>To All Users</Checkbox>
            </Form.Item>
            <strong style={{marginLeft: '455px'}}>OR</strong>   
            <Form.Item style={{textAlign: "center", marginTop: '25px'}}>
                <Space size={[8, 16]} wrap>
                    {state.add_specialization && state.add_specialization.map(specItem =>
                    (
                        <Button onClick ={() => {buttonClick(specItem.spec_id)}}>{specItem.spec_value}</Button>
                    ))}
                </Space>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 7 }} style={{marginTop: '35px'}}>
                <Select
                    isMulti={true}
                    value={userSelectedOption}
                    onChange={handleUserChange}
                    options={users}
                    placeholder="Select Users"
                />
            </Form.Item>
        </Card>
        </div>
   

    )
}

export default AddAds;