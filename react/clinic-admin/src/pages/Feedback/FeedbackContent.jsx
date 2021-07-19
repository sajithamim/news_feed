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
    feedbackList && feedbackList.results && feedbackList.results.map((item,key) => {
      key++;
      return items.push({
        sl_no:key,
        email: item.email,
        feedback: item.feedback,
      });
    })
    return items;
  }
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
      title: "Sl No",
      dataIndex: "sl_no",
      key: "sl_no",
      
    },
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
        <Table columns={columns} pagination={pagination} dataSource={feedbacks} />
      </Card>
    </div>
  );
};

export default FeedbackContent;
