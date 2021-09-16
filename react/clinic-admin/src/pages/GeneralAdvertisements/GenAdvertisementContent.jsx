import React, { useState, useEffect } from "react";
import { Card, Table, Space, Drawer, Popconfirm, message, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import { Icon, IconButton } from "@material-ui/core";
import { getGeneralAdvertisment , deleteGenAds} from "../../actions/genAds";
import DrawerContent from "./DrawerContent"

const GenAdvertisementContent = () => {
  
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState("");
  const [editData, setEditData] = useState({});
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [slNo, setSlNo] = useState(0);

  const { genAdsList , addGenAdd , updateGenAdd, page} = useSelector(state => state.genAds);
  console.log("genAdsList" , genAdsList);
  useEffect(() => {
    dispatch(getGeneralAdvertisment(page))
    onClose();
  }, [ addGenAdd, updateGenAdd])

  const onClose = () => {
    setShowDrawer(false);
  };

  const onEdit = (record) => {
    setEditData(record);
    setShowDrawer(true);
    setDrawerType("edit");
  };

  const onAdd = () => {
    setShowDrawer(true);
    setDrawerType("add");
  };

  const confirmDelete = (id) => {
    dispatch(deleteGenAds(id))
    .then(() => {
      message.success("Advertisement deleted successfully");
    })
  };

  const cancel = (e) => {
    message.error("Cancelled");
  };


  const genAdsGenerator = () => {
    let serialNo = pageSize * slNo;
    const items = [];
    genAdsList && genAdsList.results && genAdsList.results.map((item) => {
      console.log("url", item);
      serialNo++;
      return items.push({
        sl_no: serialNo,
        id: item.id,
        title: item.title,
        url: item.url,
        active: item.active,
        image: item.addimage
      })
    });
    return items;
    }

  const handleChange = (page, size, sorter) => {
    console.log("page", page);
    setCurrent(page)
    setSlNo(page-1)
    dispatch(getGeneralAdvertisment(page))
  }
  
  const pagination = {
    current,
    pageSize,
    onChange: (page, pageSize, sorter) => { handleChange(page, pageSize, sorter) },
    total: genAdsList.count
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
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          <IconButton onClick={() => onEdit(record)}>
            <Icon>edit</Icon>
          </IconButton>
          <Popconfirm
            title="Are you sure to delete this Advertisement?"
            onConfirm={() => confirmDelete(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <IconButton >
              <Icon>delete</Icon>
            </IconButton>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ margin: "10px" }}>
      <Card
        title="General Advertisements"
        extra={
          <IconButton onClick={onAdd}>
            <Icon>add</Icon>
          </IconButton>
        }
        style={{ width: "100%" }}
      >
        {genAdsList && genAdsList.results &&  page == current ? 
        (<Table columns={columns} dataSource={genAdsGenerator()} pagination={pagination} />) : (<div className="spinner"><Spin tip="Loading..." style={{ align: "center" }} /></div>)}
      </Card>
      <Drawer
        title={
          drawerType === "edit"
            ? "Edit General Advertisements"
            : drawerType === "add"
              ? "Add General Advertisements"
              : ""
        }
        placement="right" width={750} closable={true} onClose={onClose} visible={showDrawer} key="drawer">
        <DrawerContent drawerType={drawerType} type="spec" editData={(drawerType === 'edit') ? editData : {}} />
      </Drawer>
    </div>
  );
};

export default GenAdvertisementContent;
