import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from '@paypal/react-paypal-js';

import { Link } from 'react-router-dom';
import { subscribe, subscribeFreetrial } from '../../actions/subscribe';
// This values are the props in the UI
const amount = '35';
const currency = 'USD';
const style = { layout: 'vertical' };

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner, auth, subscribe }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const subscribePlan = (e) => {
    subscribe(auth.user.email);
  };

  useEffect(
    () => {
      // eslint-disable-next-line
      dispatch({
        type: 'resetOptions',
        value: {
          // eslint-disable-next-line
          ...options,
          currency: currency
        }
      });
    },
    // eslint-disable-next-line
    [currency, showSpinner]
  );
  return (
    <div>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={'paypal'}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount
                  }
                }
              ]
            })
            .then((orderId) => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function (data, actions) {
          return actions.order.capture().then(function () {
            // Your code here after capture the order
            subscribePlan();
            console.log('Payment result:', data);
          });
        }}
      />
    </div>
  );
};

const Payment = ({ auth, subscribe, subscribeFreetrial }) => {
  console.log('auth in payment compoenent', auth);
  const email = auth.user.email;
  const subscribeFreePlan = (e) => {
    subscribeFreetrial(email);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 paymentOnePlanDiv">
          <p className="paymentOnePlanSubject">One Plan for All</p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="freeTrialBox">
            <p>7 Days Free, then</p>
            <p className="status">$50 /Month</p>
            <p className="cancelTrial">Features</p>
            <ul>
              <li>Cancel Anytime</li>
              <li>Complete access lawsearch.ai</li>
              <li>No hidden extra costs</li>
              <li>Unlimitted Users Per Firm</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 paymentOnePlanDiv">
          <button
            onClick={subscribeFreePlan}
            className="freeTralBtn
              "
          >
            Try for free
            <i className="fa fa-arrow-right tryfreeicon" />
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 paymentOnePlanDiv">
          <p className="paymentTitle">
            Payments processed by Stripe and Paypal
          </p>
        </div>
      </div>
      <div style={{ maxWidth: '750px', minHeight: '50px', margin: 'auto' }}>
        <PayPalScriptProvider
          options={{
            clientId:
              'Aez2e9MqiKUwcoseneohjffFMcafXS-7qF5xe1EHkIbKHSQl8d4UKcmd0wvDNpMJl8fWQrSiVTaoJsGB',
            components: 'buttons',
            currency: 'USD'
          }}
        >
          <ButtonWrapper
            subscribe={subscribe}
            auth={auth}
            currency={currency}
            showSpinner={false}
          />
        </PayPalScriptProvider>
      </div>
      <div className="row">
        <div className="col-md-12 stripediv">
          <Link className="gotoStripe" to="/stripe">
            <div className="stripeBtnDiv"></div>
          </Link>
        </div>
      </div>
      <Link to="/privacy">
        <b className="termUseP privacy-link">Privacy Policy & Terms of Use</b>
      </Link>
      <p className="termUseP  copyright">©2023 by lawsearch.ai</p>
    </div>
  );
};

Payment.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { subscribe, subscribeFreetrial })(
  Payment
);
