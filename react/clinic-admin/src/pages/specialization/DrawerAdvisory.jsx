import React, { useEffect, useState } from "react";
import { Form, Input, Button, message, AutoComplete } from "antd";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { postSubSpecialization } from "../../actions/spec";
import { postSpecialization, updateSpecialization, updateSubSpecialization } from "../../actions/spec";
import "./Drawer.css";
import { UserOutlined } from '@ant-design/icons';

const DrawerAdvisory = (props) => {

    const [state, setState] = useState(props.editData);

    const [errors, setErrors] = useState({ name: '' });

    const [imgData, setImgData] = useState("");

    const [image, setImage] = useState("");

    const [formSubmit, setFormSubmit] = useState(false);

    const renderTitle = (title) => (
        <span>
            {title}
            <a
                style={{
                    float: 'right',
                }}
                href="https://www.google.com/search?q=antd"
                target="_blank"
                rel="noopener noreferrer"
            >
                more
            </a>
        </span>
    );

    const renderItem = (title, count) => ({
        value: title,
        label: (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                {title}
                <span>
                    <UserOutlined /> {count}
                </span>
            </div>
        ),
    });

    const options = [
        {
            label: renderTitle('Libraries'),
            options: [renderItem('AntDesign', 10000), renderItem('AntDesign UI', 10600)],
        },
        {
            label: renderTitle('Solutions'),
            options: [renderItem('AntDesign UI FAQ', 60100), renderItem('AntDesign FAQ', 30010)],
        },
        {
            label: renderTitle('Articles'),
            options: [renderItem('AntDesign design language', 100000)],
        },
    ];

    useEffect(() => {
        setState(props.editData);
        if (props.editData.icon && props.editData.icon.startsWith("/media"))
            setImgData(`${process.env.REACT_APP_API_BASE_URL}${props.editData.icon}`);
        else
            setImgData(props.editData.icon);
    }, [props.editData])

    const dispatch = useDispatch();
    const { specId } = useParams();


    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    };

    const handleSubmit = () => {

    }

    return (
        <Form name="basic" labelCol={{ span: 10 }} wrapperCol={{ span: 15 }} onFinish={handleSubmit}>
            <AutoComplete
                wrapperCol={{ span: 7 }}
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={500}
                isMulti={true}
                style={{ marginLeft: '50px', width: 550 }}
                options={options}
            >
                <Input.Search size="large" placeholder="input here" />
            </AutoComplete>

            <Form.Item wrapperCol={{offset: 7}}>
                <Button id="advisory" type="primary" htmlType="submit" >
                    Save
                </Button>
            </Form.Item>
        </Form>
    );
};

export default DrawerAdvisory;
