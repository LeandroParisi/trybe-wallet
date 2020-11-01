export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';

export const saveCurrencies = (payload) => ({
  type: SAVE_CURRENCIES,
  currencyArray: [payload.base, ...Object.keys(payload.rates)],
})