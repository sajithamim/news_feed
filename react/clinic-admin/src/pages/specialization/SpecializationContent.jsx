import React, {useState} from "react";
import { Button, Card, Table, Space, Drawer, Popconfirm, message } from "antd";
import "antd/dist/antd.css";
import { Icon, IconButton } from "@material-ui/core";
import DrawerContent from "./DrawerContent"

const SpecializationContent = () => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState("");

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

  const specsGenerator = (quantity) => {
    const items = [];
    for (let i = 0; i < quantity; i++) {
      items.push({
        id: i,
        name: `Item name ${i}`,
      });
    }
    return items;
  };
  const specs = specsGenerator(7);

  const columns = [
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
