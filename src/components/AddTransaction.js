import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../layout_general/style_sheets_general/wholePageComponent.css';
import './style_sheets/AddTransaction.css';
import AddTransactionHeader from './AddTransactionHeader';

class AddTransaction extends React.Component {
  constructor() {
    super();

    this.selectTransaction = this.selectTransaction.bind(this);

    this.state = {
      transactionType: 'Expense',
    }
  }
  
  selectTransaction(name) {
    this.setState({ transactionType: name })
  }

  render() {
    const { transactionType } = this.state;
    const { paymentMethods, categories, accounts } = this.props;
    return (
      <section className="whole-page">
        <section className="whole-page-container">

          <AddTransactionHeader selectedTransaction={ transactionType } selectTransaction={ this.selectTransaction } />

          <section className='input-container'>
            <input type="number" placeholder="Value" className={ `transaction-input ${transactionType}` } />

            <input type="text" placeholder="Description" className={ `transaction-input ${transactionType}` } />
            
            <select className={ `transaction-input ${transactionType}` }>
              { paymentMethods.map(method => (
                <option value={ method }>
                  { method }
                </option>
              ))}
            </select>

            <select className={ `transaction-input ${transactionType}` }>
              { categories.map(category => (
                <option value={ category }>
                  { category }
                </option>
              ))}
            </select>

            {transactionType === 'Transfer' ? 
              <div>
                <div className='transfer-control'>
                  <label htmlFor="origin-account">
                    Origin Account: 
                    <select id="origin-account" className={ `transaction-input ${transactionType}` }>
                      {accounts.map(account => (
                        <option value={account}>
                          { account }
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className='transfer-control'>
                  <label htmlFor="destination-account">
                    Destination Account: 
                    <select id="destination-account" className={ `transaction-input ${transactionType}` }>
                      {accounts.map(account => (
                        <option value={account}>
                          { account }
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>
              : null
            }

            <button type="button" className={`trybe-btn-1 ${transactionType}`}>
              Register
            </button>

          </section>
        </section>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  paymentMethods: state.config.paymentMethods,
  categories: state.config.categories,
  accounts: state.config.accounts,
})

export default connect(mapStateToProps)(AddTransaction);