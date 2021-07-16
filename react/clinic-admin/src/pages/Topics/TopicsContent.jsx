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

  const [editData , setEditData] = useState({});
  const { topicList , postTopic }= useSelector(state => state.topic);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getTopic()).then(res => {
      onClose();
    })
  }, [ postTopic ])


  const onClose = () => {
    setShowDrawer(false);
  };

  const onEdit = (record) => {
    setEditData(record)
    setShowDrawer(true);
    setDrawerType("edit");
  };

  const onAdd = () => {
    setShowDrawer(true);
    setDrawerType("add");
  };

  const confirmDelete = (id) => {
    dispatch(deleteTopic(id))
    .then((res) => {
      console.log("res",res);
      res.status === 204 ? message.success("Specialization is deleted successfully") : message.error("Specialization is not exist")
    })
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
        category_id: item.category_id.title,
        description: item.description,
        source_url: item.source_url,
        spec_id: item.topic_topic,
        publishingtime: item.publishingtime,
        publishtype: "later",
        deliverytype: item.deliverytype,
        mediatype: item.media_type !== null ? 'image' : item.video_type !== null ? 'video' : '',
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
          <Button type="link" onClick={() => {onEdit(record)}}>
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
        <ModalContent drawerType={drawerType} editData={(drawerType === 'edit') ? editData : null}/>
      </Drawer>
    </div>
  );
};

export default TopicsContent;
