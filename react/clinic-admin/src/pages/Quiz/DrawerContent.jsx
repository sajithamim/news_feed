import React, { useEffect, useState } from "react";
import { Form, Input, Button, Radio, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { postQuiz, updateQuiz, getSpecialization, getSubSpecialisation } from "../../actions/quiz";
import SelectBox from 'react-select';
import "./Quiz.css";


const DrawerContent = (props) => {
    const [state, setState] = useState({});
    const [errors, setErrors] = useState({});
    const [formSubmit, setFormSubmit] = useState(true);
    const { specList, subspecialization } = useSelector(state => state.Quiz);
    const [specId, setSpecId] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        setErrors({});
        dispatch(getSpecialization());
        if (props.editData !== null) {
            setState(props.editData);
        }
        else {
            setState({});
        }
    }, [props.editData])


    const spec = [];
    specList && specList.data && specList.data.map(item => {
        return spec.push(
            { value: item.id, label: item.name }
        );
    })

    const sub_spec = [];
    subspecialization.map((item, key) => {
        return sub_spec.push(
            { value: item.id, label: item.name }
        );
    })

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    };
    const radioOnChange = (val, e) => {
        setState({ ...state, active: e.target.value })
    }
    const handleSpecChange = (value) => {
        console.log("value", value)
        setState({ ...state, spec_data: value, spec_id: value.value });

        dispatch(getSubSpecialisation(value.value));
    };
    const handleSubChange = (value) => {
        console.log("value", value)
        setState({ ...state, sub_spec_data: value, sub_spec_id: value.value });
    };
    const formValidation = () => {
        console.log("state validate", state)
        let fields = state;
        let errors = {};
        let formIsValid = true;
        if (!fields["title"]) {
            formIsValid = false;
            errors["title"] = "Title is required";
        }
        if (!fields["url"]) {
            formIsValid = false;
            errors["url"] = "URL is required";
        } else {
            var myUrl = fields.url;
            var res = myUrl.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
            if (res === null) {
                formIsValid = false;
                errors["url"] = "Enter a valid URL";
            }
        }
        if (props.drawerType === 'add' && !fields["spec_id"]) {
            formIsValid = false;
            errors["spec_id"] = "Specialization cannot be empty"
        }
        if (props.drawerType === 'add' && !fields["sub_spec_id" ]) {
            formIsValid = false;
            errors["sub_spec_id"] = "Sub specialization cannot be empty"
        }
        if (fields.active === undefined) {
            formIsValid = false;
            errors["status"] = "Status is required"
        }

        setErrors({ errors });
        return formIsValid;

    }

    const handleSubmit = (e) => {
        let newData = state;
        const id = state.id
        console.log("handleSubmit", state)
        if (formValidation() && formSubmit) {
            if (props.drawerType === 'edit') {
                delete newData["sl_no"];
                delete newData["id"];
            }
            setState({});
            props.onFormSubmit(newData)
        }
    }

    return (
        <Form name="basic"
            labelCol={{
                span: 8,

            }}
            wrapperCol={{
                span: 10,
                offset: 1
            }}
            onFinish={handleSubmit}>
            <div>
                <div className="modalStyle">
                    <Form.Item label="Specialization" >
                        <SelectBox
                            isMulti={false}
                            isSearchable={true}
                            value={state.spec_data || ''}
                            onChange={handleSpecChange}
                            options={spec}
                        />
                        <div className="errorMsg">{errors && errors.errors && errors.errors.spec_id}</div>
                    </Form.Item>
                    <Form.Item label="Sub specialization">
                        <SelectBox
                            isMulti={false}
                            isSearchable={true}
                            value={state.sub_spec_data || ''}
                            onChange={(e) => handleSubChange(e)}
                            options={sub_spec}
                        />
                        <div className="errorMsg">{errors && errors.errors && errors.errors.sub_spec_id}</div>
                    </Form.Item>
                    <Form.Item label="Title">
                        <div className="inputStyle">
                            <Input id="title" name="title" onChange={handleChange} value={state.title} /></div>
                        <div className="errorMsg">{errors && errors.errors && errors.errors.title}</div>
                    </Form.Item>
                    <Form.Item label="URL">
                        <div className="inputStyle">
                            <Input id="url" name="url" onChange={handleChange} value={state.url} /></div>
                        <div className="errorMsg">{errors && errors.errors && errors.errors.url}</div>
                    </Form.Item>
                    <Form.Item label="Status" wrapperCol={{ span: 14, offset: 1 }}>
                        <Radio.Group onChange={(e) => radioOnChange('status', e)} value={state.active}>
                            <Radio value={true}>
                                Enable
                            </Radio>
                            <Radio value={false}>
                                Disable
                            </Radio>
                        </Radio.Group>
                        <div className="errorMsg">{errors && errors.errors && errors.errors.status}</div>
                    </Form.Item>
                </div>
            </div>
            <Form.Item wrapperCol={{ offset: 10, span: 3 }}>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export default DrawerContent;
