import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import { connect } from 'react-redux';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { createArticle, getAll } from '../../actions/article';
import { useNavigate } from 'react-router-dom';
const TextEditor = ({ auth, createArticle, getAll }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  const onEditorStateChange = async (editorState) => {
    await setEditorState(editorState);
    setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };
  const onSubjectChange = async (e) => {
    await setSubject(e.target.value);
    console.log('State', subject);
  };
  const navigate = useNavigate();
  const createNewArticle = () => {
    // getAll();
    createArticle(subject, content);
    navigate('/articleList');
  };
  console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  return (
    <div>
      <button
        className="btn btn-success articleSaveBtn"
        onClick={createNewArticle}
      >
        Save
      </button>
      <input
        type="text"
        className="form-control articleSubject"
        placeholder="Enter subject"
        name="subject"
        onChange={onSubjectChange}
      ></input>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
      {/* <textarea
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      ></textarea> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { createArticle, getAll })(TextEditor);
