import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Input, Radio, Modal, Button, DatePicker, Space, message, Form } from "antd";
import { useState } from "react";
import "./ModalContent.css";
import PollContent from "./PollContent";
import { useDispatch, useSelector } from "react-redux";
import { getSpecialization } from "../../actions/spec";
import { getCategory } from "../../actions/category";
import moment from 'moment';
import Select from 'react-select';


const { Option } = Select;

const ModalContent = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formSubmit, setFormSubmit] = useState(true);
  const [state, setState] = useState({});
  const { specList } = useSelector(state => state.spec);
  const { catlist } = useSelector(state => state.category);

  const [errors, setErrors] = useState({ name: '' });

  const specialization = [];
  specList && specList.results && specList.results.map(item => {
    return specialization.push(
      { value: item.id, label: item.name }
    );
  })

  const category = [];
  catlist && catlist.results && catlist.results.map(item => {
    return category.push(
      { value: item.id, label: item.title }
    );
  })

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  };

  const handleSpecChange = (value) => {
    let topic = [];
    value && value.map(item => {
      topic.push({ spec_id: item.value })
    })
    setState({ ...state, spec_data: value, topic_topic: topic })
  };

  const handleCategoryChange = (value) => {
    setState({ ...state, category_data: value, category_id: value.value });
  };

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
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          if (!state.topic_image) {
            setState({ ...state, topic_image: [reader.result] });
            if (!state.imageFormData) {
              setState({ ...state, topic_image: [reader.result], imageFormData: [file] });
            } else {
              setState({ ...state, topic_image: [reader.result], imageFormData: [...state.imageFormData, file] });
            }
          } else {
            setState({ ...state, topic_image: [...state.topic_image, reader.result] });
            if (!state.imageFormData) {
              setState({ ...state, topic_image: [...state.topic_image, reader.result], imageFormData: [file] });
            } else {
              setState({ ...state, topic_image: [...state.topic_image, reader.result], imageFormData: [...state.imageFormData, file] });
            }
          }
        });
        reader.readAsDataURL(e.target.files[i]);
      }
    }
  }

  const handleFileChange = (e) => {
    setState({ ...state, pdfUrl: e.target.files[0] });
    const pdfFile = e.target.files[0];
    const newErrorsState = { ...errors };
    if (!pdfFile.name.match(/\.(pdf)$/)) {
      newErrorsState.pdf = 'Please select valid pdf.';
      setErrors(newErrorsState);
      setFormSubmit(false);
    } else {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        //setPdfData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  useEffect(() => {
    if (props.editData !== null) {
      setState(props.editData);
    }
  }, [props.editData]);

  useEffect(() => {
    dispatch(getSpecialization());
    dispatch(getCategory());
  }, [])

  const onOk = (value) => {
  }

  const radioOnChange = (val, e) => {
    if (val === 'publish') {
      const crntDateTime = new Date().toISOString();
      setState({ ...state, publishtype: e.target.value, publishingtime: (e.target.value == "now") ? crntDateTime : "" })
    } else if (val === 'delivery') {
      setState({ ...state, deliverytype: e.target.value })
    } else if (val === 'media') {
      setState({ ...state, video_type: e.target.value })
    }
    else if (val === 'format') {
      setState({ ...state, format: e.target.value })
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
      console.log("clicking");
      setErrors({});
      let form_data = null;
      if (state.pdfUrl && state.pdfUrl.name) {
        form_data = new FormData();
        form_data.append('pdf', state.pdfUrl, state.pdfUrl.name);
      }
      let image_data = null;
      if (state.imageFormData && state.imageFormData.length > 0) {
        image_data = new FormData();
        state.imageFormData.forEach((file, key) => {
          image_data.append('image', file, file.name);
        });
      }
      let newData = state;
      delete newData["sl_no"];
      delete newData["category_title"];
      delete newData["id"];
      delete newData["spec_data"];
      delete newData["topic_image"];
      delete newData["pdf"];
      delete newData["category_data"];
      //delete newData["topic_topic"];
      props.onFormSubmit(newData, form_data, image_data);
    }

  }

  const dispatch = useDispatch();

  const formValidation = () => {
    let entities = state;
    const newErrorsState = { ...errors };

    // if (!entities["title"]) {
    //   newErrorsState.title = 'Title cannot be empty';
    //   setErrors(newErrorsState);
    //   return false;
    // }
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

  return (
    <div>
      <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 10 }} initialValues={{ remember: true }} onFinish={handleSubmit}>
        <div className="modalStyle">
          <Form.Item label="Specializations">
            <Select isMulti={true} value={state.spec_data || ''} onChange={handleSpecChange} options={specialization} />
            <div className="errorMsg">{errors.specialization}</div>
          </Form.Item>
          <Form.Item label="Category">
            <Select isMulti={false} value={state.category_data || ''} onChange={handleCategoryChange} options={category}/>
            <div className="errorMsg">{errors.category_id}</div>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
            <Radio.Group onChange={(e) => radioOnChange('format', e)} value={state.format}>
              <Radio value="1">
                Format 1
              </Radio>
              <Radio value="2">
                Format 2
              </Radio>
              <Radio value="3">
                Format 3
              </Radio>
            </Radio.Group>
          </Form.Item>
          {state.format === '1' || state.format === '2' || state.format === '3' ?
            (<><Form.Item label="Title">
              <Input name="title" type="text" onChange={handleChange} value={state.title} />
              <div className="errorMsg">{errors.title}</div>
            </Form.Item>
              <Form.Item label="Description">
                <Input name="description" type="text" onChange={handleChange} key="desc" value={state.description} />
                <div className="errorMsg">{errors.description}</div>
              </Form.Item> </>) : null}
          {state.format === '3' || state.format === '2' ?
            (<><Form.Item label="Pdf/External URL">
              <Input type="text" name="external_url" onChange={handleChange} value={state.external_url} />
            </Form.Item></>) : null}

          {state.format === '1' ?
            (<Form.Item label="Pdf"><Input type="file" name="pdf" accept="image/pdf" onChange={handleFileChange} /></Form.Item>) : null}
          {state.format === '2' ?
            (<Form.Item label="Images">{state.topic_image && state.topic_image.map((url) => (<img width="128px" height="128px" key={url} src={url} alt="" />))}
              <Input type="file" name="multi_image" accept="image/png, image/jpeg" onChange={handleMultipleFile} multiple /></Form.Item>) : null}
          {state.format === '3' ?
            (<Form.Item label="Video Url"><Input name="video_url" type="text" onChange={handleChange} key="desc" value={state.video_url} /></Form.Item>) : null}
          {((state.format === '3' || state.format === '2') && state.deliverytype && state.deliverytype !== 'null' ?
            (state.deliverytype === 'pdf' ?
              (<Form.Item wrapperCol={{ offset: 8, span: 10 }}><Input type="file" name="pdf" accept="image/pdf" onChange={handleFileChange} /></Form.Item>) : (<Form.Item wrapperCol={{ offset: 8, span: 10 }}><Input type="text" id="article" name="external_url" onChange={handleChange} value={state.external_url} /></Form.Item>))
            : null)}
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
          {(state.publishtype && state.publishtype !== "now") ? (<Form.Item wrapperCol={{ offset: 8, span: 14 }}>
            <Space><DatePicker showTime onChange={onChange} onOk={onOk} defaultValue={moment(state.publishingtime ? state.publishingtime : new Date(), 'YYYY-MM-DD HH:mm:ss')} /></Space>
          </Form.Item>) : null}
          <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
            <Button type="primary" htmlType="submit">Save</Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default ModalContent;
