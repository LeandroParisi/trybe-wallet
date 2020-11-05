import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './layout_general/style_sheets_general/buttons.css';
import './layout_general/style_sheets_general/fonts.css';
import { ManageAccounts, Wallet, AddTransaction, Login } from './pages'

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/wallet" component={ Wallet } />
      <Route exact path="/addtransaction" component={ AddTransaction } />
      <Route exact path="/accounts" component={ ManageAccounts } />
    </Switch>
  );
}

export default App;
