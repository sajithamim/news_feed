import React, { useState, useEffect } from "react";
import { Form, Button, message, Card } from "antd";
import { useDispatch } from "react-redux";
import { getAbout, postAbout } from "../../actions/settings";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const About = () => {
    const dispatch = useDispatch();
    const [id, setId] = useState(EditorState.createEmpty())
    useEffect(() => {
        dispatch(getAbout())
            .then(res => {
                if (res.data[0]) {
                    setId(res.data[0].id);
                    const contentBlocks = convertFromHTML(res.data && res.data[0] && res.data[0].about_us);
                    const contentState = ContentState.createFromBlockArray(contentBlocks);
                    setEditorState(EditorState.createWithContent(contentState));
                }
            })
    }, [])

    const [convertedContent, setConvertedContent] = useState();

    const handleSubmit = () => {
        let newData = {}
        newData.about_us = convertedContent;
        newData.id = id;
        dispatch(postAbout(newData))
            .then(() => {
                message.success('About Us added successfully')
            });
    }

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    }
    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
    }

    return (
        <div style={{ margin: "10px" }}>
            <Card title="About Us" style={{ width: "100%", height: 'auto' }}>
                <Form name="basic" wrapperCol={{ span: 10 }} onFinish={handleSubmit}>
                    <Editor
                        editorState={editorState}
                        editorStyle={{border: "1px solid", overflowY: "scroll", height: '500px'}}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={handleEditorChange}
                    />
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" style={{ position: 'absolute'}}> Save </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
export default About;