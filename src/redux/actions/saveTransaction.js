import fetchExchangeRates from '../../services/exchangeRates';

export const SAVE_TRANSACTION = 'SAVE_TRANSACTION';

export const saveTransaction = (payload) => ({
  type: SAVE_TRANSACTION,
  payload
})

export const assembleTransaction = (transaction) => {
  return async (dispatch) => {
    const exchangeRates = await fetchExchangeRates();
    const assembledExpense = assembleExpense(transaction, exchangeRates);
    dispatch(saveTransaction(assembledExpense));
  }
}

function assembleExpense(transaction, currencyRates) {
  return { ... transaction, currencyRates }
}
