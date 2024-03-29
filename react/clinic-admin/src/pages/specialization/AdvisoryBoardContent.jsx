import React, { useState, useEffect } from "react";
import { Button, Card, Table, Space, Drawer, Popconfirm, message, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import { Link, useParams } from 'react-router-dom';
import { Icon, IconButton } from "@material-ui/core";
import DrawerAdvisory from "./DrawerAdvisory"
import { getSpecialization , getAdvisoryMembersList  , deleteAdvisoryMembers} from "../../actions/spec";
import { getUsersList } from "../../actions/users"

const AdvisoryBoardContent = () => {
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState("");
  const [editData, setEditData] = useState({});
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { specList, advisoryMemberList  , addAdvisoryData} = useSelector(state => state.spec);
  

  const { specId } = useParams();

  useEffect(() => {
    dispatch(getAdvisoryMembersList(specId))
    dispatch(getUsersList())
    onClose();
  }, [ addAdvisoryData ])

  const onClose = () => {
    setShowDrawer(false);
  };

  const advisoryGenerator = () => {
    const items = [];
    const oldAdvisoryItems = [];
    advisoryMemberList && advisoryMemberList.data && advisoryMemberList.data.map((item , key) => {
      key ++ ;
     items.push({
        sl_no : key,
        key: item.id,
        id: item.id,
        photo: item.user_id.profilepic,
        name: item.user_id.name,
        ph_no: item.user_id.phone,
        email: item.user_id.email
      })
    })
    return items;
  }
  const onAdd = () => {
    setShowDrawer(true);
    setDrawerType("add");
  };

  const confirmDelete = (id) => {
    dispatch(deleteAdvisoryMembers(id))
    .then(() => {
      message.success("Advisory Member deleted successfully")
  })
  };

  const cancel = (e) => {
    message.error("Cancelled");
  };

  const handleChange = (page, size, sorter) => {
    setCurrent(page)
    dispatch(getSpecialization(page));
  }

  const columns = [
    {
      title: "Sl No",
      dataIndex: "sl_no",
      key: "sl_no",
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (text, record) => {
        return (<img src={`${process.env.REACT_APP_API_BASE_URL}${record.photo}`} className="advisoryPhoto"/>);
      }
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "ph_no",
      key: "ph_no",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Are you sure to delete this Advisory Board Member?"
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
    <div className="specStyle">
      <Card
        title="Advisory Board Members"
        className="specCard"
        extra={
          <IconButton onClick={onAdd}>
            <Icon>add</Icon>
          </IconButton>
        }>
        <Table columns={columns}  dataSource={advisoryGenerator()}/>
      </Card>
      <Drawer
        title={
          drawerType === "add"
            ? "Add Advisory Board Members"
            : null
        }
        placement="right" width={750} closable={true} onClose={onClose} visible={showDrawer} key="drawer">
        <DrawerAdvisory drawerType={drawerType} />
      </Drawer>
    </div>
  );
};

export default AdvisoryBoardContent;
