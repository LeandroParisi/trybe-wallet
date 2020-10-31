import wallet from './wallet';
import user from './user';
import config from './config'
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({ wallet, user, config });

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default rootReducer;