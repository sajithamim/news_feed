import React, { useState, useEffect } from "react";
import { Form, Input, Tabs, Button, Typography, Checkbox, Space, message, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import Select from 'react-select';
import { getSpecialization } from "../../actions/spec";
import { getSpecUsers, postAdds , getEditAdsDetails} from "../../actions/ads";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import  { Redirect } from 'react-router-dom'

const AddAds = () => {
    const { TabPane } = Tabs;
    const { Title } = Typography;
    const dispatch = useDispatch();
    // const [specSelectedOption, setSpecSelectedOption] = useState();
    const [userSelectedOption, setUserSelectedOption] = useState();
    const [state, setState] = useState({});
    const [size, setSize] = useState(8);
    const [toggle, setToggle] = useState(false);
    const [errors, setErrors] = useState({});
    const [fields, setFields] = useState({ "title": "" });
    let history = useHistory();

    const { adsId } = useParams();
    const { adsDetails } = useSelector(state => state.ads);
    console.log("adsDetails" , adsDetails);
    const editAdsSpecialization = [];
    adsDetails && adsDetails.add_specialization && adsDetails.add_specialization.map(item => {
        return editAdsSpecialization.push(
            { value: item.spec_id.id, label: item.spec_id.name }
        );
    })


    useEffect(() => {
        dispatch(getSpecialization());
        if(adsId)
            dispatch(getEditAdsDetails(adsId))
        if(adsDetails){
            setState({...state , title: adsDetails.title , specialization: editAdsSpecialization })
        }
    }, [])

    

    const { specList } = useSelector(state => state.spec);
    const specialization = [];
    specList && specList.results && specList.results.map(item => {
        return specialization.push(
            { value: item.id, label: item.name }
        );
    })
    const handleSpecChange = (item) => {
        let topic = [];
        item && item.map(item => {
            
          //  fields[field] = item.label;
            topic.push({ spec_id: item.value, spec_value: item.label  })
        })
        setState({ ...state, specialization: item, add_specialization: topic })
    }

    const onChange = (e) => {
        setState({...state, allUsers: e.target.checked})
    }

    const buttonClick = (id) => {
        dispatch(getSpecUsers(id))
    }

    const { specUsers, specId } = useSelector(state => state.ads);
    const users = []; 
    console.log("users",users);
    specUsers && specUsers.results && specUsers.results.map((item) => {
        users.push(
            { value: item.email, label: item.username }
        )
    })

    const handleUserChange = (value) => {
        const userData = [];
        value && value.map((item) => {
            userData.push({ spec_id: specId , email: item.value })
        })
        setState({ ...state, userVisibility: userData })
    }

    const handleValidation = () => {
        let fields = state;
        console.log('fieldsss', fields)
        let errors = {};
        let formIsValid = true;
        if (!fields["title"]) {
            formIsValid = false;
            errors["title"] = "Title is required";
        }

        if (fields["specialization"].length == 0) {
            formIsValid = false;
            errors["specialization"] = "Specialization is required";
        }
        setErrors({ errors });
        return formIsValid;
    }

    const handleSubmit = (e) => {
        let newData = state;
        if((newData.userVisibility && newData.userVisibility.length !== 0) || newData.allUsers) {
            delete newData["specialization"];
            dispatch(postAdds(newData)).then(() =>{
                message.success('Ads added successfully')
                history.push("/data/Ads")
            })
            return true;
        } else {
            errors["users"] = "Choose all users or users from list";
            
        }
        setErrors({ errors });
        return false
       
    }

    const handleChange = (e, field) => {
        let fields = state;
        fields[field] = e.target.value;
        setState({ ...state, fields })
    }

    const handleScreen = () => {
        console.log("state",state);
        if(handleValidation()) {
            setToggle(!toggle);
        }
        
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
                    //onFinish={handleSubmit}
                    style={{ marginTop: '25px' }}
                >
                    <Form.Item label="Name">
                        <Input name="title" value={state.title}  onChange={(e) => { handleChange(e, "title") }} />
                        <div className="errorMsg">{errors && errors.errors && errors.errors.title}</div>
                    </Form.Item>
                    <Form.Item label="Specialization">
                        <Select
                            name="specialization"
                            isMulti={true}
                            value={state.specialization}
                            onChange={handleSpecChange}
                            options={specialization}
                            required
                        />
                        <div className="errorMsg">{errors && errors.errors && errors.errors.specialization}</div>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                        <Button type="primary" onClick={handleScreen}>
                            Next
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card
                title="Add Visibility"
                style={{ width: "100%", display: toggle ? "block" : "none" }} >
                <Form.Item wrapperCol={{ offset: 11, span: 10 }}>
                    <Checkbox onChange={onChange}>To All Users</Checkbox>
                </Form.Item>
                <div style={{ textAlign: "center" }}><strong>OR</strong></div>
                <Form.Item style={{ textAlign: "center", marginTop: '25px' }}>
                    <Space size={[8, 16]} wrap>
                        {state.add_specialization && state.add_specialization.map(specItem =>
                        (
                            <Button onClick={() => { buttonClick(specItem.spec_id) }}>{specItem.spec_value}</Button>
                        ))}
                    </Space>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 9, span: 7 }} style={{ marginTop: '35px' }}>
                    <Select
                        name="users"
                        isMulti={true}
                        value={userSelectedOption}
                        onChange={handleUserChange}
                        options={users}
                        placeholder="Select Users"
                    />
                     <div className="errorMsg">{errors && errors.errors && errors.errors.users}</div>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 11, span: 7 }}>
                    <Button onClick={handleSubmit}>Add User</Button>
                </Form.Item>
            </Card>
        </div>


    )
}

export default AddAds;