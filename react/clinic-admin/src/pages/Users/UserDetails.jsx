
import React, { useState, useEffect } from "react";
import { Form, Input, Table, Col, Row, Card, Tabs, DatePicker ,Button} from "antd";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { getUserCategory, getUserSpecialization, getUserDetails } from "../../actions/users";
import Select from 'react-select';
import { Icon, IconButton } from "@material-ui/core";
import "./Users.css";
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
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const handleFileChange = (info) => {
  // setImage(info.target.files[0]);
  // const imageFile = info.target.files[0];
  // const newErrorsState = { ...errors };
  // if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
  //   newErrorsState.image = 'Please select valid image.';
  //   setErrors(newErrorsState);
  //   setFormSubmit(!formSubmit);
  //   return false;
  // } else {
  //   const reader = new FileReader();
  //   reader.addEventListener("load", () => {
  //     setImgData(reader.result);
  //   });
  //   reader.readAsDataURL(info.target.files[0]);
  //   newErrorsState.image = '';
  //   setErrors({});
  //   setFormSubmit(!formSubmit);
  // }
}

const UserDetails = () => {
  const dispatch = useDispatch();
  const { userCategory, userSpec, userDetails } = useSelector(state => state.users);
  const { emailId } = useParams();
  console.log("userdetails", userDetails);
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

  const handleChange = () => {

  }

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
        <Card>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item >
                <img className="Avatar" width="128px" height="128px" alt="" src="" />
                <Input type="file"
                  id="image"
                  name="image"
                  accept="image/png, image/jpeg" onChange={handleFileChange} />
              </Form.Item>
            </Col>
            <Col span={16}>
              {/* title="User Details" bordered={true}> */}
              <p>Name : {userDetails.data && userDetails.data.username}</p>
              <p>Email : {userDetails.data && userDetails.data.email}</p>
              <p>Phone Number : {userDetails.data && userDetails.data.phone}</p>
            </Col>
            <Col span={2}>
              <Button type="primary"><Link to="/Users">Back</Link></Button>
            </Col>
          </Row>
        </Card>

        <Card>
          <Tabs defaultActiveKey="1">
            <TabPane
              tab={
                <span>
                  Basic Info
                </span>
              }
              key="1"
            >
              <Form.Item label="Name" wrapperCol={{ offset: 5, span: 8 }}>
                {/* <input type="text" className="form-control" id="" placeholder="Username" value="" /> */}
                <Input name="title1" className="form-control" type="text" value="" />
              </Form.Item>
              <Form.Item label="About" wrapperCol={{ offset: 5, span: 8 }}>
                <textarea className="form-control" id="textAreaExample1" rows="4" />
              </Form.Item>
              <Form.Item label="Qualification" wrapperCol={{ offset: 4, span: 8 }}>
                <Input name="title1" className="form-control" type="text" value="" />
              </Form.Item>
              <Form.Item label="Employment Type" wrapperCol={{ offset: 3, span: 8 }}>
                <Select
                  isMulti={false}
                  value="{state.category_data}"
                  onChange={handleChange}
                  options=""
                />
              </Form.Item>
              <Form.Item label="Organization" wrapperCol={{ offset: 4, span: 8 }}>
                <Input name="title1" className="form-control" type="text" value="" />
              </Form.Item>
              <Form.Item label="Location" wrapperCol={{ offset: 4, span: 8 }}>
                <Input name="title1" className="form-control" type="text" value="" />
              </Form.Item>
              <Form.Item label="Select" wrapperCol={{ offset: 4, span: 8 }}>
                <RangePicker />
              </Form.Item>
              <Form.Item label="Industry" wrapperCol={{ offset: 5, span: 8 }}>
                <Input name="title1" className="form-control" type="text" value="" />
              </Form.Item>
              <Form.Item label="Description" wrapperCol={{ offset: 5, span: 8 }}>
                <Input name="title1" className="form-control" type="text" value="" />
              </Form.Item>
              <Form.Item label="Media URL" wrapperCol={{ offset: 5, span: 8 }}>
                <Input name="title1" className="form-control" type="text" value="" />
              </Form.Item>
            </TabPane>
            <TabPane
              tab={
                <span>
                  Specialization
                </span>
              }
              key="2"
            >
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
            </TabPane>
            <TabPane
              tab={
                <span>
                  Category
                </span>
              }
              key="3"
            >
              <Card title="Category List" bordered={true}>
                <Table columns={columns} dataSource={catList} pagination={false} />
              </Card>
            </TabPane>
            <TabPane
              tab={
                <span>
                  Publications
                </span>
              }
              key="4"
            >
            </TabPane>
          </Tabs>
        </Card>
        {/* <Col span={12}>
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
          </Col> */}
        {/* </Row> */}

        {/* <Row gutter={12} style={{ marginTop: "-121px" }}>
          <Col span={12}>
            <Card title="Category List" bordered={true}>
              <Table columns={columns} dataSource={catList} pagination={false} />
            </Card>
          </Col>
        </Row> */}
      </Container>
    </div>
  );
};

export default UserDetails;
