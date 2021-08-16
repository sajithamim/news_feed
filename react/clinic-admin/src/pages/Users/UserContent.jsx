import React, { useEffect } from "react";
import { Card, Table, Spin, Space, Popconfirm, Button, message } from "antd";
import { useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Icon, IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList, deleteUser } from "../../actions/users"

const UserContent = () => {
  const { userList } = useSelector(state => state.users);
  console.log("userList" , userList);
  const dispatch = useDispatch();
  let history = useHistory();
  useEffect(() => {
    dispatch(getUsersList())
  }, [])


  const onAdd = () => {
  };

  const confirmDelete = (id) => {
    console.log("id", id);
    dispatch(deleteUser(id));
  };

  const cancel = (e) => {
    message.error("Cancelled");
  };

  const userGenerator = () => {
    const Items = [];
    userList && userList.results && userList.results.map((item, key) => {
      key++;
      return Items.push({
        sl_no: key,
        id: item.id,
        name: item.name,
        email: item.email,
        phone: item.phone,
      })
    })
    return Items;
  }
  const User = userGenerator();
  const columns = [
    {
      title: 'Sl No',
      dataIndex: 'sl_no',
      key: 'sl_no',
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link to={"/data/UserDetails/" + record.email}>{text}</Link>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          <Button type="link">
            <Link to={"/userdetails/" + record.email}>View Details</Link>
          </Button>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => confirmDelete(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <IconButton >
              <Icon>delete</Icon>
            </IconButton>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ margin: "10px" }}>
      <Card
        title="Users"
      > {userList && userList.results ?
        (<Table columns={columns} dataSource={User} />) :
        (<div className="spinner"><Spin tip="Loading..." style={{ align: "center" }} /></div>)}
      </Card>
    </div>
  );
};

export default UserContent;
