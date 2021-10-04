import React, { useEffect } from "react";
import { Space, Table, Card, Popconfirm, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getContact, deleteContactMessage } from "../../actions/settings";

const Contact = () => {
    const dispatch = useDispatch();
    const { contactList } = useSelector(state => state.settings);

    useEffect(() => {
        dispatch(getContact())
        .then(() => {
            message.success("Contact deleted successfully");
        })
    }, [])

    const conatctGenerator = () => {
        const contacts = [];
        contactList && contactList.results && contactList.results.map((item, key) => {
            contacts.push({
                id: item.id,
                sl_no: key+1,
                name: item.name,
                phone: item.phone,
                message: item.message
            })
        })
        return contacts;
    }

    const cancel = (e) => {
    };

    const onConfirm = (id) => {
        dispatch(deleteContactMessage(id));
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
            <Card title="Contact Us" style={{ width: "100%", height: '500px' }}>
                <Table columns={columns} dataSource={conatctGenerator()} />
            </Card>
        </div>
    )
}
export default Contact;