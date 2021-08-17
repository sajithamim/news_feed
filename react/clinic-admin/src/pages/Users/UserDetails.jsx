
import React, { useState, useEffect } from "react";
import { Form, Input, Table, Col, Row, Tag, Card, Tabs, DatePicker, Button, Space } from "antd";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { getUserCategory, getUserSpecialization, getUserDetails, postUserProfile, getUserProfile, getQualifications } from "../../actions/users";
import Select from 'react-select';
import { PlusOutlined } from '@ant-design/icons';
import "./Users.css";
const columns = [
  {
    title: "",
    dataIndex: "title",
    key: "title",
  }
];
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { TabPane } = Tabs;
const customStyles = {
  control: () => ({
    marginLeft: '50px',
    width: 200,
  }),
}

const UserDetails = () => {
  const [state, setState] = useState("");
  const [inputVisible , setinputVisible] =useState(true);
  const dispatch = useDispatch();
  const { userCategory, userSpec, userDetails } = useSelector(state => state.users);
  const { emailId } = useParams();
  const [errors, setErrors] = useState({});
  useEffect(() => {
    dispatch(getUserDetails(emailId))
    dispatch(getUserCategory(emailId))
    dispatch(getUserSpecialization(emailId))
    dispatch(getUserProfile(userDetails.data && userDetails.data.id))
      .then((res) => {
        if (res && res.data && res.data.results.length >= 0) {
          setState(res.data.results[0]);
        }
      })
    dispatch(getQualifications());
  }, [])

  const catList = []
  userCategory && userCategory.data && userCategory.data.map(item => {
    return catList.push({
      title: item.category_id.title
    })
  });

  const options = [
    { value: '1', label: 'Full Time' },
    { value: '2', label: 'Part Time' },
    { value: '3', label: 'Self Employed' },
    { value: '4', label: 'Freelance' },
    { value: '5', label: 'Internship' },
    { value: '6', label: 'Trainee' },
  ];

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const handleMediaChange = (e) => {
    let newData = [];
    newData = ["test"];
    setState({ ...state, media: newData });
  }
  const handleSelectChange = (value) => {
    setState({ ...state, empolyment_value: value, empolyment_type: value.label });
  }
  const onDateChange = (value, dateString) => {
    setState({ ...state, start_date: dateString[0], end_date: dateString[1] })
  }

  const showInput = () => {
    setinputVisible(false);
  }

  const handleValidation = () => {
    let fields = state;
    let errors = {};
    let formIsValid = true;
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Name is required";
    }
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Name is required";
    }
    setErrors({ errors });
    return formIsValid;
  }

  const handleUserProfileSubmit = () => {
    if (handleValidation())
      setState({ ...state, user_id: userDetails.data && userDetails.data.id });
    console.log("state", state);
    // dispatch(postUserProfile(state));
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
                <img className="Avatar" width="128px" height="128px" style={{ borderRadius: '50%' }} alt="No Image" src="" />
                {/* <Input type="file"
                  id="image"
                  name="image"
                  accept="image/png, image/jpeg" onChange={handleFileChange} /> */}
              </Form.Item>
            </Col>
            <Col span={16}>
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
              <Form name="basic" labelCol={{ span: 3 }} wrapperCol={{ span: 7 }} onFinish={handleUserProfileSubmit}>
                <Form.Item label="Name">
                  <Input name="name" className="form-control" type="text" value={state.name} onChange={handleChange} />
                  <div className="errorMsg">{errors && errors.errors && errors.errors.name}</div>
                </Form.Item>
                <Form.Item label="About">
                  <TextArea name="about" addonAfter="About Us" rows={4} wrapperCol={{ span: 7 }} onChange={handleChange} value={state.about} style={{ marginLeft: '47px' }} />
                </Form.Item>
                <Form.Item label="Qualification">
                  <Tag className="site-tag-plus" onClick={showInput}>
                    <PlusOutlined /> New Tag
                  </Tag>
                  {/* <Input name="qualification" className="form-control" type="text" value={state.qualification} onChange={handleChange} /> */}
                </Form.Item>
                <Form.Item label="Experience">
                  <Input name="experience" className="form-control" type="text" value={state.experience} onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Employment Type">
                  <Select style={customStyles}
                    id="employment_type"
                    isMulti={false}
                    value={state.empolyment_value}
                    onChange={handleSelectChange}
                    options={options}
                  />
                </Form.Item>
                <Form.Item label="Company Name">
                  <Input name="company_name" className="form-control" type="text" value={state.company_name} onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Location">
                  <Input name="location" className="form-control" type="text" value={state.location} onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Select Date" >
                  <Space direction="vertical" size={15} style={{ marginLeft: '50px' }} >
                    <RangePicker onChange={onDateChange} />
                  </Space>
                </Form.Item>
                <Form.Item label="Industry">
                  <Input name="industry" className="form-control" type="text" value={state.industry} onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Description">
                  <Input name="description" className="form-control" type="text" value={state.description} onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Media URL">
                  <Input name="media" className="form-control" type="text" value={state.media} onChange={handleMediaChange} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
                  <Button type="primary" htmlType="submit" >Save</Button>
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane
              tab={
                <span>
                  Specialization
                </span>
              }
              key="2"
            >
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
              <Form name="basic" labelCol={{ span: 3 }} wrapperCol={{ span: 7 }}>
                <Form.Item label="Publication Title">
                  <Input name="pub_title" className="form-control" type="text" value="" />
                </Form.Item>
                <Form.Item label="Image">
                  <Input name="pub_title" className="form-control" type="text" value="" />
                </Form.Item>
                <Form.Item label="Publisher">
                  <Input name="publisher" className="form-control" type="text" value="" />
                </Form.Item>
                <Form.Item label="Publication Date">
                  <Input name="pub_title" className="form-control" type="text" value="" />
                </Form.Item>
                <Form.Item label="Author">
                  <Input name="author" className="form-control" type="text" value="" />
                </Form.Item>
                <Form.Item label="Publication URL">
                  <Input name="pub_url" className="form-control" type="text" value="" />
                </Form.Item>
                <Form.Item label="Description">
                  <Input name="pub_title" className="form-control" type="text" value="" />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
                  <Button type="primary" htmlType="submit">Save</Button>
                </Form.Item>
              </Form>
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
