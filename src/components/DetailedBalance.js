import React from 'react';
import './style_sheets/DetailedBalance.css'
import { connect } from 'react-redux';
import { returnSelectedDropdown, filterByCategoryAndPaymentMethod, filterByCategory, filterByPaymentMethod, filterByType, calculateTransactions } from '../utils'
import DashboardControlValues from './sub-components/DashboardControlValues';

class DetailedBalance extends React.Component {
  constructor() {
    super();
        
    this.state = {
      transactionType: 'Expense',
      category: 'All',
      paymentMethod: 'All',
      filteredByType: [],
      filteredByCategoryAndMethod: [],
    }
  }

  componentDidMount() {
    const { transactionType } = this.state;
    const { transactions } = this.props;

    const filteredByType = filterByType(transactions, transactionType);

    this.setState((currentState) => ({
      ...currentState,
      filteredByType,
      filteredByCategoryAndMethod: filteredByType,
    }))
  }

  filterSwitch(key, selected) {
    const { paymentMethod, category } = this.state;

    if (key === 'category') {
      const { filteredByType } = this.state;
      const filteredByCategoryAndMethod = filterByCategoryAndPaymentMethod(filteredByType, selected, paymentMethod);

      return { filteredByType, filteredByCategoryAndMethod }

    } else if (key === 'paymentMethod') {
      const { filteredByType } = this.state;
      const filteredByCategoryAndMethod = filterByCategoryAndPaymentMethod(filteredByType, category, selected);

      return { filteredByType, filteredByCategoryAndMethod }

    } if (key === 'transactionType') {
      const { transactions } = this.props;

      const filteredByType = filterByType(transactions, selected);
      const filteredByCategoryAndMethod = filterByCategoryAndPaymentMethod(filteredByType, category, paymentMethod);
      
      return { filteredByType, filteredByCategoryAndMethod }
    }
  }

  handleSelectChange(event) {
    const { key, selected } = returnSelectedDropdown(event);

    const { filteredByType, filteredByCategoryAndMethod } = this.filterSwitch(key, selected)

    this.setState((currentState) => ({ 
      ...currentState,
      [key]: selected,
      filteredByType,
      filteredByCategoryAndMethod
    }))
  }

  render() {
    const { paymentMethods, categories, typeOfTransactions, className } = this.props;
    const { filteredByCategoryAndMethod, transactionType } = this.state;

    const value = calculateTransactions(filteredByCategoryAndMethod);
    
    return (
      <div className="dashboard-control-container">
        <span className="mini-title">Detailed Balance:</span>
        <section className={ `transaction-dashboard ${ className }` }>
          <div className="transaction-control">
            <div className="transaction-control-selectors">
              <label htmlFor='transactionType' className='filter-container'>
                <span className='mini-title'>Transaction Type</span>
                <select id='transactionType' className="select-filter" name="transactionType" onChange={ (event) => this.handleSelectChange(event) }>
                  { typeOfTransactions.map(type => <option>{ type }</option>)}
                </select>
              </label> 

              <label htmlFor='category' className='filter-container'>
                <span className='mini-title'>Category</span>
                <select id='category' className="select-filter" name="category" onChange={ (event) => this.handleSelectChange(event) }>
                  <option selected>All</option>
                  { categories.map(category => <option>{ category }</option>)}
                </select>
              </label>

              <label htmlFor='paymentMethod' className='filter-container'>
                <span className='mini-title'>Payment Method</span>
                <select id='paymentMethod' className="select-filter" name="paymentMethod" onChange={ (event) => this.handleSelectChange(event) }>
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
  paymentMethods: state.config.paymentMethods,
  categories: state.config.categories,
  typeOfTransactions: state.config.typeOfTransactions,
})

export default connect(mapStateToProps)(DetailedBalance);