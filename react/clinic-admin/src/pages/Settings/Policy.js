import React, { useState, useEffect } from "react";
import { Form, Button, message, Card, Spin } from "antd";
import { useDispatch } from "react-redux";
import { getPrivacy, postPrivacy } from "../../actions/settings";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState,  ContentState, convertFromHTML } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Policy = () => {
    const dispatch = useDispatch();
    const [id, setId] = useState(EditorState.createEmpty())
    useEffect(() => {
        dispatch(getPrivacy())
            .then(res => {
                if (res.data[0]) {
                    setId(res.data[0].id);
                    const contentBlocks = convertFromHTML(res.data && res.data[0] && res.data[0].privacy_policy);
                    const contentState = ContentState.createFromBlockArray(contentBlocks);
                    setEditorState(EditorState.createWithContent(contentState));
                }
            })
    }, [])

    const [convertedContent, setConvertedContent] = useState();

    const handleSubmit = () => {
        let newData = {}
        newData.privacy_policy = convertedContent;
        dispatch(postPrivacy(newData))
            .then(() => {
                message.success('Policy added successfully')
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
            <Card title="Policy" style={{ width: "100%", height: 'auto' }}>
                <Form name="basic" wrapperCol={{ span: 10 }} onFinish={handleSubmit}>
                    {editorState && editorState ?
                        (<Editor
                            editorState={editorState}
                            editorStyle={{border: "1px solid", overflowY: "scroll", height: '400px'}}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={handleEditorChange}
                        />
                        ) : (<div className="spinner"><Spin tip="Loading..." style={{ align: "center" }} /></div>)}
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" style={{ position: 'absolute'}}> Save </Button>
                    </Form.Item>
                </Form>
            </Card>
    )
}
export default Policy;