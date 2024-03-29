import React, { useEffect, useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { postSubSpecialization } from "../../actions/spec";
import { postSpecialization, updateSpecialization, updateSubSpecialization } from "../../actions/spec";
import "./Drawer.css";

const DrawerContent = (props) => {

  const [state, setState] = useState(props.editData);

  const [errors, setErrors] = useState({ name: '' });

  const [imgData, setImgData] = useState("");

  const [image, setImage] = useState("");

  const [formSubmit, setFormSubmit] = useState(false);

  useEffect(() => {
    setState(props.editData);
    if (props.editData.icon && props.editData.icon.startsWith("/media"))
      setImgData(`${process.env.REACT_APP_API_BASE_URL}${props.editData.icon}`);
    else
      setImgData(props.editData.icon);
  }, [props.editData])

  const dispatch = useDispatch();
  const { specId } = useParams();


  const handleSubmit = (e) => {
    if (formValidation()) {
      setErrors({});
      let newData = state;
      const id = state.id;
      if (props.drawerType === "edit") {
        delete newData["id"];
        delete newData["icon"];
        delete newData["updated_at"];
        delete newData["created_at"];
        if (props.type === "spec") {
          dispatch(updateSpecialization(id, newData))
            .then((res) => {
              res != undefined ? (message.success('Specialization edited successfully')) : (message.error("Specialization already exists with this name"));
            });
        } else {
          newData['spec_id'] = specId;
          dispatch(updateSubSpecialization(id, newData))
            .then((res) => {
              res != undefined ? (message.success('Sub Specialization edited successfully')) : (message.error("Sub Specialization already exists with this name"));
            });
        }
      } else {
        if (props.type === "spec") {
          dispatch(postSpecialization(newData))
            .then((res) => {
              setState({});
              res != undefined ? (message.success('Specialization added successfully')) : (message.error("Specialization already exists with this name"));
            })
        } else {
          newData['spec_id'] = specId;
          dispatch(postSubSpecialization(newData))
            .then((res) => {
              setState({});
              res != undefined ? (message.success('Sub Specialization added successfully')) : (message.error("Sub Specialization already exists with this name"));
            });
        }
      }
    }
  }

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value});
  };

  const handleFileChange = (info) => {
    setImage(info.target.files[0]);
    const imageFile = info.target.files[0];
    const newErrorsState = { ...errors };
    if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      newErrorsState.image = 'Please select valid image.';
      setErrors(newErrorsState);
      setFormSubmit(!formSubmit);
    } else {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(info.target.files[0]);
      newErrorsState.image = '';
      setErrors(newErrorsState);
      setFormSubmit(!formSubmit);
    }
  }

  const formValidation = () => {
    let entities = state;
    const newErrorsState = { ...errors };
    if (!entities["name"]) {
      newErrorsState.name = 'Name cannot be empty';
      setErrors(newErrorsState);
      return false;
    } else {
      var myName = entities.name;
            var res = myName.match(/^[a-zA-Z\s]*$/);
            if (res === null) {
              newErrorsState.name = "Please enter only alphabets";
              setErrors(newErrorsState);
              return false;
            }
    }
    return true;
  }
  return (
    <Form name="basic"
      labelCol={{
        span: 6,
      }}
      wrapperCol={{
        span: 10,
      }} onFinish={handleSubmit}>
      <div>
        <div className="modalStyle">
          <Form.Item label="Name">
            <Input type="text" id="spec_name" name="name" onChange={handleChange} value={state.name} />
            <div className="errorMsg">{errors.name}</div>
          </Form.Item>

          {/* <Form.Item label="Image">
            {imgData ? (<img className="playerProfilePic_home_tile" width="128px" height="128px" alt={imgData} src={imgData} />) : null}
            <Input type="file" name="image" accept="image/png, image/jpeg" onChange={handleFileChange} />
            <div className="errorMsg">{errors.image}</div>
          </Form.Item> */}
        </div>
      </div>
      <Form.Item
        wrapperCol={{
          offset: 7
        }}
      >
        <div className="specSaveBtn">
         <Button type="primary" htmlType="submit">
          Save
        </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default DrawerContent;
