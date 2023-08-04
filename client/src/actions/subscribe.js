import api from '../utils/api';
import { setAlert } from './alert';

import { SetStripePromise } from './types';
// Add comment
export const subscribe = (email) => async (dispatch) => {
  const check = await api.post('/subscribe/checkSubscribe', { email: email });
  if (check.data.nonSubscribe === true) {
    await api.post('/subscribe', { email: email });
    dispatch(setAlert('Subsribe success for 35 days !', 'success'));
  } else dispatch(setAlert('Finished free trial', 'danger'));
};
export const subscribeFreetrial = (email) => async (dispatch) => {
  const check = await api.post('/subscribe/checkSubscribe', { email: email });
  if (check.data.nonSubscribe === true) {
    await api.post('/subscribe/freePlan', { email: email });
    dispatch(setAlert('Started free trial for 7 days', 'success'));
  } else dispatch(setAlert('Finished free trial', 'danger'));
};
export const setStripePromise = (val) => async (dispatch) => {
  dispatch({
    type: SetStripePromise,
    payload: val
  });
};
