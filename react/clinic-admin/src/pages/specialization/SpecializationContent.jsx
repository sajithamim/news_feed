import React, { useState, useEffect } from "react";
import { Button, Card, Table, Space, Drawer, Popconfirm, message, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import { Link } from 'react-router-dom';
import { Icon, IconButton } from "@material-ui/core";
import DrawerContent from "./DrawerContent"
import { getSpecialization, deleteSpec } from "../../actions/spec";

const SpecializationContent = () => {
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState("");
  const [editData, setEditData] = useState({});
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [slNo, setSlNo] = useState(0);
  const { specList, updateData, addData, page } = useSelector(state => state.spec);
  
  useEffect(() => {
    dispatch(getSpecialization(page))
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

  const confirmDelete = (id) => {
    dispatch(deleteSpec(id))
      .then(() => {
        message.success("Specialization is deleted successfully")
      })
  };

  const cancel = (e) => {
    message.error("Cancelled");
  };

  const handleChange = (page, size, sorter) => {
    setCurrent(page)
    setSlNo(page - 1)
    dispatch(getSpecialization(page));
  }

  const specGenerator = () => {
    let serialNo = pageSize * slNo;
    const items = [];
    specList && specList.results && specList.results.map((item, key) => {
      serialNo++;
      return items.push({
        sl_no: serialNo,
        key: item.id,
        id: item.id,
        name: item.name,
        icon: item.icon
      })
    })
    return items;
  }

  const pagination = {
    current,
    pageSize,
    onChange: (page, pageSize, sorter) => { handleChange(page, pageSize, sorter) },
    total: specList.count
  }

  const columns = [
    {
      title: "Sl No",
      dataIndex: "sl_no",
      key: "sl_no",
    },
    {
      title: "Specialization",
      dataIndex: "name",
      key: "name",
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
            title="Topics are created under specialization , Are you sure to delete it?"
            onConfirm={() => confirmDelete(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <IconButton >
              <Icon>delete</Icon>
            </IconButton>
          </Popconfirm>
          <Button type="link">
            <Link to={"/sub_specialization/" + record.id}>Sub Speciality</Link>
          </Button>
          <Button type="link">
            <Link to={"/advisory_board/" + record.id}>Advisory Board</Link>
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="specStyle">
      <Card
        title="Specialities and Sub Specialities"
        className="specCard"
        extra={
          <IconButton onClick={onAdd}>
            <Icon>add</Icon>
          </IconButton>
        }>
        {specList && specList.results && page == current ?
          (<Table columns={columns} pagination={pagination} dataSource={specGenerator()} />) : (<div className="spinner"><Spin tip="Loading..."/></div>)}
      </Card>
      <Drawer
        title={
          drawerType === "edit"
            ? "Edit Specialization"
            : drawerType === "add"
              ? "Add Specialization"
              : ""
        }
        placement="right" width={750} closable={true} onClose={onClose} visible={showDrawer} key="drawer">
        <DrawerContent drawerType={drawerType} type="spec" editData={(drawerType === 'edit') ? editData : {}} />
      </Drawer>
    </div>
  );
};

export default SpecializationContent;
