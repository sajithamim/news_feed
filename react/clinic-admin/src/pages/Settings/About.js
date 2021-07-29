import React, { useState, useEffect } from "react";
import { Form, Button, message, Card } from "antd";
import { useDispatch } from "react-redux";
import { getSettings , postSettings} from "../../actions/settings";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const About = () => {
    const dispatch = useDispatch();
    const [id, setId] = useState(EditorState.createEmpty())
    useEffect(() => {
        dispatch(getSettings())
        .then(res => {      
            setId(res.data[0].id);
            setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(res.data && res.data[0] && res.data[0].about_us))));
        })
    }, [])

    const [ contentState , setContentState] = useState();

    const handleSubmit=()=>{
        let newData = {}
        newData.about_us = JSON.stringify(convertToRaw(contentState));
        newData.id = id;
        dispatch(postSettings(newData))
        .then(() => {
            message.success('About Us edit successfully')
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
        <Card title="About Us" style={{ width: "100%", height: '500px' }}>
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
export default About;