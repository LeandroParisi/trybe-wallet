import { SAVE_CURRENCIES, FETCH_FAILED, FETCH_STARTED, SAVE_TRANSACTION, CONVERT_TRANSACTIONS } from '../actions'

// initialState.currencies is mocked: should be [];
// transactions is mocked: should be [];

const INITIAL_STATE = {
  isFetching: false,
  error: '',
  currentId: 0,
  currencyToExchange: 'BRL',
  currencies: ['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'BRL'],
  transactions: [
    {       
      transactionType: 'Expense',
      value: 123.50,
      convertedValue: { 
        value: 123.50, 
        currency: 'BRL' 
      },
      description: 'mocked expense 1',
      currency: 'BRL',
      method: 'Cash',
      category: 'Bills',
      originAccount: 'Wallet',
      id: 0,
      date: {
        fullData: '2020-11-02T21:59:04.813Z',
        year: 2020,
        month: 10,
        day: 2
      },
      exchangeRates: {
        base: "USD",
        date: "2020-11-03 00:04:00+00",
        rates: {
          AED: "3.672988",
          AFN: "76.88837",
          ALL: "106.414448",
          AMD: "481.616228",
          ANG: "1.795209",
          BRL: '2',
        }
      }
    },
    {       
      transactionType: 'Expense',
      value: 12, 
      convertedValue: { 
        value: 12, 
        currency: 'BRL' 
      },
      description: 'mocked expense 2',
      currency: 'BRL',
      method: 'Credit',
      category: 'Education',
      originAccount: 'Savings account',
      id: 1,
      date: {
        fullData: '2020-11-02T21:59:04.813Z',
        year: 2020,
        month: 9,
        day: 3
      },
      exchangeRates: {
        base: "USD",
        date: "2020-11-03 00:04:00+00",
        rates: {
          AED: "3.672988",
          AFN: "76.88837",
          ALL: "106.414448",
          AMD: "481.616228",
          ANG: "1.795209",
          BRL: '2',

        }
      }
    },
    {       
      transactionType: 'Expense',
      convertedValue: { 
        value: 123.50, 
        currency: 'BRL' 
      },
      value: 123.50,
      description: 'mocked expense 1',
      currency: 'BRL',
      method: 'Cash',
      category: 'Home',
      originAccount: 'Wallet',
      id: 0,
      date: {
        fullData: '2020-11-02T21:59:04.813Z',
        year: 2020,
        month: 10,
        day: 10
      },
      exchangeRates: {
        base: "USD",
        date: "2020-11-03 00:04:00+00",
        rates: {
          AED: "3.672988",
          AFN: "76.88837",
          ALL: "106.414448",
          AMD: "481.616228",
          ANG: "1.795209",
          BRL: '2',

        }
      }
    },
    {       
      transactionType: 'Income',
      value: 200.21, 
      convertedValue: { 
        value: 200.21, 
        currency: 'BRL' 
      },
      description: 'mocked Income 1',
      currency: 'BRL',
      method: 'Cash',
      category: 'Bills',
      originAccount: 'Wallet',
      id: 2,
      date: {
        fullData: '2020-11-02T21:59:04.813Z',
        year: 2020,
        month: 10,
        day: 2
      },
      exchangeRates: {
        base: "USD",
        date: "2020-11-03 00:04:00+00",
        rates: {
          AED: "3.672988",
          AFN: "76.88837",
          ALL: "106.414448",
          AMD: "481.616228",
          ANG: "1.795209",
          BRL: '2',

        }
      }
    },
    {       
      transactionType: 'Income',
      value: 10, 
      convertedValue: { 
        value: 10, 
        currency: 'BRL' 
      },
      description: 'mocked Income 2',
      currency: 'BRL',
      method: 'Credit',
      category: 'Education',
      originAccount: 'Savings account',
      id: 3,
      date: {
        fullData: '2020-11-02T21:59:04.813Z',
        year: 2020,
        month: 10,
        day: 10
      },
      exchangeRates: {
        base: "USD",
        date: "2020-11-03 00:04:00+00",
        rates: {
          AED: "3.672988",
          AFN: "76.88837",
          ALL: "106.414448",
          AMD: "481.616228",
          ANG: "1.795209",
          BRL: '2',

        }
      }
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
    case CONVERT_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      }
    default:
      return { ...state }
  }
}

export default wallet;
