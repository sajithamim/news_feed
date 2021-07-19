import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { Form, Button ,Input, Modal ,message } from "antd";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./Drawer.css";
import { postCategory } from "../../actions/category";
import { updateCategory } from "../../actions/category";



const DrawerContent = (props) => {
  const dispatch = useDispatch();

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const [image, setImage] = useState("");
  const [imgData, setImgData] = useState(props.editData.image);

  const [state, setState] = useState(props.editData);  

  useEffect(() => {
    setState(props.editData)
    setImgData(props.editData.image);
  },[props.editData])

  const [previewTitle, setPreviewTitle] = useState("");

  const handleCancel = () => setPreviewVisible(false);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  };

  const handleFileChange = (info) => {
   setImage(info.target.files[0]);
   const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImgData(reader.result);
    });
    reader.readAsDataURL(info.target.files[0]);
  };

  const handleSubmit = (e) => {
    let newData = state;
    const id = state.id;
    let form_data = null;
    if(image && image.name) {
      form_data = new FormData();
      form_data.append('icon', image, image.name);  
    }
    if(props.drawerType === 'edit')
    {
      delete newData["id"];
      delete newData["image"];
      dispatch(updateCategory(id, newData, form_data))
      .then(() => {
        message.success('Category edited successfully')
      });
    }
    else{
      dispatch(postCategory(state, form_data));
    }
  }

  return (
    <Form onFinish={handleSubmit}>
      <div>
        <div className="modalStyle">
          <Grid container direction="row" className="modalStyle">
            <Grid item md={3} className="labelStyle">
              <span>*Name :</span>
            </Grid>
            <Grid item md={6}>
              <Input name="title" onChange={handleChange} value={state.title} required={true} />
            </Grid>
          </Grid>
          <Grid container direction="row" className="modalStyle">
            <Grid item md={3} className="labelStyle">
              <span>*Image :</span>
            </Grid>
            <Grid item md={6}>
              {imgData ? (<img className="playerProfilePic_home_tile"  width = "128px" height = "128px" alt={imgData} src={imgData} />) : null}
            <Input type="file"
                id="image"
                accept="image/png, image/jpeg" onChange={handleFileChange} />
              <i aria-label="icon: plus" class="anticon anticon-plus"></i>
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
      <div className="submit">
        <Button type="primary" htmlType="submit" >
          Save
        </Button>
      </div>
    </Form>
  );
};

export default DrawerContent;
