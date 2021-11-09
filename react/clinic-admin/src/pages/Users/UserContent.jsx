import React, { useState , useEffect } from "react";
import { Card, Table, Spin, Space, Popconfirm, Button, message } from "antd";
import "antd/dist/antd.css";
import { Link } from 'react-router-dom';
import { Icon, IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList, deleteUser } from "../../actions/users"

const UserContent = () => {
  const { userList , addUser , updateUser, page, success, error} = useSelector(state => state.users);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [slNo, setSlNo] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersList())
  }, [ addUser,  updateUser])

  useEffect(() => {
    if(success) {
      message.success(success);
      dispatch({type: 'RESET_DATA'})
    }
    else if(error) {
      message.error(error);
      dispatch({type: 'RESET_DATA'})
    }
  }, [success, error])

  const pagination = {
    current,
    pageSize,
    showSizeChanger: false,
    onChange: (page, pageSize, sorter) => { handleChange(page, pageSize, sorter) },
    total: userList.count
  }

  const handleChange = (page, size, sorter) => {
    setCurrent(page);
    setSlNo(page-1)
    dispatch(getUsersList(page));
  }

  const cancel = (e) => {
    message.error("Cancelled");
  };

  const userGenerator = () => {
    let serialNo = pageSize * slNo;
    const Items = [];
    userList && userList.results && userList.results.map((item, key) => {
      key++;
      serialNo++;
      return Items.push({
        key: item.id,
        sl_no: serialNo,
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
            onConfirm={() =>dispatch(deleteUser(record.id, current))}
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
      > {userList && userList.results && page == current ?
        (<Table columns={columns} dataSource={User} pagination={pagination}/>) :
        (<div className="spinner"><Spin tip="Loading..." style={{ align: "center" }} /></div>)}
      </Card>
    </div>
  );
};

export default UserContent;
