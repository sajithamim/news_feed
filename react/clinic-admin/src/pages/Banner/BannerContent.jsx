import React, { useState, useEffect } from "react";
import { Button, Card, Table, Space, Drawer, Popconfirm, message, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.css";
import { Link } from 'react-router-dom';
import { Icon, IconButton } from "@material-ui/core";
// import DrawerContent from "./DrawerContent"
import { getSpecialization, deleteSpec } from "../../actions/spec";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const BannerContent = () => {
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState("");
  const [editData, setEditData] = useState({});
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const { specList, updateData, addData } = useSelector(state => state.spec);

  useEffect(() => {
    dispatch(getSpecialization())
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
      .then((res) => {
        res.status === 204 ? message.success("Specialization is deleted successfully") : message.error("Specialization is not exist")
      })
  };

  const cancel = (e) => {
    message.error("Cancelled");
  };

  const handleChange = (page, size, sorter) => {
    setCurrent(page)
    dispatch(getSpecialization(page));
  }

  const specGenerator = () => {
    const items = [];
    specList && specList.results && specList.results.map((item, key) => {
      key++;
      return items.push({
        sl_no: key,
        id: item.id,
        name: item.name,
        icon: item.icon
      })
    })
    return items;
  }
  const spec = specGenerator();

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
      title: "Banner",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
{/*          
          <Fab size="small" color="primary" aria-label="edit" onClick={() => onEdit(record)}>
            <EditIcon />
          </Fab>

          <Popconfirm
            title="Are you sure to delete this specialization?"
            onConfirm={() => confirmDelete(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          > */}
            {/* <Fab size="small" color="primary" aria-label="delete" >
              <DeleteIcon />
            </Fab>
          </Popconfirm>
          <Button type="link">
            <Link to={"/sub_specialization/" + record.id}>Add/Edit Sub Speciality</Link>
          </Button> */}

        </Space>
      ),
    },
  ];

  return (
    <div style={{ margin: "10px" }}>
      <Card
        title="Banners"
        extra={
          <IconButton onClick={onAdd}>
            <Icon>add</Icon>
          </IconButton>
        }
        style={{ width: "100%" }}
      >
         <Table columns={columns} pagination={pagination} dataSource="" />
      </Card>
      <Drawer
        title={
          drawerType === "edit"
            ? "Edit Banner"
            : drawerType === "add"
              ? "Add Banner"
              : ""
        }
        placement="right" width={750} closable={true} onClose={onClose} visible={showDrawer} key="drawer">
        {/* <DrawerContent drawerType={drawerType} type="spec" editData={(drawerType === 'edit') ? editData : {}} /> */}
      </Drawer>
    </div>
  );
};

export default BannerContent;
