import React, { Component } from 'react';
import DashboardControlValues from './sub-components/DashboardControlValues';
import DashboardControlEdit  from './sub-components/DashboardControlEdit';
import { connect } from 'react-redux';
import { calculateAccounsTotalBalance, calculateIncomesAndExpenses } from '../utils';

class AccountBalance extends Component {
  constructor() {
    super();

    this.editAccoutButton = this.editAccoutButton.bind(this);

    this.state = {
      editAccount: false,
    }
  }

  editAccoutButton() {
    const { editAccount } = this.state;
    if(editAccount) {
      this.setState({ editAccount: false})
    } else {
      this.setState({ editAccount: true })
    }
  }

  render() {
    const { className, transactions, accounts } = this.props;
    const { incomes, expenses } = calculateIncomesAndExpenses(transactions);
    const { editAccount } = this.state;
    const accountsTotal = calculateAccounsTotalBalance(accounts)
    const finalBalance = accountsTotal + incomes - expenses;
    const transactionType = finalBalance > 0 ? "Income" : "Expense"

    return (
      <div className="dashboard-control-container">
      <span className="mini-title">Account Balance:</span>
        <section className={ `balance-dashboard ${ className }` }>

        <DashboardControlValues value={ finalBalance } transactionType={ transactionType }/>

        <hr />

        <button className="trybe-btn-1" onClick={ this.editAccoutButton }>
          Edit accounts
        </button>
        {editAccount ? <DashboardControlEdit closeContainer={ this.editAccoutButton } /> : null}
        
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  accounts: state.config.accounts,
})

export default connect(mapStateToProps)(AccountBalance);