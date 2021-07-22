import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Input, Radio, Modal, Button, DatePicker, Space, message, Form } from "antd";
import { useState } from "react";
import "./ModalContent.css";
import PollContent from "./PollContent";
import { useDispatch, useSelector } from "react-redux";
import { getSpecialization } from "../../actions/spec";
import { getCategory } from "../../actions/category";
import { postTopic, updateTopic } from "../../actions/topic";
import moment from 'moment';
import Select from 'react-select';


const { Option } = Select;

const ModalContent = (props) => {
  const [checkboxValue, setCheckboxValue] = useState("");
  const [noOfQuestions, setNoOfQuestions] = useState("");
  const [noOfAnswers, setNoOfAnswers] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [state, setState] = useState({});
  const [pdfUrl, setPdfUrl] = useState("");
  const [imageUrl, setimageUrl] = useState([]);
  const [imageFormData, setImageFormData] = useState([]);
  const [specSelectedOption ,setSpecSelectedOption ] = useState('');
  const [categorySelectedOption ,setCategorySelectedOption] = useState('');
  const [pdfUrlData, setPdfData] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [specIds, setSpecId] = useState("");

  const { specList } = useSelector(state => state.spec);
  const { catlist } = useSelector(state => state.category);

  const [formSubmit, setFormSubmit] = useState(true);

  const [errors, setErrors] = useState({ name: '' });

  const specialization = [];
  specList && specList.results && specList.results.map(item => {
    return specialization.push(
      {value: item.id, label: item.name}
    );
  })
 
  const category = [];
  catlist && catlist.results && catlist.results.map(item => {
    return category.push(
      {value: item.id , label: item.title}
    );
  })


  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
    console.log("e.target" , e.target.name);
  };


  const handleSpecChange = (value) => {
    setSpecSelectedOption(value);
    let topic = [];
    value && value.map(item => {
     topic.push({ spec_id: item.value})
    })
    setState({ ...state, topic_topic: topic })
  };

  useEffect(() => {
    dispatch(getSpecialization());
    dispatch(getCategory());
    if (props.editData !== null) {
      setState(props.editData);
      const spec_id = [];
      props.editData.spec_id && props.editData.spec_id.map(item => {
      spec_id.push({value: item.spec_id.id , label: item.spec_id.name});
      });
      setSpecSelectedOption(spec_id);
     // setState({ ...state, topic_topic: spec_id })
      setCategorySelectedOption({value: props.editData.category_id , label: props.editData.category_title});
      //setState({ ...state, category_id: {value: props.editData.category_id , label: props.editData.category_title} });
      if (props.editData.topic_image !== null) {
        const topic_image = [];
        props.editData.topic_image && props.editData.topic_image.map(item => {
          topic_image.push(item.image);
        })
        setimageUrl(topic_image);
      }
    }

  }, [props.editData])

  const handleCategoryChange = (value) => {
    setCategorySelectedOption(value);
    setState({ ...state, category_id: value.value });
  };



  const onOk = (value) => {
  }

  const radioOnChange = (val, e) => {
    if (val === 'publish') {
      const crntDateTime = new Date().toISOString();
      setState({ ...state, publishtype: e.target.value, publishingtime: (e.target.value == "now") ? crntDateTime : "" })
    } else if (val === 'delivery') {
      setState({ ...state, deliverytype: e.target.value })
    } else if (val === 'media') {
      setState({ ...state, media_type: e.target.value })
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { RangePicker } = DatePicker;

  const onChange = (value, dateString) => {
    const laterTime = new Date(dateString).toISOString();
    setState({ ...state, publishingtime: laterTime })
  }

  const handleSubmit = (e) => {
    if (formValidation()) {
      setErrors({});
      const id = state.id;
      let form_data = null;
      if (pdfUrl && pdfUrl.name) {
        form_data = new FormData();
        form_data.append('pdf', pdfUrl, pdfUrl.name);
      }
      let image_data = null;
      if (imageFormData.length > 0) {
        image_data = new FormData();
        imageFormData.forEach((file, key) => {
          image_data.append('image', file, file.name);
        });
      }
      if (props.drawerType === 'edit') {
        let newData = state;
        delete newData["sl_no"];
        delete newData["spec_id"];
        delete newData["pdf"];
        delete newData["topic_image"];
        delete newData["category_title"];
        delete newData["id"];
        delete newData["topic_audience"];
        delete newData["deliverytype"];
        //delete newData["source_url"];
        ////delete newData["publishtype"];
        delete newData["topic_videourl"];
        delete newData["publishtype"];
        console.log("submit state" , newData);
          dispatch(updateTopic(id, newData, form_data, image_data))
            .then(() => {
              message.success('Topic edited successfully')
            });
        } else {
          dispatch(postTopic(state, form_data, image_data))
            .then(() => {
              setState({});
              message.success('Topic added successfully')
            });
        }
    }
  }

  const handleFileChange = (e) => {
    setPdfUrl(e.target.files[0]);
    const pdfFile = e.target.files[0];
    const newErrorsState = { ...errors };
    if (!pdfFile.name.match(/\.(pdf)$/)) {
      newErrorsState.pdf = 'Please select valid pdf.';
      setErrors(newErrorsState);
      setFormSubmit(false);
    } else {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setPdfData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const handleMultipleFile = (e) => {
    var numFiles = e.target.files.length;
    const newErrorsState = { ...errors };
    for (var i = 0, numFiles = e.target.files.length; i < numFiles; i++) {
      var file = e.target.files[i];
      if (!file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
        newErrorsState.multi_image = 'Please select valid image.';
        setErrors(newErrorsState);
        setFormSubmit(false);
      } else {
        setImageFormData(imageFormData => [...imageFormData, e.target.files[i]]);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          setimageUrl(imageUrl => [...imageUrl, reader.result]);
        });
        reader.readAsDataURL(e.target.files[i]);
      }
    }
  }

  const dispatch = useDispatch();

  const formValidation = () => {
    let entities = state;
    const newErrorsState = { ...errors };

    if (!entities["title"]) {
      newErrorsState.title = 'Title cannot be empty';
      setErrors(newErrorsState);
      return false;
    }
    if (!entities["category_id"]) {
      newErrorsState.category_id = 'Category cannot be empty';
      setErrors(newErrorsState);
      return false;
    }
    if (!entities["publishingtime"]) {
      newErrorsState.publishingtime = 'Publish time cannot be empty';
      setErrors(newErrorsState);
      return false;
    }
    if (!entities["topic_topic"] && entities["topic_topic"]) {
      newErrorsState.publishingtime = 'Specialization cannot be empty';
      setErrors(newErrorsState);
      return false;
    }
    setErrors({});
    return true;
  }
  const specList1 = [];
  // state.spec_id && state.spec_id.map(item => {
  //   specList1.push(item.spec_id.name)
  // });
  // setState({ ...state, topic_topic: topic })
  //var result = JSON.stringify(spec_id).replace('[', '').replace(']', ''); 
  const data = ['4', '5']

  return (
    <div>
      <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 10 }} initialValues={{ remember: true }} onFinish={handleSubmit}>
        <div className="modalStyle">
          <Form.Item label="Specializations">
            <Select
              isMulti={true}
              value={specSelectedOption}
              onChange={handleSpecChange}
              options={specialization}
            />

            <div className="errorMsg">{errors.specialization}</div>
          </Form.Item>
          <Form.Item label="Category">
            <Select
              isMulti={false}
              value={categorySelectedOption}
              onChange={handleCategoryChange}
              options={category}
            />
            <div className="errorMsg">{errors.category_id}</div>
          </Form.Item>
          <Form.Item label="Title">
            <Input name="title" type="text" onChange={handleChange} value={state.title} />
            <div className="errorMsg">{errors.title}</div>
          </Form.Item>
          <Form.Item label="Description">
            <Input name="description" type="text" onChange={handleChange} key="desc" value={state.description} />
            <div className="errorMsg">{errors.description}</div>
          </Form.Item>
          <Form.Item label="Source Url">
            <Input name="source_url" type="text" onChange={handleChange} key="source" value={state.source_url} />
            {/* <div className="errorMsg">{errors.name}</div> */}
          </Form.Item>
          {/* <Grid container direction="row" className="modalStyle">
            <Grid item md={3} className="labelStyle">
              <span>Enable Poll :</span>
            </Grid>
            <Grid item md={6}>
              <Checkbox
                onChange={checkboxOnChange}
                key="check"
                value={checkboxValue}
              />
            </Grid>
          </Grid> */}

          {/* {checkboxValue === true &&
            noOfQuestions !== "" &&
            noOfAnswers !== "" && (
              <PollContent questions={noOfQuestions} answers={noOfAnswers} />
            )} */}


          <Form.Item label="Delivery Type">
            <Radio.Group onChange={(e) => radioOnChange('delivery', e)} value={state.deliverytype}>
              <Radio value="pdf">
                PDF
              </Radio>
              <Radio value="external">
                Article
              </Radio>
            </Radio.Group>
            {/* <div className="errorMsg">{errors.publishingtime}</div> */}
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
            {(state.deliverytype && state.deliverytype !== 'null' ?
              (state.deliverytype === 'pdf' ?
                (<><Input type="file" name="pdf" accept="image/pdf" onChange={handleFileChange} /></>) : (<Input type="text" id="article" name="external_url" onChange={handleChange} value={state.external_url} />))
              : null)}
            <div className="errorMsg">{errors.pdf}</div>
          </Form.Item>
          <Form.Item label="Media Type">
            <Radio.Group onChange={(e) => radioOnChange('media', e)} value={state.media_type}>
              <Radio value="image">
                Image
              </Radio>
              <Radio value="video">
                Video
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
            {state.media_type && state.media_type !== null ?
              (state.media_type === 'image' ?
                (<>{imageUrl.map((url) => (<img width="128px" height="128px" key={url} src={url} alt="" />))}<Input type="file" name="multi_image" accept="image/png, image/jpeg" onChange={handleMultipleFile} multiple /><div className="errorMsg">{errors.multi_image}</div></>) : (<Input type="text" id="video" name="video_url" onChange={handleChange} value={state.video_url} />)) : null}
          </Form.Item>
          {/* <Grid container direction="row" className="modalStyle">
            <Grid item md={3} className="labelStyle">
              <span>*Image :</span>
            </Grid>
            <Grid item md={6}>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Grid>
          </Grid> */}
          {/* <Grid container direction="row" className="modalStyle">
            <Grid item md={3} className="labelStyle">
              <span>*Total likes :</span>
            </Grid>
            <Grid item md={6}>
              <Input type="number" key="likes" />
            </Grid>
          </Grid>*/}

          <Form.Item label="When to Publish">
            <Radio.Group onChange={(e) => radioOnChange('publish', e)} value={state.publishtype}>
              <Radio value="now">
                Publish Now
              </Radio>
              <Radio value="later">
                Later
              </Radio>
            </Radio.Group>
            <div className="errorMsg">{errors.publishingtime}</div>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
            {(state.publishtype && state.publishtype !== "now") ? (<Space><DatePicker showTime onChange={onChange} onOk={onOk} defaultValue={moment(state.publishingtime, 'YYYY-MM-DD HH:mm:ss')} /></Space>) : null}
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
            <Button type="primary" htmlType="submit">Save</Button>
          </Form.Item>
        </div>
        {/* <Modal
          title="Poll"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >

          <p className="modalStyle">How many question would you like to ask?</p>
          <Input
            type="number"
            value={noOfQuestions}
            onChange={(e) => setNoOfQuestions(e.target.value)}
          />
          <p className="modalStyle">How many answers per question?</p>
          <Input
            type="number"
            value={noOfAnswers}
            onChange={(e) => setNoOfAnswers(e.target.value)}
          />


        </Modal> */}
      </Form>
    </div>
  );
};

export default ModalContent;
