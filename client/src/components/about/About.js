import React from 'react';
import PropTypes from 'prop-types';
// import {  useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { subscribe, subscribeFreetrial } from '../../actions/subscribe';

import aboutUsImg from '../../img/aboutUsTopImg.png';
const About = ({ auth, subscribe, subscribeFreetrial }) => {
  return (
    <section className="container aboutUsContainer">
      <div className="row">
        <div className="row">
          <div className="col-md-12">
            <img
              className="aboutUsImg"
              alt="aboutUs Img"
              src={aboutUsImg}
              style={{ height: 200, width: 350 }}
            />
          </div>
        </div>
        <div className="col-md-12 about-guides-field">
          <p>
            lawsearch.ai is an AI-powered legal research tool that helps law
            firms harness the power of AI to <b>save time and money</b>.
          </p>
          <p>
            <i className="fa fa-check about-us-check-icon" />
            Natural language processing (NLP) and machine learning to analyze
            millions of cases and legal documents, giving you fast answers to
            your legal queries.
          </p>
          <p>
            <i className="fa fa-check about-us-check-icon" />
            At the core - a simple tool that you can use every day in your
            practice to save valuable time.
          </p>
          <p>
            <i className="fa fa-check about-us-check-icon" />
            Ask me about potential cases and it will reply with precedents,
            relevant cases and other relevant information.{' '}
            <i>
              lawsearch.ai is not looking to replace your trusted legal research
              tools entirely, but simply compliment them and make your life
              easier.
            </i>
          </p>
          <p>
            <i className="fa fa-exclamation about-us-warning-icon" />
            Your time should not be spent on working out the right specific
            keywords and phrases to input into complex legal research tools -
            why not use lawsearch.ai to get a quick read on the case, save your
            time, and get onto the more complex parts of your job?
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
          <p className="termUseP copyright">©2023 by lawsearch.ai</p>
        </div>
      </div>
    </section>
  );
};

About.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  // profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  subscribe,
  subscribeFreetrial
})(About);
