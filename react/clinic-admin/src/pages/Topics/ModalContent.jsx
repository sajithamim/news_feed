import React, { useEffect } from "react";
import { Input, Radio, Button, Popover, DatePicker, Space, message, Form, Popconfirm, Select, TreeSelect, notification } from "antd";
import { useState } from "react";
import "./ModalContent.css";
import { useDispatch, useSelector } from "react-redux";
import { getUsersList } from "../../actions/users";
import { deleteImages, getSpecialization, getCategory, searchUsers } from "../../actions/topic";
import moment from 'moment';
import SelectBox from 'react-select';


const { Option } = Select;
const { SHOW_PARENT } = TreeSelect;


const ModalContent = (props) => {
  const { TextArea } = Input;
  const [lastFetchId, setLastFetchId] = useState(0);
  const [fetching, setFetching] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formSubmit, setFormSubmit] = useState(true);
  const [crntDateTime, setCrntDateTime] = useState('');
  const [state, setState] = useState({});
  const { specList, catList, userList } = useSelector(state => state.topic);
  const [err, setErrors] = useState({});
  const [data, setData] = useState([]);


  useEffect(() => {
    setErrors({});
    dispatch(getSpecialization());
    dispatch(getCategory());
    dispatch(getUsersList())
    if (props.editData !== null) {
      setState(props.editData)
    }
    else {
      setState({ topic_subspec: [], imageFormData: [] });
    }
    if (props.drawerType === 'edit' && props.editData.old_image.length > 3) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [props.editData])

  const content = (
    (state.format === '1') ? (<div><p>Upload PDF Front and PDF Back.Title and description won't be seen in mobile app.</p></div>) : ((state.format === '2') ? (<div><p>Add image, PDF or External video URL</p></div>) : (<div><p>Add Video URL and PDF/External Url in detail page</p></div>))
  );

  const treeData = [];
  specList && specList.data && specList.data.map((specitem, index) => {
    const children = [];
    if (specitem.specialization_id) {
      specitem.specialization_id.map((subspecItem, index) => {
        children.push({ title: subspecItem.name, value: `${subspecItem.name}_${subspecItem.id}`, key: `${subspecItem.name}_${subspecItem.id}` })
        // key: `${subspecItem.name}_${subspecKey}${subspecItem.id}`
      })
    }
    treeData.push({ title: specitem.name, value: `${specitem.name}_${specitem.id}`, key: `${specitem.name}_${specitem.id}`, children })
    // key: `${specitem.name}_${specKey}${specitem.id}`
  });


  const category = [];
  catList && catList.data && catList.data.map(item => {
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

  const handleCategoryChange = (value) => {
    setState({ ...state, category_data: value, category_id: value.value });
  };

  const handleMultipleFile = (e) => {
    var numFiles = e.target.files.length;
    const errors = { ...err };
    for (var i = 0, numFiles = e.target.files.length; i < numFiles; i++) {
      var file = e.target.files[i];
      if (!file.name.match(/\.(jpg|jpeg|png|gif|jfif|tiff|raw|bmp)$/)) {
        errors["multi_image"] = "Please select valid image.";
        setErrors({ errors });
        setFormSubmit(false);
      } else {
        console.log("coming here");
        setErrors({});
        setFormSubmit(true);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          file.url = reader.result;
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
        if (props.drawerType === 'add' && state.imageFormData.length > 2) {
          setLoading(true);
          openNotification();
        } else if (props.drawerType === 'edit' && (state.old_image.length + state.imageFormData.length > 2)) {
          setLoading(true);
          openNotification();
        }
      }
    }
  }

  const openNotification = () => {
    notification.info({
      description:
        'You are allowed to insert max 4 images only.',
    });
  };
  const handleFileChange = (e) => {
    setState({ ...state, pdfUrl: e.target.files[0] });
    const pdfFile = e.target.files[0];
    let errors = { ...err };
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

  const handleFileChangeBack = (e) => {
    setState({ ...state, pdfUrlBack: e.target.files[0] });
    const pdfBackFile = e.target.files[0];
    let errors = { ...err };
    if (pdfBackFile.name.match(/\.(pdf)$/) == null) {
      errors["pdfsecond"] = "Please select valid pdf";
      setErrors({ errors });
      setFormSubmit(false);
    } else {
      setFormSubmit(true);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  const handleFileChangeSecond = (e) => {
    setState({ ...state, pdfUrlSecond: e.target.files[0] });
    const pdfSecondFile = e.target.files[0];
    let errors = { ...err };
    if (pdfSecondFile.name.match(/\.(pdf)$/) == null) {
      errors["pdf2"] = "Please select valid pdf";
      setErrors({ errors });
      setFormSubmit(false);
    } else {
      setFormSubmit(true);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  const handleFileChangeThird = (e) => {
    setState({ ...state, pdfUrlThird: e.target.files[0] });
    const pdfThirdFile = e.target.files[0];
    let errors = { ...err };
    if (pdfThirdFile.name.match(/\.(pdf)$/) == null) {
      errors["pdf3"] = "Please select valid pdf";
      setErrors({ errors });
      setFormSubmit(false);
    } else {
      setFormSubmit(true);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  const onOk = (value) => {
  }

  const radioOnChange = (val, e) => {
    if (val === 'publishtype') {
      const crntDateTime = new Date().toISOString();
      setState({ ...state, publishtype: e.target.value, publishingtime: (e.target.value === 'now') ? crntDateTime : "", published: (e.target.value === 'now') ? '1' : '0' })
    } else if (val === 'delivery') {
      setState({ ...state, deliverytype: e.target.value })
    } else if (val === 'media') {
      setState({ ...state, video_type: e.target.value })
    }
    else if (val === 'format') {
      setState({ ...state, format: e.target.value })
    }
    else if (val === 'deliverytype') {
      setState({ ...state, deliverytype: e.target.value })
    }
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
    if (fields["topic_subspec"].length <= 0) {
      formIsValid = false;
      errors["topic_subspec"] = "Specialization cannot be empty";
    }
    if (!fields["category_id"]) {
      formIsValid = false;
      errors["category_id"] = "Category cannot be empty";
    }
    if (!fields["publishtype"]) {
      formIsValid = false;
      errors["publishtype"] = "Publish time cannot be empty";
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
      if (props.drawerType == 'add' && fields["pdfUrlBack"] === undefined) {
        formIsValid = false;
        errors["pdfsecond"] = "Please upload Back Pdf"
      }
      if (fields["pdfUrl"] && fields["pdfUrl"].name.match(/\.(pdf)$/) == null) {
        formIsValid = false;
        errors["pdf"] = "Please select valid pdf";
      }
      if (fields["pdfUrlBack"] && fields["pdfUrlBack"].name.match(/\.(pdf)$/) == null) {
        formIsValid = false;
        errors["pdfsecond"] = "Please select valid pdf";
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
      if (props.drawerType === 'add' && fields["imageFormData"].length <= 0) {
        formIsValid = false;
        errors["multi_image"] = "Image cannot be empty";
      }
      if (props.drawerType === 'edit' && fields["old_image"].length <= 0 && fields["imageFormData"].length <= 0) {
        formIsValid = false;
        errors["multi_image"] = "Image cannot be empty";
      }
      if (!fields["deliverytype"]) {
        formIsValid = false;
        errors["deliverytype"] = "Detail page cannot be empty";
      }
      if (state.deliverytype === 'external' && !fields["external_url2"]) {
        formIsValid = false;
        errors["external_url2"] = "External url cannot be empty";
      }
      if (state.deliverytype === 'pdf' && fields["pdfUrlSecond"] === undefined) {
        formIsValid = false;
        errors["pdf2"] = "PDF cannot be empty";
      }
      if (state.deliverytype === 'external' && fields["external_url2"]) {
        var myUrl = fields.external_url2;
        var res = myUrl.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (res === null) {
          formIsValid = false;
          errors["external_url2"] = "Enter a valid URL";
        }
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
      if (!fields["video_url"]) {
        formIsValid = false;
        errors["video_url"] = "Video url cannot be empty";
      }
      if (!fields["deliverytype"]) {
        formIsValid = false;
        errors["deliverytype"] = "Detail page cannot be empty";
      }
      if (fields["video_url"]) {
        var myUrl = fields.video_url;
        var res = myUrl.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (res === null) {
          formIsValid = false;
          errors["video_url"] = "Enter a valid URL";
        }
      }
      if (state.deliverytype === 'external' && !fields["external_url3"]) {
        formIsValid = false;
        errors["external_url3"] = " External url cannot be empty";
      }
      if (state.deliverytype === 'pdf' && fields["pdfUrlThird"] === undefined) {
        formIsValid = false;
        errors["pdf3"] = " PDF cannot be empty";
      }
      if (state.deliverytype === 'external' && fields["external_url3"]) {
        var myUrl = fields.external_url3;
        var res = myUrl.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
        if (res === null) {
          formIsValid = false;
          errors["external_url3"] = "Enter a valid URL";
        }
      }
    }
    //state.deliverytype === 'pdf' ? state.deliverytype = 'pdf' : state.deliverytype = 'external'
    // setState({ ...state, publishingtime: crntDateTime })
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
      let form_data_back = null;
      if (state.format !== '2' && state.format !== '3' && state.pdfUrlBack && state.pdfUrlBack.name) {
        form_data_back = new FormData();
        form_data_back.append('pdfsecond', state.pdfUrlBack, state.pdfUrlBack.name);
      }
      let form_data2 = null;
      if (state.format !== '1' && state.pdfUrlSecond && state.pdfUrlSecond.name) {
        form_data2 = new FormData();
        form_data2.append('pdf', state.pdfUrlSecond, state.pdfUrlSecond.name);
      }
      let form_data3 = null;
      if (state.format !== '1' && state.pdfUrlThird && state.pdfUrlThird.name) {
        form_data3 = new FormData();
        form_data3.append('pdf', state.pdfUrlThird, state.pdfUrlThird.name);
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
      delete newData["topic_image"];
      delete newData["pdf"];
      delete newData["category_data"];
      delete newData["username"];
      delete newData["topic_val"];
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
        newData['external_url'] = newData['external_url2']
        newData['deliveryType'] = newData['deliveryType'];
        newData['description'] = newData['description2'];
        newData['title2'] && delete newData['title2']
        newData['description2'] && delete newData['description2']
      } else if (newData.format === '3') {
        newData['title'] = newData['title3'];
        newData['description'] = newData['description3'];
        newData['external_url'] = newData['external_url3'];
        newData['deliveryType'] = newData['deliveryType'];
        newData['title3'] && delete newData['title3']
        newData['description3'] && delete newData['description3']
      }
      setState({});
      props.onFormSubmit(newData, form_data, form_data_back, form_data2, form_data3, image_data);
    }
  }

  const dispatch = useDispatch();


  const cancel = (e) => {
    message.error('Cancelled');
  }

  const deleteImage = (id, image) => {
    setLoading(false);
    if (id !== null) {
      const oldImages = state.old_image;
      const oldImageList = oldImages.filter(item => { return item.id !== id });
      dispatch(deleteImages(id));
      setState({ ...state, old_image: oldImageList });
    } else {
      const newImages = state.topic_image;
      const imageFormData = state.imageFormData;
      const newImageList = newImages.filter(item => { return item !== image });
      const imageFormDataList = imageFormData.filter(item => { return item.url !== image });
      setState({ ...state, topic_image: newImageList, imageFormData: imageFormDataList });
    }
  }
  // const handleSearch = value => {
  //   if (value) {
  //     dispatch(searchUsers(value))
  //       .then((res) => {
  //         if (res.data)
  //           setData(res.data.data);
  //       })
  //   } else {
  //     setData([]);
  //   }
  // };
  // const handleSearchChange = value => {
  //   setState({ ...state, email: value, username: value });
  // };

  const options = data.map(d => <Option key={d.email}>{d.username}</Option>);

  const onSpecChange = (value) => {
    const topic = [];
    value && value.map(item => {
      let str;
      str = item.split("_", 2);
      topic.push({ subspec_id: str[1] })
    })
    setState({ ...state, topic_subspec: topic, topic_val: value })
  }

  const tProps = {
    treeData,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Please select',
    style: {
      width: '100%',
    },
    showCheckedStrategy: TreeSelect.SHOW_CHILD
  };

  return (
    <div>
      <Form name="basic" className="topicForm" labelCol={{ span: 8 }} wrapperCol={{ span: 10 }} initialValues={{ remember: true }} onFinish={handleSubmit}>
        <div className="modalStyle">
          <Form.Item label="Specializations">
            <TreeSelect
              value={state.topic_val}
              onChange={onSpecChange}
              autoClearSearchValue={true}
              {...tProps}
            />
            <div className="errorMsg">{err && err.errors && err.errors.topic_subspec}</div>
          </Form.Item>
          <Form.Item label="Category">
            <SelectBox
              isMulti={false}
              isSearchable={true}
              maxMenuHeight={130}
              value={state.category_data || ''}
              onChange={handleCategoryChange}
              options={category}
            />
            <div className="errorMsg">{err && err.errors && err.errors.category_id}</div>
          </Form.Item>
          {/* <Form.Item label="Author">
            <Select
              showSearch
              value={state.username || null}
              placeholder="Search users"
              style={{ width: '100%' }}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              onSearch={handleSearch}
              onChange={handleSearchChange}
              notFoundContent={null}
            >
              {options}
            </Select>
          </Form.Item> */}
          <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
            <Radio.Group onChange={(e) => radioOnChange('format', e)} value={state.format}>
              <Popover placement="top" content={content} trigger="click">
                <Radio value="1">
                  Format 1
                </Radio>
              </Popover>
              <Popover placement="top" content={content} trigger="click">
                <Radio value="2">
                  Format 2
                </Radio>
              </Popover>
              <Popover placement="top" content={content} trigger="click">
                <Radio value="3">
                  Format 3
                </Radio>
              </Popover>
            </Radio.Group>
          </Form.Item>
          {(state.format === '1') ?
            (<><Form.Item label="Title">
              <div className="inputStyle">
                <Input name="title1" type="text" onChange={handleChange} value={state.title1} /></div>
              <div className="errorMsg">{err && err.errors && err.errors.title1}</div>
            </Form.Item>
              <Form.Item label="Description">
                <div className="inputStyle">
                  <TextArea name="description1" maxLength="150" rows={4} wrapperCol={{ span: 7 }} onChange={handleChange} value={state.description1} /></div>
                  <div style={{marginLeft: '95px'}}>*Enter only 150 characters</div>
                <div className="errorMsg">{err && err.errors && err.errors.description1}</div>
              </Form.Item></>) : null}
          {(state.format === '2') ?
            (<><Form.Item label="Title">
              <div className="inputStyle">
                <Input name="title2" type="text" onChange={handleChange} value={state.title2} /></div>
              <div className="errorMsg">{err && err.errors && err.errors.title2}</div>
            </Form.Item>
              <Form.Item label="Description">
                <div className="inputStyle">
                  <TextArea name="description2" maxLength="150" rows={4} wrapperCol={{ span: 7 }} onChange={handleChange} value={state.description2} /></div>
                  <div style={{marginLeft: '95px'}}>*Enter only 150 characters</div>
                <div className="errorMsg">{err && err.errors && err.errors.description2}</div>
              </Form.Item>
            </>) : null
          }
          {(state.format === '3') ?
            (<><Form.Item label="Title">
              <div className="inputStyle">
                <Input name="title3" type="text" onChange={handleChange} value={state.title3} /></div>
              <div className="errorMsg">{err && err.errors && err.errors.title3}</div>
            </Form.Item>
              <Form.Item label="Description">
                <div className="inputStyle">
                  <TextArea name="description3" maxLength="150" rows={4} wrapperCol={{ span: 7 }} onChange={handleChange} value={state.description3} /></div>
                  <div style={{marginLeft: '95px'}}>*Enter only 150 characters</div>
                <div className="errorMsg">{err && err.errors && err.errors.description3}</div>
              </Form.Item></>) : null
          }
          {state.format === '2' ?
            (<Form.Item label="Images"><div>{state.old_image && state.old_image.map((item) => (<div className="img-wrap">
              <img key={item} src={item.image} alt="" />
              <div className="close">
                <Popconfirm title="Are you sure to delete this image?" onConfirm={() => deleteImage(item.id, item.image)} onCancel={cancel} okText="Yes" cancelText="No">&times;</Popconfirm></div>
            </div>))}
              {state.topic_image && state.topic_image.map((url) => (<div className="img-wrap">
                <img key={url} src={url} alt="" />
                <div className="close">
                  <Popconfirm title="Are you sure to delete this image?" onConfirm={() => deleteImage(null, url)} onCancel={cancel} okText="Yes" cancelText="No">&times;</Popconfirm></div>
              </div>))}
            </div>
              <div className="inputStyle">
                <Input type="file" name="multi_image" accept="image/png, image/jpeg" onChange={handleMultipleFile} multiple disabled={loading} /></div>
                <div>*Supported File extensions: jpg,jpeg,png</div>
              <div className="errorMsg">{err && err.errors && err.errors.multi_image}</div>
            </Form.Item>) : null}
          {state.format === '3' ?
            (<Form.Item label="Video Url"><div className="inputStyle"><Input name="video_url" type="text" onChange={handleChange} key="desc" value={state.video_url} /></div>
              <div className="errorMsg">{err && err.errors && err.errors.video_url}</div></Form.Item>) : null}
          {state.format === '2' ?
            (<Form.Item label="Detail Page">
              <Radio.Group onChange={(e) => radioOnChange('deliverytype', e)} value={state.deliverytype}>
                <Radio value="pdf">
                  Pdf
                </Radio>
                <Radio value="external">
                  External URL
                </Radio>
              </Radio.Group>
              <div className="errorMsg">{err && err.errors && err.errors.deliverytype}</div>
            </Form.Item>) : null}
          {state.format === '2' ?
            (<>
              {state.deliverytype === 'pdf' ?
                (<>{state.pdfSecond ? <a href={state.pdfSecond} target="_blank" className="pdfStyle">Click here to see the PDF</a> : null}
                  <Form.Item label="Pdf">
                    <div className="inputStyle">
                      <Input type="file" name="pdf2" accept="image/pdf" onChange={handleFileChangeSecond} /></div>
                    <div className="errorMsg">{err && err.errors && err.errors.pdf2}</div></Form.Item></>) : null}
              {state.deliverytype === 'external' ?
                (<><Form.Item label="External URL">
                  <div className="inputStyle">
                    <Input type="text" name="external_url2" onChange={handleChange} value={state.external_url2} /></div>
                  <div className="errorMsg">{err && err.errors && err.errors.external_url2}</div></Form.Item></>) : null}
            </>)
            : null}
          {state.format === '3' ?
            (<Form.Item label="Detail Page">
              <Radio.Group onChange={(e) => radioOnChange('deliverytype', e)} value={state.deliverytype}>
                <Radio value="pdf">
                  Pdf
                </Radio>
                <Radio value="external">
                  External URL
                </Radio>
              </Radio.Group>
              <div className="errorMsg">{err && err.errors && err.errors.deliverytype}</div>
            </Form.Item>) : null}
          {state.format === '3' ?
            (<>
              {state.deliverytype === 'pdf' ?
                (<>
                  {state.pdfThird ? <a href={state.pdfThird} target="_blank" className="pdfStyle">Click here to see the PDF</a> : null}
                  <Form.Item label="Pdf">
                    <div className="inputStyle">
                      <Input type="file" name="pdf3" accept="image/pdf" onChange={handleFileChangeThird} /></div>
                    <div className="errorMsg">{err && err.errors && err.errors.pdf3}</div></Form.Item></>) : null}
              {state.deliverytype === 'external' ?
                (<><Form.Item label="External URL">
                  <div className="inputStyle">
                    <Input type="text" name="external_url3" onChange={handleChange} value={state.external_url3} /></div>
                  <div className="errorMsg">{err && err.errors && err.errors.external_url3}</div></Form.Item></>) : null}
            </>)
            : null}
          {state.format === '1' ?
            (<>
              {state.pdfFront ? <a href={state.pdfFront} target="_blank" className="pdfStyle">PDF Front</a> : null}
              <Form.Item label="Pdf Front">
                <div className="inputStyle">
                  <Input type="file" name="pdf" accept="image/pdf" onChange={handleFileChange} /></div>
                <div className="errorMsg">{err && err.errors && err.errors.pdf}</div></Form.Item>
              {state.pdfBack ? <a href={state.pdfBack} target="_blank" className="pdfStyle" >PDF Back</a> : null}
              <Form.Item label=" Pdf Back">
                <div className="inputStyle">
                  <Input type="file" name="pdfsecond" accept="image/pdf" onChange={handleFileChangeBack} /></div>
                <div className="errorMsg">{err && err.errors && err.errors.pdfsecond}</div></Form.Item>
            </>)
            : null}
          {(state.published_status && state.published_status === 1) ? (<><Form.Item label="Status" wrapperCol={{ offset: 0, span: 10 }}><span className="publishedStatus">Published</span></Form.Item></>) :
            (<><Form.Item label="When to Publish">
              <Radio.Group onChange={(e) => radioOnChange('publishtype', e)} value={state.publishtype}>
                <Radio value="now">Publish Now</Radio>
                <Radio value="later">Later</Radio>
              </Radio.Group>
              <div className="errorMsg">{err && err.errors && err.errors.publishtype}</div>
            </Form.Item>
              {(state.publishtype && state.publishtype !== "now") ? (<Form.Item wrapperCol={{ offset: 8, span: 14 }}>
                <Space>
                  <DatePicker showTime onChange={onChange} onOk={onOk} defaultValue={moment(state.publishingtime ? state.publishingtime : new Date())} />
                </Space>
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
