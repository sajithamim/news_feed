import React, { useEffect, useState } from "react";
import { Card, Table,Pagination} from "antd";
import { useDispatch , useSelector} from "react-redux";
import "antd/dist/antd.css";
import { getFeedback } from "../../actions/feedback";

const FeedbackContent = () => {
const  dispatch = useDispatch();

const { feedbackList } = useSelector(state => state.feedback);
const [current,setCurrent] = useState(1);
const [pageSize , setPageSize] = useState(10);

  const feedbackGenerator = (quantity) => {
    const items = [];
    for (let i = 0; i < quantity; i++) {
      items.push({
        id: i,
        name: `Item name ${i}`,
        email: "Example@gmail.com",
        feedback: "Test Feedback",
      });
    }
    return items;
  };
  const feedbacks = feedbackGenerator(7);

  const handleChange = (page , size , sorter) => {
    setCurrent(page)
    dispatch(getFeedback(page));
    console.log("filters", sorter)
  }
  const pagination =  {
    current ,
    pageSize,
    onChange: (page, pageSize, sorter) => {handleChange(page, pageSize, sorter)},
    total: feedbackList.count
    
  }

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.email - b.email,
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
      
    }
  ];

  useEffect(() => {
    dispatch(getFeedback());
  },[])

 

  return (
    <div style={{ margin: "10px" }}>
      <Card title="Feedback" style={{ width: "100%" }}>
        <Table columns={columns} pagination={pagination} dataSource={feedbackList.results} />
      </Card>
    </div>
  );
};

export default FeedbackContent;
