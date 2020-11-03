import React, { Component } from 'react';
import DashboardControlValues from './sub-components/DashboardControlValues';

class AccountBalance extends Component {

  calculateTransactions() {
    const { transactions } = this.props;

    const incomes = transactions
      .filter(transaction => transaction.transactionType === 'Income')
      .map(transaction  => transaction.value)
      .reduce((a, b) => a + b, 0);

    const expenses = transactions
      .filter(transaction => transaction.transactionType === 'Expense')
      .map(transaction  => transaction.value)
      .reduce((a, b) => a + b, 0)

    if (incomes > expenses) {
      const value = incomes - expenses;
      const transactionType = 'Income'
      return { value, transactionType }
    } else if (expenses > incomes) {
      const value = expenses - incomes;
      const transactionType = 'Expense'
      return { value, transactionType }
    } else {
      const value = 0;
      const transactionType = ''
      return { value, transactionType }
    }
  }

  render() {
    const { className } = this.props;
    const { value, transactionType } = this.calculateTransactions();

    return (
      <div className="dashboard-control-container">
      <span className="mini-title">Account Balance:</span>
        <section className={ `balance-dashboard ${ className }` }>

        <DashboardControlValues value={ value } transactionType={ transactionType }/>

        </section>
      </div>
    )
  }
}

export default AccountBalance;