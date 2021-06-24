import React from "react";
import { Card, Table } from "antd";
import "antd/dist/antd.css";

const FeedbackContent = () => {
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

  const columns = [
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
    },
  ];
  return (
    <div style={{ margin: "10px" }}>
      <Card title="Feedback" style={{ width: "100%" }}>
        <Table columns={columns} dataSource={feedbacks} />
      </Card>
    </div>
  );
};

export default FeedbackContent;
