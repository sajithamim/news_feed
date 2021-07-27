import React, { useState, useEffect } from "react";
import { Form, Button, message, Card } from "antd";
import { Icon, IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getSettings , postSettings} from "../../actions/settings";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState , ContentState , convertFromHTML , convertToRaw, convertFromRaw} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Policy = () => {
    const dispatch = useDispatch();
    const [id, setId] = useState(EditorState.createEmpty())
    useEffect(() => {
        dispatch(getSettings())
        .then(res => {       
            console.log("respolicy",res.data[0]);
           setId(res.data[0].id);
           setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(res.data && res.data[0] && res.data[0].privacy_policy))));
        })
    }, [])

    const { settingsList } = useSelector(state => state.settings);
    const [ contentState , setContentState] = useState();

 const handleSubmit = () => {
    let newData = {}
    newData.privacy_policy = JSON.stringify(convertToRaw(contentState));
    newData.id = id;
    dispatch(postSettings(newData))
    .then(() => {
        message.success('Policy edit successfully')
    });
    
 }

 const [editorState, setEditorState] = useState(EditorState.createEmpty())
 
 const onEditorStateChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    setContentState(contentState);
    setEditorState(editorState)
 }

    return (
        <div style={{ margin: "10px" }}>
        <Card
            title="Policy"
            style={{ width: "100%" }}>
            <Form name="basic" wrapperCol={{ span: 10 }} onFinish={handleSubmit}>
                <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
                />
                <Form.Item wrapperCol={{offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit"> Save </Button>
                </Form.Item>
            </Form>
        </Card>
        </div>
    )
}
export default Policy;