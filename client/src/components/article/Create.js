import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { askToChatsonic } from '../../actions/search';
import TextEditor from './TextEditor';
const Create = ({
  auth,
  askToChatsonic,
  searchState,
  searchQuery,
  searchQueries,
  searchResults
}) => {
  return (
    <section className="container">
      <div className="articleEditor">
        <h1>New Article</h1>
        <TextEditor />
      </div>
    </section>
  );
};

Create.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  searchResult: state.search.searchResult,

  searchState: state.search.searchState,
  searchQuery: state.search.searchQuery,
  searchQueries: state.search.query,
  searchResults: state.search.result
});

export default connect(mapStateToProps, { askToChatsonic })(Create);
