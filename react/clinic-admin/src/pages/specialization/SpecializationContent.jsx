import React, {useState , useEffect } from "react";
import { Button, Card, Table, Space, Drawer, Popconfirm, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import { Link } from 'react-router-dom';
import { Icon, IconButton } from "@material-ui/core";
import DrawerContent from "./DrawerContent"
import { getSpecialisation } from "../../actions/spec";

const SpecializationContent = () => {
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState("");

  useEffect(() => {
    dispatch(getSpecialisation());
  }, [])

  const { specialization }  = useSelector(state => state.spec );
   console.log("spec" ,specialization);

  const onClose = () => {
    setShowDrawer(false);
  };

  const onEdit = () => {
    setShowDrawer(true);
    setDrawerType("edit");
  };

  const onAdd = () => {
    setShowDrawer(true);
    setDrawerType("add");
  };

  const confirmDelete = (e) => {
    message.success("Delete Specialization");
  };

  const cancel = (e) => {
    message.error("Cancelled");
  };
  
  const specsGenerator = () => {
    const items = [];
    specialization && specialization.results && specialization.results.map((cvalue) => {
      items.push(cvalue);
    })
    return items;
  };
  const specs = specsGenerator();

 
  const columns = [
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
      render: (text,record) => (
        <Link to={"/data/SubSpecialization/" + record.id}>{text}</Link>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" onClick={onEdit}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this specialization?"
            onConfirm={confirmDelete}
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

  return (
    <div style={{ margin: "10px" }}>
      <Card
        title="Specializations" 
        extra={
          <IconButton onClick={onAdd}>
            <Icon>add</Icon>
          </IconButton>
        }
        style={{ width: "100%" }}
      >
        <div></div>
        <Table columns={columns} dataSource={specs} />
      </Card>
      <Drawer
        title={
          drawerType === "edit"
            ? "Edit Specialization"
            : drawerType === "add"
            ? "Add Specialization"
            : ""
        }
        placement="right"
        width={750}
        closable={true}
        onClose={onClose}
        visible={showDrawer}
        key="drawer"
      >
        <DrawerContent drawerType={drawerType} />
      </Drawer>
    </div>
  );
};

export default SpecializationContent;
