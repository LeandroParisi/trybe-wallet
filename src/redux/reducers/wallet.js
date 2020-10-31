import { SAVE_CURRENCIES } from '../actions'

const INITIAL_STATE = {
  isFetching: false,
  editor: false,
  idToEdit: 0,
  currencyToExchange: 'BRL',
  currencies: [],
  expenses: [],
}


function wallet(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SAVE_CURRENCIES:
      return {...state, currencies: action.payload }
    default:
      return { ...state }
  }
}

export default wallet;
