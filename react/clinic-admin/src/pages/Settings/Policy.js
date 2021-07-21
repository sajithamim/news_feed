import React, { useState } from "react";
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Policy = () => {
    const [editorState, seteditorState] = useState(EditorState.createEmpty());
    
    const onEditorStateChange = (editorState) => {
        //console.log('content', content)
        seteditorState(editorState);
    }

    return (

        <Editor
        initialContentState={editorState}
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
        />

    )
}
export default Policy;