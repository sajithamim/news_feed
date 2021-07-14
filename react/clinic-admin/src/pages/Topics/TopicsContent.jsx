import React, { useEffect, useState } from "react";
import { Button, Card, Table, Space, Drawer, Popconfirm, message } from "antd";
import "antd/dist/antd.css";
import ModalContent from "./ModalContent";
import { useDispatch, useSelector } from "react-redux";
import { Icon, IconButton } from "@material-ui/core";
import { getTopic , deleteTopic} from "../../actions/topic";

const TopicsContent = (props) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState("");
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTopic())
  }, [])

  const { topicList }= useSelector(state => state.topic);
  
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

  const confirmDelete = (id) => {
    delete(deleteTopic(id))
  }
  
  const cancel = (e) => {
    message.error('Cancelled');
  }

  const topicGenerator = (quantity) => {
    const items = [];
    topicList && topicList.results && topicList.results.map(item => {
      return items.push({
        id: item.id,
        title: item.title,
        category_id: item.category_id.title

      })
    });
    return items;
    }

  const topics = topicGenerator();

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category_id",
      key: "category_id",
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
            title="Are you sure to delete this topic?"
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

  return (
    <div style={{ margin: "10px" }}>
      <Card
        title="Topics"
        extra={
          <IconButton onClick={onAdd}>
            <Icon>add</Icon>
          </IconButton>
        }
        style={{ width: "100%" }}
      >
        <Table columns={columns} dataSource={topics} />
      </Card>
      <Drawer
        title={
          drawerType === "edit"
            ? "Edit Topic"
            : drawerType === "add"
            ? "Add Topic"
            : ""
        }
        placement="right"
        width={750}
        closable={true}
        onClose={onClose}
        visible={showDrawer}
        key="drawer"
      >
        <ModalContent drawerType={drawerType} />
      </Drawer>
    </div>
  );
};

export default TopicsContent;
