import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { Form, Input, Upload, Modal, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postSubSpecialization } from "../../actions/spec";
import { postSpecialization, updateSpecialization ,updateSubSpecialization } from "../../actions/spec";
import "./Drawer.css";

function getBase64(img, callback) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
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


const DrawerContent = (props) => {
  const [specialiazation, setSpecialiazation] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);

  const [previewImage, setPreviewImage] = useState("");
  const [state, setState] = useState(props.editData);

  const [loading, setloading] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");

  const [imageUrl, setimageUrl] = useState("");

  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
  ]);
  const { updateData } = useSelector(state => state.spec);
  useEffect(() => {
    setState(props.editData);
  }, [props.editData])

  const dispatch = useDispatch();
  const { id } = useParams();

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

  const handleSubmit = (e) => {
    let newData = state;
    if (props.drawerType == "edit") {
      const id = state.id;
      delete newData["id"];
      delete newData["icon"];
      delete newData["updated_at"];
      delete newData["created_at"];
      if (props.type == "spec") {
        dispatch(updateSpecialization(id, newData , imageUrl))
          .then(() => {
            message.success('Specialization edit successfully')
          });
      } else {
        dispatch(updateSubSpecialization(id, newData))
          .then(() => {
            message.success('Sub Specialization edit successfully')
          });
      } 

    } else {
      if (props.type == "spec") {
        dispatch(postSpecialization(newData))
          .then(() => {
            setState({});
            message.success('Specialization added successfully')
          });
      } else {
        newData['spec_id'] = id;
        dispatch(postSubSpecialization(newData))
          .then(() => {
            setState({});
            message.success('Sub Specialization added successfully')
          });
      }
    } 
  }

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  };

  const handleFileChange = (info) => {
    if (info.file.status == "uploading") {
      setloading(true);
      return;
    }
    if (info.file.status == "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setimageUrl(imageUrl);
        setloading(false);
      });
    }
  }

  return (
    <Form name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 10,
      }} onFinish={handleSubmit}>
      <div>
        <div className="modalStyle">
          <Form.Item
            label="Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input name="name" onChange={handleChange} value={state.name} required={true} />
          </Form.Item>

          <Form.Item
            label="Image"
          >
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              //fileList={fileList}
              beforeUpload={beforeUpload}
              onPreview={handlePreview}
              onChange={handleFileChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </div>
      </div>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" >
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DrawerContent;
