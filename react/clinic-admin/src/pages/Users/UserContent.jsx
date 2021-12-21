import React, { useState, useEffect } from "react";
import { Card, Table, Spin, Space, Popconfirm, message } from "antd";
import "antd/dist/antd.css";
import { Link } from 'react-router-dom';
import { Icon, IconButton } from "@material-ui/core";
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone';
import { useDispatch, useSelector } from "react-redux";
import { getUsersList, deleteUser } from "../../actions/users"
import { useHistory } from "react-router-dom";
import { logout } from "../../actions/auth.js"

const UserContent = () => {
  const { userList, addUser, updateUser, page, success, error } = useSelector(state => state.users);
  console.log("userList", userList);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [slNo, setSlNo] = useState(0);
  const dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    dispatch(getUsersList(page))
  }, [addUser, updateUser])


  useEffect(() => {
    if (success) {
      message.success(success);
      dispatch({ type: 'RESET_DATA' })
    }
    else if (error) {
      message.error(error);
      dispatch({ type: 'RESET_DATA' })
      const clearToken = localStorage.clear();
      dispatch(logout());
      history.push("/login");
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
    setSlNo(page - 1)
    dispatch(getUsersList(page));
  }

  const cancel = (e) => {
    message.error("Cancelled");
  };

  const userGenerator = () => {
    let serialNo = pageSize * slNo;
    const Items = [];
    userList && userList.results && userList.results.filter((user, key) => {
      key++;
      serialNo++;
      Items.push({
        key: user.id,
        sl_no: serialNo,
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
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
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          <Link to={"/userdetails/" + record.email} style={{ color: 'black' }}><RemoveRedEyeTwoToneIcon /></Link>
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => dispatch(deleteUser(record.id, current))}
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
        (<Table columns={columns} dataSource={User} pagination={pagination} />) :
        (<div className="spinner"><Spin tip="Loading..." style={{ align: "center" }} /></div>)}
      </Card>
    </div>
  );
};

export default UserContent;
