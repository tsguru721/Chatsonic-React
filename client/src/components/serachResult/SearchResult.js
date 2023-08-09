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
        <div className="col-md-2 col-sm-12 search-history-list">
          <div className="container search-result-history-div">
            <div className="row">
              <div className="col-md-12 new-chat-btn-div">
                <button className="btn new-chat-btn" onClick={makeNewChat}>
                  <i className="fas fa-plus new-chat-icon" />
                  New Chat
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                {searchHistory.map((index, key) => (
                  <div key={key}>
                    <div
                      className="btn search-History-Item"
                      onClick={() => exchangeHistory(key)}
                    >
                      <svg
                        stroke="currentColor"
                        fill="none"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="h-4 w-4 chat-item"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                      {index.searchQueries[0].slice(0, 10)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-10 col-sm-12">
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
                  <i
                    className="fas fa-search search-icon"
                    onClick={searchWithOpenai}
                  />

                  {searchState ? (
                    <button className="btn btn-danger search-btn generaging-btn">
                      Searching
                    </button>
                  ) : (
                    <>
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
                  Please ask me follow up questions if you’d like more details.
                  Answer not what you were looking for? Simply search again and
                  I’ll do my best to produce an an appropriate answer
                </p>
              </div>
            </div>
          </div>
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
