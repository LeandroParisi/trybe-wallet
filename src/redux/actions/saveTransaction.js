import fetchExchangeRates from '../../services/exchangeRates';

export const SAVE_TRANSACTION = 'SAVE_TRANSACTION';

export const saveTransaction = (payload) => ({
  type: SAVE_TRANSACTION,
  payload
})

export const assembleTransaction = (transaction) => {
  return async (dispatch) => {
    const exchangeRates = await fetchExchangeRates();
    const assembledTransaction = assemble(transaction, exchangeRates);
    dispatch(saveTransaction(assembledTransaction));
  }
}

function assemble(transaction, currencyRates) {
  return { ... transaction, currencyRates }
}
