import React, { Component } from 'react';
import { connect } from 'react-redux';
import DashboardControlValues from './sub-components/DashboardControlValues';

class AccountBalance extends Component {
  constructor() {
    super();

    this.calculateTransactions = this.calculateTransactions.bind(this);

    this.state = {
      value: 0,
    }
  }

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
      return incomes - expenses
    } else if (expenses > incomes) {
      return -(expenses - incomes)
    } else {
      return 0
    }
  }

  render() {
    const { className } = this.props;
    const value = this.calculateTransactions()
    const transactionType = value < 0 ? 'Expense' : 'Income'; 
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

const mapStateToProps = (state) => ({
  transactions: state.wallet.transactions,
})

export default connect(mapStateToProps)(AccountBalance);