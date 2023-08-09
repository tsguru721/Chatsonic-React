import api from '../utils/api';
import { setAlert } from './alert';
import { GETARTICLE_SUCCESS, GET_ARTICLE } from './types';

// Add article
export const createArticle = (subject, content) => async (dispatch) => {
  const res = await api.post('/article/create', {
    subject: subject,
    content: content
  });
  if ((res.status = 200)) {
    dispatch(setAlert('New Article created', 'success'));
  }
};

// Get all articles
export const getAll = () => async (dispatch) => {
  const res = await api.get('/article/');
  console.log('data', res.data);
  if ((res.status = 200)) {
    dispatch({
      type: GETARTICLE_SUCCESS,
      payload: res.data
    });
    return res.data;
  }
};

// Get article by ID
export const getArticleById = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/article/${userId}`);
    dispatch({
      type: GET_ARTICLE,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

// Delete article by ID
export const deleteArticleById = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/article/delete/${userId}`);
    if (res.status === 200)
      dispatch(setAlert('New Article deleted', 'success'));
  } catch (err) {
    console.log(err);
  }
};
