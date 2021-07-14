import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Input, Checkbox, Radio, Select, Upload, message, Modal, Button } from "antd";
import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "./ModalContent.css";
import PollContent from "./PollContent";
import { useDispatch, useSelector } from "react-redux";
import { getSpecialization } from "../../actions/spec";
import { getCategory } from "../../actions/category";
import spec from "../../reducers/spec";

const { Option } = Select;
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const ModalContent = (props) => {
  const [checkboxValue, setCheckboxValue] = useState("");
  const [mediaType, setMediaType] = useState(null);
  const [radioValue , setRadioValue] = useState();
  const [deliveryType, setDeliveryType] = useState(null);
  const [audience, setAudience] = useState(["a10", "c12"]);
  const [specialiasations, setSpecialiasations] = useState(["a10", "c12"]);
  //const [category, setCategory] = useState("News & views");
  const [loadingUpload, setloadingUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [noOfQuestions, setNoOfQuestions] = useState("");
  const [noOfAnswers, setNoOfAnswers] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [state, setState] = useState({});
  
  const { specList } =useSelector(state => state.spec);
  const { catlist } =useSelector(state => state.category);

  const specialization = [];
    specList && specList.results && specList.results.map(item => {
      specialization.push(
        <Option key={item.id}>{item.name}</Option>
      );
    })
  
    const category = [];
      catlist && catlist.results && catlist.results.map(item => {
        category.push(
          <Option key={item.id}>{item.title}</Option>
        );
      })
    

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
    console.log("state handle" , state);
  };

  const uploadButton = (
    <div>
      {loadingUpload ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleAudienceChange = (value) => {
    setAudience(value);
  };

  const handleSpecChange = (value) => {
    setSpecialiasations(value);
  };

  const handleCategoryChange = (value) => {
    console.log('value', value)
    //setCategory(value);
  };

  const checkboxOnChange = (e) => {
    setCheckboxValue(e.target.checked);
    if (e.target.checked === true) {
      setIsModalVisible(true);
    } else {
      setIsModalVisible(false);
      setNoOfQuestions("");
      setNoOfAnswers("");
    }
  };
  const radioOnChange = (e) => {
    setDeliveryType(e.target.value);
    setMediaType(e.target.value);
    console.log("mediaType" , e.target.value);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit", state);
  }

  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(getSpecialization());
    dispatch(getCategory());
  })

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
                //defaultValue="News & views"
                style={{ width: "100%" }}
                key="cat"
                name="category_id"
                value={category}
                onChange={handleCategoryChange}
              >{category}
                {/* <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="Yiminghe">yiminghe</Option> */}
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
          <Grid container direction="row" className="modalStyle">
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
          </Grid>

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
              <Radio.Group onChange={radioOnChange} value={radioValue}>
                <Radio value="pdf" key="img">
                  PDF
                </Radio>
                <Radio value="article" key="vid">
                  Article
                </Radio>
              </Radio.Group>
            </Grid>
            <Grid container direction="row" className="modalStyle">
              <Grid item md={3} className="labelStyle">

              </Grid>
              <Grid item md={6}>
                {deliveryType !== null ? (deliveryType == 'pdf' ? (<><Input type="file" id="image" accept="image/png, image/jpeg" /> <i aria-label="icon: plus" class="anticon anticon-plus"></i></>) : (<Input type="text" id="article" />)) : null}
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="row" className="modalStyle">
            <Grid item md={3} className="labelStyle">
              <span>*Media type :</span>
            </Grid>
            <Grid item md={6}>
              <Radio.Group onChange={radioOnChange} value={radioValue}>
                <Radio value="image" key="img">
                  Image
                </Radio>
                <Radio value="video" key="vid">
                  Video
                </Radio>
              </Radio.Group>
            </Grid>
          </Grid>
          <Grid container direction="row" className="modalStyle">
          <Grid item md={3} className="labelStyle">
            </Grid>
          <Grid item md={6}>
                {mediaType !== null ? (mediaType == 'image' ? (<><Input type="file" id="image" accept="image/png, image/jpeg" /> <i aria-label="icon: plus" class="anticon anticon-plus"></i></>) : (<Input type="text" id="video" />)) : null}
          </Grid>
          </Grid>
          <Grid container direction="row" className="modalStyle">
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
          </Grid>
          <Grid container direction="row" className="modalStyle">
            <Grid item md={3} className="labelStyle">
              <span>*Total likes :</span>
            </Grid>
            <Grid item md={6}>
              <Input type="number" key="likes" />
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
