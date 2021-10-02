import React, { useState, useEffect } from "react";
import { Space, Table, Card, Input, Popconfirm, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getContact, deleteContactMessage } from "../../actions/settings";

const Contact = () => {
    const { TextArea } = Input;
    const dispatch = useDispatch();
    const [state, setState] = useState("");
    const { contactList } = useSelector(state => state.settings);
    console.log("contactList",contactList);

    useEffect(() => {
        dispatch(getContact())
    }, [])

    const conatctGenerator = () => {
        const contacts=[];
        console.log("contacts", contacts);
        contactList &&  contactList.results && contactList.results.map((item,key) => {
            contacts.push({
                id:item.id,
                sl_no: key+1,
                name: item.name,
                phone: item.phone, 
                message:item.message,

            })
        })
        return contacts;
    }
    
    const cancel = (e) => {
    };

    const onConfirm = (id) => {
        console.log("id",id);
        dispatch(deleteContactMessage(id));
    }
    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
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