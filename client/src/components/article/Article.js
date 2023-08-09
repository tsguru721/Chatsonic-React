import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  getAll,
  getArticleById,
  deleteArticleById
} from '../../actions/article';
const Article = ({
  auth,
  article,
  allArticles,
  getAll,
  getArticleById,
  deleteArticleById
}) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const deleteArticle = async () => {
    const result = deleteArticleById(id);
    if (result) navigate('/articleList');
  };
  useEffect(
    () => {
      // eslint-disable-next-line
      getArticleById(id);
      // console.log('article', article);
    }, // eslint-disable-next-line
    [id]
  );

  return (
    <section className="article-item">
      <Link to={`/editArticle/${id}`}>
        <button className="btn btn-primary articleSaveBtn">Edit</button>
      </Link>

      <button className="btn btn-danger articleSaveBtn" onClick={deleteArticle}>
        Delete
      </button>
      <h1 className="articleItemSubject">{article.subject}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.content }}></div>

      <div className="row footer">
        <div className="col-md-12 privacy-footer">
          <Link to="/privacy">
            <b className="privacy-link">Privacy Policy & Terms of Use</b>
          </Link>
          <p className="termUseP copyright">©2023 by lawsearch.ai</p>
        </div>
      </div>
    </section>
  );
};

Article.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  allArticles: state.article.articles,
  article: state.article.article
});

export default connect(mapStateToProps, {
  getAll,
  getArticleById,
  deleteArticleById
})(Article);
