import React, { useState, useEffect } from "react";
import { Button, Card, Table, Space,  Popconfirm, message , Spin  } from "antd";
import "antd/dist/antd.css";
import { Link } from 'react-router-dom';
import { Icon, IconButton } from "@material-ui/core";
import { useDispatch , useSelector} from "react-redux";
import { getUsersList  } from "../../actions/users"

const UserDetails = () => {
  
  const onClose = () => {
    
  };

  const onEdit = (record) => {
  };

  const onAdd = () => {
    //setShowDrawer(true);
    //setDrawerType("add");
  };

  const confirmDelete = () => {
    
  };

  const cancel = (e) => {
    message.error("Cancelled");
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text, record) => (
        <Link to="">{text}</Link>
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
  ];

  return (
    <div style={{ margin: "10px" }}>
      <Card
        title="Users"
        extra={
          <IconButton onClick={onAdd}>
            <Icon>add</Icon>
          </IconButton>
        }
        style={{ width: "100%" }}
      > 
          <Table columns={columns} dataSource= "abcd" /> 
      </Card>
    </div>
  );
};

export default UserDetails;
