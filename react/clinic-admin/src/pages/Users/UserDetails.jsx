
import React, { useState, useEffect } from "react";
import { Form, Input, Table, Col, Row, Tag, Card, Tabs, DatePicker, Button, Upload, Space, message } from "antd";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams , useHistory, Redirect} from 'react-router-dom';
import { getUserCategory, getUserSpecialization, getUserDetails, postUserProfile, getUserProfile, getQualifications, putProfilePic } from "../../actions/users";
import Select from 'react-select';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
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
  const [inputVisible, setinputVisible] = useState(true);
  const dispatch = useDispatch();
  const { userCategory, userSpec, userDetails, qualifications } = useSelector(state => state.users);
  const { emailId } = useParams();
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState({});
  const [otherQualification , setOtherQualification] = useState({name: ''});
  const [activeInput, setActiveInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [previewImage, setPreviewImage] = useState({});
  const [previewVisible, setPreviewVisible] = useState({});
  const [previewTitle, setPreviewTitle] = useState({})
  const [fileList, setFileList] = useState({})
  useEffect(() => {
    dispatch(getUserDetails(emailId))
      .then((res) => {
        dispatch(getUserCategory(emailId))
        dispatch(getUserSpecialization(emailId))
        dispatch(getUserProfile(res.data && res.data.data && res.data.data.id))
        
          .then((res) => {
            res ? (setState(res.data.data)) : (setState({}));
            // const data = [];
            // res.data && res.data.data && res.data.data.qualifications.map(item => {
            //   const response = qualifications && qualifications.results && qualifications.results.filter(qual => qual.name == item);
            //   console.log('res', response)
            //   // if(response.length > 0)
            //    data.push(response)
            // }) 
          })
      })
    dispatch(getQualifications());
  }, [])
  let history = useHistory();
  const catList = []
  userCategory && userCategory.data && userCategory.data.map(item => {
    return catList.push({
      title: item.category_id.title
    })
  });

  const qualificationList = []
  qualifications && qualifications.results && qualifications.results.map(item => {
    return qualificationList.push(
      { value: item.id, label: item.name }
    )
  })
  const options = [
    { value: '1', label: 'Full-time' },
    { value: '2', label: 'Part-time' },
    { value: '3', label: 'Self-employed' },
    { value: '4', label: 'Freelance' },
    { value: '5', label: 'Internship' },
    { value: '6', label: 'Trainee' },
  ];

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleFileChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        setImageUrl(imageUrl);
        setLoading(false);
      });
    }
  };

  const handleChange = (e) => {
    const data = [];
    if (e.target.name === "media") {
      data.push(e.target.value.split(',').toString())
    }
    setState({ ...state, [e.target.name]: e.target.value, user_id: userDetails.data && userDetails.data.id, media: data });
  }

  const handleQualificationChange = (item) => {
    console.log('item', item)
    const data = [];
    item.map(item => {
       data.push(item.label)
       if (item.label === "Other"){
         setActiveInput(true);
       }
    })
    setState({ ...state, qualification: item, qualifications: data });
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

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));

  };

  const handleFileList = ({ fileList }) => {
    setFileList(fileList);
  }
  const handleBlur = (e) => {
    setOtherQualification({[e.target.name]: e.target.value});
  }

  
  const handleUserProfileSubmit = () => {
    let newData = state;
    delete newData["empolyment_value"];
    delete newData["id"];
    delete newData["username"];
    
    dispatch(postUserProfile(newData , otherQualification))
      .then(() => {
        message.success("User details Added Successfully");
        setState({});
        history.push("/users");
      })
  }

  return (
    <div className="main-content">
      <Container fluid>
        <Card>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item >
                <Upload
                  name="avatar"
                  action={dispatch(putProfilePic(state.id, fileList))}
                  multiple={false}
                  listType="picture-card"
                  className="avatar-uploader"
                  onPreview={handlePreview}
                  onChange={handleFileList}
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
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
                {/* <Form.Item label="Name">
                  <Input name="username" className="form-control" type="text" value={state.username} onChange={handleChange} />
                  <div className="errorMsg">{errors && errors.errors && errors.errors.name}</div>
                </Form.Item> */}
                <Form.Item label="About">
                  <TextArea name="about" addonAfter="About Us" rows={4} wrapperCol={{ span: 7 }} onChange={handleChange} value={state.about} style={{ marginLeft: '47px' }} />
                </Form.Item>
                <Form.Item label="Qualification" >
                  <Select style={customStyles}
                    id="qualification"
                    isMulti={true}
                    value={state.qualification}
                    onChange={handleQualificationChange}
                    options={qualificationList}
                  />
                </Form.Item>
                {activeInput ?
                  (<Form.Item label="Other Qualification">
                    <Input name="name" className="form-control" type="text" onChange={handleBlur} />
                  </Form.Item>) : null}
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
                  <Input name="media" className="form-control" type="text" value={state.media} onChange={handleChange} />
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
      </Container>
    </div>
  );
};

export default UserDetails;
