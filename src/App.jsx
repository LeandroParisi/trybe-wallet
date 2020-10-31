import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import './layout_general/style_sheets_general/buttons.css';
import './layout_general/style_sheets_general/fonts.css';
import Wallet from './pages/Wallet';
import AddTransaction from './components/AddTransaction';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/carteira" component={ Wallet } />
      <Route path="/addtransaction" component={ AddTransaction } />
    </Switch>
  );
}

export default App;
