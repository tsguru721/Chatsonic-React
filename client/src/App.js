import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/layout/Navbar';
import Header from './components/layout/Header';
// import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import ProfileForm from './components/profile-forms/ProfileForm';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/layout/NotFound';
import PrivateRoute from './components/routing/PrivateRoute';
import Home from './components/home/Home';
import HowItWorks from './components/howitworks/HowItWorks';
import About from './components/about/About';
import ContactUS from './components/about/ContactUS';
import Privacy from './components/privacy/Privacy';
import SearchResult from './components/serachResult/SearchResult';
import Payment from './components/payment/Payment';
import Stripe from './components/payment/Stripe';
import Completion from './components/payment/Completion';
import ArticleList from './components/article/ArticleList';
import Article from './components/article/Article';
import Create from './components/article/Create';
import EditArticle from './components/article/Edit';
import { LOGOUT } from './actions/types';

// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
// import { setStripePromise } from './actions/subscribe';
import setAuthToken from './utils/setAuthToken';
import { loadStripe } from '@stripe/stripe-js';

import './App.css';

const App = () => {
  const [stripePromise, setStripePromiseState] = useState(null);
  useEffect(() => {
    fetch('/config').then(async (r) => {
      const { publishableKey } = await r.json();
      setStripePromiseState(loadStripe(publishableKey));
      // setStripePromise(loadStripe(publishableKey));
    });
  }, []);
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    }
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Alert />
        <Routes>
          <Route path="/" element={<PrivateRoute component={Home} />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profiles" element={<Profiles />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="article/:id" element={<Article />} />
          <Route path="editArticle/:id" element={<EditArticle />} />
          {/* <Route path="home" element={<Home />} /> */}
          <Route path="howItWorks" element={<HowItWorks />} />
          <Route path="about" element={<About />} />
          <Route
            path="stripe"
            element={<Stripe stripePromise={stripePromise} />}
          />
          <Route
            path="/completion"
            element={<Completion stripePromise={stripePromise} />}
          />
          <Route path="privacy" element={<Privacy />} />
          <Route path="articleList" element={<ArticleList />} />
          <Route path="articleCreate" element={<Create />} />
          {/* <Route path="searchResult" element={<SearchResult />} /> */}

          <Route path="home" element={<PrivateRoute component={Home} />} />
          <Route path="contactus" element={<ContactUS />} />
          <Route
            path="searchResult"
            element={<PrivateRoute component={SearchResult} />}
          />
          <Route
            path="dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route
            path="create-profile"
            element={<PrivateRoute component={ProfileForm} />}
          />
          <Route
            path="edit-profile"
            element={<PrivateRoute component={ProfileForm} />}
          />
          <Route
            path="add-experience"
            element={<PrivateRoute component={AddExperience} />}
          />
          <Route
            path="add-education"
            element={<PrivateRoute component={AddEducation} />}
          />
          <Route
            path="payment"
            element={<PrivateRoute component={Payment} />}
          />
          <Route path="posts" element={<PrivateRoute component={Posts} />} />
          <Route path="posts/:id" element={<PrivateRoute component={Post} />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
