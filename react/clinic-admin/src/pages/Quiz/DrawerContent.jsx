import React, { useEffect, useState } from "react";
import { Form, Input, Button, Radio, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { postQuiz, updateQuiz, getSpecialization, getSubSpecialisation } from "../../actions/quiz";
import SelectBox from 'react-select';
import { useParams } from "react-router-dom";
import "./Quiz.css";


const DrawerContent = (props) => {
    console.log("props, " , props)
    const [state, setState] = useState(props.editData);
    const [errors, setErrors] = useState({ name: '' });
    const { specList, subspecialization } = useSelector(state => state.Quiz);
    const [specId, setSpecId] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
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
        console.log("value" , value);
        setState({ ...state, spec_data: value, spec_id: value.value });
        dispatch(getSubSpecialisation(value.value));
    };
    const handleSubChange = (value) => {
        
       setState({ ...state, sub_spec_data: value, sub_spec_id: value.value });
    };
    const formValidation = () => {
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
        if (!fields["spec_id"]) {
            formIsValid = false;
            errors["spec_id"] = "Specialization cannot be empty";
        }
        if (!fields["sub_spec_id"]) {
            formIsValid = false;
            errors["sub_spec_id"] = "Sub specialization cannot be empty";
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
        let form_data = null;
        if (formValidation()) {
            setErrors({});
            if (props.drawerType === 'edit') {
                delete newData["sl_no"];
                delete newData["id"];
                delete newData["spec_data"];
                delete newData["spec_title"];
                delete newData["sub_spec_data"];
                delete newData["sub_spec_title"];
                dispatch(updateQuiz(id, newData, form_data))
                    .then((res) => {
                        setState({});
                        (message.success('Quiz edited successfully'))
                    });
            }
            else {
                dispatch(postQuiz(state, form_data))
                    .then((res) => {
                        setState({});
                        message.success('Quiz added successfully')
                    });
            }
        }
    }

    return (
        <Form name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 10,
            }} onFinish={handleSubmit}>
            <div>
                <div className="modalStyle">
                    <Form.Item label="Specialization" wrapperCol={{ offset: 2, span: 10 }} >
                        <SelectBox
                            isMulti={false}
                            isSearchable={true}
                            value={state.spec_data}
                            onChange={handleSpecChange}
                            options={spec}
                        />
                        <div className="errorMsg">{errors && errors.errors && errors.errors.spec_id}</div>
                    </Form.Item>
                    <Form.Item label="Sub specialization" wrapperCol={{ offset: 2, span: 10 }}>
                        <SelectBox
                            isMulti={false}
                            isSearchable={true}
                            value={state.sub_spec_data}
                            onChange={handleSubChange}
                            options={sub_spec}
                        />
                        <div className="errorMsg">{errors && errors.errors && errors.errors.sub_spec_id}</div>
                    </Form.Item>
                    <Form.Item label="Title">
                        <Input id="title" name="title" onChange={handleChange} value={state.title} />
                        <div className="errorMsg">{errors && errors.errors && errors.errors.title}</div>
                    </Form.Item>
                    <Form.Item label="URL">
                        <Input id="url" name="url" onChange={handleChange} value={state.url} />
                        <div className="errorMsg">{errors && errors.errors && errors.errors.url}</div>
                    </Form.Item>
                    <Form.Item label="Status" wrapperCol={{ offset: 2, span: 14 }}>
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
            <Form.Item
                wrapperCol={{
                    offset: 7
                }}
            >
                <Button id="btn" type="primary" htmlType="submit" >
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export default DrawerContent;
