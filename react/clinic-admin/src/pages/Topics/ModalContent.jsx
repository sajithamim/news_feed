import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Input, Radio, Select, Modal, Button, DatePicker, Space, message } from "antd";
import { useState } from "react";
import "./ModalContent.css";
import PollContent from "./PollContent";
import { useDispatch, useSelector } from "react-redux";
import { getSpecialization } from "../../actions/spec";
import { getCategory } from "../../actions/category";
import { postTopic } from "../../actions/topic";
import moment from 'moment';


const { Option } = Select;

const ModalContent = (props) => {
  const [checkboxValue, setCheckboxValue] = useState("");
  const [noOfQuestions, setNoOfQuestions] = useState("");
  const [noOfAnswers, setNoOfAnswers] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [state, setState] = useState({ topic_audience: "doctor" });
  const [pdfUrl, setPdfUrl] = useState("");
  const [imageUrl, setimageUrl] = useState([]);
  const [imageFormData , setImageFormData] = useState([]);

  const [pdfUrlData, setPdfData] = useState("");
  const [dateTime , setDateTime] = useState("");
  const [specIds, setSpecId] = useState("");

  const { specList } = useSelector(state => state.spec);
  const { catlist } = useSelector(state => state.category);

  const specialization = [];
  specList && specList.results && specList.results.map(item => {
    return specialization.push(
      <Option key={item.id}>{item.name}</Option>
    );
  })

  const category = [];
  catlist && catlist.results && catlist.results.map(item => {
    return category.push(
      <Option key={item.id}>{item.title}</Option>
    );
  })


  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
    //console.log("state handle", state);
  };


  const handleSpecChange = (value) => {
    let topic = [];
    console.log("state spec", topic);
    value && value.map(item => {
      topic.push({ spec_id: item })
    })
    setState({ ...state, topic_topic: topic })
  };

  useEffect(() => {
    if(props.editData !== null) {
      setState(...state, props.editData);
      const spec_id = [];
      state.spec_id && state.spec_id.map(item => {
        spec_id.push(item.spec_id.name)
      });

      var result = JSON.stringify(spec_id).replace('[','').replace(']', '');
      setSpecId(`[${result}]`);
      //var result1 = `[${result}]`;
    }
     
  }, [props.editData])

  const handleCategoryChange = (value) => {
    setState({ ...state, category_id: value })
  };

  const onOk = (value) => {

  }

  const radioOnChange = (val, e) => {
    if(val === 'publish'){
      const crntDateTime = new Date().toISOString();
      setState({ ...state, publishtype: e.target.value, publishingtime: (e.target.value == "now") ? crntDateTime : "" })
    } else if(val === 'delivery'){
      setState({ ...state, deliverytype: e.target.value })
    } else if(val === 'media'){
      setState({ ...state, mediatype: e.target.value })
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  
  const { RangePicker } = DatePicker;

  const onChange = (value , dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    const laterTime = new Date(dateString).toISOString();
    setState({ ...state , publishingtime: laterTime})
  }

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("specIid" ,state.topic_topic);
//     let form_data = null;
//     if (pdfUrl && pdfUrl.name) {
//       form_data = new FormData();
//       form_data.append('pdf', pdfUrl, pdfUrl.name);
//     }
//     let image_data = null;
//     if(imageFormData) {
//       image_data = new FormData();
//       imageFormData.forEach((file, key) => {
//         image_data.append('image', file, file.name);
//       });
//     }
// console.log("specIid" ,state.spec_id);
//     dispatch(postTopic(state , form_data, image_data))
//     .then(() => {
//       setState({});
//       message.success('Specialization added successfully')
//     });
  }

  const handleFileChange = (e) => {
    setPdfUrl(e.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setPdfData(reader.result);
    });
    reader.readAsDataURL(e.target.files[0]);
  }

  const handleFileChange1 = (e) => {
    var numFiles = e.target.files.length; 
    for (var i = 0, numFiles = e.target.files.length; i < numFiles; i++){ 
      var file = e.target.files[i];
      if(!file.type.match('image'))
      continue;
        
      setImageFormData(imageFormData => [...imageFormData, e.target.files[i]]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setimageUrl(imageUrl => [...imageUrl, reader.result]);
      });
      reader.readAsDataURL(e.target.files[i]);
    }
  }


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpecialization());
    dispatch(getCategory());
  }, [])
 
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="modalStyle">
          <Grid container direction="row" className="modalStyle">
            <Grid item md={3} className="labelStyle">
              <span>*Specializations :</span>
            </Grid>
            <Grid item md={6}>
              <Select
                key="spec"
                mode="multiple"
                allowClear
                defaultValue={specIds && specIds}
                style={{ width: "100%" }}
                placeholder="Please select"
                onChange={handleSpecChange}
              >
                {specialization}
              </Select>
            </Grid>
          </Grid>
          <Grid container direction="row" className="modalStyle">
            <Grid item md={3} className="labelStyle">
              <span>*Category :</span>
            </Grid>
            <Grid item md={6}>
              <Select
                style={{ width: "100%" }}
                key="cat"
                name="category_id"
                value={state.category_id}
                onChange={handleCategoryChange}
              >{category}
              </Select>
            </Grid>
          </Grid>
          <Grid container direction="row" className="modalStyle">
            <Grid item md={3} className="labelStyle">
              <span>*Title :</span>
            </Grid>
            <Grid item md={6}>
              <Input name="title" type="text" onChange={handleChange} value={state.title} />
            </Grid>
          </Grid>
          <Grid container direction="row" className="modalStyle">
            <Grid item md={3} className="labelStyle">
              <span>*Description :</span>
            </Grid>
            <Grid item md={6}>
              <Input name="description" type="text" onChange={handleChange} key="desc" value={state.description} />
            </Grid>
          </Grid>
          <Grid container direction="row" className="modalStyle">
            <Grid item md={3} className="labelStyle">
              <span>*Article URL :</span>
            </Grid>
            <Grid item md={6}>
              <Input type="text" onChange={handleChange} key="article" />
            </Grid>
          </Grid>
          <Grid container direction="row" className="modalStyle">
            <Grid item md={3} className="labelStyle">
              <span>*Source URL :</span>
            </Grid>
            <Grid item md={6}>
              <Input name="source_url" type="text" onChange={handleChange} key="source" value={state.source_url} />
            </Grid>
          </Grid>
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

          {checkboxValue === true &&
            noOfQuestions !== "" &&
            noOfAnswers !== "" && (
              <PollContent questions={noOfQuestions} answers={noOfAnswers} />
            )}


          <Grid container direction="row" className="modalStyle">
            <Grid item md={3} className="labelStyle">
              <span>*Delivery type :</span>
            </Grid>
            <Grid item md={6}>
              <Radio.Group onChange={(e) => radioOnChange('delivery' , e)} value={state.deliverytype}>
                <Radio value="pdf">
                  PDF
                </Radio>
                <Radio value="external">
                  Article
                </Radio>
              </Radio.Group>
            </Grid>
            <Grid container direction="row" className="modalStyle">
              <Grid item md={3} className="labelStyle">

              </Grid>
              <Grid item md={6}>
                {state.deliverytype !== null ? (state.deliverytype === 'pdf' ? (<><Input type="file" name="pdf" accept="image/png, image/jpeg" onChange={handleFileChange} /> <i aria-label="icon: plus" class="anticon anticon-plus"></i></>) : (<Input type="text" id="article" />)) : null}
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="row" className="modalStyle">
            <Grid item md={3} className="labelStyle">
              <span>*Media type :</span>
            </Grid>
            <Grid item md={6}>
              <Radio.Group onChange={(e) => radioOnChange('media' , e)} value={state.mediatype}>
                <Radio value="image">
                  Image
                </Radio>
                <Radio value="video">
                  Video
                </Radio>
              </Radio.Group>
            </Grid>
          </Grid>
          <Grid container direction="row" className="modalStyle">
            <Grid item md={3} className="labelStyle">
            </Grid>
            <Grid item md={6}>
              {state.mediatype !== null ? (state.mediatype === 'image' ? (<>{imageUrl.map((url) => (<img className="playerProfilePic_home_tile" width="128px" height="128px" key={url} src={url} alt="" />))}<Input type="file" name="multi_image" accept="image/png, image/jpeg" onChange={handleFileChange1} multiple/></>) : (<Input type="text" id="video" />)) : null}
            </Grid>
          </Grid>
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

          <Grid container direction="row" className="modalStyle">
            <Grid item md={3} className="labelStyle">
              <span>*When to Publish :</span>
            </Grid>
            <Grid item md={6}>
              <Radio.Group onChange={(e) => radioOnChange('publish', e)} value={state.publishtype}>
                <Radio value="now">
                  Publish Now
                </Radio>
                <Radio value="later">
                  Later
                </Radio>
              </Radio.Group>
            </Grid>
            <Grid container direction="row" className="modalStyle">
              <Grid item md={3} className="labelStyle">

              </Grid>
              <Grid item md={6}>
                {(state.publishingtime && (state.publishtype && state.publishtype !== "now") ? (<Space><DatePicker showTime onChange={onChange} onOk={onOk} defaultValue={moment(state.publishingtime, 'YYYY-MM-DD HH:mm:ss')} /></Space>) : null)}
              </Grid>
            </Grid>
          </Grid>

          <Grid container direction="row" className="modalStyle">
            <Grid item md={6} className="labelStyle">
              <Button type="primary" htmlType="submit" >
                Save
              </Button>
            </Grid>
          </Grid>
        </div>
        <Modal
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


        </Modal>
      </form>
    </div>
  );
};

export default ModalContent;
