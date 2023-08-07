import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  askToChatsonic,
  askToGoogleVertex,
  askToOpenai
} from '../../actions/search';
import howitworksAvatar from '../../img/howItworksManAvatar.png';
import { subscribeFreetrial } from '../../actions/subscribe';
import data from '../../openai.json';
const Home = ({
  auth,
  gtoken,
  searchState,
  askToChatsonic,
  askToGoogleVertex,
  askToOpenai,
  searchQueries,
  subscribeFreetrial
}) => {
  let myPromise = new Promise(function (myResolve, myReject) {
    // "Producing Code" (May take some time)
    myResolve(); // when successful
    myReject(); // when error
  });

  const user = auth.user;
  const subscribeFreePlan = (e) => {
    subscribeFreetrial(user.email);
  };
  // const { id } = useParams();
  const navigate = useNavigate();

  function gotoSearchResult() {
    navigate('/searchResult');
  }
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
    myPromise.then(askToChatsonic(formData, auth.user.email)).then(function () {
      gotoSearchResult();
    });
  };
  const searchWithGoogleVertex = (e) => {
    myPromise
      .then(askToGoogleVertex(formData, auth.user.email, gtoken, searchQueries))
      .then(function () {
        gotoSearchResult();
      });
  };
  const searchWithOpenai = (e) => {
    myPromise
      .then(
        askToOpenai(formData, auth.user.email, data.openAIKey, searchQueries)
      )
      .then(function () {
        gotoSearchResult();
      });
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const searchByEnter = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();

      myPromise
        .then(
          askToOpenai(formData, auth.user.email, data.openAIKey, searchQueries)
        )
        .then(function () {
          gotoSearchResult();
        });
    }
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

  const bold = {
    margin: 'auto',
    fontWeight: 'bold'
  };
  const boldItalic = {
    fontWeight: 'bold',
    fontStyle: 'italic'
  };
  const fontItalic = {
    fontStyle: 'italic'
  };
  const inputstyle = {
    margin: '0'
  };
  useEffect(() => {
    // fetchData();
  }, []);
  return (
    <section className="container">
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div className="search-logo"></div>
        </div>
      </div>
      <div className="row">
        {/* <div className="col-md-4"></div> */}
        <div className="col-md-12">
          <p className="search-logo-name">LAWSEARCH.AI</p>
          <p className="search-logo-name search-logo-name-blue">
            AI POWERED LEGAL RESEARCH
          </p>
        </div>
        {/* <div className="col-md-4"></div> */}
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="search-bar-group">
            {/* <div>
              <label className="form-label">Search Keyword:</label>
            </div> */}

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
            {/* <input
              type="text"
              className="form-control sesarch-input"
              placeholder="Enter your query here…"
              name="input_text"
              value={input_text}
              onChange={onChange}
              onKeyDown={searchByEnter}
              style={inputstyle}
            /> */}

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

            {/* <input
              type="text"
              className="form-control sesarch-input"
              placeholder="Prompt List"
              name="promptList"
              value={promptList}
              onChange={onChange}
              style={inputstyle}
            />
            <input
              type="text"
              className="form-control sesarch-input"
              placeholder="Enter Prompt"
              name="prompt"
              value={prompt}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              style={inputstyle}
            /> */}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 search-dash">
          <p style={bold}>
            Ask me about a question about a legal case above... Sign up for a
            free 7 day trial, all you have to do is
          </p>
          <ul>
            <li>
              <b>
                Tell me what legal area you specialize in (Criminal, Divorce,
                Patent etc).
              </b>
            </li>
            <li>
              <b>
                Tell me where you practice out of, and the nexus of the case.
              </b>
            </li>
            <li>
              <b>
                Give me as much detail as possible (but please don't mention
                names for privacy reasons).
              </b>
            </li>
            <li>
              <b>
                Keep asking me questions - If you want me to elaborate on
                anything, just ask!
              </b>
            </li>
          </ul>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 freetrialHomeBtnDiv">
          <button className="freetrialHomeBtn" onClick={subscribeFreePlan}>
            Start Your Free Trial
            <i className="fa fa-arrow-right tryfreeicon" />
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 optimal-result-dash">
          <p className="optimal-result-subject" style={bold}>
            For optimal results:
          </p>
          <p>
            For optimal results, make sure that at the end of your initial
            query, you include this phrase:
          </p>
          <p style={boldItalic}>
            “Please provide 5 similar cases that may be used as precedent.
            Please summarize the key points and outcomes of this case.”
          </p>
          <p style={fontItalic}>
            IMPORTANT: Remember that at the core I am a <b>language model</b>,
            and not just a legal database. Don’t be discouraged if I happen to
            say I can’t provide what you are asking. If the answer isn't good
            enough, either “Re-Search” or query again, but with a few tweaks.
            Sometimes I can take some time generating a response as I am
            scouring through millions of documents. So if it’s taking a while,
            don’t worry, it will be worth the wait!
          </p>
          <p style={bold}>
            Here's a good example of a query that would yield good results;
          </p>
          <p style={fontItalic}>
            "My client, who lives in <b>California</b>, purchased a skincare
            product from a well-known company based on their claims that the
            product will eliminate acne and provide clear skin within a week.
            She spent a significant amount of money on the product, hoping to
            improve her skin condition. However, after using the product as
            directed for several weeks, She not only fails to see any
            improvement in her acne but also experiences skin irritation and
            redness. <b>Feeling misled by the company's advertising claims</b>,
            she decides to pursue a case against them based upon{' '}
            <b>consumer law</b>. Please provide 5 similar cases that may be used
            as precendent. Please summarize the key points and outcomes of these
            cases.”
          </p>
          <p>
            N.B -{' '}
            <b>lawsearch.ai does not scrape the databases of paid services</b>
            ... because it simply doesn't need to! Sometimes, I may provide you
            links that are stale. In that case, simply search for the case on
            Justia, Google Scholar or other databases for full case details.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 feed">
          <div className="feed1"></div>
        </div>
        <div className="col-md-4 feed2">
          <p style={boldItalic}>What's the catch?</p>
          <p>
            There is no catch! Just try it out for free and see if its a service
            that would be helpful for you going forward. No strings attached!
          </p>
        </div>
        <div className="col-md-4 feed">
          <div className="feed3"></div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 howItworksRow">
          <img
            src={howitworksAvatar}
            alt="BigCo Inc. logo"
            style={{ height: 100, width: 70 }}
          />
          <p className="howitworkSubject">How it works</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 how1">
          <p style={boldItalic}>Why is AI important?</p>
          <p>
            Lawsearch.ai is an AI-powered legal research tool designed to
            streamline the process of finding relevant case law, statutes, and
            other legal documents, by leveraging natural language processing
            (NLP) and machine learning algorithms.
          </p>
        </div>
        <div className="col-md-3 how2">
          <p style={boldItalic}>
            How is this different to other tools on the market?
          </p>
          <p>
            Our revolutionary platform harnesses the power of AI and LLM to
            search through publicly available cases and litigation. From your
            searches, you will get the most relevant information related to your
            case, in an easy to read presentation.
          </p>
        </div>
        <div className="col-md-3 how3">
          <p style={boldItalic}>What can i expect?</p>
          <p>
            {' '}
            Features such as case summaries, precedent suggestions and legal
            analytics to help you gain deeper insights into the legal issues you
            are researching. ​ lawsearch.ai makes legal research more efficient,
            accurate, and user-friendly.
          </p>
        </div>
        <div className="col-md-3 how4">
          <p style={boldItalic}>How to get started with lawsearch.ai?</p>
          <p>
            After you sign up for your free trial, simply type your legal query
            in simple, natural language into the search bar. As it is a natural
            language processing model, it understands the context and relevance
            of the information needed. It then scans thousands of sources (free
            databases, catalogs and digital archives) to provide you with a
            succinct list of relevant cases/precedents to assist you in
            assessing your case.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 freetrialHomeBtnDiv">
          <button className="freetrialHomeBtn-7">
            <p>7 Day Free Trial - Click Here to Sign Up</p>
            <i className="fa fa-check" />
          </button>
        </div>
      </div>
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

Home.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  gtoken: state.auth.gtoken,
  searchState: state.search.searchState,

  searchQueries: state.search.query
});

export default connect(mapStateToProps, {
  askToChatsonic,
  askToGoogleVertex,
  subscribeFreetrial,
  askToOpenai
})(Home);
