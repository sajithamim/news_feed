
import React, { useState, useEffect } from "react";
import { Form, Input, Checkbox , Table, Col, Row, Card, Tabs, DatePicker, Button, Upload, Space, message, Drawer, Popconfirm, Progress } from "antd";
import { Container } from "react-bootstrap";
import { Icon, IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useHistory, Redirect } from 'react-router-dom';
import { getUserCategory, getUserSpecialization, getUserDetails, postUserProfile, getUserProfile, getQualifications, putProfilePic, getPublicationList, deleteUserPublication } from "../../actions/users";
import Select from 'react-select';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import DrawerContent from "./DrawerContent";
import moment from 'moment';
import "./Users.css";
import axios from 'axios';

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
  const { userCategory, userSpec, userDetails, userProfile, qualifications, publicationList, updatePublicationData, addPublicationData } = useSelector(state => state.users);
  console.log('publicationList', publicationList) 
  const { emailId } = useParams();
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState({});
  const [otherQualification, setOtherQualification] = useState({ name: '' });
  const [activeInput, setActiveInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerType, setDrawerType] = useState("");
  const [editData, setEditData] = useState({});
  const [imageUrl, setImageUrl] = useState();
  const [defaultFileList, setDefaultFileList] = useState([]);
  const [progress, setProgress] = useState(0);
  const [checked , setChecked] = useState("")

  useEffect(() => {
    dispatch(getUserDetails(emailId))
      .then((res) => {
        let userDetails = res.data.data;
        if (userDetails.profilepic != null) {
          setDefaultFileList([{
            uid: '-1',
            name: userDetails.profilepic,
            status: 'done',
            url: `https://clinictopic.metrictreelabs.com${userDetails.profilepic}`,
          }]);
        }

        setState({ ...state, id: userDetails.id, profilepic: userDetails.profilepic })
        dispatch(getUserCategory(emailId))
        dispatch(getUserSpecialization(emailId))
        if (res && res.data && res.data.data) {
          dispatch(getPublicationList(res.data && res.data.data && res.data.data.id))
          onClose();
          dispatch(getUserProfile(res.data && res.data.data && res.data.data.id))
            .then((res) => {
              if (res) {
                // to get the qualification details of user
                const getUserQualificationList = []
                res && res.data && res.data.data && res.data.data.qualifications && res.data.data.qualifications.map(item => {
                  return getUserQualificationList.push(
                    { value: item, label: item }
                  )
                })
                let result = res.data.data;
                setState({ ...state, id: result.user_id, media: result.media, qualification: getUserQualificationList, qualifications: result.qualifications, about: result.about, experience: result.experience, empolyment_value: { value: result.empolyment_type, label: result.empolyment_type }, company_name: result.company_name, location: result.location, industry: result.industry, description: result.description, start_date: result.start_date, end_date: result.end_date })
              } else {
                setState({ ...state })
              }
            })
        }
      })
    dispatch(getQualifications());
  }, [addPublicationData, updatePublicationData])

  let history = useHistory();
  const dateFormat = 'YYYY-MM-DD';

  const catList = []
  userCategory && userCategory.data && userCategory.data.map(item => {
    return catList.push({
      title: item.category_id.title
    })
  });

  const qualificationList = []
  qualifications && qualifications.results && qualifications.results.map(item => {
    return qualificationList.push(
      { value: item.name, label: item.name }
    )
  })
  const onEdit = (record) => {
    setEditData(record);
    setShowDrawer(true);
    setDrawerType("edit");
  };

  const publicationGenerator = () => {
      console.log('publicationGenerator');
    const items = [];
    publicationList && publicationList.data  && publicationList.data.map((item, key) => {
      key++;
      return items.push({
        sl_no: key,
        id: item.id,
        title: item.title,
        image: item.image,
        publisher: item.publisher,
        authors: item.authors,
        publicationdate: item.publicationdate,
        publication_url: item.publication_url,
        description: item.description
      })
    });
    return items;
  }


  const options = [
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Part-time', label: 'Part-time' },
    { value: 'Self-employed', label: 'Self-employed' },
    { value: 'Freelance', label: 'Freelance' },
    { value: 'Internship', label: 'Internship' },
    { value: 'Trainee', label: 'Trainee' },
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
  // const handleFileChange = (info) => {
  //   if (info.file.status === 'uploading') {
  //     setLoading(true);
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj, imageUrl => {
  //       setImageUrl(imageUrl);
  //       setLoading(false);
  //     });
  //   }
  // };

  const handleChange = (e) => {
    const data = [];
    if (e.target.name === "media") {
      data.push(e.target.value.split(',').toString())
    }
    if (e.target.name === "experience" && e.target.value.length > 2) {
      e.target.value = "";
    }
    setState({ ...state, [e.target.name]: e.target.value, user_id: userDetails.data && userDetails.data.id, media: data });
  }

  const handleQualificationChange = (item) => {
    console.log("item othe" , item);
    const data = [];
    item.map(item => {
      data.push(item.label)
      // if (item.label === "Other") {
      //   setActiveInput(true);
      // }
      item.label === "Other" ?  setActiveInput(true) : setActiveInput(false);
    })
    setState({ ...state, qualification: item, qualifications: data });
  }

  const handleSelectChange = (value) => {
    setState({ ...state, empolyment_value: { value: value.label, label: value.label }, empolyment_type: value.label });
  }
  const onStartDateChange = (value, dateString) => {
    setState({ ...state, start_date: dateString, user_id: userDetails.data && userDetails.data.id })
  }
  const onEndDateChange = (value, dateString) => {
    let fields = state;
    let errors = {};
    let formIsValid = true;
    if (dateString < state.start_date) {
      formIsValid = false;
      errors["end_date"] = "Please Select a date greater than Start Date";
    } else
      setState({ ...state, end_date: dateString, user_id: userDetails.data && userDetails.data.id })
    setErrors({ errors });
    return formIsValid;
  }

  const showInput = () => {
    setinputVisible(false);
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


  const uploadImage = async options => {
    const { onSuccess, onError, file, onProgress } = options;
    const fmData = new FormData();
    let accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: { "content-type": "multipart/form-data", 'authorization': `Bearer ${accessToken}` },
      onUploadProgress: event => {
        const percent = Math.floor((event.loaded / event.total) * 100);
        setProgress(percent);
        if (percent === 100) {
          setTimeout(() => setProgress(0), 1000);
        }
        onProgress({ percent: (event.loaded / event.total) * 100 });
      }
    };
    fmData.append("profilepic", file);
    try {
      const res = await axios.put(
        `https://clinictopic.metrictreelabs.com/api/auth/profilepic/${userDetails.data.id}/profilepicaddadmin/`,
        fmData,
        config
      );

      onSuccess("Ok");
      console.log("server res: ", res);
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error("Some error");
      onError({ err });
    }
  };

  const handleOnChange = ({ file, fileList, event }) => {
    //Using Hooks to update the state to the current filelist
    setDefaultFileList(fileList);
    //filelist - [{uid: "-1",url:'Some url to image'}]
  };

  const handleBlur = (e) => {
    setOtherQualification({ [e.target.name]: e.target.value });
  }

  const onAdd = () => {
    setShowDrawer(true);
    setDrawerType("add");
  };
  const onClose = () => {
    setShowDrawer(false);
  };

  const pagination = () => {

  }
  const cancel = (e) => {
  };

  const confirmDelete = (id) => {
    dispatch(deleteUserPublication(id))
      .then(() => {
        message.success("User publication list is deleted successfully")
      })
  };

  const disabledDate = (current) => {
    let end = new Date(Date.now() - 86400000);
    if (current > moment(end)) {
      return true;
    }
  }

  const handleValidation = () => {
    let fields = state;
    let errors = {};
    let formIsValid = true;
    if (fields["qualification"].length === 0) {
      formIsValid = false;
      errors["qualification"] = "Qualification is required";
    }
    if (!fields["media"]){
      console.log("Media is required")
      formIsValid = false;
      errors["media"] = "Media is required";
    }else{
      var media_url = fields.media.toString();
      var res = media_url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
      if (res === null) {
        formIsValid = false;
        errors["media"] = "Enter a valid URL";
      }
    }
    setErrors({ errors });
    return formIsValid;
  }

  const onChange = (e) => {
    // console.log(`checked = ${e.target.checked}`);
    {e.target.checked === true ? (setChecked(true)) : (setChecked(false)) }
  }
  const handleUserProfileSubmit = () => {
    if (handleValidation()) {
      console.log("coming without validation");
      let newData = state;
      delete newData["empolyment_value"];
      delete newData["id"];
      delete newData["username"];
      delete newData["qualification"];
      dispatch(postUserProfile(newData, otherQualification))
        .then(() => {
          message.success("User details Added Successfully");
          setState({});
          history.push("/users");
        })
    }
  }

  const publicationColumns = [
    {
      title: "Sl No:",
      dataIndex: "sl_no",
      key: "sl_no",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => {
        return (<img src={`${process.env.REACT_APP_API_BASE_URL}${record.image}`} style={{ width: '70px', height: '70px' }} />);
      }
    },
    {
      title: "Publisher",
      dataIndex: "publisher",
      key: "publisher",
    },
    {
      title: "Action",
      key: "id",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          <IconButton onClick={() => onEdit(record)}>
            <Icon>edit</Icon>
          </IconButton>
          <Popconfirm
            title="Are you sure to delete this publicationList?"
            onConfirm={() => confirmDelete(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <IconButton >
              <Icon>delete</Icon>
            </IconButton>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div className="main-content">
      <Container fluid>
        <Card>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item >
                <Upload
                  accept="image/*"
                  customRequest={uploadImage}
                  onChange={handleOnChange}
                  listType="picture-card"
                  fileList={defaultFileList}
                  className="image-upload-grid"
                >
                  {defaultFileList.length >= 1 ? null : <div>Upload Button</div>}
                </Upload>
                {progress > 0 ? <Progress percent={progress} /> : null}
              </Form.Item>
            </Col>
            <Col span={16}>
              <p>Name : {userDetails.data && userDetails.data.name}</p>
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
                  <div className="errorMsg">{errors && errors.errors && errors.errors.qualification}</div>
                </Form.Item>
                {activeInput ?
                  (<Form.Item label="Other Qualification">
                    <Input name="name" className="form-control" type="text" onChange={handleBlur} />
                  </Form.Item>) : null}
                <Form.Item label="Experience">
                  <Input name="experience" id="experience" className="form-control" type="number" value={state.experience} onChange={handleChange} />
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
                <Form.Item>
                <Checkbox onChange={onChange} style = {{ marginLeft: '180px', width: '250px' }}>I am currently working here</Checkbox>
                </Form.Item>
                <Form.Item label="Start Date" >
                  <Space direction="vertical" size={30} style={{ marginLeft: '50px', width: '450px' }} >
                    <DatePicker name="start_date" onChange={onStartDateChange} format={dateFormat} disabledDate={disabledDate} style={{ width: '337px', height: '36px' }} value={state.start_date ? moment(state.start_date) : null} />
                  </Space>
                </Form.Item>
                { checked === true ? null :(<Form.Item label="End Date" >
                  <Space direction="vertical" size={30} style={{ marginLeft: '50px', width: '450px' }} >
                    <DatePicker name="end_date" onChange={onEndDateChange} format={dateFormat} disabledDate={disabledDate} style={{ width: '337px', height: '36px' }} value={state.end_date ? moment(state.end_date) : null} />
                  </Space>
                  <div className="errorMsg">{errors && errors.errors && errors.errors.end_date}</div>
                </Form.Item>) }
                <Form.Item label="Industry">
                  <Input name="industry" className="form-control" type="text" value={state.industry} onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Description">
                  <Input name="description" className="form-control" type="text" value={state.description} onChange={handleChange} />
                </Form.Item>
                <Form.Item label="Media URL">
                  <Input name="media" className="form-control" type="text" value={state.media} onChange={handleChange} />
                  <div className="errorMsg">{errors && errors.errors && errors.errors.media}</div>
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
                <Table columns={columns} dataSource={catList} />
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
                <Card
                  title="Publications"
                  extra={
                    <IconButton onClick={onAdd}>
                      <Icon>add</Icon>
                    </IconButton>
                  }
                  style={{ width: "100%" }}
                >
                  <Table columns={publicationColumns} dataSource={publicationGenerator()} pagination={pagination} />
                </Card>
                <Drawer
                  title={
                    drawerType === "edit"
                      ? "Edit Publication"
                      : drawerType === "add"
                        ? "Add Publication"
                        : ""
                  }
                  placement="right"
                  width={750}
                  closable={true}
                  onClose={onClose}
                  visible={showDrawer}
                  key="drawer"
                >
                  <DrawerContent drawerType={drawerType} user_id={userDetails && userDetails.data && userDetails.data.id} type="public" editData={(drawerType === 'edit') ? editData : {}} />
                </Drawer>

              </Form>
            </TabPane>
          </Tabs>
        </Card>
      </Container>
    </div>
  );
};

export default UserDetails;
