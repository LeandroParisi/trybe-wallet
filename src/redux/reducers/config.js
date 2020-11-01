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
  accounts: [
    'Wallet',
    'Checking account',
    'Savings account'
  ],
  typeOfTransactions: ['Expense', 'Income', 'Transfer']

}

export default function config(state = INITIAL_STATE, action) {
  switch(action.type) {
    default:
      return state
  }
}