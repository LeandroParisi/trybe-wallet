import { SAVE_CURRENCIES, FETCH_FAILED, FETCH_STARTED, SAVE_TRANSACTION } from '../actions'

// initialState.currencies is mocked: should be [];
// transactions is mocked: should be [];

const INITIAL_STATE = {
  isFetching: false,
  error: '',
  currentId: 0,
  currencyToExchange: 'BRL',
  currencies: ['USD', 'BRL', 'CHI', 'BBR', 'BRR', 'BCR'],
  transactions: [
    {       
      transactionType: 'Expense',
      value: 123.50, 
      description: 'mocked expense 1',
      currency: 'BRL',
      method: 'Cash',
      category: 'Bills',
      originAccount: 'Wallet',
      id: 0
    },
    {       
      transactionType: 'Expense',
      value: 12, 
      description: 'mocked expense 2',
      currency: 'BRL',
      method: 'Credit',
      category: 'Education',
      originAccount: 'Savings account',
      id: 1
    },
    {       
      transactionType: 'Expense',
      value: 123.50, 
      description: 'mocked expense 1',
      currency: 'BRL',
      method: 'Cash',
      category: 'Home',
      originAccount: 'Wallet',
      id: 0
    },
    {       
      transactionType: 'Income',
      value: 200.21, 
      description: 'mocked Income 1',
      currency: 'BRL',
      method: 'Cash',
      category: 'Bills',
      originAccount: 'Wallet',
      id: 2
    },
    {       
      transactionType: 'Income',
      value: 10, 
      description: 'mocked Income 2',
      currency: 'BRL',
      method: 'Credit',
      category: 'Education',
      originAccount: 'Savings account',
      id: 3
    },
  ]
}


function wallet(state = INITIAL_STATE, action) {
  switch(action.type) {
    case FETCH_STARTED:
      return {...state, isFetching: true}
    case SAVE_CURRENCIES:
      return {...state, currencies: action.currencyArray, isFetching: false }
    case FETCH_FAILED:
      return {...state, error: action.payload}
    case SAVE_TRANSACTION:
      return {
        ...state,
        currentId: state.currentId + 1,
        transactions: [ 
          ...state.transactions, 
          {
            ...action.payload,
            id: state.currentId,
          } 
        ]
      }
    default:
      return { ...state }
  }
}

export default wallet;
