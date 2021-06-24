import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { Input, Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "./Drawer.css";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const DrawerContent = () => {
  const [specialiazation, setSpecialiazation] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const [previewTitle, setPreviewTitle] = useState("");

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleSpecChange = (value) => {
    setSpecialiazation(value);
  };

  const handleFileChange = ({ fileList }) => setFileList(fileList);

  return (
    <div>
      <div className="modalStyle">
        <Grid container direction="row" className="modalStyle">
          <Grid item md={3} className="labelStyle">
            <span>*Name :</span>
          </Grid>
          <Grid item md={6}>
            <Input onChange={handleSpecChange} value={specialiazation} />
          </Grid>
        </Grid>
        <Grid container direction="row" className="modalStyle">
          <Grid item md={3} className="labelStyle">
            <span>*Image :</span>
          </Grid>
          <Grid item md={6}>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleFileChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default DrawerContent;
