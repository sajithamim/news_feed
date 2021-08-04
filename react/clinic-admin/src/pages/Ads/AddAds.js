import React, { useState, useEffect } from "react";
import { Form, Input, Tabs, Button, Checkbox, message, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import Select from 'react-select';
import { getSpecialization } from "../../actions/spec";
import { getSpecUsers, postAdds, getEditAdsDetails, getAdsSelectedUser } from "../../actions/ads";
import { useParams } from "react-router-dom";


const AddAds = () => {
    const { TabPane } = Tabs;
    const dispatch = useDispatch();
    const [state, setState] = useState({});
    const [toggle, setToggle] = useState(false);
    const [errors, setErrors] = useState({});
    const { adsId } = useParams();
    
    const { adsDetails, userDetails, selectedSpecid, newaddId , adsUserDetails, specUsers, specId } = useSelector(state => state.ads);
    const { specList } = useSelector(state => state.spec);

    //all users of particular specialization
    const users = [];
    specUsers && specUsers.results && specUsers.results.map((item) => {
        users.push(
            { value: item.id, label: item.username }
        )
    })

    useEffect(() => {
        //specialization list
        dispatch(getSpecialization());
        if (adsId) {
            //ads edit details and selected users list
            dispatch(getEditAdsDetails(adsId))
            .then((res) => {
                const specid = res.data.add_specialization[0].spec_id.id; 
                dispatch(getAdsSelectedUser(adsId , specid))
            })
        }
    }, [])

    useEffect(() => {
        //selected users list
        const adsUserList = [];
        adsUserDetails && adsUserDetails.data && adsUserDetails.data.map((item) => {
            adsUserList.push(
                { value: item.user_id.id, label: item.user_id.username}
            )
        })

        const editAdsSpecialization = [];
        const topic = [];
        adsDetails && adsDetails.add_specialization && adsDetails.add_specialization.map(item => {
            //tab print and add specialization in post api 
            topic.push({ spec_id: item.spec_id.id, spec_value: item.spec_id.name })
            //selected specializatiom
            editAdsSpecialization.push({ value: item.spec_id.id, label: item.spec_id.name });
        })

        //const editUsersDetails = [];
        // userDetails && userDetails.data && userDetails.data.map((item) => {
        //     editUsersDetails.push(
        //         { value: item.user_id.email, label: item.user_id.username }
        //     )
        // })
        //setSTate({ users: editUsersDetails})

        setState({ ...state, title: adsDetails.title, specialization: editAdsSpecialization, add_specialization: topic, selectedSpecid: selectedSpecid, selectedUsers: adsUserList })
    }, [adsDetails, adsUserDetails])

    //specialization list
    const specialization = [];
    specList && specList.results && specList.results.map(item => {
        return specialization.push(
            { value: item.id, label: item.name }
        );
    })

    const handleSpecChange = (item) => {
        let topic = [];
        item && item.map(item => {
            topic.push({ spec_id: item.value, spec_value: item.label })
        })
        setState({ ...state, specialization: item, add_specialization: topic })
    }

    const onChange = (e) => {
        setState({ ...state, allUsers: e.target.checked })
    }

    const handleUserChange = (value, id) => {
        const userData = [];
        value && value.map((item) => {
            userData.push({ spec_id: specId, id: item.value })
        })
        // let user = state.users;
        // user[id] = value;
        //setState({user})
        setState({ ...state, userVisibility: userData})
    }

    const handleValidation = () => {
        let fields = state;
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

    const handleSubmit = (id) => {
        let userData = state.user;
        const keys = Object.keys(userData);
        let keyLen = keys.length;
        for (let index = 0 ;index < keyLen; index++) {
            if (keys[index] == id){
                let newData = state;
                if ((newData.userVisibility && newData.userVisibility.length !== 0) || newData.allUsers) {
                    newData['selectedUsers'] = userData[keys[index]];
                    newData['specId'] = keys[index];
                     dispatch(postAdds(newData, newaddId)).then((res) => {
                        // message.success('Ads created successfully')
                        // history.push("/data/Ads")
                      })
                    return true;
                } 
            }
        }
        // let newData = state;
        // if ((newData.userVisibility && newData.userVisibility.length !== 0) || newData.allUsers) {
        //     delete newData["specialization"];
        //     console.log("newdTahuy", newData.userVisibility);
        //     dispatch(postAdds(newData)).then((res) => {
        //         console.log("hjhjhj", res);
        //         message.success('Ads created successfully')
        //         history.push("/data/Ads")
        //     })
        //     return true;
        // } else {
        //     errors["users"] = "Choose all users or users from list";

        // }
        // setErrors({ errors });
        // return false

    }

    const handleChange = (e, field) => {
        let fields = state;
        fields[field] = e.target.value;
        setState({ ...state, fields })
    }

    const handleScreen = () => {
        const id = state.specialization[0].value
        if (handleValidation()) {
            setToggle(!toggle);
            dispatch(getSpecUsers(id))
        }
    }


    const buttonClick = activeKey => {
        dispatch(getSpecUsers(activeKey))
    };

    return (
        <div style={{ margin: "10px" }}>
            <Card
                title={adsId ? "Edit Ads" : "Add Ads"}
                style={{ width: "100%", display: toggle ? "none" : "block" }} >
                <Form
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 7 }}
                    initialValues={{ remember: true }}
                    // onFinish={handleSubmit}
                    style={{ marginTop: '25px' }}
                >
                    <Form.Item label="Title">
                        <Input name="title" value={state.title} onChange={(e) => { handleChange(e, "title") }} />
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
                style={{ width: "100%", marginBottom: '200px', display: toggle ? "block" : "none" }} >
                <Form
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 7 }}
                    initialValues={{ remember: true }}
                    onFinish={handleSubmit}
                    style={{ marginTop: '25px' }}
                >
                    <Form.Item wrapperCol={{ offset: 11, span: 10 }}>
                        <Checkbox onChange={onChange}>To All Users</Checkbox>
                    </Form.Item>
                    <div style={{ textAlign: "center" }}><strong>OR</strong></div>
                    <Tabs defaultActiveKey="1" centered onChange={buttonClick} tabPosition="left">
                        {state.add_specialization && state.add_specialization.map(specItem =>
                        (
                            <TabPane tab={specItem.spec_value} key={specItem.spec_id} style={{ marginBottom: '200px' }} centered>
                                <Form.Item wrapperCol={{ offset: 9, span: 7 }}>
                                    <Select
                                        name="users"
                                        isMulti={true}
                                        value={state.selectedUsers}
                                        onChange={(e) => handleUserChange(e, specItem.spec_id)}
                                        options={users}
                                        placeholder="Select Users"
                                    />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 9, span: 7 }}>
                                    <Button type="primary" onClick={() => handleSubmit(specItem.spec_id)} style={{ textAlign: "center" }} > Add User</Button>
                                </Form.Item>
                            </TabPane>
                        ))}

                    </Tabs>
                </Form>
            </Card >
        </div >


    )
}

export default AddAds;