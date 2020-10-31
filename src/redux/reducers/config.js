const INITIAL_STATE = {
  paymentMethods: ['Cash', 'Credit', 'Debit'],
  categories: [
    'Food and beverages',
    'Home',
    'Bills',
    'Education',
    'Personal expenses',
    'Leisure',
    'Salário'
  ],
  accounts: [
    'Wallet',
    'Current account',
    'Savings account'
  ]
}

export default function config(state = INITIAL_STATE, action) {
  switch(action.type) {
    default:
      return state
  }
}