import React, { useEffect, useState } from "react";
import { Button, Card, Table, Space, Drawer, Popconfirm, message , Spin, Form } from "antd";
import "antd/dist/antd.css";
import ModalContent from "./ModalContent";
import { useDispatch, useSelector } from "react-redux";
import { Icon, IconButton } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { getTopic , deleteTopic, postTopic, updateTopic  } from "../../actions/topic";

const TopicsContent = (props) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState("");
  const [expended, setExpended] = useState()
  const [data , setData] = useState({});
  const { topicList, success, error, page} = useSelector(state => state.topic);
  const [current, setCurrent] = useState(1);
  const [pageSize , setPageSize] = useState(30);
  const [slNo, setSlNo] = useState(0);
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");
  let history = useHistory();
  useEffect(() => {
    if (accessToken === 'null' && accessToken === ' undefined'){
      history.push("/");
    }
    dispatch(getTopic(page))
    onClose();
  }, [success])

  useEffect(() => {
    if(success)
    message.success(success);
    else if(error) 
    message.error(error);
  }, [success, error])


  const onClose = () => {
    setShowDrawer(false);
  };

  const onEdit = (record) => {
    setData(record)
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

  const onFormSubmit = (newData, form_data, form_data_back , form_data2, form_data3, image_data) => {
    console.log("submit " , newData);
    onClose();
    // if(drawerType == 'edit') {
    //   dispatch(updateTopic(data.id, newData, form_data, form_data_back ,form_data2,form_data3, image_data));
    // } else {
    //   dispatch(postTopic(newData, form_data, form_data_back , form_data2 ,form_data3 , image_data));
    // }
  }

  const topicGenerator = () => {
    let serialNo = pageSize * slNo;
    const items = [];
    topicList && topicList.results && topicList.results.map((item , key) => {
      serialNo++;
      const topics = [];
      const specData = [];
      const images = [];
        item.topic_topic && item.topic_topic.map(item => {
          topics.push({spec_id: item.spec_id.id});
          specData.push({value: item.spec_id.id , label: item.spec_id.name})
        });

        item.topic_image && item.topic_image.map(item => {
          images.push({id: item.id, image: item.image});
        })
       
      items.push({
        sl_no: serialNo,
        id: item.id,
        title: item.title,
        title1: item.format === '1' ? item.title : null,
        description1: item.format == '1' ? item.description : null,
        title2: item.format === '2' ? item.title : null,
        description2: item.format == '2' ? item.description : null,
        title3: item.format === '3' ? item.title : null,
        description3: item.format == '3' ? item.description : null,
        category_title: item.category_id.title,
        category_data: {value: item.category_id.id, label: item.category_id.title},
        category_id: item.category_id.id,
        description: item.description,
        source_url: item.source_url,
        spec_data: specData,
        topic_topic: topics,
        publishingtime: item.publishingtime,
        publishtype: "later",
        deliverytype:item.deliverytype,
        P: item.deliverytype,
        media_type: item.media_type !== null ? 'image' : item.video_type !== null ? 'video' : '',
        old_image: images,
        video_url:item.video_url,
        pdfFront: item.pdf,
        pdfBack: item.pdfsecond,
        pdfSecond: item.pdf,
        pdfThird:item.pdf,
        format: item.format,
        external_url:item.external_url,
        external_url2: item.external_url,
        external_url3: item.external_url,
        email: item.author && item.author.username,
        published_status: item.published
      }) 
      
    });
    return items;
  }

  const handleChange = (page, size, sorter) => {
    setCurrent(page)
    setSlNo(page-1)
    dispatch(getTopic(page));
  }

  const pagination =  {
    current ,
    pageSize,
    showSizeChanger: false,
    onChange: (page, pageSize, sorter) => {handleChange(page, pageSize, sorter)},
    total: topicList.count
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
        } style={{ width: "100%" }} >
        {topicList && topicList.results  &&  page == current ?
        (<Table expandedRowKeys={[expended]} columns={columns} pagination={pagination} dataSource={topicGenerator()} />) : (<div className="spinner"><Spin tip="Loading..." style = {{align:"center"}}/></div>) }
      </Card>
      <Drawer
        title={drawerType === "edit" ? "Edit Topic" : drawerType === "add" ? "Add Topic" : "" }
        placement="right"
        width={750}
        closable={true}
        onClose={onClose}
        visible={showDrawer}
        key="drawer"
      >
        <ModalContent drawerType={drawerType} editData={(drawerType === 'edit') ? data : null} onFormSubmit={onFormSubmit}/>
      </Drawer>
    </div>
  );
};

export default TopicsContent;
