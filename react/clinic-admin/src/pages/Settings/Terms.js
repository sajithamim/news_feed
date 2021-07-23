import React, { useState, useEffect } from "react";
import { Form, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getSettings , patchSettings} from "../../actions/settings";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState , ContentState , convertFromHTML , convertToRaw, convertFromRaw} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Terms = () => {
    const dispatch = useDispatch();
    const [id, setId] = useState(EditorState.createEmpty())
    useEffect(() => {
        dispatch(getSettings())
        .then(res => {      
            console.log("resddff" ,  res.data.results && res.data.results[0].about_us);
            setId(res.data.results[0].id);
            setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(res.data.results && res.data.results[0] && res.data.results[0].tos))));
        })
    }, [])

    const { settingsList } = useSelector(state => state.settings);
    const [ contentState , setContentState] = useState();

 const handleSubmit=()=>{
    const id = 1;
    let newData = {}
    newData.about_us = JSON.stringify(convertToRaw(contentState));
    newData.id = id;
    dispatch(patchSettings(id ,newData));
    
 }

 const [editorState, setEditorState] = useState(EditorState.createEmpty())
 
 const onEditorStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    setContentState(contentState);
    setEditorState(editorState)
 }

    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 10,
            }} onFinish={handleSubmit}>

<Editor
  editorState={editorState}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
  onEditorStateChange={onEditorStateChange}
/>
            
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}>
                <Button type="primary" htmlType="submit" >
                    Save
                </Button>
            </Form.Item>
        </Form>
    )
}
export default Terms;