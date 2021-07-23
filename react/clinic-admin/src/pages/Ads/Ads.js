import React, { useState, useEffect } from "react";
import { Button, Card, Table, Space, Drawer, Popconfirm, message , Spin  } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import { Link } from 'react-router-dom';
import { Icon, IconButton } from "@material-ui/core";
import { getAds , deleteAdd} from "../../actions/ads";



const Ads = () => {
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState("");
  const [editData, setEditData] = useState({});
  const [current, setCurrent] = useState(1);
  const [pageSize , setPageSize] = useState(10);
  const { adsList } = useSelector(state => state.ads);
 
  console.log("adsList" , adsList);
  useEffect(() => {
    dispatch(getAds())
    onClose();
  }, [])

  const onClose = () => {
    setShowDrawer(false);
  };

  const onEdit = (record) => {
    setEditData(record);
    setShowDrawer(true);
    setDrawerType("edit");
  };



  const confirmDelete = (id) => {
    dispatch(deleteAdd(id))
      .then((res) => {
        res.status === 204 ? message.success("Add is deleted successfully") : message.error("Add is not exist")
      })
  };

  const cancel = (e) => {
    message.error("Cancelled");
  };

  const handleChange = (page , size , sorter) => {
    setCurrent(page)
    // dispatch(getSpecialization(page));
  }

  const adsGenerator = () => {
    const items = [];
    adsList && adsList.results && adsList.results.map((item , key) => {
      key++;
      const addSpecItems =[];
      item.add_specialization.map((addSpecItem) => {
          console.log("addSpecItem",addSpecItem);
           addSpecItems.push(addSpecItem.spec_id.name)
      })
      return items.push({
        sl_no: key,
        id: item.id,
        addimage: item.addimage,
        add_specialization: addSpecItems.toString(),
        title: item.title,
        url: item.url
      })
      
    })
    return items;
  }
  const ads = adsGenerator();

  const pagination =  {
    current ,
    pageSize,
    onChange: (page, pageSize, sorter) => {handleChange(page, pageSize, sorter)},
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
      render: (text, record) => (
        <Link to={"/data/SubSpecialization/" + record.id}>{text}</Link>
      ),
    },
    {
        title: "Specialization",
        dataIndex: "add_specialization",
        key: "specialization",
        render: (text, record) => (
          <Link to={"/data/SubSpecialization/" + record.id}>{text}</Link>
        ),
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
            title="Are you sure to delete this specialization?"
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
        title="Ads"
        extra={
          <IconButton >
            <a href = "/data/AddAds"><Icon>Add</Icon></a> 
          </IconButton>
        }
        style={{ width: "100%" }}
      >
       
          <Table columns={columns} pagination={pagination} dataSource={ads} /> 
          {/* <div className="spinner"><Spin tip="Loading..." style={{align:"center"}}/></div>)} */}
      </Card>
      <Drawer
        title={
          drawerType === "edit"
            ? "Edit Ads"
            : drawerType === "add"
              ? "Add Ads"
              : "" 
        }
        placement="right" width={750} closable={true} onClose={onClose} visible={showDrawer} key="drawer">
      </Drawer>
    </div>
  );
};

export default Ads;
