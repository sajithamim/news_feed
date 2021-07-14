import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { postSubSpecialization } from "../../actions/spec";
import { postSpecialization, updateSpecialization, updateSubSpecialization } from "../../actions/spec";
import "./Drawer.css";

const DrawerContent = (props) => {

  const [state, setState] = useState(props.editData);

  const [image, setImage] = useState("");

  const [imgData, setImgData] = useState("");
  
  //const { updateData } = useSelector(state => state.spec);
  useEffect(() => {
    setState(props.editData);
    setImgData(props.editData.icon);
  }, [props.editData])

  const dispatch = useDispatch();
  const { specId } = useParams();
 
  
  const handleSubmit = (e) => {
    let newData = state;
    const id = state.id;
    let form_data = null;
    if(image && image.name) {
      form_data = new FormData();
      form_data.append('icon', image, image.name);  
    }
    
    if (props.drawerType === "edit") {
      delete newData["id"];
      delete newData["icon"];
      delete newData["updated_at"];
      delete newData["created_at"];
      if (props.type ==="spec") {
        dispatch(updateSpecialization(id, newData, form_data))
          .then(() => {
            message.success('Specialization edit successfully')
          });
      } else {
        dispatch(updateSubSpecialization(id, newData ,form_data))
          .then(() => {
            message.success('Sub Specialization edit successfully')
          });
      } 
    } else {
      if (props.type === "spec") {
        dispatch(postSpecialization(newData , form_data))
          .then(() => {
            setState({});
            message.success('Specialization added successfully')
          });
      } else {
        newData['spec_id'] = specId;
        dispatch(postSubSpecialization(newData , form_data))
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
    setImage(info.target.files[0]);
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      setImgData(reader.result);
    });
    reader.readAsDataURL(info.target.files[0]);
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
            <div>
              {imgData ? (<img className="playerProfilePic_home_tile"  width = "128px" height = "128px" alt={imgData} src={imgData} />) : null }
              <Input type="file"
                id="image"
                accept="image/png, image/jpeg" onChange={handleFileChange} />
              <i aria-label="icon: plus" class="anticon anticon-plus"></i>
            </div>
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
