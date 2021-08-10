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
  const { adsList  } = useSelector(state => state.ads);
 

  useEffect(() => {
    dispatch(getAds())
    onClose();
  }, [])

  const onClose = () => {
    setShowDrawer(false);
  };

  const onEdit = (record) => {
    setEditData(record);
  };

  const confirmDelete = (id) => {
    dispatch(deleteAdd(id))
      .then((res) => {
        message.success("Add is deleted successfully")
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
    },
    {
        title: "Specialization",
        dataIndex: "add_specialization",
        key: "specialization",
      },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => onEdit(record.id)}>
            <Link to={"/add_ads/" + record.id}>Edit</Link>
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
        title="Advertisement List"
        extra={
          <IconButton >
            <Icon><a href = "/add_ads">add</a></Icon>
          </IconButton>
        }
        style={{ width: "100%" }}
      >
       {adsList && adsList.results ?
          (<Table columns={columns} pagination={pagination} dataSource={ads} /> ): (<div className="spinner"><Spin tip="Loading..." style={{align:"center"}}/></div>)}
          {/* <div className="spinner"><Spin tip="Loading..." style={{align:"center"}}/></div>)} */}
      </Card>
    </div>
  );
};

export default Ads;
