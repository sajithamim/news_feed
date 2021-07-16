
import React, { useEffect } from "react";
import { Table, Col, Row , Card} from "antd";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import DetailContent from "./DetailContent";
import { getUserCategory, getUserSpecialization, getUserDetails } from "../../actions/users";


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
  const { userCategory, userSpec, userDetails } = useSelector(state => state.users);
  const { emailId } = useParams();

  useEffect(() => {
    dispatch(getUserDetails(emailId))
    dispatch(getUserCategory(emailId))
    dispatch(getUserSpecialization(emailId))
  }, [])

  const catList = []
  userCategory && userCategory.data && userCategory.data.map(item => {
    return catList.push({
      title: item.category_id.title
    })
  });
 


  const renderTable = () => {
    const specList = [];
    userSpec && userSpec.data && userSpec.data.map(item => {
      specList.push(<tr><td>{item.spec_id.name}</td></tr>)
      item.sub_userspec_id && item.sub_userspec_id.map(subItem => {
        specList.push(<tr><td></td><td>{subItem.sub_spec_id.name}</td></tr>)
      })
    })
    return specList;
  }

  return (
    <div className="main-content">
      <Container fluid>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="User Details" bordered={true}>
              <p>User Name : {userDetails.data && userDetails.data.username}</p>
              <p>Email : {userDetails.data && userDetails.data.email}</p>
              <p>Phone Number : {userDetails.data && userDetails.data.phone}</p>
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Specializations and Sub Specializations" bordered={true}>
            <table className="table table-bordered">
              <thead>
                <th>Specialization</th>
                <th>Sub Specialization</th>
              </thead>
              <tbody>
                  {renderTable()}
              </tbody>
            </table>
            </Card>
          </Col>
        </Row>
        
        <Row gutter={12} style={{marginTop: "-121px"}}>
          <Col span={12}>
          <Card title="Category List" bordered={true}>
                <Table columns={columns} dataSource={catList} />
          </Card>
        </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UserDetails;
