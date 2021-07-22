import React, { useEffect, useState } from "react";
import { Button, Card, Table, Space, Drawer, Popconfirm, message , Spin } from "antd";
import "antd/dist/antd.css";
import ModalContent from "./ModalContent";
import { useDispatch, useSelector } from "react-redux";
import { Icon, IconButton } from "@material-ui/core";
import { getTopic , deleteTopic} from "../../actions/topic";

const TopicsContent = (props) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState("");

  const [editData , setEditData] = useState({});
  const { topicList , postTopic, updateTopic }= useSelector(state => state.topic);
  const [current, setCurrent] = useState(1);
  const [pageSize , setPageSize] = useState(5);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getTopic())
    onClose();
  }, [ postTopic, updateTopic ])


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
      res.status === 204 ? message.success("Topics is deleted successfully") : message.error("Topics is not exist")
    })
  }
  
  const cancel = (e) => {
    message.error('Cancelled');
  }

  const topicGenerator = (quantity) => {
    const items = [];
    topicList && topicList.results && topicList.results.map((item , key) => {
      key++;
      const topics = [];
      item.topic_topic && item.topic_topic.map(item => {
        topics.push({spec_id: item.spec_id.id})
      });
      return items.push({
        sl_no: key,
        id: item.id,
        title: item.title,
        category_title: item.category_id.title,
        category_id: item.category_id.id,
        description: item.description,
        source_url: item.source_url,
        spec_id: item.topic_topic,
        topic_topic: topics,
        publishingtime: item.publishingtime,
        publishtype: "later",
        deliverytype: item.deliverytype,
        media_type: item.media_type !== null ? 'image' : item.video_type !== null ? 'video' : '',
        topic_image: item.topic_image,
        topic_videourl:item.video_url,
        pdf:item.pdf
      })
      
    });
    return items;
    }

  const topics = topicGenerator();

  const handleChange = (page , size , sorter) => {
    setCurrent(page)
    dispatch(getTopic(page));
  }

  const pagination =  {
    current ,
    pageSize,
    onChange: (page, pageSize, sorter) => {handleChange(page, pageSize, sorter)},
    total: topicList.count
  }

  const columns = [
    {
      title:"Sl No:",
      dataIndex: "sl_no",
      key:"sl_no"
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Category",
      dataIndex: "category_title",
      key: "category_title",
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
        {topicList && topicList.results ?
        (<Table columns={columns} pagination={pagination} dataSource={topics} />) : (<div className="spinner"><Spin tip="Loading..." style = {{align:"center"}}/></div>) }
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
        <ModalContent drawerType={drawerType} editData={(drawerType === 'edit') ? editData : {}}/>
      </Drawer>
    </div>
  );
};

export default TopicsContent;
