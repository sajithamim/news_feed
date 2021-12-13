import React, { useState, useEffect } from "react";
import { Form, Button, message, Card, Spin } from "antd";
import { useDispatch } from "react-redux";
import { getPrivacy, postPrivacy } from "../../actions/settings";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Scrollbars } from 'react-custom-scrollbars';
import "./Settings.css";

const Policy = () => {
    const dispatch = useDispatch();
    const [id, setId] = useState(EditorState.createEmpty())
    useEffect(() => {
        dispatch(getPrivacy())
            .then(res => {
                console.log("response", res);
                if (res.data[0]) {
                    setId(res.data[0].id);
                    setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(res.data && res.data[0] && res.data[0].privacy_policy))));
                }
            })
    }, [])

    const [contentState, setContentState] = useState();
    const [convertedContent, setConvertedContent] = useState();

    const handleSubmit = () => {
        let newData = {}
        // newData.privacy_policy = JSON.stringify(convertToRaw(contentState));
        newData.privacy_policy = convertedContent;
        dispatch(postPrivacy(newData))
            .then(() => {
                message.success('Policy added successfully')
            });
    }

    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    // const onEditorStateChange = (editorState) => {
    //     const contentState = convertToRaw(editorState.getCurrentContent()).blocks;
    //     const value = contentState.map(block => (!block.text.trim() && '\n') || block.text).join(' ');

    //     setContentState(value);
    //     setEditorState(editorState)
    // }
    const handleEditorChange = (state) => {
        setEditorState(state);
        convertContentToHTML();
    }
    const convertContentToHTML = () => {
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(currentContentAsHTML);
        console.log("currentContentAsHTML", currentContentAsHTML);
    }

    return (
        <div class="privacy" style={{ margin: "10px" }}>
            <Card title="Policy" style={{ width: "100%", height: '500px' }}>
                <Form name="basic" wrapperCol={{ span: 10 }} onFinish={handleSubmit}>
                    {editorState ?
                        (<Editor
                            editorState={editorState}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={handleEditorChange}
                        />
                        ) : (<div className="spinner"><Spin tip="Loading..." style={{ align: "center" }} /></div>)}
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit"> Save </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}
export default Policy;