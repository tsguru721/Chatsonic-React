import React from 'react';
import PropTypes from 'prop-types';
// import {  useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { subscribe, subscribeFreetrial } from '../../actions/subscribe';
const ContactUS = ({ auth, subscribe, subscribeFreetrial }) => {
  return (
    <section className="container">
      <h1 className="contactSubject">Contact US</h1>
      <div className="row">
        <div className="col-md-12">
          <div className="contactUsBox">
            <p>lawsearch.ai</p>
            <p>
              <i className="fa fa-envelope emailIcon" />
              Email: info@lawsearch.ai
            </p>
            <p>Address: 30 North Gould St, WY, 82801</p>
            <p>GMO Commerce LLC</p>
          </div>
        </div>
      </div>

      <Link to="/privacy">
        <b className="termUseP privacy-link">Privacy Policy & Terms of Use</b>
      </Link>
      <p className="termUseP  copyright">©2023 by lawsearch.ai</p>
    </section>
  );
};

ContactUS.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  // profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {
  subscribe,
  subscribeFreetrial
})(ContactUS);
