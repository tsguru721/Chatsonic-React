import React from 'react';
import PropTypes from 'prop-types';
// import {  useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const HowItWorks = ({ auth }) => {
  // const { id } = useParams();

  const mystyle = {
    margin: 'auto',
    fontWeight: 'bold'
  };
  const guide = {
    paddingTop: '2vw'
  };
  return (
    <section className="container">
      <div className="row">
        <div className="how-it-works">
          <div className="how-logo-string">How it works</div>
        </div>
      </div>
      <div className="row" style={guide}>
        <div className="col-md-4">
          <div className="row howItWork-ai"></div>
          <div className="row">
            <p className="guide-subject">The Power of Artifical Intelligence</p>
            <p>
              ​lawsearch.ai is an AI-powered legal research tool designed to
              streamline the process of finding relevant case law, statutes, and
              other legal documents, by leveraging natural language processing
              (NLP) and machine learning algorithms.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row howItWork-except"></div>
          <div className="row">
            <p className="guide-subject">What Can I Expect?</p>
            <p>
              lawsearch.ai offers features such as case summaries, citation
              analysis, and legal analytics to help you gain deeper insights
              into the legal issues you are researching.  ​ lawsearch.ai makes
              legal research more efficient, accurate, and user-friendly.
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row howItWork-start"></div>
          <div className="row">
            <p className="guide-subject">How to Get Started</p>
            <p>
              Get started by filling our a short survey and entering your legal
              query in simple, natural language into the search bar. The AI
              system will analyze the query, extracting important keywords and
              legal concepts. Using its extensive database of legal resources,
              lawsearch.ai generates a list of the most relevant cases,
              statutes, and documents that match your query.
            </p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="row howItWork-tools"></div>
          <div className="row">
            <p className="guide-subject">
              How Is It Different From Other Tools?
            </p>
            <p>
              Say goodbye to expensive legal data subscriptions and hello to a
              smarter, more efficient way of searching legal databases.
            </p>
            <p>
              Our revolutionary platform harnesses the power of AI and LLM to
              search through publicly available cases and litigation. From your
              searches, you will get the most relevant information related to
              your case; precedents and links to similar cases, all presemted in
              an easy to read presentation. lawsearch.ai provides insights into
              your questions as well.   
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row howItWork-catch"></div>
          <div className="row">
            <p className="guide-subject">What's The Catch?</p>
            <p>
              There is no catch! Just try it out for free and see if its a
              service that would be helpful for you going forward. No strings
              attached!
            </p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="row howItWork-last"></div>
          <div className="row">
            <p className="guide-subject">lawsearch.ai</p>
            <p>
              An AI-powered legal research tool that helps law firms harness the
              power of disruptive technology to improve their practices. The
              tool uses natural language processing and machine learning to
              analyze millions of cases and legal documents, giving you fast
              answers to your legal questions.
            </p>
          </div>
        </div>
      </div>
      {/* <div className="row contact-title">Contact</div>
      <div className="row contact-description">
        Like what you see? Get in touch to learn more.
      </div>
      <div className="row">
        <div className="col-md-12 social-icons">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-linkedin"></i>
          <i className="fab fa-instagram"></i>
        </div>
      </div>
      <div className="row">
        <form className="contact-form" action="/action_page.php">
          <div className="mb-3">
            <div>
              <label className="form-label">First Name :</label>
            </div>
            <input
              type="text"
              className="form-control sesarch-input"
              placeholder="First Name"
              name="pswd"
            />
            <div>
              <label className="form-label">Last Name :</label>
            </div>
            <input
              type="text"
              className="form-control sesarch-input"
              placeholder="Last Name"
              name="pswd"
            />
            <div>
              <label className="form-label">Email :</label>
            </div>
            <input
              type="email"
              className="form-control sesarch-input"
              placeholder="Email"
              name="pswd"
            />
            <div>
              <label className="form-label">Message :</label>
            </div>
            <input
              type="text"
              className="form-control sesarch-input"
              placeholder="Message"
              name="pswd"
            />
          </div>
        </form>
      </div>
      <div className="row">
        <div className="col-md-12 submit-btn">
          <button className="btn btn-primary search-btn">Send</button>
        </div>
      </div> */}
      <div className="row footer">
        <div className="col-md-12 privacy-footer">
          <Link to="/privacy">
            <b className="termUseP privacy-link">
              Privacy Policy & Terms of Use
            </b>
          </Link>
          <p className="termUseP" style={mystyle}>
            ©2023 by lawsearch.ai
          </p>
        </div>
      </div>
    </section>
  );
};

HowItWorks.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  // profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps)(HowItWorks);
