import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  function handleClick() {
    const element = document.getElementById('pagelistbtn');
    element.classList.remove('show');
    // setClassName('');
  }
  const authLinks = (
    <div>
      <ul
        onClick={handleClick}
        id="pagelistbtn"
        className="top-menu-bar collapse"
      >
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/searchResult">Search Result</Link>
        </li>
        <li>
          <Link to="/payment">Plan & Billing</Link>
        </li>
        <li>
          <Link to="/articleList">Articles</Link>
        </li>
        <li>
          <Link to="/articleCreate">Add Article</Link>
        </li>
        <li>
          <Link to="/contactus">Contact Us</Link>
        </li>
        <li>
          <a onClick={logout} href="#!">
            <i className="fas fa-sign-out-alt" />{' '}
            <span className="hide-sm">Logout</span>
          </a>
        </li>
      </ul>
    </div>
  );

  const guestLinks = (
    <ul
      onClick={handleClick}
      id="pagelistbtn"
      className="top-menu-bar collapse"
    >
      {/* <li>
        <Link to="/profiles">Developers</Link>
      </li> */}
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar">
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
