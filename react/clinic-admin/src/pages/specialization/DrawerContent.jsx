import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { Form, Input, Upload, Modal, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postSubSpecialization } from "../../actions/spec";
import { postSpecialization, updateSpecialization } from "../../actions/spec";
import "./Drawer.css";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}


const DrawerContent = (props) => {
  //console.log('props', props)
  const [specialiazation, setSpecialiazation] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [state, setState] = useState(props.editData);
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

  
  //console.log('state11', state)
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

  const handleSubmit = (e) => {
   let newData = state;
    if(props.drawerType == "edit") {
      const id = state.id;
        delete newData["id"];
        delete newData["icon"];
        delete newData["updated_at"];
        delete newData["created_at"];
        if(props.type == "spec") {
          dispatch(updateSpecialization(id, newData))
          .then(() => {
            message.success('Specialization edit successfully')
          });
        } else {
          dispatch(updateSpecialization(id, newData))
          .then(() => {
            message.success('Sub Specialization edit successfully')
          });
        }
      
    } else {
      if(props.type == "spec") {
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
    
    //console.log('123', state);
  // props.drawerType == "edit" ? dispatch(updateSpecialization(id, state)) : null;
  // props.type == "spec" ? dispatch(postSpecialization(state)) : dispatch(postSubSpecialization(state))
  }

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  };

  const handleFileChange = ({ fileList }) => setFileList(fileList);

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
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
            <Button type="primary" htmlType="submit" >
              Save
            </Button>
          </Form.Item>
          {/* <Grid container direction="row" className="modalStyle">
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
        </Grid> */}
        </div>
      </div>
    </Form>
  );
};

export default DrawerContent;
