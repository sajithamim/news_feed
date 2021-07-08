import React, { useState , useEffect } from "react";
import { Button, Card, Table, Space, Drawer, Popconfirm, message } from "antd";
import "antd/dist/antd.css";
import { Icon, IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import DrawerContent from "./DrawerContent";
import { getCategory } from "../../actions/category";
import { deleteCategory } from "../../actions/category";


const CategoriesContent = () => {
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState("");
 

  useEffect(() => {
    dispatch(getCategory());
  }, [])

  const { catlist }  = useSelector(state => state.category);
  
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

  const onConfirm = (id) => {
    dispatch(deleteCategory(id))
    .then((res) => {
      res.status == 204 ? message.success("Category is deleted successfully") : message.error("Category is not exist")
    })
  };

  const cancel = (e) => {
   // message.error("Cancelled");
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Action",
      key: "id",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" onClick={onEdit}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this category?"
            onConfirm={() => onConfirm(record.id)}
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
        title="Categories"
        extra={
          <IconButton onClick={onAdd}>
            <Icon>add</Icon>
          </IconButton>
        }
        style={{ width: "100%" }}
      >
        {catlist.results ? 
        (<Table columns={columns} dataSource={catlist.results} />) : (<p> Loading...</p>)}
      </Card>
      <Drawer
        title={
          drawerType === "edit"
            ? "Edit Category"
            : drawerType === "add"
            ? "Add Category"
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

export default CategoriesContent;
