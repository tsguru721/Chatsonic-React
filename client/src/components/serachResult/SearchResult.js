import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import {
  askToChatsonic,
  askToGoogleVertex,
  newChatBox,
  exchangeCurrentItem,
  askToOpenai
} from '../../actions/search';

import data from '../../openai.json';
const SearchResult = ({
  auth,
  gtoken,
  searchResult,
  askToChatsonic,
  askToGoogleVertex,
  askToOpenai,
  searchState,
  searchQuery,
  searchQueries,
  searchResults,
  newChatBox,
  currentItem,
  searchHistory,
  exchangeCurrentItem
}) => {
  // const { id } = useParams();
  const [formData, setFormData] = useState({
    input_text: '',
    promptList: ['legal', 'research'],
    prompt: ''
  });
  const {
    input_text
    // promptList,
    // prompt
  } = formData;
  // eslint-disable-next-line
  const searchWithChatsonic = (e) => {
    askToChatsonic(formData, auth.user.email);
  };

  const searchWithGoogleVertex = (e) => {
    askToGoogleVertex(formData, auth.user.email, gtoken, searchQueries);
    setFormData({ ...formData, input_text: '' });
  };

  const searchWithOpenai = (e) => {
    askToOpenai(formData, auth.user.email, data.openAIKey, searchQueries);
    setFormData({ ...formData, input_text: '' });
  };
  // const research = (e) => {
  //   askToChatsonic(
  //     {
  //       input_text: searchQuery,
  //       promptList: ['legal', 'research'],
  //       prompt: ''
  //     },
  //     auth.user.email
  //   );
  // };

  const makeNewChat = (e) => {
    newChatBox(currentItem, searchQueries, searchResults, searchHistory);
  };
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // const handleKeyDown = (event) => {
  //   if (event.key === 'Enter') {
  //     event.preventDefault();
  //     setFormData({
  //       ...formData,
  //       promptList: [...promptList, event.target.value]
  //     });
  //   }
  // };

  // const renderReSearchButton = () => {
  //   if (!searchState && searchResult !== null) {
  //     return (
  //       <button onClick={research} className="btn btn-success research-btn">
  //         ReSearch
  //       </button>
  //     );
  //   }
  // };

  const searchByEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      askToOpenai(formData, auth.user.email, data.openAIKey, searchQueries);
    }
  };
  const exchangeHistory = (key) => {
    exchangeCurrentItem(key);
  };

  const inputstyle = {
    margin: '0 0 10px 0'
  };

  return (
    <section className="container">
      <div className="row">
        <div className="col-md-2 search-history-list">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <button
                  className="btn btn-primary new-chat-btn"
                  onClick={makeNewChat}
                >
                  New Chat
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                {searchHistory.map((index, key) => (
                  <div key={key}>
                    <button
                      className="btn btn-success search-History-Item"
                      onClick={() => exchangeHistory(key)}
                    >
                      {index.searchQueries[0].slice(0, 20)}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-10">
          <div className="container result-search-board">
            {searchResults.map((index, key) => (
              <div key={key}>
                <div className="row">
                  <div className="col-md-12">
                    <div className="searchQuery-board">
                      {searchQueries[key]}
                    </div>
                  </div>
                </div>
                <div className="row search-dash">
                  <div className="col-md-12">
                    {/* <p>{index}</p> */}
                    <div
                      className="result-board"
                      dangerouslySetInnerHTML={{ __html: index }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}

            <div className="row">
              <div className="col-md-12">
                <div className="search-bar-group">
                  <input
                    className="form-control  search-input"
                    rows="5"
                    name="input_text"
                    placeholder="Enter your query here…"
                    value={input_text}
                    onChange={onChange}
                    onKeyDown={searchByEnter}
                    style={inputstyle}
                  ></input>
                  <i className="fas fa-search search-icon" />

                  {searchState ? (
                    <button className="btn btn-danger search-btn generaging-btn">
                      Generating Result
                    </button>
                  ) : (
                    <>
                      {/* <button
                onClick={searchWithChatsonic}
                className="btn btn-primary search-btn"
              >
                Search To Chatsonic
              </button> */}

                      <button
                        onClick={searchWithOpenai}
                        className="btn btn-success home-search-btn"
                      >
                        Search
                      </button>
                    </>
                  )}
                  {/* {renderReSearchButton()} */}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <p className="follow-up-query-alarm">
                  Feel free to ask me follow up questions if you’d like me to
                  provide more details. If the result isn’t to your
                  satisfaction, let me know and ask me again.{' '}
                </p>
              </div>
            </div>
            <div className="row footer">
              <div className="col-md-12 privacy-footer">
                <Link to="/privacy">
                  <b className="termUseP privacy-link">
                    Privacy Policy & Terms of Use
                  </b>
                </Link>
                <p className="termUseP  copyright">©2023 by lawsearch.ai</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

SearchResult.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  gtoken: state.auth.gtoken,
  searchResult: state.search.searchResult,
  searchState: state.search.searchState,
  searchQuery: state.search.searchQuery,
  searchQueries: state.search.query,
  searchResults: state.search.result,
  currentItem: state.search.currentList,
  searchHistory: state.search.searchHistory
});

export default connect(mapStateToProps, {
  askToChatsonic,
  askToGoogleVertex,
  askToOpenai,
  newChatBox,
  exchangeCurrentItem
})(SearchResult);
