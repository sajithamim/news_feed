
import React, { useEffect } from "react";
import { Table } from "antd";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Breadcrumb from "../../Breadcrumb/Breadcrumb";
import Card from "../../Components/Card/Card";
import { Link, useParams } from 'react-router-dom';
import DetailContent from "./DetailContent";
import { getUserCategory } from "../../actions/users";


const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (text, record) => (
      <Link to="">{text}</Link>
    ),
  }
];


const UserDetails = () => {
  const dispatch = useDispatch();
  const { userCategory } = useSelector(state => state.users);
  const { emailId } = useParams();
  useEffect(() => {
    dispatch(getUserCategory(emailId))
  })
  

const catGenerator = () => {
  const items = []
    userCategory && userCategory.data && userCategory.data.map(item => {
    items.push(item.category_id);
  }); 
  return items
}

const catList = catGenerator();
  
  return (
    <div className="main-content">
      <Container fluid>
        <div>
          <Breadcrumb path="Reports / Report Details" />
          <Card
            content={
              <div>
                <div
                  className="content-heading-innerpage"
                >
                  Report Details
                </div>
                <div className="content-content">
                  <DetailContent />
                </div>
              </div>
            }
            title={false}
            footer={false}
          />
          <Card
            content={
              <div>
                <div
                  className="content-heading-innerpage"
                >
                  Report Details
                </div>
                <div className="content-content">
                  <Table columns={columns} dataSource={catList} />
                </div>
              </div>
            }
            title={false}
            footer={false}
          />
        </div>

      </Container>
    </div>
  );
};

export default UserDetails;
