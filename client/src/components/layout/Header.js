import React, { Fragment } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from './Navbar';

const Header = ({ isAuthenticated }) => {
  const guestLinks = (
    <div>
      {/* <Link className="login-btn" to="/login">
      <i className="fas fa-user" />
      Login
    </Link> */}
    </div>
  );
  const empty = <div></div>;
  return (
    <section className="header">
      <div className="logo-group">
        {/* <Link to="/">
          <div className="logo"></div>
        </Link> */}
        <button
          type="button"
          className="btn btn-primary collapse-btn"
          data-bs-toggle="collapse"
          data-bs-target="#pagelistbtn"
        >
          ||
        </button>
      </div>

      <Navbar />
      <Fragment>{isAuthenticated ? empty : guestLinks}</Fragment>
    </section>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Header);
