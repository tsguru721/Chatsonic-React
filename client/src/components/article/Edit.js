import React, { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import { connect } from 'react-redux';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { stateFromHTML } from 'draft-js-import-html';
import draftToHtml from 'draftjs-to-html';
import { createArticle, getAll, getArticleById } from '../../actions/article';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const TextEditor = ({
  auth,
  createArticle,
  getAll,
  article,
  getArticleById
}) => {
  const { id } = useParams();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState(null);

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };
  const onSubjectChange = (e) => {
    setSubject(e.target.value);
    // console.log('State', subject);
  };
  const navigate = useNavigate();
  const createNewArticle = () => {
    // getAll();
    createArticle(subject, content);
    navigate('/articleList');
  };
  useEffect(
    () => {
      getArticleById(id);
      console.log('id', id);
      console.log('article', article);
      setSubject(article.subject);
      setContent(article.content);
    },
    // eslint-disable-next-line
    [id, subject, content]
  );

  useEffect(
    () => {
      getArticleById(id);
      setSubject(article.subject);
      setContent(article.content);
      // setEditorState(stateFromHTML(article.content));
    },

    // eslint-disable-next-line
    []
  );
  useEffect(() => {
    console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  }, [editorState]);

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
        // value={subject}
      ></input>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
      <textarea
        disabled
        value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
      ></textarea>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,

  article: state.article.article
});

export default connect(mapStateToProps, {
  createArticle,
  getArticleById,
  getAll
})(TextEditor);
