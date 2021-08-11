import React, { useState, useEffect } from "react";
import { Form, Input, Tabs, Button, Checkbox, message, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import "antd/dist/antd.css";
import Select from 'react-select';
import { getSpecialization } from "../../actions/spec";
import { getSpecUsers, postAdds, getEditAdsDetails, getAdsSelectedUser } from "../../actions/ads";
import { useParams } from "react-router-dom";


const AddAds = () => {
    const { TabPane } = Tabs;
    const dispatch = useDispatch();
    const [state, setState] = useState({ allUsers: false });
    const [toggle, setToggle] = useState(false);
    const [errors, setErrors] = useState({});
    const [image, setImage] = useState("");
    const [imgData, setImgData] = useState("");
    const [selectedList, setSelectedList] = useState([]);
    const { adsId } = useParams();

    const { adsDetails, userDetails, selectedSpecid, newaddId, adsUserDetails, specUsers, specId } = useSelector(state => state.ads);
    const { specList } = useSelector(state => state.spec);

    //all users of particular specialization
    const users = [];
    specUsers && specUsers.results && specUsers.results.map((item) => {
        if (state.selectedUsers && state.selectedUsers.includes(item.id)) {
        //selected user condition
        if(state.selectedUsers && state.selectedUsers.includes(item.id)) {
            users.push(<option value={item.id} selected>{item.username}</option>)
        } else {
            users.push(<option value={item.id}>{item.username}</option>)
        }

    })

    useEffect(() => {
        //specialization list
        dispatch(getSpecialization());
        if (adsId) {
            //ads edit details and selected users list
            dispatch(getEditAdsDetails(adsId))
                .then((res) => {
                    const specid = res.data.add_specialization[0].spec_id.id;
                    dispatch(getAdsSelectedUser(adsId, specid))
                })
        }
    }, [])

    useEffect(() => {
        //selected users list
        const adsUserList = [];
        console.log('adsUserDetails', adsUserDetails)
        adsUserDetails && adsUserDetails.data && adsUserDetails.data.map((item) => {
            if (item.user_id)
                adsUserList.push(item.user_id.id)
            else {
                console.log('all users true')
                setState({ ...state, allUsers: true })

            }

        })

        const editAdsSpecialization = [];
        const topic = [];
        adsDetails && adsDetails.add_specialization && adsDetails.add_specialization.map(item => {
            //tab print and add specialization in post api 
            topic.push({ spec_id: item.spec_id.id })
            //selected specializatiom
            editAdsSpecialization.push({ value: item.spec_id.id, label: item.spec_id.name });
        })

        setState({ ...state, title: adsDetails.title, specialization: editAdsSpecialization, add_specialization: topic, selectedSpecid: selectedSpecid, selectedUsers: adsUserList})
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

    const onChecked = (e) => {
        setState({ ...state, allUsers: e.target.checked })

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

    const handleChange = (e, field) => {
        let fields = state;
        fields[field] = e.target.value;
        setState({ ...state, fields })
    }

    const handleScreen = () => {
        if (handleValidation()) {
            const id = state.specialization[0].value;
            setState({ ...state, specActiveId: id })
            setToggle(!toggle);
            dispatch(getSpecUsers(id))
        }
    }

    const buttonClick = activeKey => {
        dispatch(getSpecUsers(activeKey))
        setState({ ...state, specActiveId: activeKey })
    };

    const handleMultiSelectChange = (e) => {
        let { options } = e.target;
        options = Array.apply(null, options)
        const selectedValues = options.filter(x => x.selected).map(x => x.value);
        const userData = [];
        selectedValues && selectedValues.map((item) => {
            userData.push({ spec_id: specId, user_id: item })
        })
        setState({ ...state, userVisibility: userData })
    }

    const handleFileChange = (info) => {
        setImage(info.target.files[0]);
        const imageFile = info.target.files[0];
        const newErrorsState = { ...errors };
        if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
            newErrorsState.image = 'Please select valid image.';
            setErrors(newErrorsState);
            return false;
        } else {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
              setImgData(reader.result);
            });
            reader.readAsDataURL(info.target.files[0]);
            newErrorsState.image = '';
            setErrors({});
          }
          
    }

    const handleSubmit = (id) => {
        const userList = [];
        let errors = {};
        if (state.userData || state.allUsers) {
        let userData = state.userVisibility;
        if(userData || state.allUsers) {
            if (state.allUsers === true) {
                userList.push({ spec_id: state.specActiveId, user_id: null })
            }
            else {
                userData.map(item => {
                    if (item.spec_id === state.specActiveId) {
                        userList.push(item)
                    }
                })
            }
            setErrors({ errors });
            let newData = {};
            newData['title'] = state.title;
            newData['add_specialization'] = state.add_specialization;
            dispatch(postAdds(newData, userList, adsId , imgData)).then((res) => {
                message.success('Ads created successfully')
            })
            return true;
        } else {
            errors["users"] = "Users is required";
            setErrors({ errors });
            return false;
        }

    }

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

                    <Form.Item label="Ads">
                        <img className="playerProfilePic_home_tile" width="128px" height="128px" alt="" src="" />
                        <Input type="file"
                            id="image"
                            name="image"
                            accept="image/png, image/jpeg" onChange={handleFileChange} />
                        {/* <div className="errorMsg">{errors.image}</div> */}
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
                        <Button type="primary" onClick={handleScreen}>
                            Next
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card type="inner"
                title={adsId ? "Edit Visibility" : "Add Visibility"} extra={<Button type="link">
                    <Link to={"/advertisements"}>Back to Advertisement List</Link>
                </Button>}
                style={{ width: "100%", marginBottom: '200px', display: toggle ? "block" : "none" }} >

                <Form
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 7 }}
                    initialValues={{ remember: true }}
                    onFinish={handleSubmit}
                    style={{ marginTop: '25px' }}
                >

                    <Tabs defaultActiveKey="1" centered onChange={buttonClick} >
                        {state.specialization && state.specialization.map(specItem =>
                        (
                            <TabPane tab={specItem.label} key={specItem.value} style={{ marginBottom: '200px' }} centered>
                                <Form.Item wrapperCol={{ offset: 11, span: 10 }}>
                                    <Checkbox onChange={onChecked} checked={state.allUsers}>To All Users</Checkbox>
                                </Form.Item>

                                <div style={{ textAlign: "center" }}><strong>OR</strong></div>

                                <Form.Item wrapperCol={{ offset: 11, span: 10 }} style={{ paddingTop: '35px' }}>
                                    <select style={{ paddingRight: '75px' }} name="list-box" disabled={state.allUsers} multiple onChange={(e) => handleMultiSelectChange(e, specItem.value)}>{users}</select>
                                <Form.Item wrapperCol={{ offset: 11, span: 10 }} style={{paddingTop: '35px'}}>
                                    <select style={{paddingRight: '75px'}} name="list-box" disabled={state.allUsers} multiple onChange={(e) => handleMultiSelectChange(e)}>
                                        {users}
                                    </select>
                                    <div className="errorMsg">{errors && errors.errors && errors.errors.users}</div>
                                </Form.Item>

                                <Form.Item wrapperCol={{ offset: 11, span: 10 }}>
                                    <Button type="primary" onClick={() => handleSubmit(specItem.value)} style={{ textAlign: "center" }} > Add User</Button>
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