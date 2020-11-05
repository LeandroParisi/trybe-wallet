import { SUBTRACT_FROM_ACCOUNT, ADD_TO_ACCOUNT } from '../actions';

const INITIAL_STATE = {
  paymentMethods: ['Cash', 'Credit', 'Debit'],
  categories: [
    'Food and beverages',
    'Home',
    'Bills',
    'Education',
    'Personal expenses',
    'Leisure',
    'Salary'
  ],
  accounts: {
    'Wallet': 1000,
    'Checking account': 1000,
    'Savings account': 1000
  },
  typeOfTransactions: ['Expense', 'Income', 'Transfer']
}

export default function config(state = INITIAL_STATE, action) {
  switch(action.type) {
    case ADD_TO_ACCOUNT:
      return {
        ...state,
        accounts: {
          ...state.accounts,
          [action.account]: state.accounts[action.account] + action.value
        }
      }
    case SUBTRACT_FROM_ACCOUNT:
      return {
        ...state,
        accounts: {
          ...state.accounts,
          [action.account]: state.accounts[action.account] - action.value
        }
      }
    default:
      return state
  }
}