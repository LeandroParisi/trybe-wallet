import React from 'react';
import './style_sheets/TransactionsDashboard.css'
import { connect } from 'react-redux';
import { returnSeletedDropdown } from '../utils'
import DashboardControlValues from './sub-components/DashboardControlValues';

class TransactionsDashboard extends React.Component {
  constructor() {
    super();
        
    this.state = {
      transactionType: 'Expense',
      filteredTransactions: {}
    }
  } 

  handleSelectChange(event) {
    const { key, selected } = returnSeletedDropdown(event);
    this.setState({ [key]: selected })
  }

  filterByType(transactions, type) {
    return transactions.filter(transaction => transaction.transactionType === type)
  }

  calculateTransactions(transactions) {
    return transactions.map(transaction => transaction.value).reduce((a, b) => a + b, 0)
  }

  calculateFinalValue() {
    let { transactions } = this.props;
    const { transactionType } = this.state;
    
    transactions = this.filterByType(transactions, transactionType); 

    const finalSum = this.calculateTransactions(transactions);

    return transactionType === 'Expense' ? -finalSum : finalSum 
  }

  render() {
  const { currencies, transactions, paymentMethods, categories, typeOfTransactions, className } = this.props;
  const { transactionType } = this.state;
  const value = this.calculateFinalValue()
    return (
      <div className="dashboard-control-container">
        <span className="mini-title">Detailed Balance:</span>
        <section className={ `transaction-dashboard ${ className }` }>
          <div className="transaction-control">
            <div className="transaction-control-selectors">
              <label htmlFor='transactionType' className='filter-container'>
                <span className='mini-title'>Transaction Type</span>
                <select id='transactionType' className="wallet-filters" name="transactionType" onChange={ (event) => this.handleSelectChange(event) }>
                  { typeOfTransactions.map(type => <option>{ type }</option>)}
                </select>
              </label> 

              <label htmlFor='category' className='filter-container'>
                <span className='mini-title'>Category</span>
                <select id='category' className="wallet-filters" name="category" onChange={ (event) => this.handleSelectChange(event) }>
                  <option selected>All</option>
                  { categories.map(category => <option>{ category }</option>)}
                </select>
              </label>

              <label htmlFor='paymentMethod' className='filter-container'>
                <span className='mini-title'>Payment Method</span>
                <select id='paymentMethod' className="wallet-filters" name="paymentMethod" onChange={ (event) => this.handleSelectChange(event) }>
                  <option selected>All</option>
                  { paymentMethods.map(method => <option>{ method }</option>)}
                </select>
                </label>
            </div>

            <DashboardControlValues value={ value } transactionType={ transactionType } />

          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  transactions: state.wallet.transactions,
  paymentMethods: state.config.paymentMethods,
  categories: state.config.categories,
  typeOfTransactions: state.config.typeOfTransactions,
})

export default connect(mapStateToProps)(TransactionsDashboard);