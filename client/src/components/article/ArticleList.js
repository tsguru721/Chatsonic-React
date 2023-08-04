import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAll } from '../../actions/article';
const ArticleList = ({ auth, allArticles, getAll }) => {
  useEffect(
    () => {
      getAll();
    },
    // eslint-disable-next-line
    []
  );

  return (
    <section className="article-dash">
      {allArticles.map((index, key) => (
        <div key={index._id}>
          <Link to={`/article/${index._id}`}>
            <div className="article">
              <div className="articlePreview"></div>
              <p>{index.subject}</p>
            </div>
          </Link>
          {/* <div
          className="article"
          dangerouslySetInnerHTML={{ __html: index.content }}
        ></div> */}
        </div>
      ))}
    </section>
  );
};

ArticleList.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  allArticles: state.article.articles
});

export default connect(mapStateToProps, {
  getAll
})(ArticleList);
