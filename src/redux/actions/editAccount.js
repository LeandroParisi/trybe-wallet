export const SUBTRACT_FROM_ACCOUNT = 'SUBTRACT_FROM_ACCOUNT';
export const ADD_TO_ACCOUNT = 'ADD_TO_ACCOUNT'

export const addToAccount = ({ account, value }) => ({
  type: ADD_TO_ACCOUNT,
  account,
  value
})

export const subtractFromAccount = ({ account, value }) => ({
  type: SUBTRACT_FROM_ACCOUNT,
  account,
  value
})