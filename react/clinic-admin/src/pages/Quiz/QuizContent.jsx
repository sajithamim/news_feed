import React, { useState, useEffect } from "react";
import { Button, Card, Table, Space, Drawer, Popconfirm, message, Spin } from "antd";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import DrawerContent from "./DrawerContent";
import { Icon, IconButton } from "@material-ui/core";
import { getQuiz, deleteQuiz } from "../../actions/quiz";
import "./Quiz.css";


const QuizContent = () => {
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [slNo, setSlNo] = useState(0);
  const [drawerType, setDrawerType] = useState("");
  const [editData, setEditData] = useState({});
  const { quizList , addData, updateData ,page} = useSelector(state => state.Quiz);

  useEffect(() => {
    dispatch(getQuiz())
  }, [addData, updateData])


  const onClose = () => {
    setShowDrawer(false);
  };

  const onAdd = () => {
    setShowDrawer(true);
    setDrawerType("add");
  };

  const onEdit = (record) => {
    setEditData(record);
    setShowDrawer(true);
    setDrawerType("edit");
  };

  const quizGenerator = () => {
    let serialNo = pageSize * slNo;
    const items = [];
    quizList && quizList.results && quizList.results.map((item, key) => {
      serialNo++;
      const quiz = [];
      const specData = [];

      return items.push({
        sl_no: serialNo,
        id: item.id,
        title: item.title,
        // spec_data: {value:item.sub_spec_id.spec_id,
        sub_spec_title: item.sub_spec_id.name,
        sub_spec_data: {value: item.sub_spec_id.id, label: item.sub_spec_id.name},
        spec_data: {value: item.sub_spec_id.spec_id.id, label: item.sub_spec_id.spec_id.name},
        url: item.url,
        active: item.active,
      })
    })
    return items;
  }

  const handleChange = (page, size, sorter) => {
    setCurrent(page)
    setSlNo(page - 1)
    dispatch(getQuiz(page));
  }

  const pagination = {
    current,
    pageSize,
    onChange: (page, pageSize) => { handleChange(page, pageSize) },
    total: quizList.count
  }

  const cancel = (e) => {
    message.error('Cancelled');
  }

  const onConfirm = (id) => {
    dispatch(deleteQuiz(id))
      .then((res) => {
        message.success("Category is deleted successfully")
      })
  };


  const columns = [
    {
      title: "Sl No",
      dataIndex: "sl_no",
      key: "sl_no",
    },
    {
      title: "Quiz",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Sub specialization",
      dataIndex: "sub_spec_title",
      key: "sub_spec_title",
    },
    {
      title: "Action",
      key: "id",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => { onEdit(record) }}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this topic?"
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
        title="Quiz"
        className="quizCard"
        extra={
          <IconButton onClick={onAdd}>
            <Icon>add</Icon>
          </IconButton>
        }>
        {quizList && quizList.results && page == current ?
          (<Table columns={columns} pagination={pagination} dataSource={quizGenerator()} />) : (<div className="spinner"><Spin tip="Loading..." style={{ align: "center" }} /></div>)}
      </Card>
      <Drawer
        title={
          drawerType === "edit"
            ? "Edit Quiz"
            : drawerType === "add"
              ? "Add Quiz"
              : ""
        }
        placement="right"
        width={750}
        closable={true}
        onClose={onClose}
        visible={showDrawer}
        key="drawer"
      >
        <DrawerContent drawerType={drawerType} type="Qui" editData={(drawerType === 'edit') ? editData : null} />
      </Drawer>
    </div>
  );
};

export default QuizContent;