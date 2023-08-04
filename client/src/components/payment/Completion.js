import React, { useEffect, useState } from 'react';

function Completion(props) {
  const [messageBody, setMessageBody] = useState('');
  const { stripePromise } = props;

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe) => {
      const url = new URL(window.location);
      const clientSecret = url.searchParams.get('payment_intent_client_secret');
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(
        clientSecret
      );

      setMessageBody(
        error ? (
          `> ${error.message}`
        ) : (
          <div>
            &gt; Payment {paymentIntent.status}:{' '}
            <a
              href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`}
              target="_blank"
              rel="noreferrer"
            >
              {paymentIntent.id}
            </a>
          </div>
        )
      );
    });
  }, [stripePromise]);

  return (
    <div>
      <h1>Thank you!</h1>
      <a href="/">home</a>
      <div
        id="messages"
        role="alert"
        style={messageBody ? { display: 'block' } : {}}
      >
        {messageBody}
      </div>
    </div>
  );
}

export default Completion;
