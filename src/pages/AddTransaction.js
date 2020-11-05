import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../layout_general/style_sheets_general/wholePageComponent.css';
import './style_sheets/AddTransaction.css';
import AddTransactionHeader from '../components/AddTransactionHeader';
import AutoCompleteInput from '../components/sub-components/AutoCompleteInput';
import { assembleTransaction } from '../redux/actions';
import { generateTransaction } from '../utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';


class AddTransaction extends React.Component {
  constructor() {
    super();

    this.selectTransaction = this.selectTransaction.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.saveInputedCurrency = this.saveInputedCurrency.bind(this);

    this.state = {
      transactionType: 'Expense',
      value: '',
      description: '',
      currency: '',
      method: '',
      category: '',
      originAccount: '',
      destinationAccount: '',
    }
  }
  
  handleInputChange({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value })
  }

  saveInputedCurrency(currency) {
    this.setState({ currency })
  }

  handleSelectChange({ nativeEvent }) {
    const { selectedIndex } = nativeEvent.target.options
    const key = nativeEvent.target.name;
    const selected = nativeEvent.target[selectedIndex].value;
    this.setState({ [key]: selected })
  }

  selectTransaction(name) {
    if(name === "Income" || name === "Expense") {
      this.setState({ transactionType: name, destinationAccount: '' })
    } else {
      this.setState({ transactionType: name })
    }
  }

  handleButtonClick() {
    const { dispatchSaveExpense } = this.props;

    const transaction = generateTransaction(this.state);

    dispatchSaveExpense(transaction);
  }

  render() {
    const { transactionType } = this.state;
    const { paymentMethods, categories, accounts, currencies } = this.props;
    return (
      <section className="whole-page">
        <section className="whole-page-container">

          <AddTransactionHeader selectedTransaction={ transactionType } selectTransaction={ this.selectTransaction } />

          <section className='input-container'>
            <input type="number" placeholder="Value" className={ `transaction-input ${transactionType}` } name="value" onChange={ this.handleInputChange } />

            <input type="text" placeholder="Description" className={ `transaction-input ${transactionType}` } name="description" onChange={ this.handleInputChange } />

            <AutoCompleteInput suggestions={ currencies } className={ `transaction-input ${transactionType}` } className={ transactionType } saveInputedCurrency = { this.saveInputedCurrency } />
            
            <select name="method" id="method" className={ `transaction-input ${transactionType}`} onChange={ this.handleSelectChange }>
              <option selected disabled>-- payment method --</option>
              { paymentMethods.map(method => (
                <option className='select-option' value={ method } key={ method }>
                  { method }
                </option>
              ))}
            </select>

            <select name="category" id="category" className={ `transaction-input ${transactionType}` } onChange={ this.handleSelectChange } >
              <option selected disabled>-- category --</option>
              { categories.map(category => (
                <option className='select-option' value={ category }>
                  { category }
                </option>
              ))}
            </select>

            <div>
                <div className='transfer-control'>
                  <select name="originAccount" id="origin-account" className={ `transaction-input ${transactionType}`} onChange={ this.handleSelectChange } >
                    <option selected disabled>-- origin account --</option>
                    {accounts.map(account => (
                      <option className='select-option' value={account}>
                        { account }
                      </option>
                    ))}
                  </select>
                </div>
            {transactionType === 'Transfer' ? 
                <div className='transfer-control'>
                  <select name="destinationAccount" id="destination-account" className={ `transaction-input ${transactionType}` } onChange={ this.handleSelectChange } >
                  <option selected disabled>-- destination account --</option>
                    {accounts.map(account => (
                      <option className='select-option' value={account}>
                        { account }
                      </option>
                    ))}
                  </select>
                </div>
              : null
            }
            </div>

            <button type="button" className={`trybe-btn-1 ${transactionType}`} onClick={ () => this.handleButtonClick() }>
              Register
            </button>

          </section>

          <Link to='/wallet'>
            <button className='trybe-btn-1 register-expense-button'>
              <FontAwesomeIcon icon={ faAngleDoubleLeft } size="1x" />
            </button>
          </Link>

        </section>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  paymentMethods: state.config.paymentMethods,
  categories: state.config.categories,
  accounts: Object.keys(state.config.accounts),
  currencies: state.wallet.currencies,
})

const mapDispatchToProps = (dispatch) => ({
  dispatchSaveExpense: (expense) => dispatch(assembleTransaction(expense)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AddTransaction);