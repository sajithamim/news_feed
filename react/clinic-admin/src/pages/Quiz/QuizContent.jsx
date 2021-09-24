import React, { useEffect, useState } from "react";
import { Button, Card, Table, Space, Drawer, Popconfirm, message, Spin } from "antd";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import DrawerContent from "./DrawerContent";
import { Icon, IconButton } from "@material-ui/core";
import "./Quiz.css";


const QuizContent = () =>{
    const dispatch = useDispatch();
    const [showDrawer, setShowDrawer] = useState(false);
    const [drawerType, setDrawerType] = useState("");
    const [editData, setEditData] = useState({});


    const onClose = () => {
        setShowDrawer(false);
      };
      
    const onAdd = () => {
        setShowDrawer(true);
        setDrawerType("add");
      };

    const quizcolumns = [
        {
          title: "Sl No:",
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
          key: "id",
          align: "center",
          render: (text, record) => (
            <Space size="middle">
              <Button type="link" onClick="">
                Edit
              </Button>
              <Popconfirm
                title="Are you sure to delete this category?"
                onConfirm=""
                onCancel=""
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
            title="Quiz"
            extra={
              <IconButton onClick={onAdd}>
                <Icon>add</Icon>
              </IconButton>
            }
            style={{ width: "100%" }}
          >
              <Table columns={quizcolumns} dataSource="" /> : 
              {/* <div className="spinner"><Spin tip="Loading..." style={{ align: "center" }} /></div> */}
          </Card>
          <Drawer
            title={
              drawerType === "edit"
                ? "Edit Category"
                : drawerType === "add"
                  ? "Add Quiz"
                  : ""
            }
            placement="right"
            width={750}
            closable={true}
            onClose={onClose}
            visible={showDrawer}
            key="drawer"
          >
            <DrawerContent drawerType={drawerType} type="cat" editData={(drawerType === 'edit') ? editData : {}} />
          </Drawer>
        </div>
      );
    };

export default QuizContent;