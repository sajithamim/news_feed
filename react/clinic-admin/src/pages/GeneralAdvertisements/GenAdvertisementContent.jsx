import React, { useState, useEffect } from "react";
import { Button, Card, Table, Space, Drawer, Popconfirm, message, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import { Link } from 'react-router-dom';
import { Icon, IconButton } from "@material-ui/core";
import { getGeneralAdvertisment , deleteGenAds} from "../../actions/genAds";
import DrawerContent from "./DrawerContent"

const GenAdvertisementContent = () => {
  
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState("");
  const [editData, setEditData] = useState({});
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [slNo, setSlNo] = useState(0);

  const { genAdsList , addGenAdd} = useSelector(state => state.genAds);

  useEffect(() => {
    dispatch(getGeneralAdvertisment())
    onClose();
  }, [ addGenAdd ])

  const onClose = () => {
    setShowDrawer(false);
  };

  const onEdit = (record) => {
    console.log("record" , record);
    setEditData(record);
    setShowDrawer(true);
    setDrawerType("edit");
  };

  const onAdd = () => {
    setShowDrawer(true);
    setDrawerType("add");
  };

  const confirmDelete = (id) => {
    dispatch(deleteGenAds(id))
    .then(() => {
      message.success("Advertisement deleted successfully");
    })
  };

  const cancel = (e) => {
    message.error("Cancelled");
  };


  const genAdsGenerator = () => {
    const items = [];
    genAdsList && genAdsList.results && genAdsList.results.map((item) => {
      return items.push({
        id: item.id,
        title: item.title
      })
    });
    return items;
    }

  const handleChange = (page, size, sorter) => {
    setCurrent(page)
    setSlNo(page-1)
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
            title="Are you sure to delete this Advertisement?"
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
        title="General Advertisements"
        extra={
          <IconButton onClick={onAdd}>
            <Icon>add</Icon>
          </IconButton>
        }
        style={{ width: "100%" }}
      >
        {genAdsList && genAdsList.results ? 
        (<Table columns={columns} dataSource={genAdsGenerator()} pagination={pagination} />) : (<div className="spinner"><Spin tip="Loading..." style={{ align: "center" }} /></div>)}
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
