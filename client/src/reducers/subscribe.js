import { SetStripePromise } from '../actions/types';

const initialState = {
  setStripePromise: null
};

function subscribeReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SetStripePromise:
      return {
        ...state,
        setStripePromise: payload
      };
    default:
      return state;
  }
}

export default subscribeReducer;
