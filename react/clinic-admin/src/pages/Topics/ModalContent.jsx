import React from "react";
import { Grid } from "@material-ui/core";
import { Input, Checkbox, Radio, Select, Upload, message, Modal } from "antd";
import { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import "./ModalContent.css";
import PollContent from "./PollContent";

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
  const [radioValue, setRadioValue] = useState("image");
  const [audience, setAudience] = useState(["a10", "c12"]);
  const [specialiasations, setSpecialiasations] = useState(["a10", "c12"]);
  const [category, setCategory] = useState("News & views");
  const [loadingUpload, setloadingUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [noOfQuestions, setNoOfQuestions] = useState("");
  const [noOfAnswers, setNoOfAnswers] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setloadingUpload(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setloadingUpload(false);
      });
    }
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
    setCategory(value);
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
    setRadioValue(e.target.value);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <div className="modalStyle">
        <Grid container direction="row" className="modalStyle">
          <Grid item md={3} className="labelStyle">
            <span>*Audiance :</span>
          </Grid>
          <Grid item md={6}>
            <Select
              key="audi"
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              value={audience}
              defaultValue={["a10", "c12"]}
              onChange={handleAudienceChange}
            >
              {children}
            </Select>
          </Grid>
        </Grid>
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
              value={specialiasations}
              defaultValue={["a10", "c12"]}
              onChange={handleSpecChange}
            >
              {children}
            </Select>
          </Grid>
        </Grid>
        <Grid container direction="row" className="modalStyle">
          <Grid item md={3} className="labelStyle">
            <span>*Category :</span>
          </Grid>
          <Grid item md={6}>
            <Select
              defaultValue="News & views"
              style={{ width: "100%" }}
              key="cat"
              value={category}
              onChange={handleCategoryChange}
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
          </Grid>
        </Grid>
        <Grid container direction="row" className="modalStyle">
          <Grid item md={3} className="labelStyle">
            <span>*Title :</span>
          </Grid>
          <Grid item md={6}>
            <Input type="text"></Input>
          </Grid>
        </Grid>
        <Grid container direction="row" className="modalStyle">
          <Grid item md={3} className="labelStyle">
            <span>*Description :</span>
          </Grid>
          <Grid item md={6}>
            <Input type="text" key="desc"></Input>
          </Grid>
        </Grid>
        <Grid container direction="row" className="modalStyle">
          <Grid item md={3} className="labelStyle">
            <span>*Article URL :</span>
          </Grid>
          <Grid item md={6}>
            <Input type="text" key="article"></Input>
          </Grid>
        </Grid>
        <Grid container direction="row" className="modalStyle">
          <Grid item md={3} className="labelStyle">
            <span>*Source URL :</span>
          </Grid>
          <Grid item md={6}>
            <Input type="text" key="source"></Input>
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
            <Input type="number" key="likes"></Input>
          </Grid>
        </Grid>
      </div>
      <Modal
        title="Poll"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form>
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
        </form>
      </Modal>
    </div>
  );
};

export default ModalContent;
