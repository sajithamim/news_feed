import React, { useEffect, useState } from "react";
import { Form, Input, Button, Radio, message } from "antd";
import { useDispatch } from "react-redux";
import { postQuiz } from "../../actions/quiz";
import "./Quiz.css";

const DrawerContent = (props) => {
    const [state, setState] = useState(props.editData);
    const [errors, setErrors] = useState({ name: '' });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    };
    const radioOnChange = (val, e) => {
        setState({ ...state, active: e.target.value })
    }

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
        if (fields.active === undefined) {
            formIsValid = false;
            errors["status"] = "Status is required"
        }

        setErrors({ errors });
        return formIsValid;

    }

    const handleSubmit = (e) => {
        const id = state.id
        state.sub_spec_id = 27
        if (formValidation()) {
            setErrors({});
            console.log("On submit", state, state.sub_spec_id);
            if (props.drawerType === 'add')  {
                dispatch(postQuiz(state))
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
                span: 6,
            }}
            wrapperCol={{
                span: 10,
            }} onFinish={handleSubmit}>
            <div>
                <div className="modalStyle">
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
