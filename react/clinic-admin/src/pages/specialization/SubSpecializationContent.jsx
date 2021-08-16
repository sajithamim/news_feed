import React, { useState, useEffect } from "react";
import { Button, Card, Table, Space, Drawer, Popconfirm, message, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import { Icon, IconButton } from "@material-ui/core";
import DrawerContent from "./DrawerContent"
import { useParams } from "react-router-dom";
import { getSubSpecialisation } from "../../actions/spec";
import { deleteSubSpec } from "../../actions/spec";


const SubSpecializationContent = () => {
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState("");
  const [editData, setEditData] = useState({});
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { specId } = useParams();

  const { subspecialization, updateSubData, addSubData } = useSelector(state => state.spec);
  
  
  useEffect(() => {
    dispatch(getSubSpecialisation(specId))
      onClose();
  }, [updateSubData, addSubData])

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
 
  const handleChange = (page, size, sorter) => {
    setCurrent(page)
    dispatch(getSubSpecialisation(specId, page));
  }

  const confirmDelete = (id) => {
    console.log("subspec id", id);
    dispatch(deleteSubSpec(id))
      .then((res) => {
        res.status === 204 ? message.success("Sub Specialitity deleted successfully") : message.error("Sub Specialitity is not exist")
      })
  };

  const cancel = (e) => {
    message.error("Cancelled");
  };

  const subSpecGenerator = () => {
    const items = [];
    subspecialization.map((item, key) => {
      key++;
      items.push({
        sl_no: key,
        id: item.id,
        name: item.name,
        icon: item.icon
      })
    })
    return items;
  }
  const subSpec = subSpecGenerator();

  const columns = [
    {
      title: "Sl No",
      dataIndex: "sl_no",
      key: "sl_no",
    },
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this sub Specialitity?"
            onConfirm={() => confirmDelete(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const pagination = {
    current,
    pageSize,
    onChange: (page, pageSize, sorter) => { handleChange(page, pageSize, sorter) },
    total: subspecialization.count
  }

  return (
    <div style={{ margin: "10px" }}>
      <Card
        title="Sub Specialitity"
        extra={
          <IconButton onClick={onAdd}>
            <Icon>add</Icon>
          </IconButton>
        }
        style={{ width: "100%" }}
      >
        {subSpec ?
          (<Table columns={columns} pagination={pagination} dataSource={subSpec}/>) : (<div className="spinner"><Spin tip="Loading..." style={{align:"center"}} /></div>)}
      </Card>
      <Drawer
        title={
          drawerType === "edit"
            ? "Edit Sub Specialization"
            : drawerType === "add"
              ? "Add  Sub Specialization"
              : ""
        }
        placement="right"
        width={750}
        closable={true}
        onClose={onClose}
        visible={showDrawer}
        key="drawer"
      >
        <DrawerContent drawerType={drawerType} type="sub_spec" editData={(drawerType === 'edit') ? editData : {}} />
      </Drawer>
    </div>
  );
};

export default SubSpecializationContent;
