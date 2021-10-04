import React, { useEffect, useState } from "react";
import { Space, Table, Card, Popconfirm, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getContact, deleteContactMessage } from "../../actions/settings";

const Contact = () => {
    const dispatch = useDispatch();
    const { contactList } = useSelector(state => state.settings);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [slNo, setSlNo] = useState(0);
    const { page } = useSelector(state => state.settings);

    useEffect(() => {
        dispatch(getContact())
    }, [])

    const conatctGenerator = () => {
        let serialNo = pageSize * slNo;
        const contacts = [];
        contactList && contactList.results && contactList.results.map((item, key) => {
            serialNo++;
           return contacts.push({
                id: item.id,
                sl_no: serialNo,
                name: item.name,
                phone: item.phone,
                message: item.message
            })
        })
        return contacts;
    }

    const cancel = (e) => {
        message.error('Cancelled');
    };

    const onConfirm = (id) => {
        dispatch(deleteContactMessage(id))
        .then((res) => {
            message.success("Contact deleted successfully");
        })
    }
    const handleChange = (page, size, sorter) => {
        setCurrent(page)
        setSlNo(page - 1)
        dispatch(getContact(page));
    }

    const pagination = {
        current,
        pageSize,
        showSizeChanger: false,
        onChange: (page, pageSize, sorter) => { handleChange(page, pageSize, sorter) },
        total: contactList.count
    }

    const columns = [
        {
            title: "Sl No:",
            dataIndex: "sl_no",
            key: "sl_no",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Phone number",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Message",
            dataIndex: "message",
            key: "message",
        },
        {
            title: "Action",
            key: "id",
            align: "center",
            render: (text, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Are you sure you want to delete this Message?"
                        onConfirm={() => onConfirm(record.id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link">Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    return (
        <div style={{ margin: "10px" }}>
            <Card title="Contact Us">
                {contactList && contactList.results && page == current ?
                    (<Table columns={columns} pagination={pagination} dataSource={conatctGenerator()} />) : (<div className="spinner"></div>)}
            </Card>
        </div>
    )
}
export default Contact;