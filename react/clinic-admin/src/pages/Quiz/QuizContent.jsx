import React, { useState, useEffect } from "react";
import { Button, Card, Table, Space, Drawer, Popconfirm, message, Spin } from "antd";
import "antd/dist/antd.css";
import { useDispatch, useSelector } from "react-redux";
import DrawerContent from "./DrawerContent";
import { Icon, IconButton } from "@material-ui/core";
import { getQuiz } from "../../actions/quiz";
import "./Quiz.css";


const QuizContent = () => {
  const dispatch = useDispatch();
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState("");
  const [editData, setEditData] = useState({});
  const { quizList , addData } = useSelector(state => state.Quiz);
  console.log("quizList", quizList);
  useEffect(() => {
    dispatch(getQuiz())
  }, [addData])


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

  // const quizGenerator = () => {
  //   const items = [];
  //   console.log("quizGenerator", quizGenerator);
  //   quizList && quizList.results && quizList.results.map((item, key) => {
  //     key++;
  //     return items.push({
  //       sl_no: key,
  //       id: item.id,
  //       title: item.title,
  //     })
  //   })
  //   return items;
  // }

  const pagination = () => {

  }

  const cancel = (e) => {
    message.error('Cancelled');
  }


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
            onConfirm=""
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
        <Table columns={columns} pagination={pagination} dataSource="" />
      </Card>
      <Drawer
        title={
          drawerType === "edit"
            ? "Edit Quiz"
            : drawerType === "add"
              ? "Add Quiz"
              : ""
        }
        placement="right" width={750} closable={true} onClose={onClose} visible={showDrawer} key="drawer">
        <DrawerContent drawerType={drawerType} type="quiz" editData={(drawerType === 'edit') ? editData : {}} />
      </Drawer>
    </div>
  );
};

export default QuizContent;