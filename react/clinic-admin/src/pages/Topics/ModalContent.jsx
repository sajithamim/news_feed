import React, { useEffect } from "react";
import { Input, Radio, Button, DatePicker, Space, message, Form, Popconfirm, TextArea } from "antd";
import { useState } from "react";
import "./ModalContent.css";
import { useDispatch, useSelector } from "react-redux";
import { getSpecialization } from "../../actions/spec";
import { getCategory } from "../../actions/category";
import { getUsersList } from "../../actions/users";
import { deleteImages } from "../../actions/topic";
import moment from 'moment';
import Select from 'react-select';


const { Option } = Select;

const ModalContent = (props) => {
  const { TextArea } = Input;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formSubmit, setFormSubmit] = useState(true);
  const [state, setState] = useState({});
  const { specList } = useSelector(state => state.spec);
  const { catlist } = useSelector(state => state.category);
  const { userList } = useSelector(state => state.users);
  const [errors, setErrors] = useState({});
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

  const author = [];
  userList && userList.results && userList.results.map(item => {
    return author.push(
      { value: item.email, label: item.username }
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

  const handleUserChange = (item) => {
    setState({ ...state, username: item, email: item.value, author: { name: item.label } });
  };

  const handleMultipleFile = (e) => {
    var numFiles = e.target.files.length;
    const newErrorsState = { ...errors };
    for (var i = 0, numFiles = e.target.files.length; i < numFiles; i++) {
      var file = e.target.files[i];
      if (!file.name.match(/\.(jpg|jpeg|png|gif|jfif|tiff|raw|bmp)$/)) {
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
    let errors = {};
    if (pdfFile.name.match(/\.(pdf)$/) == null) {
      errors["pdf"] = "Please select valid pdf";
      setErrors({ errors });
      setFormSubmit(false);
    } else {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  const handleFileChangeSecond = (e) => {
    setState({ ...state, pdfUrlSecond: e.target.files[0] });
    const pdfSecondFile = e.target.files[0];
    let errors = {};
    if (pdfSecondFile.name.match(/\.(pdf)$/) == null) {
      errors["pdfsecond"] = "Please select valid pdf";
      setErrors({ errors });
      setFormSubmit(false);
    } else {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  useEffect(() => {
    dispatch(getSpecialization());
    dispatch(getCategory());
    dispatch(getUsersList())
    setErrors({})
    if (props.editData !== null) {
      setState(props.editData);
    }
  }, [props.editData])
  useEffect(() => {
    setErrors({})
  }, [])

  const onOk = (value) => {
  }
  const radioOnChange = (val, e) => {
    if (val === 'publish') {
      const crntDateTime = new Date().toISOString();
      setState({ ...state, publishtype: e.target.value, publishingtime: (e.target.value == "now") ? crntDateTime : "", published: (e.target.value === 'now') ? '1' : '0' })
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

  const handleValidation = () => {
    let fields = state;
    let errors = {};
    let formIsValid = true;
    if (!fields["topic_topic"]) {
      formIsValid = false;
      errors["topic_topic"] = "Specialization cannot be empty";
    }
    if (!fields["category_id"]) {
      formIsValid = false;
      errors["category_id"] = "Category cannot be empty";
    }

    if (!fields["publishingtime"]) {
      formIsValid = false;
      errors["publishingtime"] = "Publish time cannot be empty";
    }
    if (state.format === '1') {
      if (!fields["title1"]) {
        formIsValid = false;
        errors["title1"] = " Title cannot be empty";
      }
      if (!fields["description1"]) {
        formIsValid = false;
        errors["description1"] = "Description cannot be empty";
      }
      if (props.drawerType == 'add' && fields["pdfUrl"] === undefined) {
        formIsValid = false;
        errors["pdf"] = "Please upload Front Pdf"
      }
      if (props.drawerType == 'edit' && fields["pdfFront"] === null) {
        formIsValid = false;
        errors["pdf"] = "Please upload Front Pdf"
      }
      if (fields["pdfUrl"] && fields["pdfUrl"].name.match(/\.(pdf)$/) == null) {
        errors["pdf"] = "Please select valid pdf";
        setErrors({ errors });
        setFormSubmit(false);
      }
      if (fields["pdfUrlSecond"] && fields["pdfUrlSecond"].name.match(/\.(pdf)$/) == null) {
        errors["pdfsecond"] = "Please select valid pdf";
        setErrors({ errors });
        setFormSubmit(false);
      }
    }
    if (state.format === '2') {
      if (!fields["title2"]) {
        formIsValid = false;
        errors["title2"] = " Title cannot be empty";
      }
      if (!fields["description2"]) {
        formIsValid = false;
        errors["description2"] = " Description cannot be empty";
      }
    }
    if (state.format === '3') {
      if (!fields["title3"]) {
        formIsValid = false;
        errors["title3"] = " Title cannot be empty";
      }
      if (!fields["description3"]) {
        formIsValid = false;
        errors["description3"] = " Description cannot be empty";
      }
    }
    setErrors({ errors });
    return formIsValid;
  }


  const handleSubmit = (e) => {
    if (handleValidation() && formSubmit) {
      let form_data = null;
      if (state.format !== '2' && state.format !== '3' && state.pdfUrl && state.pdfUrl.name) {
        form_data = new FormData();
        form_data.append('pdf', state.pdfUrl, state.pdfUrl.name);
      }
      let form_data2 = null;
      if (state.format !== '2' && state.format !== '3' && state.pdfUrlSecond && state.pdfUrlSecond.name) {
        form_data2 = new FormData();
        form_data2.append('pdfsecond', state.pdfUrlSecond, state.pdfUrlSecond.name);
      }
      let image_data = null;
      if (state.format !== '1' && state.format !== '3' && state.imageFormData && state.imageFormData.length > 0) {
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
      delete newData["username"];
      if (newData.format === '1') {
        newData['external_url'] && delete newData['external_url'];
        newData['video_url'] && delete newData['video_url'];
        newData['title'] = newData['title1'];
        newData['description'] = newData['description1'];
        newData['deliveryType'] = 'pdf';
        newData['title1'] && delete newData['title1']
        newData['description1'] && delete newData['description1']
      } else if (newData.format === '2') {
        newData['video_url'] && delete newData['video_url'];
        newData['title'] = newData['title2'];
        newData['deliveryType'] = 'external_url';
        newData['description'] = newData['description2'];
        newData['title2'] && delete newData['title2']
        newData['description2'] && delete newData['description2']
      } else if (newData.format === '3') {
        newData['title'] = newData['title3'];
        newData['description'] = newData['description3'];
        newData['deliveryType'] = 'external_url';
        newData['title3'] && delete newData['title3']
        newData['description3'] && delete newData['description3']
      }
      props.onFormSubmit(newData, form_data, form_data2, image_data );
    }
  }

  const dispatch = useDispatch();


  const cancel = (e) => {
    message.error('Cancelled');
  }

  const deleteImage = (id, image) => {
    if (id !== null) {
      const oldImages = state.old_image;
      const oldImageList = oldImages.filter(item => { return item.id !== id });
      dispatch(deleteImages(id));
      setState({ ...state, old_image: oldImageList });
    } else {
      const newImages = state.topic_image;
      const newImageList = newImages.filter(item => { return item !== image });
      setState({ ...state, topic_image: newImageList });
    }

  }

  return (
    <div>
      <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 10 }} initialValues={{ remember: true }} onFinish={handleSubmit}>
        <div className="modalStyle">
          <Form.Item label="Specializations">
            <Select
              isMulti={true}
              value={state.spec_data}
              onChange={handleSpecChange}
              options={specialization}
            />
            <div className="errorMsg">{errors && errors.errors && errors.errors.topic_topic}</div>
          </Form.Item>
          <Form.Item label="Category">
            <Select
              isMulti={false}
              isSearchable={true}
              value={state.category_data}
              onChange={handleCategoryChange}
              options={category}
            />
            <div className="errorMsg">{errors && errors.errors && errors.errors.category_id}</div>
          </Form.Item>
          <Form.Item label="Author">
            <Select
              isMulti={false}
              isSearchable={true}
              value={state.username}
              onChange={handleUserChange}
              options={author}
            />
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
          {(state.format === '1') ?
            (<><Form.Item label="Title">
              <div style={{ marginLeft: '-47px', width: '287px' }}>
                <Input name="title1" type="text" onChange={handleChange} value={state.title1} /></div>
              <div className="errorMsg">{errors && errors.errors && errors.errors.title1}</div>
            </Form.Item>
              <Form.Item label="Description">
                <div style={{ marginLeft: '-47px', width: '287px' }}>
                  <TextArea name="description1" maxLength="152" rows={4} wrapperCol={{ span: 7 }} onChange={handleChange} value={state.description1} style={{ marginLeft: '47px' }} /></div>
                <div className="errorMsg">{errors && errors.errors && errors.errors.description1}</div>
              </Form.Item></>) : null
          }
          {(state.format === '2') ?
            (<><Form.Item label="Title">
              <div style={{ marginLeft: '-47px', width: '287px' }}>
                <Input name="title2" type="text" onChange={handleChange} value={state.title2} /></div>
              <div className="errorMsg">{errors && errors.errors && errors.errors.title2}</div>
            </Form.Item>
              <Form.Item label="Description">
                <div style={{ marginLeft: '-47px', width: '287px' }}>
                  <TextArea name="description2" maxLength="152" rows={4} wrapperCol={{ span: 7 }} onChange={handleChange} value={state.description2} style={{ marginLeft: '47px' }} /></div>
                <div className="errorMsg">{errors && errors.errors && errors.errors.description2}</div>
              </Form.Item>
            </>) : null
          }
          {(state.format === '3') ?
            (<><Form.Item label="Title">
              <div style={{ marginLeft: '-47px', width: '287px' }}>
                <Input name="title3" type="text" onChange={handleChange} value={state.title3} /></div>
              <div className="errorMsg">{errors && errors.errors && errors.errors.title3}</div>
            </Form.Item>
              <Form.Item label="Description">
                <div style={{ marginLeft: '-47px', width: '287px' }}>
                  <TextArea name="description3" maxLength="152" rows={4} wrapperCol={{ span: 7 }} onChange={handleChange} value={state.description3} style={{ marginLeft: '47px' }} /></div>
                <div className="errorMsg">{errors && errors.errors && errors.errors.description3}</div>
              </Form.Item></>) : null
          }
          {state.format === '2' ?
            (<Form.Item label="Images"><section className="clearfix" style={{ display: "inline" }}>{state.old_image && state.old_image.map((item) => (<div className="img-wrap"><img key={item} src={item.image} alt="" />
              <span class="close"><Popconfirm title="Are you sure to delete this image?" onConfirm={() => deleteImage(item.id, item.image)} onCancel={cancel} okText="Yes" cancelText="No">&times;</Popconfirm></span></div>))}
              {state.topic_image && state.topic_image.map((url) => (<div className="img-wrap"><img key={url} src={url} alt="" />
                <span class="close"><Popconfirm title="Are you sure to delete this image?" onConfirm={() => deleteImage(null, url)} onCancel={cancel} okText="Yes" cancelText="No">&times;</Popconfirm></span></div>))}
            </section><Input type="file" name="multi_image" accept="image/png, image/jpeg" onChange={handleMultipleFile} multiple /></Form.Item>) : null}
          {state.format === '3' ?
            (<Form.Item label="Video Url"><div style={{ marginLeft: '-47px', width: '287px' }}><Input name="video_url" type="text" onChange={handleChange} key="desc" value={state.video_url} /></div></Form.Item>) : null}
          {((state.format === '3' || state.format === '2') && state.deliverytype && state.deliverytype !== null ?
            (state.deliverytype === 'pdf' ?
              (<Form.Item wrapperCol={{ offset: 8, span: 10 }}><Input type="file" name="pdf" accept="image/pdf" onChange={handleFileChange} /></Form.Item>) : null)
            : null)}
          {state.format === '3' || state.format === '2' ?
            (<><Form.Item label="Pdf/External URL">
              <div style={{ marginLeft: '-47px', width: '287px' }}>
                <Input type="text" name="external_url" onChange={handleChange} value={state.external_url} /></div>
            </Form.Item></>) : null}

          {state.format === '1' ?
            (<><p style={{ marginLeft: '226px' }}>{props.drawerType === 'edit' ? state.pdfFront : null}</p><Form.Item label="Pdf Front">
              <Input type="file" name="pdf" accept="image/pdf" onChange={handleFileChange} /><div className="errorMsg">{errors && errors.errors && errors.errors.pdf}</div></Form.Item>
              <p style={{ marginLeft: '226px' }}>{props.drawerType === 'edit' ? state.pdfBack : null}</p>
              <Form.Item label=" Pdf Back"><Input type="file" name="pdfsecond" accept="image/pdf" onChange={handleFileChangeSecond} /><div className="errorMsg">{errors && errors.errors && errors.errors.pdfsecond}</div></Form.Item></>) : null}
          {/* {state.pdfUrlSecond ? <p>{state.pdfUrlSecond}</p> : null} */}


          {(state.published_status && state.published_status === 1) ? (<><Form.Item label="Status" wrapperCol={{ offset: 0, span: 10 }}><span style={{ color: "red" }}>Published</span></Form.Item></>) :
            (<><Form.Item label="When to Publish">
              <Radio.Group onChange={(e) => radioOnChange('publish', e)} value={state.publishtype}>
                <Radio value="now">
                  Publish Now
                </Radio>
                <Radio value="later">
                  Later
                </Radio>
              </Radio.Group>
              <div className="errorMsg">{errors && errors.errors && errors.errors.publishingtime}</div>
            </Form.Item>

              {(state.publishtype && state.publishtype !== "now") ? (<Form.Item wrapperCol={{ offset: 8, span: 14 }}>
                <Space><DatePicker showTime onChange={onChange} onOk={onOk} defaultValue={moment(state.publishingtime ? state.publishingtime : new Date(), 'YYYY-MM-DD HH:mm:ss')} /></Space>
              </Form.Item>) : null} </>)}
          <Form.Item wrapperCol={{ offset: 8, span: 10 }}>
            <Button type="primary" htmlType="submit">Save</Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default ModalContent;
