import fetchExchangeRates from '../../services/exchangeRates';
import { SAVE_CURRENCIES, saveCurrencies } from './saveCurrencies';
export const FETCH_STARTED = 'FETCH_STARTED';
export const FETCH_FAILED = 'FETCH_FAILED';


const startFetch = () => ({
  type: FETCH_STARTED
});

const fetchFailed = () => ({
  type: FETCH_FAILED,
  payload: "It's us, not you... we've had some problems with your data, could you try again later?"
})

export function fetchCurrencies() {
  return async (dispatch) => {
    dispatch(startFetch());
    const API_RESPONSE = await fetchExchangeRates();
    if (API_RESPONSE.error) {
      dispatch(fetchFailed());
    } else {
      dispatch(saveCurrencies(API_RESPONSE))
    }
  }
}