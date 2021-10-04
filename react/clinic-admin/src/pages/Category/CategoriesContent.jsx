import React, { useState, useEffect } from "react";
import { Button, Card, Table, Space, Drawer, Popconfirm, message, Spin } from "antd";
import "antd/dist/antd.css";
import { Icon, IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import DrawerContent from "./DrawerContent";
import { getCategory } from "../../actions/category";
import { deleteCategory } from "../../actions/category";


const CategoriesContent = () => {
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [slNo, setSlNo] = useState(0);
  const [drawerType, setDrawerType] = useState("");
  const [editData, setEditData] = useState({});
  const { catlist, updateData, addData, page } = useSelector(state => state.category);

  useEffect(() => {
    dispatch(getCategory());
    onClose();
  }, [updateData, addData])


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

  const onConfirm = (id) => {
    dispatch(deleteCategory(id))
      .then((res) => {
        res.status === 204 ? message.success("Category is deleted successfully") : message.error("Category is not exist")
      })
  };

  const handleChange = (page, size, sorter) => {
    setCurrent(page)
    setSlNo(page - 1)
    dispatch(getCategory(page));
  }

  const pagination = {
    current,
    pageSize,
    onChange: (page, pageSize) => { handleChange(page, pageSize) },
    total: catlist.count
  }

  const cancel = (e) => {
  };

  const catGenerator = () => {
    let serialNo = pageSize * slNo;
    const items = [];
    catlist && catlist.results && catlist.results.map((item, key) => {
      serialNo++;
      items.push({
        sl_no: serialNo,
        id: item.id,
        title: item.title,
        image: item.image
      })
    });
    return items;
  }


  const columns = [
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
          <Button type="link" onClick={() => onEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Topics are created under categories , are you sure you want to delete this category?"
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
        {catlist.results && page == current ?
          (<Table columns={columns} dataSource={catGenerator()} pagination={pagination} />) : (<div className="spinner"><Spin tip="Loading..." style={{ align: "center" }} /></div>)}
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
        <DrawerContent drawerType={drawerType} type="cat" editData={(drawerType === 'edit') ? editData : {}} />
      </Drawer>
    </div>
  );
};

export default CategoriesContent;
