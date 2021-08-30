import React, { useState, useEffect } from "react";
import { Form, Input, Tabs, Button, Checkbox, message, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import Select from 'react-select';
import { getSpecialization } from "../../actions/spec";
import { getSpecUsers, postAdds, getEditAdsDetails, getAdsSelectedUser } from "../../actions/ads";
import { useParams, useHistory, Link } from "react-router-dom";


const AddAds = () => {
    const { TabPane } = Tabs;
    const dispatch = useDispatch();
    const [state, setState] = useState({ allUsers: false });
    const [toggle, setToggle] = useState(false);
    const [errors, setErrors] = useState({});
    const [image, setImage] = useState({});

    const { adsDetails, selectedSpecid, adsUserDetails, specUsers, specId } = useSelector(state => state.ads);
    const { specList } = useSelector(state => state.spec);
    const { adsId } = useParams(); //get id
    const history = useHistory();

    useEffect(() => {
        dispatch(getSpecialization()); //get specialization list
        if (adsId)
            dispatch(getEditAdsDetails(adsId)) //get edit details
    }, [])

    useEffect(() => {
        const adsUserList = [];
        let allUsers = false;
        adsUserDetails && adsUserDetails.data && adsUserDetails.data.map((item) => {
            if (item.user_id)
                adsUserList.push(item.user_id.id)
            else
                allUsers = true;
        }) //ads selected users list for spec id

        const users = [];
        const userVisibility = [];

        specUsers && specUsers.results && specUsers.results.map((item) => {
            if (adsUserList && adsUserList.includes(item.id)) {
                userVisibility.push({ spec_id: specId, user_id: item.id })
                users.push(<option value={item.id} selected>{item.username}</option>) //ads selected users list for spec id
            } else {
                users.push(<option value={item.id}>{item.username}</option>) // all users list
            }
        })

        setState({ ...state, selectedSpecid: selectedSpecid, userVisibility: userVisibility, users: users, allUsers: allUsers })
    }, [adsUserDetails, specUsers])

    useEffect(() => {
        const editAdsSpecialization = [];
        const add_specialization = [];
        adsDetails && adsDetails.add_specialization && adsDetails.add_specialization.map(item => {
            add_specialization.push({ spec_id: item.spec_id.id }) //using for save api call 
            editAdsSpecialization.push({ value: item.spec_id.id, label: item.spec_id.name }); //selected specialization 
        })
        setState({ ...state, title: adsDetails.title, image: adsDetails.addimage, specialization: editAdsSpecialization, add_specialization: add_specialization })
    }, [adsDetails])

    const specialization = [];
    specList && specList.results && specList.results.map(item => {
        return specialization.push(
            { value: item.id, label: item.name }
        );
    })  //specialization list

    const handleSpecChange = (item) => {
        let topic = [];
        item && item.map(item => {
            topic.push({ spec_id: item.value, spec_value: item.label })
        })
        setState({ ...state, specialization: item, add_specialization: topic })
    } // specialization handle Change

    const onChecked = (e) => {
        setState({ ...state, allUsers: e.target.checked })
    }

    const handleValidation = () => {
        let fields = state;
        let errors = {};
        let formIsValid = true;
        console.log("state", fields["image"]);
        if (!fields["title"]) {
            formIsValid = false;
            errors["title"] = "Title is required";
        }

        if (fields["specialization"].length == 0) {
            formIsValid = false;
            errors["specialization"] = "Specialization is required";
        }

        if (image.name && !image.name.match(/\.(jpg|jpeg|png|gif|jfif|PNG|BAT|Exif|BMP|TIFF)$/)) { //image validation
            formIsValid = false;
            errors["image"] = "Please select valid image.";
        }
        if (image.name || state.image === undefined) {
            formIsValid = false;
            errors["image"] = "Image is mandatory";
        }
        if (!fields["users"] === undefined) {
        }
        setErrors({ errors });
        return formIsValid;
    }

    const handleChange = (e, field) => {
        let fields = state;
        fields[field] = e.target.value;
        setState({ ...state, fields })
    }

    const onChange = () => {

    }
    const handleScreen = () => {
        if (handleValidation()) {
            const id = state.specialization[0].value;
            setState({ ...state, specActiveId: id })
            setToggle(!toggle);
            dispatch(getSpecUsers(id))
            dispatch(getAdsSelectedUser(adsId, id))
        }
    } //next button handling

    const handleTab = activeKey => {
        dispatch(getSpecUsers(activeKey))
        dispatch(getAdsSelectedUser(adsId, activeKey))
        setState({ ...state, specActiveId: activeKey })
    };

    const handleMultiSelectUser = (e, id) => {
        let { options } = e.target;
        options = Array.apply(null, options)
        const selectedValues = options.filter(x => x.selected).map(x => x.value);
        const userVisibility = [];
        selectedValues && selectedValues.map((item) => {
            userVisibility.push({ spec_id: specId, user_id: item })
        })
        setState({ ...state, userVisibility: userVisibility })
    }

    const handleFileChange = (info) => {
        setImage(info.target.files[0]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setState({ ...state, image: reader.result })
        });
        reader.readAsDataURL(info.target.files[0]);
    }
    const optionsWithDisabled = [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange', disabled: false },
    ];

    const options = [
        { label: 'Apple', value: 'Apple' },
        { label: 'Pear', value: 'Pear' },
        { label: 'Orange', value: 'Orange' },
    ];

    const handleSubmit = (id) => {
        const userList = [];
        let errors = {};
        let form_data = null;
        if (state.userVisibility.length > 0 || state.allUsers === true) {
            if (state.allUsers) {
                userList.push({ spec_id: state.specActiveId, user_id: null }) // to all users
            }
            else {
                let userData = state.userVisibility;
                userData.map(item => {
                    if (item.spec_id === state.specActiveId) {
                        userList.push(item) // selected users
                    }
                })
            }
            if (image && image.name) {
                form_data = new FormData();
                form_data.append('addimage', image, image.name);
            }
            if (state.users == []) {
                console.log("user is mandate");
            }
            setErrors({ errors });
            let newData = {};
            newData['add_specialization'] = state.add_specialization;
            newData['title'] = state.title;
            dispatch(postAdds(newData, userList, adsId, form_data)).then((res) => {
                if (adsId !== undefined)
                    message.success('Edit Add created successfully')
                else
                    message.success('Add created successfully')
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
            <Card title={adsId ? "Edit Ads" : "Add Ads"}
                style={{ width: "100%", display: toggle ? "none" : "block" }} >
                <Form name="basic" labelCol={{ span: 3 }} wrapperCol={{ span: 9 }} initialValues={{ remember: true }}
                    style={{ marginTop: '25px' }}>
                    <Form.Item label="Title">
                        <Input name="title" value={state.title} onChange={(e) => { handleChange(e, "title") }} />
                        <div className="errorMsg" style={{ marginLeft: '50px' }}>{errors && errors.errors && errors.errors.title}</div>
                    </Form.Item>
                    <Form.Item label="Specialization">
                        <div style={{ marginLeft: '50px', width: '376px' }}>
                            <Select name="specialization" placeholder="Select Specialization" isMulti={true} value={state.specialization}
                                onChange={handleSpecChange} options={specialization} />
                        </div>
                        <div className="errorMsg" style={{ marginLeft: '50px' }}>{errors && errors.errors && errors.errors.specialization}</div>
                    </Form.Item>
                    <Form.Item label="Add Image">
                        {state.image ? (<img className="playerProfilePic_home_tile" style={{ marginLeft: '50px' }} width="128px" height="128px" alt={state.image} src={state.image} />) : null}
                        <Input type="file" name="image" onChange={handleFileChange} style={{ marginLeft: '50px', marginTop: '15px' }} />
                        <div className="errorMsg" style={{ marginLeft: '50px' }}>{errors && errors.errors && errors.errors.image}</div>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4, span: 9 }}>
                        <Button type="primary" onClick={handleScreen} style={{ marginLeft: '9px' }}>
                            Next
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card title={adsId ? "Edit Visibility" : "Add Visibility"} extra={<Button type="link">
                <Link to={"/advertisements"}>Back to Advertisement List</Link>
            </Button>}
                style={{ display: toggle ? "block" : "none" }} >
                <Form onFinish={handleSubmit} >
                    <Tabs defaultActiveKey="1" onChange={handleTab} >
                    
                        {state.specialization && state.specialization.map(specItem =>
                        (
                            <TabPane tab={specItem.label} key={specItem.value}>
                                <Form.Item wrapperCol={{ offset: 3, span: 9 }}>
                                    <Checkbox onChange={onChecked} checked={state.allUsers} disabled={(state.users) ? true : false}>To All Users</Checkbox>
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 3, span: 9 }}><strong>OR</strong></Form.Item>
                                <Form.Item wrapperCol={{ offset: 3, span: 9 }}>
                                    <select name="list-box" disabled={state.allUsers} multiple onChange={(e) => handleMultiSelectUser(e, specItem.value)}>
                                        {state.users}
                                    </select>
                                    <div className="errorMsg">{errors && errors.errors && errors.errors.users}</div>
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 3, span: 9 }}>
                                    <Button type="primary" onClick={() => handleSubmit(specItem.value)} style={{ textAlign: "center" }} > Add Advertisement</Button>
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