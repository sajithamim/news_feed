import React, { useState, useEffect } from "react";
import { Button, Card, Table, Space, Drawer, Popconfirm, message, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import { Link } from 'react-router-dom';
import { Icon, IconButton } from "@material-ui/core";
import { getGeneralAdvertisment} from "../../actions/genAds";
import DrawerContent from "./DrawerContent"

const GenAdvertisementContent = () => {
  
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState("");
  const [editData, setEditData] = useState({});
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [slNo, setSlNo] = useState(0);

  // const { getGenAdsList } = useSelector(state => state.genAds);
  // console.log("genAdsList" , getGenAdsList);
  useEffect(() => {
    dispatch(getGeneralAdvertisment())
    onClose();
  }, [])

  const onClose = () => {
    setShowDrawer(false);
  };

  const onEdit = (record) => {
    setEditData(record);
    setShowDrawer(true);
    setDrawerType("edit");
  };

  const onAdd = () => {
    setShowDrawer(true);
    setDrawerType("add");
  };

  const confirmDelete = (id) => {
    
  };

  const cancel = (e) => {
    message.error("Cancelled");
  };

  const handleChange = (page, size, sorter) => {
    setCurrent(page)
    setSlNo(page-1)
    // dispatch(getSpecialization(page));
  }
 
  const specGenerator = () => {
    
  }
  
  const pagination = {
    current,
    pageSize,
    onChange: (page, pageSize, sorter) => { handleChange(page, pageSize, sorter) },
    // total: specList.count
  }

  const columns = [
    {
      title: "Sl No",
      dataIndex: "sl_no",
      key: "sl_no",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title", 
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          <IconButton onClick={() => onEdit(record)}>
            <Icon>edit</Icon>
          </IconButton>
          <Popconfirm
            title="Are you sure to delete this specialization?"
            onConfirm={() => confirmDelete(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <IconButton >
              <Icon>delete</Icon>
            </IconButton>
          </Popconfirm>
          <Button type="link">
            <Link to={"/sub_specialization/" + record.id}>Sub Speciality</Link>
          </Button>
          <Button type="link">
            <Link to={"/advisory_board/" + record.id}>Advisory Board</Link>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ margin: "10px" }}>
      <Card
        title="General Advertisements"
        extra={
          <IconButton onClick={onAdd}>
            <Icon>add</Icon>
          </IconButton>
        }
        style={{ width: "100%" }}
      >
          <Table columns={columns} pagination={pagination} dataSource="" />
      </Card>
      <Drawer
        title={
          drawerType === "edit"
            ? "Edit General Advertisements"
            : drawerType === "add"
              ? "Add General Advertisements"
              : ""
        }
        placement="right" width={750} closable={true} onClose={onClose} visible={showDrawer} key="drawer">
        <DrawerContent drawerType={drawerType} type="spec" editData={(drawerType === 'edit') ? editData : {}} />
      </Drawer>
    </div>
  );
};

export default GenAdvertisementContent;
