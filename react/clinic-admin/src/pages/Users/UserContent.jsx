import React, { useEffect } from "react";
import { Card, Table , Spin  } from "antd";
import "antd/dist/antd.css";
import { Link } from 'react-router-dom';
import { Icon, IconButton } from "@material-ui/core";
import { useDispatch , useSelector} from "react-redux";
import { getUsersList  } from "../../actions/users"

const UserContent = () => {
  const { userList } = useSelector(state => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
   dispatch(getUsersList())
  }, [])


  const onAdd = () => {
    //setShowDrawer(true);
    //setDrawerType("add");
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text, record) => (
        <Link to={"/data/UserDetails/"+ record.email}>{text}</Link>
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
      > {userList && userList.data ?
          (<Table columns={columns} dataSource={userList.data} />) :
          (<div className="spinner"><Spin tip="Loading..." style = {{align:"center"}}/></div>)}
      </Card>
    </div>
  );
};

export default UserContent;
